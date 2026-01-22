import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { inject, injectable } from "inversify";
import { Document } from "mongoose";
import { UserController } from "../user/user.controller.js";
import type { ITaskPagination } from "./interfaces/taskPagination.interface.js";
import { GetTasksProvider } from "./providers/getTasks.provider.js";
import { UpdateTaskProvider } from "./providers/updateTask.provider.js";
import type { IPartialTaskWithId, ITask } from "./task.interface.js";
import { TaskService } from "./tasks.service.js";

@injectable()
export class TasksController {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject(TaskService) private taskService: TaskService,
    @inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider,
    @inject(GetTasksProvider) private getTasksProvider: GetTasksProvider
  ) {}

  public async handleGetTasks(req: Request, res: Response) {
    const validatedData: Partial<ITaskPagination> = matchedData(req);
    try {
      const tasks: { data: ITask[]; meta: {} } =
        await this.getTasksProvider.findAllTasks(validatedData);
      return tasks;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async handlePostTasks(req: Request<{}, {}, ITask>, res: Response) {
    const validatedData: ITask = matchedData(req);
    try {
      return await this.taskService.createTask(validatedData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async handlePatchTasks(
    req: Request<{}, {}, IPartialTaskWithId>,
    res: Response
  ): Promise<Document> {
    const validatedData: IPartialTaskWithId = matchedData(req);
    try {
      return await this.updateTaskProvider.updateTask(validatedData);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
