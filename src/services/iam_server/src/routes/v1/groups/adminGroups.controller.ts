import { Request, Response } from "express";
import {
  Controller,
  Get,
  AuthorizationDecorators,
  utils,
  errors,
  Post,
} from "@theunionsquare/mangojs-core";

import { IAMDefaultContainer } from "../../../inversify.config";

import { Types } from "@theunionsquare/mangojs-core";
import { GroupsService } from "../../../services/groups.service";
import type { api } from "../../../types";

// import adminGroupService
const groupsService = IAMDefaultContainer.get<GroupsService>(GroupsService, {
  autobind: true,
});

// import authorization decorators
const AuthDecorators = IAMDefaultContainer.get<AuthorizationDecorators>(
  AuthorizationDecorators,
  { autobind: true }
);

@Controller("/api/iam/v1/groups/admin")
export class AdminGroupController {
  /**
   * @swagger
   * /api/iam/v1/groups/admin:
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
  public async getAdminGroups(
    req: Request<undefined, api.v1.groups.admin.GET.RequestBody>,
    res: Response<api.v1.groups.admin.GET.ResponseBody>
  ): Promise<Response<api.v1.groups.admin.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const adminGroups = await groupsService.getGroups(
        Types.enums.AuthUserType.ADMIN,
        {}
      );
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: adminGroups,
      };
      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/groups/admin:
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
  public async addAdminGroups(
    req: Request<undefined, api.v1.groups.admin.POST.RequestBody>,
    res: Response<api.v1.groups.admin.POST.ResponseBody>
  ): Promise<Response<api.v1.groups.admin.POST.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const adminGroup = await groupsService.postGroup(
        Types.enums.AuthUserType.ADMIN,
        body
      );

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: adminGroup,
      };

      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }
}
