import type { Request, Response } from "express";
import { Router } from "express";
import { inject, injectable } from "inversify";
import type { ITask } from "./task.interface.js";
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
    this.router.get("/", async (req: Request, res: Response) => {
      const allTasks = await this.tasksController.handleGetTasks(req, res);
      res.json(allTasks);
    });
    this.router.post(
      "/create",
      async (req: Request<{}, {}, ITask>, res: Response) => {
        const newTask = await this.tasksController.handlePostTasks(req, res);
        res.json(newTask);
      }
    );
    this.router.patch("/update", (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePatchTasks();
      res.json(newTask);
    });
  }
}
