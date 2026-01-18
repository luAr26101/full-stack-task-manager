import { inject, injectable } from "inversify";
import { UserController } from "../user/user.controller.js";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) {}

  public handleGetTasks() {
    return [
      {
        title: "This is a title",
        description: "Task description",
      },
      {
        title: "This is a title 2",
        description: "Task description 2",
      },
    ];
  }

  public handlePostTasks() {
    console.log(this.userController.getUser());
    return {
      title: "This is a title",
      description: "Task description",
    };
  }

  public handlePatchTasks() {
    return {
      title: "This is an updated title",
      description: "Task description updated",
    };
  }
}
