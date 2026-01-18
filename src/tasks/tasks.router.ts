import type { Request, Response } from "express";
import { Router } from "express";
import { inject, injectable } from "inversify";
import { TasksController } from "./tasks.controller.js";

@injectable()
export class TasksRouter {
  public router: Router;

  constructor(
    @inject(TasksController) private tasksController: TasksController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", (req: Request, res: Response) => {
      const tasks = this.tasksController.handleGetTasks();
      res.json(tasks);
    });
    this.router.post("/create", (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePostTasks();
      res.json(newTask);
    });
    this.router.patch("/update", (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePatchTasks();
      res.json(newTask);
    });
  }
}
