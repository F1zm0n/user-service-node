import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ExeptionFilter } from "./error/exeption.filter";

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  UserController: UserController;
  exeptionFilter: ExeptionFilter;

  constructor(
    logger: LoggerService,
    userRoutes: UserController,
    exeptionFilter: ExeptionFilter,
  ) {
    this.app = express();
    this.port = 8080;
    this.logger = logger;
    this.UserController = userRoutes;
    this.exeptionFilter = exeptionFilter;
  }

  useRouter() {
    this.app.use("/users", this.UserController.router);
  }

  UseExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRouter();
    this.UseExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на порте ${this.port}`);
  }
}
