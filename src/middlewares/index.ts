import cors from "cors";
import helmet from "helmet";
import express from "express";
import RateLimit from "express-rate-limit";
import errorHandler from "./errorHandler";
import morgan from "morgan";

export function registerMiddleware(router: express.Application): void {
  router.use(helmet());
  router.use(cors({ origin: process.env.API_ALLOWED_HOST }));

  const rateLimitResponse = { error: true, message: "rate limite reached" };
  const rateLimit = RateLimit({
    windowMs: 5 * 60 * 100,
    max: 20,
    message: JSON.stringify(rateLimitResponse),
  });
  router.use(errorHandler);
  router.use(rateLimit);
  router.use(morgan("short")); // Logging
  router.use(express.json()); // This is for eg the body parser to use json
  router.use(errorHandler);
  router.set("json spaces", 2); // This is for pretty_print
}
