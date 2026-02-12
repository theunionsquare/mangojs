import { Request, Response } from "express";
import {
  Controller,
  Get,
  utils,
  AuthorizationDecorators,
  Post,
  Put,
  Delete,
} from "@theunionsquare/mangojs-core";
import dotenv from "dotenv";
import { IAMDefaultContainer } from "../../../inversify.config";
import { AdminUserService } from "../../../services/adminUser.service";
import { errors } from "@theunionsquare/mangojs-core";
import { AdminUser } from "../../../types/entities/adminUser.type";
import { api } from "../../../types";

import type { Types } from "@theunionsquare/mangojs-core";
import type { types as iamTypes } from "../../../../";

dotenv.config();

// import adminUserService
const adminUserService =
  IAMDefaultContainer.get<AdminUserService>(AdminUserService);

// import authorization decorators
const AuthDecorators = IAMDefaultContainer.get<AuthorizationDecorators>(
  AuthorizationDecorators
);

@Controller("/api/iam/v1/admins")
export class AdminController {
  /**
   * @swagger
   * /api/iam/v1/admins/:
   *  get:
   *    summary: Get list of active admin users
   *    description: Return a list of active admin users
   *    tags:
   *      - Admins
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
  @AuthDecorators.IsAuthorized()
  //@Decorators.HasGroups(["Admin"])
  public async getAdmins(
    req: Request,
    res: Response<Types.apiResponses.Success<Array<AdminUser>>>
  ): Promise<Response<Types.apiResponses.Success<Array<AdminUser>>>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const adminUsers: Array<AdminUser> =
        (await adminUserService.getAdminUsers()) as Array<AdminUser>;

      const apiResponse: Types.apiResponses.Success<Array<AdminUser>> = {
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

  /**
   * @swagger
   * /api/iam/v1/admins/magiclinks/{magiclink}:
   *  get:
   *    summary: Get Admin user by his magic link
   *    description: Return a list of active admin users
   *    tags:
   *      - Admins
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
  public async getAdminBymagicLink(
    req: Types.v1.api.request.Request<
      api.v1.adminUser.magiclinks.GET.Params,
      api.v1.adminUser.magiclinks.GET.RequestBody
    >,
    res: Response<api.v1.adminUser.magiclinks.GET.ResponseBody>
  ): Promise<Response<api.v1.adminUser.magiclinks.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const magiclink = req.params.magiclink;
      const adminUser = await adminUserService.getAdminUserByMagicLink(
        magiclink
      );
      const adminUserData: api.v1.adminUser.ResponseBodyData = {
        uid: adminUser.uid,
        email: adminUser.email,
        age: adminUser.age,
        phoneNumber: adminUser.phoneNumber,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        status: adminUser.status,
        isActive: adminUser.isActive,
        isVerified: adminUser.isVerified,
        magicLink: adminUser.magicLink,
        magicLinkExpireDate: adminUser.magicLinkExpireDate,
        disabledAt: adminUser.disabledAt,
        createdAt: adminUser.createdAt,
        updatedAt: adminUser.updatedAt,
        verifiedAt: adminUser.verifiedAt,
        groups: adminUser.groups,
      };
      const apiResponse: api.v1.adminUser.magiclinks.GET.ResponseBody = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: adminUserData,
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/admins/activate/{magiclink}:
   *  get:
   *    summary: Activate Admin user
   *    description: Activate admin users
   *    tags:
   *      - Admins
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
  public async activateAdminBymagicLink(
    req: Types.v1.api.request.Request<
      api.v1.adminUser.activate.POST.Params,
      api.v1.adminUser.activate.POST.RequestBody
    >,
    res: Response<api.v1.adminUser.activate.POST.ResponseBody>
  ): Promise<Response<api.v1.adminUser.activate.POST.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      req.requestTime;
      const magiclink = req.params.magiclink;
      const adminUser = (await adminUserService.activateAdminUser(
        magiclink,
        req.body
      )) as api.v1.adminUser.activate.ResponseBodyData;

      const adminUserData: api.v1.adminUser.ResponseBodyData = {
        uid: adminUser.uid,
        email: adminUser.email,
        age: adminUser.age,
        phoneNumber: adminUser.phoneNumber,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        status: adminUser.status,
        isActive: adminUser.isActive,
        isVerified: adminUser.isVerified,
        magicLink: adminUser.magicLink,
        magicLinkExpireDate: adminUser.magicLinkExpireDate,
        disabledAt: adminUser.disabledAt,
        createdAt: adminUser.createdAt,
        updatedAt: adminUser.updatedAt,
        verifiedAt: adminUser.verifiedAt,
        groups: adminUser.groups,
      };

      const apiResponse: api.v1.adminUser.activate.POST.ResponseBody = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: adminUserData,
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/admins/:
   *  post:
   *    summary: Create new admin users
   *    description: Creates a new admin user
   *    tags:
   *      - Admins
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
    req: Types.v1.api.request.Request<any, api.v1.adminUser.POST.RequestBody>,
    res: Response<api.v1.adminUser.POST.ResponseBody>
  ): Promise<Response<api.v1.adminUser.POST.ResponseBody>> {
    console.log("add Admin User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      console.log({ body }, "body");

      const adminUser: iamTypes.entities.adminUser.AdminUserPost = {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
      };
      const response = await adminUserService.postAdminUser(adminUser);
      // prepare response
      const adminUserData: api.v1.adminUser.ResponseBodyData = {
        uid: response.uid,
        email: response.email,
        age: response.age,
        phoneNumber: response.phoneNumber,
        firstName: response.firstName,
        lastName: response.lastName,
        status: response.status,
        isActive: response.isActive,
        isVerified: response.isVerified,
        magicLink: response.magicLink,
        magicLinkExpireDate: response.magicLinkExpireDate,
        disabledAt: response.disabledAt,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        verifiedAt: response.verifiedAt,
        groups: response.groups,
      };

      const apiResponse: api.v1.adminUser.POST.ResponseBody = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: adminUserData,
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      console.log(error, "error");
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/admins/{uid}:
   *  post:
   *    summary: Update admin users
   *    description: Update  admin user
   *    tags:
   *      - Admins
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
  public async updateAdminUser(
    req: Types.v1.api.request.Request<
      api.v1.adminUser.PUT.Params,
      api.v1.adminUser.PUT.RequestBody
    >,
    res: Response<api.v1.adminUser.PUT.ResponseBody>
  ): Promise<Response<api.v1.adminUser.PUT.ResponseBody>> {
    console.log("add Admin User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const params = req.params;
      console.log({ body }, "body");
      const uid = params.uid;
      const updateData = {
        firstName: body.firstName,
        lastName: body.lastName,
      };
      // call service to update admin user
      const response = (await adminUserService.updateAdminUser(
        uid,
        updateData
      )) as api.v1.adminUser.ResponseBodyData;
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
   * /api/iam/v1/admins/{uid}:
   *  post:
   *    summary: Add one or more group to a user
   *    description: Add one or more group to a user
   *    tags:
   *      - Admins
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
  public async updateGroupsToAdminUser(
    req: Types.v1.api.request.Request<
      api.v1.adminUser.groups.POST.Params,
      api.v1.adminUser.groups.POST.RequestBody
    >,
    res: Response<api.v1.adminUser.groups.POST.ResponseBody>
  ): Promise<Response<api.v1.adminUser.groups.POST.ResponseBody>> {
    console.log("add Admin User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const params = req.params;
      console.log({ body }, "body");
      // uid from params
      const uid = params.uid;
      const response = (await adminUserService.updateGroupsToAdminUser(
        uid,
        body
      )) as api.v1.adminUser.ResponseBodyData;
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
   * /api/iam/v1/admins/{uid}/disable:
   *  post:
   *    summary: Disable admin users
   *    description: Disable  admin user
   *    tags:
   *      - Admins
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
  @Post("/:uid/disable")
  public async disableAdminUser(
    req: Types.v1.api.request.Request<api.v1.adminUser.PUT.Params, {}>,
    res: Response<api.v1.adminUser.PUT.ResponseBody>
  ): Promise<Response<api.v1.adminUser.PUT.ResponseBody>> {
    console.log("add Admin User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      // uid from params
      const uid = params.uid;
      const response = (await adminUserService.disableAdminUser(
        uid
      )) as api.v1.adminUser.ResponseBodyData;
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
   * /api/iam/v1/admins/{uid}/enable:
   *  post:
   *    summary: Enable admin users
   *    description: Disable  admin user
   *    tags:
   *      - Admins
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
  public async enableAdminUser(
    req: Types.v1.api.request.Request<api.v1.adminUser.PUT.Params, {}>,
    res: Response<api.v1.adminUser.PUT.ResponseBody>
  ): Promise<Response<api.v1.adminUser.PUT.ResponseBody>> {
    console.log("add Admin User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      // uid from params
      const uid = params.uid;
      const response = (await adminUserService.enableAdminUser(
        uid
      )) as api.v1.adminUser.ResponseBodyData;
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
   * /api/iam/v1/admins/{uid}/enable:
   *  post:
   *    summary: Enable admin users
   *    description: Disable  admin user
   *    tags:
   *      - Admins
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
  @Delete("/:uid/delete/hard")
  public async hardAdminUser(
    req: Types.v1.api.request.Request<api.v1.adminUser.PUT.Params, {}>,
    res: Response<api.v1.adminUser.PUT.ResponseBody>
  ): Promise<Response<api.v1.adminUser.PUT.ResponseBody>> {
    console.log("add Admin User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      // uid from params
      const uid = params.uid;
      const response = (await adminUserService.hardDeleteAdminUser(
        uid
      )) as api.v1.adminUser.ResponseBodyData;
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
