import { NextFunction, Response, Request } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "../error/http.error.class";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      {
        method: "post",
        path: "/register",
        func: this.register,
      },
      {
        method: "post",
        path: "/login",
        func: this.login,
      },
    ]);
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "unauthorized", "login"));
  }
}
