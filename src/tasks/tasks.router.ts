import type { Request, Response } from "express";
import { Router } from "express";
import { inject, injectable } from "inversify";
import type { IPartialTaskWithId, ITask } from "./task.interface.js";
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
    this.router.patch(
      "/update",
      async (req: Request<{}, {}, IPartialTaskWithId>, res: Response) => {
        const updatedTask = await this.tasksController.handlePatchTasks(
          req,
          res
        );
        res.json(updatedTask);
      }
    );
  }
}

// Build cool stuff with react: https://www.youtube.com/watch?v=S2It1iMIT0U
