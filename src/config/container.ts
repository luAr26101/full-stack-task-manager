import { Container } from "inversify";
import { Page } from "../page.js";
import { User } from "../user.js";

export const container: Container = new Container();

container.bind(User).toSelf().inSingletonScope(); // example don't do it in production
container.bind(Page).toSelf().inTransientScope();
