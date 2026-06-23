import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const bookApi = await prisma.project.create({
    data: {
      title: "BookAPI TS",
      description: "API REST de livros com TypeScript, Express e PostgreSQL.",
      status: "completed",
      tech: JSON.stringify(["TypeScript", "Node.js", "PostgreSQL"]),
      color: "#10b981",
      repoUrl: "https://github.com/aliciamunhoz/bookAPI-ts",
      periods: {
        create: [
          { startDate: new Date("2024-01-10"), endDate: new Date("2024-02-28"), note: "Versão inicial" },
          { startDate: new Date("2024-05-15"), endDate: new Date("2024-05-30"), note: "Adição de autenticação JWT" },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: "Pokedex",
      description: "Aplicação de Pokédex consumindo a PokéAPI.",
      status: "completed",
      tech: JSON.stringify(["React", "TypeScript", "Vite"]),
      color: "#f59e0b",
      repoUrl: "https://github.com/aliciamunhoz/pokedex",
      periods: {
        create: [
          { startDate: new Date("2024-03-01"), endDate: new Date("2024-03-20") },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: "Project Calendar",
      description: "Calendário full-stack para registrar projetos.",
      status: "in_progress",
      tech: JSON.stringify(["React", "TypeScript", "Fastify", "Prisma"]),
      color: "#6366f1",
      periods: {
        create: [
          { startDate: new Date("2026-06-01"), note: "Em desenvolvimento" },
        ],
      },
    },
  });

  console.log("Seed concluído. BookAPI com", 2, "períodos.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
