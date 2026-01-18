import "reflect-metadata";

import type { Express, Request, Response } from "express";
import express from "express";
import { Page } from "./src/page.js";

import { container } from "./src/config/container.js";

const app: Express = express();

const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express application");
});

const pageClass = container.get<Page>(Page);

app.post("/create-page", (req: Request, res: Response) => {
  let page = pageClass.createPage("http://mypage.com");
  res.json(page);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
