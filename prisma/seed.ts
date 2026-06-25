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
        create: [
          {
            startDate: new Date("2026-06-17"),
            endDate: new Date("2026-06-17"),
            note: "Scaffold com Vite/React/TS, tipos Book/BookInput e serviço de API, fluxo de CRUD de livros, componentes (BookForm, BookList, SearchBar, Message), layout responsivo com estados visuais e README.",
          },
        ],
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
        create: [
          {
            startDate: new Date("2026-06-17"),
            endDate: new Date("2026-06-17"),
            note: "Ajuste de build/lint/testes, padronização de controllers e bootstrap da app, testes de sucesso e erro nas rotas, logging JSON estruturado, CORS, deploy na Vercel e README.",
          },
        ],
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
        create: [
          {
            startDate: new Date("2026-06-23"),
            endDate: new Date("2026-06-23"),
            note: "Scaffold React + TypeScript + Vite, tipos e serviço de API, mapeamento mês-Pokémon com hook usePokemon, componentes principais (Calendar, PokemonPanel, Sidebar, ProjectModal, ProjectForm, PeriodsEditor), state management/routing/estilos globais, TechBadge (mapeamento de cores, legenda de stacks) e README.",
          },
          {
            startDate: new Date("2026-06-25"),
            endDate: new Date("2026-06-25"),
            note: "Integração com a API via variáveis de ambiente e tipagem de ImportMetaEnv.",
          },
        ],
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
        create: [
          {
            startDate: new Date("2026-06-23"),
            endDate: new Date("2026-06-23"),
            note: "Setup da API com Fastify + TypeScript, schema inicial de projetos e períodos, seed de exemplo, CRUD de projetos e períodos, deploy na Vercel, README e gitignore.",
          },
          {
            startDate: new Date("2026-06-24"),
            endDate: new Date("2026-06-24"),
            note: "Atualização do seed com BookHub, Project Calendar e Portfolio usando histórico e status reais.",
          },
          {
            startDate: new Date("2026-06-25"),
            endDate: new Date("2026-06-25"),
            note: "Migração do datasource para PostgreSQL com schema Project/Period, adapter Neon e seed do Prisma com ts-node, handler serverless Fastify (index.ts) e ajustes de build/deps/roteamento na Vercel (postinstall com prisma generate).",
          },
        ],
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
            endDate: new Date("2026-06-18"),
            note: "Scaffold do frontend com React/TS/Vite, tipagens e serviços de consumo da API, interface com seções e listagem de projetos, tema Pokédex (claro/escuro), padronização de tipagens e README.",
          },
          {
            startDate: new Date("2026-06-19"),
            endDate: new Date("2026-06-19"),
            note: "Ajustes na seção de contato, refino de layout da página e logs de debug na busca de projetos.",
          },
          {
            startDate: new Date("2026-06-24"),
            endDate: new Date("2026-06-24"),
            note: "Link de destaque para o calendário no menu e normalização da montagem da URL base+path no fetch.",
          },
          {
            startDate: new Date("2026-06-25"),
            endDate: new Date("2026-06-25"),
            note: "Migração dos projetos para dados locais (remoção da integração com API) e atualização do README com estrutura e funcionalidades reais.",
          },
        ],
      },
    },
  });

  console.log("Seed concluído. 5 projetos cadastrados.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());