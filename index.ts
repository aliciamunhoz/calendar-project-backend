import Fastify from "fastify";
import cors from "@fastify/cors";
import { projectRoutes } from "./src/routes/projects";

const app = Fastify({ logger: false });

app.register(cors, {
  origin: [
    "http://localhost:5173",
    /\.vercel\.app$/,
  ],
});

app.register(projectRoutes, { prefix: "/projects" });

export default async function handler(req: any, res: any) {
  await app.ready();
  app.server.emit("request", req, res);
}
