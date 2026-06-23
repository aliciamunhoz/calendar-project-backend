# Project Calendar API

API backend para gerenciamento de projetos e periodos de desenvolvimento, feita com Fastify, Prisma e SQLite.

## Objetivo

Registrar projetos pessoais com:
- dados principais (titulo, descricao, status, stack, links)
- periodos de trabalho (inicio, fim e observacoes)

## Stack

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- SQLite
- Zod

## Estrutura

- src/server.ts: inicializacao do servidor e registro de rotas
- src/routes/projects.ts: CRUD de projetos e periodos
- prisma/schema.prisma: modelo de dados
- prisma/seed.ts: dados iniciais para desenvolvimento
- vercel.json: configuracao de deploy na Vercel

## Requisitos

- Node.js 20+
- npm 10+

## Configuracao local

1. Instale as dependencias:

~~~bash
npm install
~~~

2. Crie o arquivo .env (se necessario) com:

~~~env
DATABASE_URL="file:./dev.db"
PORT=3333
~~~

3. Rode as migrations:

~~~bash
npm run db:migrate
~~~

4. (Opcional) Popule o banco com seed:

~~~bash
npm run db:seed
~~~

5. Suba o servidor em modo desenvolvimento:

~~~bash
npm run dev
~~~

API disponivel em:

~~~text
http://localhost:3333
~~~

## Scripts

- npm run dev: inicia com hot reload via tsx
- npm run build: compila TypeScript para dist
- npm run start: executa build em producao
- npm run db:migrate: executa migration de desenvolvimento
- npm run db:studio: abre Prisma Studio
- npm run db:seed: executa seed de dados

## Endpoints principais

Base path: /projects

- GET /projects
- GET /projects/:id
- POST /projects
- PUT /projects/:id
- DELETE /projects/:id
- POST /projects/:id/periods
- PUT /projects/:id/periods/:periodId
- DELETE /projects/:id/periods/:periodId

## Exemplo de payload para criar projeto

~~~json
{
  "title": "Project Calendar",
  "description": "Calendario full-stack para registrar projetos",
  "status": "in_progress",
  "tech": ["React", "TypeScript", "Fastify", "Prisma"],
  "url": "https://meusite.com",
  "repoUrl": "https://github.com/user/repo",
  "color": "#6366f1",
  "periods": [
    {
      "startDate": "2026-06-01T00:00:00.000Z",
      "endDate": "2026-06-23T00:00:00.000Z",
      "note": "Primeira versao"
    }
  ]
}
~~~

## Status aceitos

- planning
- in_progress
- completed
- paused

## Observacoes

- O campo tech e armazenado como JSON em string no banco e serializado na resposta da API.
- O arquivo .env esta no .gitignore e nao deve ser versionado.
- Se for publicar em producao, prefira banco gerenciado em vez de SQLite local.
