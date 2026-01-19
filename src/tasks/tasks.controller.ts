import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { Document } from "mongoose";
import { UserController } from "../user/user.controller.js";
import type { ITask } from "./task.interface.js";
import { Task } from "./task.schema.js";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) {}

  public async handleGetTasks(req: Request, res: Response) {
    const tasks = await Task.find();
    return tasks;
  }

  public async handlePostTasks(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> = new Task(req.body);
    await task.save();
    return task;
  }

  public handlePatchTasks() {
    return {
      title: "This is an updated title",
      description: "Task description updated",
    };
  }
}
