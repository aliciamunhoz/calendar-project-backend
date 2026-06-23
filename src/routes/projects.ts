import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const periodSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  note: z.string().optional(),
});

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["planning", "in_progress", "completed", "paused"]).default("planning"),
  tech: z.array(z.string()).default([]),
  url: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#6366f1"),
  periods: z.array(periodSchema).optional(),
});

function serializeProject(p: any) {
  return {
    ...p,
    tech: JSON.parse(p.tech),
    periods: (p.periods ?? []).map((pd: any) => ({
      ...pd,
      startDate: pd.startDate.toISOString(),
      endDate: pd.endDate?.toISOString() ?? null,
    })),
  };
}

export async function projectRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const projects = await prisma.project.findMany({
      include: { periods: { orderBy: { startDate: "asc" } } },
      orderBy: { createdAt: "asc" },
    });
    return projects.map(serializeProject);
  });

  app.get("/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const project = await prisma.project.findUnique({
      where: { id },
      include: { periods: { orderBy: { startDate: "asc" } } },
    });
    if (!project) return reply.status(404).send({ error: "Not found" });
    return serializeProject(project);
  });

  app.post("/", async (req, reply) => {
    const { periods, ...data } = projectSchema.parse(req.body);
    const project = await prisma.project.create({
      data: {
        ...data,
        tech: JSON.stringify(data.tech),
        periods: periods
          ? {
              create: periods.map((p) => ({
                startDate: new Date(p.startDate),
                endDate: p.endDate ? new Date(p.endDate) : undefined,
                note: p.note,
              })),
            }
          : undefined,
      },
      include: { periods: { orderBy: { startDate: "asc" } } },
    });
    return reply.status(201).send(serializeProject(project));
  });

  app.put("/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const { periods, ...data } = projectSchema.partial().parse(req.body);

    const exists = await prisma.project.findUnique({ where: { id } });
    if (!exists) return reply.status(404).send({ error: "Not found" });

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        tech: data.tech ? JSON.stringify(data.tech) : undefined,
      },
      include: { periods: { orderBy: { startDate: "asc" } } },
    });
    return serializeProject(project);
  });

  app.delete("/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const exists = await prisma.project.findUnique({ where: { id } });
    if (!exists) return reply.status(404).send({ error: "Not found" });
    await prisma.project.delete({ where: { id } });
    return reply.status(204).send();
  });

  // --- Periods ---

  app.post("/:id/periods", async (req, reply) => {
    const { id } = req.params as { id: string };
    const data = periodSchema.parse(req.body);
    const exists = await prisma.project.findUnique({ where: { id } });
    if (!exists) return reply.status(404).send({ error: "Not found" });
    const period = await prisma.period.create({
      data: {
        projectId: id,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        note: data.note,
      },
    });
    return reply.status(201).send({
      ...period,
      startDate: period.startDate.toISOString(),
      endDate: period.endDate?.toISOString() ?? null,
    });
  });

  app.put("/:id/periods/:periodId", async (req, reply) => {
    const { periodId } = req.params as { id: string; periodId: string };
    const data = periodSchema.partial().parse(req.body);
    const period = await prisma.period.update({
      where: { id: periodId },
      data: {
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : null,
        note: data.note,
      },
    });
    return {
      ...period,
      startDate: period.startDate.toISOString(),
      endDate: period.endDate?.toISOString() ?? null,
    };
  });

  app.delete("/:id/periods/:periodId", async (req, reply) => {
    const { periodId } = req.params as { id: string; periodId: string };
    await prisma.period.delete({ where: { id: periodId } });
    return reply.status(204).send();
  });
}
