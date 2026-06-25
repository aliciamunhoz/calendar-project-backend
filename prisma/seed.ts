import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.period.deleteMany();
  await prisma.project.deleteMany();

  // ── BookHub ────────────────────────────────────────────────────────────────

  await prisma.project.create({
    data: {
      title: "BookHub Frontend",
      description: "Interface de gestão de livros: CRUD, busca e consumo da API REST.",
      status: "completed",
      tech: JSON.stringify(["React", "TypeScript", "Vite"]),
      color: "#10b981",
      url: "https://github.com/aliciamunhoz/bookhub-frontend",
      repoUrl: "https://github.com/aliciamunhoz/bookhub-frontend",
      periods: {
        create: [{ startDate: new Date("2026-06-17"), endDate: new Date("2026-06-17") }],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: "BookHub Backend",
      description: "API REST de gestão de livros com cobertura de testes e logging JSON.",
      status: "completed",
      tech: JSON.stringify(["TypeScript", "Node.js", "Express"]),
      color: "#059669",
      repoUrl: "https://github.com/aliciamunhoz/bookhub-backend",
      periods: {
        create: [{ startDate: new Date("2026-06-17"), endDate: new Date("2026-06-17") }],
      },
    },
  });

  // ── Project Calendar ───────────────────────────────────────────────────────

  await prisma.project.create({
    data: {
      title: "Project Calendar Frontend",
      description: "UI do calendário de projetos: tema Pokédex, painel de Pokémon por mês e TechBadges.",
      status: "in_progress",
      tech: JSON.stringify(["React", "TypeScript", "Vite"]),
      color: "#6366f1",
      url: "https://github.com/aliciamunhoz/calendar-project-frontend",
      repoUrl: "https://github.com/aliciamunhoz/calendar-project-frontend",
      periods: {
        create: [{ startDate: new Date("2026-06-23") }],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: "Project Calendar Backend",
      description: "API Fastify com CRUD de projetos e períodos, Prisma + PostgreSQL (Neon).",
      status: "in_progress",
      tech: JSON.stringify(["TypeScript", "Fastify", "Prisma", "PostgreSQL"]),
      color: "#4f46e5",
      repoUrl: "https://github.com/aliciamunhoz/calendar-project-backend",
      periods: {
        create: [{ startDate: new Date("2026-06-23") }],
      },
    },
  });

  // ── Portfolio ──────────────────────────────────────────────────────────────

  await prisma.project.create({
    data: {
      title: "Portfolio",
      description: "Site de portfólio pessoal com tema Pokédex, modo claro/escuro e listagem dinâmica de projetos.",
      status: "in_progress",
      tech: JSON.stringify(["React", "TypeScript", "Vite"]),
      color: "#f59e0b",
      url: "https://portfolio-amfc.vercel.app",
      repoUrl: "https://github.com/aliciamunhoz/portfolio-frontend",
      periods: {
        create: [
          {
            startDate: new Date("2026-06-18"),
            endDate: new Date("2026-06-19"),
            note: "Versão inicial: interface com tema pokédex, tipagens e serviços de API.",
          },
          { startDate: new Date("2026-06-24") },
        ],
      },
    },
  });

  console.log("Seed concluído. 5 projetos cadastrados.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
