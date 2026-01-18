import { User } from "./user.js";

export class Post {
  constructor(public title: string, public content: string, user: User) {}
}
