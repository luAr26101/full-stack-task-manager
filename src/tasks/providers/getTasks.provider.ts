import { inject, injectable } from "inversify";
import type { ITaskPagination } from "../interfaces/taskPagination.interface.js";
import type { ITask } from "../task.interface.js";
import { TaskService } from "../tasks.service.js";

@injectable()
export class GetTasksProvider {
  constructor(@inject(TaskService) private tasksService: TaskService) {}

  public async findAllTasks(
    pagination: Partial<ITaskPagination>
  ): Promise<{ data: ITask[]; meta: {} }> {
    const tasks: ITask[] = await this.tasksService.findActive({
      limit: pagination.limit ?? 10,
      page: pagination.page ?? 1,
      order: pagination.order ?? "asc",
    });

    const totalTasks = await this.tasksService.countDocuments();
    const completedTasks = await this.tasksService.countDocuments({
      status: "completed",
    });

    const todoTasks = await this.tasksService.countDocuments({
      status: "todo",
    });
    const inProgressTasks = await this.tasksService.countDocuments({
      status: "inProgress",
    });

    return {
      data: tasks,
      meta: { totalTasks, completedTasks, todoTasks, inProgressTasks },
    };
  }
}
