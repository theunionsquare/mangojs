import { Request, Response } from "express";
import {
  Controller,
  Get,
  utils,
  AuthorizationDecorators,
  Post,
  Put,
  Delete,
} from "@giusmento/mangojs-core";
import { IAMDefaultContainer } from "../../../inversify.config";
import { PartnerUserService } from "../../../services/partnerUser.service";
import { errors } from "@giusmento/mangojs-core";
import { api } from "../../../types";

import type { Types as coreTypes } from "@giusmento/mangojs-core";
import type { types as iamTypes } from "../../../../";

// import adminUserService
const partnerUserService = IAMDefaultContainer.get<PartnerUserService>(
  PartnerUserService,
  { autobind: true }
);

// import authorization decorators
const AuthDecorators = IAMDefaultContainer.get<AuthorizationDecorators>(
  AuthorizationDecorators,
  { autobind: true }
);

@Controller("/api/iam/v1/partners/users")
export class PartnerUserController {
  /**
   * @swagger
   * /api/iam/v1/partners/users:
   *  get:
   *    summary: Get list of active partner users
   *    description: Return a list of active partner users
   *    tags:
   *      - Partners, Users
   *    produces:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *    responses:
   *      200:
   *        description: An array containing partner users
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
  public async getPartners(
    req: Request<undefined, api.v1.partners.GET.RequestBody>,
    res: Response<api.v1.partners.GET.ResponseBody>
  ): Promise<Response<api.v1.partners.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const partnerUsers = await partnerUserService.getAll();

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
   * /api/iam/v1/partners/users:
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
   *        description: The created partner user
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
  public async addPartnerUser(
    req: Request<undefined, api.v1.partners.users.POST.RequestBody>,
    res: Response<api.v1.partners.users.POST.ResponseBody>
  ): Promise<Response<api.v1.partners.users.POST.ResponseBody>> {
    console.log("add Partner User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      console.log({ body }, "body");
      const response = await partnerUserService.post(body);
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

  /**
   * @swagger
   * /api/iam/v1/partners/users/magiclinks/{magiclink}:
   *  get:
   *    summary: Get Partner User by his magic link
   *    description: Return a list of active partner users
   *    tags:
   *      - Partners.Users
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
  @Get("/magiclinks/:magiclink")
  @AuthDecorators.IsAuthorized()
  public async getPartnerUserBymagicLink(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.users.magiclinks.GET.Params,
      iamTypes.api.v1.partners.users.magiclinks.GET.RequestBody
    >,
    res: Response<iamTypes.api.v1.partners.users.magiclinks.GET.ResponseBody>
  ): Promise<
    Response<iamTypes.api.v1.partners.users.magiclinks.GET.ResponseBody>
  > {
    const logRequest = new utils.LogRequest(res);
    try {
      const user = (await partnerUserService.getByMagicLink(
        req.params
      )) as iamTypes.api.v1.partners.users.magiclinks.ResponseBodyData;

      const apiResponse: iamTypes.api.v1.partners.users.magiclinks.GET.ResponseBody =
        {
          ok: true,
          timestamp: logRequest.timestamp,
          requestId: logRequest.requestId,
          data: user,
        };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/users/activate/{magiclink}:
   *  post:
   *    summary: Activate Partner users
   *    description: Activate partner users
   *    tags:
   *      - Partners.Users
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
  @Post("/activate/:magiclink")
  public async activatePartnerUserBymagicLink(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.users.activate.POST.Params,
      iamTypes.api.v1.partners.users.activate.POST.RequestBody
    >,
    res: Response<iamTypes.api.v1.partners.users.activate.POST.ResponseBody>
  ): Promise<
    Response<iamTypes.api.v1.partners.users.activate.POST.ResponseBody>
  > {
    const logRequest = new utils.LogRequest(res);
    try {
      req.requestTime;
      const user = (await partnerUserService.activate(
        req.params,
        req.body
      )) as iamTypes.api.v1.partners.users.activate.ResponseBodyData;

      const apiResponse: iamTypes.api.v1.partners.users.activate.POST.ResponseBody =
        {
          ok: true,
          timestamp: logRequest.timestamp,
          requestId: logRequest.requestId,
          data: user,
        };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/users/{uid}:
   *  put:
   *    summary: Update partner users
   *    description: Update partner user
   *    tags:
   *      - Partners.Users
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
  @Put("/:uid")
  public async updatePartnerUser(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.users.PUT.Params,
      iamTypes.api.v1.partners.users.PUT.RequestBody
    >,
    res: Response<iamTypes.api.v1.partners.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.users.PUT.ResponseBody>> {
    console.log("update Partner User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const params = req.params;
      console.log({ body }, "body");
      const response = (await partnerUserService.update(
        params,
        body
      )) as iamTypes.api.v1.partners.users.ResponseBodyData;
      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: { ok: true },
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/users/{uid}/groups:
   *  put:
   *    summary: Add one or more group to a partner user
   *    description: Add one or more group to a partner user
   *    tags:
   *      - Partners.Users
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
  @Put("/:uid/groups")
  public async updateGroupsToPartnerUser(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.users.groups.POST.Params,
      iamTypes.api.v1.partners.users.groups.POST.RequestBody
    >,
    res: Response<iamTypes.api.v1.partners.users.groups.POST.ResponseBody>
  ): Promise<
    Response<iamTypes.api.v1.partners.users.groups.POST.ResponseBody>
  > {
    console.log("update groups for Partner User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const params = req.params;
      console.log({ body }, "body");
      const response = (await partnerUserService.updateGroups(
        params,
        body
      )) as iamTypes.api.v1.partners.users.ResponseBodyData;
      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: { ok: true },
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/users/{uid}/disable:
   *  post:
   *    summary: Disable partner users
   *    description: Disable partner user
   *    tags:
   *      - Partners.Users
   *    produces:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *    responses:
   *      200:
   *        description: Disabled user
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
  @Post("/:uid/disable")
  public async disablePartnerUser(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.users.PUT.Params,
      {}
    >,
    res: Response<iamTypes.api.v1.partners.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.users.PUT.ResponseBody>> {
    console.log("disable Partner User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      const response = (await partnerUserService.disable(
        params
      )) as iamTypes.api.v1.partners.users.ResponseBodyData;
      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: { ok: true },
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/users/{uid}/enable:
   *  post:
   *    summary: Enable partner users
   *    description: Enable partner user
   *    tags:
   *      - Partners.Users
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
  @Post("/:uid/enable")
  public async enablePartnerUser(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.users.PUT.Params,
      {}
    >,
    res: Response<iamTypes.api.v1.partners.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.users.PUT.ResponseBody>> {
    console.log("enable Partner User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      const response = (await partnerUserService.enable(
        params
      )) as iamTypes.api.v1.partners.users.ResponseBodyData;
      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: { ok: true },
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/users/{uid}/delete/hard:
   *  delete:
   *    summary: Hard delete partner users
   *    description: Hard delete partner user
   *    tags:
   *      - Partners.Users
   *    produces:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *    responses:
   *      200:
   *        description: The user deletion confirmation
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
  @Delete("/:uid/delete/hard")
  public async hardDeletePartnerUser(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.users.PUT.Params,
      {}
    >,
    res: Response<iamTypes.api.v1.partners.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.users.PUT.ResponseBody>> {
    console.log("hard delete Partner User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      const response = (await partnerUserService.hardDelete(
        params
      )) as iamTypes.api.v1.partners.users.ResponseBodyData;
      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: { ok: true },
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }
}
