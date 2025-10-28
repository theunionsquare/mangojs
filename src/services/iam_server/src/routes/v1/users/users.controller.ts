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
import dotenv from "dotenv";
import { IAMDefaultContainer } from "../../../inversify.config";
import { AuthorizationService } from "../../../services/authorizationService";
import { errors } from "@giusmento/mangojs-core";
import type { Types as coreTypes } from "@giusmento/mangojs-core";
import type { types as iamTypes } from "../../../../";
import { UserService } from "../../../services/user.service";

dotenv.config();

// import userService
const userService = IAMDefaultContainer.get<UserService>(UserService);

// import authorization service
const authService =
  IAMDefaultContainer.get<AuthorizationService>(AuthorizationService);

// import authorization decorators
const AuthDecorators = IAMDefaultContainer.get<AuthorizationDecorators>(
  AuthorizationDecorators
);

@Controller("/api/iam/v1/users")
export class UserController {
  /**
   * @swagger
   * /api/iam/v1/users/:
   *  get:
   *    summary: Get list of active users
   *    description: Return a list of active users
   *    tags:
   *      - Users
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
  public async getUsers(
    req: Request,
    res: Response<coreTypes.apiResponses.Success<Array<iamTypes.entities.User>>>
  ): Promise<
    Response<coreTypes.apiResponses.Success<Array<iamTypes.entities.User>>>
  > {
    const logRequest = new utils.LogRequest(res);
    try {
      const users: Array<iamTypes.entities.User> =
        (await userService.getUsers()) as Array<iamTypes.entities.User>;

      const apiResponse: coreTypes.apiResponses.Success<
        Array<iamTypes.entities.User>
      > = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: users,
      };
      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/users/:
   *  post:
   *    summary: Create new users
   *    description: Creates a new user
   *    tags:
   *      - Users
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
  public async addUser(
    req: coreTypes.v1.api.request.Request<
      any,
      iamTypes.api.v1.users.POST.RequestBody
    >,
    res: Response<iamTypes.api.v1.users.POST.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.POST.ResponseBody>> {
    console.log("add User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      console.log({ body }, "body");
      const response = (await userService.postUser(
        body
      )) as iamTypes.api.v1.users.ResponseBodyData;
      // prepare response
      const apiResponse: iamTypes.api.v1.users.POST.ResponseBody = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: response,
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      console.log(error, "error");
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/users/magiclinks/{magiclink}:
   *  get:
   *    summary: Get User by his magic link
   *    description: Return a list of active users
   *    tags:
   *      - Users
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
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.adminUser.magiclinks.GET.Params,
      iamTypes.api.v1.adminUser.magiclinks.GET.RequestBody
    >,
    res: Response<iamTypes.api.v1.users.magiclinks.GET.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.magiclinks.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const user = (await userService.getUserByMagicLink(
        req.params
      )) as iamTypes.api.v1.users.magiclinks.ResponseBodyData;

      if (!user) {
        throw new errors.APIError(
          404,
          "USER_MAGIC_LINK_NOT_FOUND",
          "Magic link not found"
        );
      }
      const apiResponse: iamTypes.api.v1.users.magiclinks.GET.ResponseBody = {
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
   * /api/iam/v1/users/activate/{magiclink}:
   *  get:
   *    summary: Activate User
   *    description: Activate users
   *    tags:
   *      - Users
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
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.adminUser.activate.POST.Params,
      iamTypes.api.v1.adminUser.activate.POST.RequestBody
    >,
    res: Response<iamTypes.api.v1.adminUser.activate.POST.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.adminUser.activate.POST.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      req.requestTime;
      const user = (await userService.activateUser(
        req.params,
        req.body
      )) as iamTypes.api.v1.users.activate.ResponseBodyData;

      const apiResponse: iamTypes.api.v1.users.activate.POST.ResponseBody = {
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
   * /api/iam/v1/users/{uid}:
   *  post:
   *    summary: Update users
   *    description: Update  user
   *    tags:
   *      - Users
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
  public async updateUser(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.users.PUT.Params,
      iamTypes.api.v1.users.PUT.RequestBody
    >,
    res: Response<iamTypes.api.v1.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.PUT.ResponseBody>> {
    console.log("add User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const params = req.params;
      console.log({ body }, "body");
      const response = (await userService.updateUser(
        params,
        body
      )) as iamTypes.api.v1.users.ResponseBodyData;
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
   * /api/iam/v1/users/{uid}:
   *  post:
   *    summary: Add one or more group to a user
   *    description: Add one or more group to a user
   *    tags:
   *      - Users
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
  public async updateGroupsToUser(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.users.groups.POST.Params,
      iamTypes.api.v1.users.groups.POST.RequestBody
    >,
    res: Response<iamTypes.api.v1.users.groups.POST.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.groups.POST.ResponseBody>> {
    console.log("add User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const params = req.params;
      console.log({ body }, "body");
      const response = (await userService.updateGroupsToUser(
        params,
        body
      )) as iamTypes.api.v1.users.ResponseBodyData;
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
   * /api/iam/v1/users/{uid}/disable:
   *  post:
   *    summary: Disable users
   *    description: Disable  user
   *    tags:
   *      - Users
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
  public async disableUser(
    req: coreTypes.v1.api.request.Request<iamTypes.api.v1.users.PUT.Params, {}>,
    res: Response<iamTypes.api.v1.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.PUT.ResponseBody>> {
    console.log("add User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      const response = (await userService.disableUser(
        params
      )) as iamTypes.api.v1.users.ResponseBodyData;
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
   * /api/iam/v1/users/{uid}/enable:
   *  post:
   *    summary: Enable users
   *    description: Enable user
   *    tags:
   *      - Users
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
  public async enableUser(
    req: coreTypes.v1.api.request.Request<iamTypes.api.v1.users.PUT.Params, {}>,
    res: Response<iamTypes.api.v1.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.PUT.ResponseBody>> {
    console.log("add User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      const response = (await userService.enableUser(
        params
      )) as iamTypes.api.v1.users.ResponseBodyData;
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
   * /api/iam/v1/users/{uid}/delete/hard:
   *  delete:
   *    summary: Hard delete users
   *    description: Hard delete user
   *    tags:
   *      - Users
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
  public async hardDeleteUser(
    req: coreTypes.v1.api.request.Request<iamTypes.api.v1.users.PUT.Params, {}>,
    res: Response<iamTypes.api.v1.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.PUT.ResponseBody>> {
    console.log("hard delete User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      const response = (await userService.hardDeleteUser(
        params
      )) as iamTypes.api.v1.users.ResponseBodyData;
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
