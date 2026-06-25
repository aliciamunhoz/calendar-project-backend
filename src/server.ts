import Fastify from "fastify";
import cors from "@fastify/cors";
import { projectRoutes } from "./routes/projects";

const app = Fastify({ logger: true });

app.register(cors, { origin: /^http:\/\/localhost(:\d+)?$/ });
app.register(projectRoutes, { prefix: "/projects" });

const port = Number(process.env.PORT) || 3333;

app.listen({ port, host: "0.0.0.0" }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
