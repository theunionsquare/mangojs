import { Request, Response } from "express";
import {
  Controller,
  Get,
  utils,
  AuthorizationDecorators,
  Post,
  Put,
  Delete,
  Decorators,
} from "@giusmento/mangojs-core";
import { IAMDefaultContainer } from "../../../inversify.config";
import { PartnerUserService } from "../../../services/partnerUser.service";
import { AuthorizationService } from "../../../services/authorizationService";
import { errors } from "@giusmento/mangojs-core";
import { api } from "../../../types";

// import adminUserService
const partnerUserService = IAMDefaultContainer.get<PartnerUserService>(
  PartnerUserService,
  { autobind: true }
);

// import authorization service
const authPartnerService = IAMDefaultContainer.get<AuthorizationService>(
  AuthorizationService,
  { autobind: true }
);

// import authorization decorators
const AuthDecorators = IAMDefaultContainer.get<AuthorizationDecorators>(
  AuthorizationDecorators,
  { autobind: true }
);

@Controller("/api/iam/v1/partners")
export class PartnerController {
  /**
   * @swagger
   * /api/iam/v1/partners/:
   *  get:
   *    summary: Get list of active partner users
   *    description: Return a list of active admin users
   *    tags:
   *      - Partners
   *    produces:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *    responses:
   *      200:
   *        description: An array containing admin users
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  id:
   *                    type: string
   *                    example: 12345
   *      401:
   *        description: Unauthorized
   *
   */
  @Get("/")
  //@Decorators.HasGroups(["PartnerAdmin"])
  public async getPartners(
    req: Request<undefined, api.v1.partners.GET.RequestBody>,
    res: Response<api.v1.partners.GET.ResponseBody>
  ): Promise<Response<api.v1.partners.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const partnerUsers = await partnerUserService.getPartnerUsers();

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: partnerUsers,
      } as api.v1.partners.GET.ResponseBody;

      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/:
   *  post:
   *    summary: Create new partner users
   *    description: Creates a new partner user
   *    tags:
   *      - Partners
   *    produces:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *    responses:
   *      200:
   *        description: The created admin user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  uid:
   *                    type: string
   *                    example: 12345
   *                  firstName:
   *                    type
   *      401:
   *        description: Unauthorized
   *
   */
  @Post("/")
  public async addAdminUser(
    req: Request<undefined, api.v1.partners.POST.RequestBody>,
    res: Response<api.v1.partners.POST.ResponseBody>
  ): Promise<Response<api.v1.partners.POST.ResponseBody>> {
    console.log("add Admin User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      console.log({ body }, "body");
      const response = await partnerUserService.postPartnerUser(body);
      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: response,
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }
}
