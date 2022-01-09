import express from "express";
import { createServer, Server } from "http";
import { checkEnv } from "./checkEnv";
import { registerMiddleware } from "./middlewares";
import { registerRoutes } from "./api/registerRoutes";

checkEnv();

try {
  const api: express.Application = express();
  registerMiddleware(api);
  registerRoutes(api);
  const server: Server = createServer(api);
  server.listen(process.env.API_PORT, () =>
    console.log("Server listening on Port: " + process.env.API_PORT)
  );
} catch (error) {
  console.log(error);
}
