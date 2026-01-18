import type { Application } from "express";
import { TasksRouter } from "../tasks/tasks.router.js";
import { container } from "./container.js";

export function addRoutes(app: Application): Application {
  const tasksRouter = container.get<TasksRouter>(TasksRouter);
  app.use("/tasks", tasksRouter.router);

  return app;
}
