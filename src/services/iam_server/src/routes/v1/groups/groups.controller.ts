import { Request, Response } from "express";
import {
  Controller,
  Get,
  AuthorizationDecorators,
  utils,
  errors,
  Delete,
} from "@mangojs/core";

import { IAMDefaultContainer } from "../../../inversify.config";
import { GroupsService } from "../../../services/groups.service";
import type { APITYPE } from "../../../types";

// import adminGroupService
const groupsService = IAMDefaultContainer.get<GroupsService>(GroupsService, {
  autobind: true,
});

// import authorization decorators
const AuthDecorators = IAMDefaultContainer.get<AuthorizationDecorators>(
  AuthorizationDecorators,
  { autobind: true }
);

@Controller("/api/iam/v1/groups")
export class GroupsController {
  /**
   * @swagger
   * /api/iam/v1/groups/:
   *  get:
   *    summary: Get list of all groups
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
  public async getGroups(
    req: Request<undefined, APITYPE.V1.groups.GET.RequestBody>,
    res: Response<APITYPE.V1.groups.GET.ResponseBody>
  ): Promise<Response<APITYPE.V1.groups.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const filter = {};
      const groups = (await groupsService.getAllGroups(
        filter
      )) as Array<APITYPE.V1.groups.ResponseBodyData>;

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: groups,
      };
      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/groups:
   *  delete:
   *    summary: Delete a group
   *    description: Delete a group
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
  @Delete("/")
  @AuthDecorators.IsAuthorized()
  public async addAdminGroups(
    req: Request<undefined, APITYPE.V1.groups.DELETE.RequestBody>,
    res: Response<APITYPE.V1.groups.DELETE.ResponseBody>
  ): Promise<Response<APITYPE.V1.groups.DELETE.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const deleteGroup = await groupsService.deleteGroup(body.uid);

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: { ok: true },
      };
      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }
}
