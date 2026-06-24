import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // BookHub — front + back, sprint único em 17/06 (MVP completo: CRUD, testes, logging, deploy)
  await prisma.project.create({
    data: {
      title: "BookHub",
      description: "Aplicação full-stack de gestão de livros (CRUD, busca e API REST).",
      status: "completed", 
      tech: JSON.stringify(["TypeScript", "Node.js", "Express", "React", "Vite"]),
      color: "#10b981",
      repoUrl: "https://github.com/aliciamunhoz/bookhub-frontend",
      periods: {
        create: [
          {
            startDate: new Date("2026-06-17"),
            endDate: new Date("2026-06-17"),
            note: "Backend: https://github.com/aliciamunhoz/bookhub-backend — MVP completo: CRUD de livros, cobertura de testes, logging JSON e deploy na Vercel.",
          },
        ],
      },
    },
  });

  // Project Calendar — front + back, sprint único em 23/06, em andamento
  await prisma.project.create({
    data: {
      title: "Project Calendar",
      description: "Calendário full-stack para registrar projetos e seus períodos de atividade.",
      status: "in_progress",
      tech: JSON.stringify(["React", "TypeScript", "Fastify", "Prisma", "Vite"]),
      color: "#6366f1",
      repoUrl: "https://github.com/aliciamunhoz/calendar-project-frontend",
      periods: {
        create: [
          {
            startDate: new Date("2026-06-23"),
            note: "Backend: https://github.com/aliciamunhoz/calendar-project-backend — Em desenvolvimento: API Fastify com CRUD de projetos/períodos e UI do calendário (TechBadge, painel de pokémon, modal de projeto).",
          },
        ],
      },
    },
  });

  // Portfolio — dois blocos: versão inicial (18–19/06) e migração da API (24/06)
  await prisma.project.create({
    data: {
      title: "Portfolio",
      description: "Site de portfólio pessoal full-stack com listagem dinâmica de projetos.",
      status: "in_progress",
      tech: JSON.stringify(["React", "TypeScript", "Vite", "Fastify", "Prisma"]),
      color: "#f59e0b",
      repoUrl: "https://github.com/aliciamunhoz/portfolio-frontend",
      periods: {
        create: [
          {
            startDate: new Date("2026-06-18"),
            endDate: new Date("2026-06-19"),
            note: "Backend: https://github.com/aliciamunhoz/portfolio-backend — Versão inicial: interface com tema pokédex (claro/escuro), tipagens e serviços de API, backend em Express.",
          },
          {
            startDate: new Date("2026-06-24"),
            note: "Migração da API de Express para Fastify + Prisma (CRUD completo) e link de destaque para o calendário no menu.",
          },
        ],
      },
    },
  });

  console.log("Seed concluído. 3 projetos cadastrados (BookHub, Project Calendar, Portfolio).");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());