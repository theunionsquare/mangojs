import dotenv from "dotenv";
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
import { PartnerUser } from "../../../types/entities/partnerUser.type";
import { ResponseBodyData } from "../../../types/api/v1/users";

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

@Controller("/api/iam/v1/groups/user")
export class UserGroupController {
  /**
   * @swagger
   * /api/iam/v1/groups/user:
   *  get:
   *    summary: Get list of user Group
   *    description: Return a list of groups for user users
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
  public async getUserGroups(
    req: Request<undefined, api.v1.groups.user.GET.RequestBody>,
    res: Response<api.v1.groups.user.GET.ResponseBody>
  ): Promise<Response<api.v1.groups.user.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const userGroups = await groupsService.getGroups(
        Types.enums.AuthUserType.USER,
        {}
      );

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: userGroups,
      };
      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/groups/user:
   *  post:
   *    summary: Create a group for user
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
  public async addUserGroup(
    req: Request<undefined, api.v1.groups.user.POST.RequestBody>,
    res: Response<api.v1.groups.user.POST.ResponseBody>
  ): Promise<Response<api.v1.groups.user.POST.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const userGroups = await groupsService.postGroup(
        Types.enums.AuthUserType.USER,
        body
      );

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: userGroups,
      };
      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }
}
