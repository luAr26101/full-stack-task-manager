import "reflect-metadata";
import "./env.js";

import type { CorsOptions } from "cors";
import cors from "cors";
import type { Express, Request, Response } from "express";
import express from "express";
import mongoose from "mongoose";
import { addRoutes } from "./src/config/routes.config.js";
import { responseFormatter } from "./src/middleware/responseFormatter.middleware.js";

const app: Express = express();
const port = process.env.PORT;

let corsOptions: CorsOptions = {
  origin: "http://example.com",
};

app.use(cors()); // don't leave it like this in production
app.use(express.json());
app.use(responseFormatter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express application");
});

// Routes
addRoutes(app);

async function bootstrap() {
  if (!process.env.DATABASE_URL || !process.env.DATABASE_NAME) {
    throw new Error("Cannot read environment variables.");
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("BOOTSTRAP ERROR:");
    console.error(error instanceof Error ? error.message : error);
    console.error(error instanceof Error ? error.stack : "");
    process.exit(1);
  }
}

bootstrap();
