import { Request, Response } from "express";
import {
  Controller,
  Get,
  utils,
  Decorators,
  Post,
  Put,
  Delete,
} from "@giusmento/mangojs-core";
import dotenv from "dotenv";
import { IAMDefaultContainer } from "../../../inversify.config";
import { AuthorizationService } from "../../../services/authorizationService";
import { errors } from "@giusmento/mangojs-core";
import { Types } from "@giusmento/mangojs-core";
import type { types as iamTypes } from "../../../../";
import { UserService } from "../../../services/user.service";
import { ClassHasUserType } from "../../../../../../core/decorators/auth";

dotenv.config();

// import userService
const userService = IAMDefaultContainer.get<UserService>(UserService);

// import authorization service
const authService =
  IAMDefaultContainer.get<AuthorizationService>(AuthorizationService);

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
  @Decorators.auth.HasGroups(["User-Default"])
  public async getUsers(
    req: Request<undefined, iamTypes.entities.common.filter>,
    res: Response<iamTypes.api.v1.users.GET.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      // get filter from params
      const filter = req.params;
      const users = await userService.getUsers(filter);

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: users,
      };
      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error);
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
    req: Types.v1.api.request.Request<
      undefined,
      iamTypes.api.v1.users.POST.RequestBody
    >,
    res: Response<iamTypes.api.v1.users.POST.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.POST.ResponseBody>> {
    console.log("add User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      // validate body
      const userPost = {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password,
        age: body.age,
        groups: [],
      };
      console.log({ body }, "body");
      const response = await userService.postUser(userPost);
      // prepare response
      const apiResponse = {
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
    req: Types.v1.api.request.Request<
      iamTypes.api.v1.users.magiclinks.GET.Params,
      iamTypes.api.v1.users.magiclinks.GET.RequestBody
    >,
    res: Response<iamTypes.api.v1.users.magiclinks.GET.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.magiclinks.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      // get magic link from params
      const { magiclink } = req.params;
      // get user by magic link
      const user = (await userService.getUserByMagicLink(
        magiclink
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
    req: Types.v1.api.request.Request<
      iamTypes.api.v1.users.activate.POST.Params,
      iamTypes.api.v1.users.activate.POST.RequestBody
    >,
    res: Response<iamTypes.api.v1.users.activate.POST.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.activate.POST.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      req.requestTime;
      // get magiclink from params and body
      const magiclink = req.params.magiclink;
      const user = await userService.activateUser(magiclink, req.body);

      // set cookie
      //Creating cookie token
      const cookie = authService.generateUserCredentials({
        uid: user.uid,
        firstName: user.uid,
        lastName: user.lastName,
        email: user.email,
      });

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: user,
      };

      return res
        .status(200)
        .cookie(cookie.cookieName, cookie.data.token, cookie.data.tokenOptions)
        .send(apiResponse);
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
    req: Types.v1.api.request.Request<
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
      const response = await userService.updateUser(params, body);
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
    req: Types.v1.api.request.Request<
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
      // get uid from params
      const { uid } = params;
      const partialUser: Partial<iamTypes.entities.user.User> = {
        groups: [],
      };
      const response = await userService.updateGroupsToUser(uid, partialUser);
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
    req: Types.v1.api.request.Request<iamTypes.api.v1.users.PUT.Params, {}>,
    res: Response<iamTypes.api.v1.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.PUT.ResponseBody>> {
    console.log("add User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      //get uid from params
      const { uid } = params;
      const response = await userService.disableUser(uid);
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
    req: Types.v1.api.request.Request<iamTypes.api.v1.users.PUT.Params, {}>,
    res: Response<iamTypes.api.v1.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.PUT.ResponseBody>> {
    console.log("add User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      //get uid from params
      const { uid } = params;
      const response = await userService.enableUser(uid);
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
    req: Types.v1.api.request.Request<iamTypes.api.v1.users.PUT.Params, {}>,
    res: Response<iamTypes.api.v1.users.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.users.PUT.ResponseBody>> {
    console.log("hard delete User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      //get uid from params
      const { uid } = params;
      const response = await userService.hardDeleteUser(uid);
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
