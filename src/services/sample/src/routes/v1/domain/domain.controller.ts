import { Request, Response } from "express";
import {
  Controller,
  Get,
  loggedMethod,
  Decorators,
  Types,
} from "@theunionsquare/mangojs-core";
import { serviceContainer } from "../../../inversify.config";
import { DomainService } from "../../../service/domain.service";

// import adminUserService
const domainService = serviceContainer.get<DomainService>(DomainService);

@Controller("/api/v1/domain")
export class DomainController {
  /**
   * @swagger
   * /api/v1/domain:
   *  get:
   *    summary: Get Doamin endpoint
   *    description: return a 200 status when server is up and running
   *    tags:
   *      - health
   *    produces:
   *      - application/json
   *    response:
   *      200:
   *        ok: true
   */
  @Get("/")
  @loggedMethod()
  @Decorators.auth.HasUserType([Types.enums.AuthUserType.ADMIN])
  public getStatus(req: Request, res: Response): Response {
    domainService.getDomains({});
    return res.status(200).json({ ok: true });
  }
}
