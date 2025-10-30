import dotenv from "dotenv";
import { Request, Response } from "express";
import {
  Controller,
  Get,
  AuthorizationDecorators,
  utils,
  errors,
  Post,
} from "@giusmento/mangojs-core";

import { IAMDefaultContainer } from "../../../inversify.config";

import { Types } from "@giusmento/mangojs-core";
import { GroupsService } from "../../../services/groups.service";

import type { api } from "../../../types";
import { PartnerUser } from "../../../types/entities/partnerUser.type";

dotenv.config();

// import adminGroupService
const groupsService = IAMDefaultContainer.get<GroupsService>(GroupsService, {
  autobind: true,
});

// import authorization decorators
const AuthDecorators = IAMDefaultContainer.get<AuthorizationDecorators>(
  AuthorizationDecorators,
  { autobind: true }
);

@Controller("/api/iam/v1/groups/partner")
export class PartnerGroupController {
  /**
   * @swagger
   * /api/iam/v1/groups/partner:
   *  get:
   *    summary: Get list of admin Group
   *    description: Return a list of groups for admin users
   *    tags:
   *      - Groups
   *    produces:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *    responses:
   *      200:
   *        description: An array containing admin groups
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
  @AuthDecorators.IsAuthorized()
  public async getPartnerGroups(
    req: Request<undefined, api.v1.groups.admin.GET.RequestBody>,
    res: Response<api.v1.groups.admin.GET.ResponseBody>
  ): Promise<Response<api.v1.groups.admin.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const partnerGroups = await groupsService.getGroups(
        Types.enums.AuthUserType.PARTNER,
        {}
      );
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: partnerGroups,
      };
      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/groups/partner:
   *  post:
   *    summary: Create a group foro user admin
   *    description: the created group
   *    tags:
   *      - Groups
   *    produces:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *    responses:
   *      200:
   *        description: An array containing admin groups
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
  @Post("/")
  @AuthDecorators.IsAuthorized()
  public async addPartnerGroup(
    req: Request<undefined, api.v1.groups.partner.POST.RequestBody>,
    res: Response<api.v1.groups.partner.POST.ResponseBody>
  ): Promise<Response<api.v1.groups.partner.POST.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const adminUsers = await groupsService.postGroup(
        Types.enums.AuthUserType.PARTNER,
        body
      );

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: adminUsers,
      };
      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }
}
