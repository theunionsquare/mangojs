import { NextFunction, Request, Response } from "express";
import {
  Controller,
  Middleware,
  Post,
  loggedMethod,
  utils,
} from "@giusmento/mangojs-core";
import dotenv from "dotenv";
import { IAMDefaultContainer } from "../../../inversify.config";
import { UserService } from "../../../services/user.service";
import { Decorators } from "@giusmento/mangojs-core";
import { AuthorizationService } from "../../../services/authorizationService";
import { errors } from "@giusmento/mangojs-core";
import { Types } from "@giusmento/mangojs-core";
import { api } from "../../../types";

dotenv.config();

// import userService
const userService = IAMDefaultContainer.get<UserService>(UserService);

// import authorization service
const authService =
  IAMDefaultContainer.get<AuthorizationService>(AuthorizationService);

// import authorization decorators
const AuthDecorators =
  IAMDefaultContainer.get<Decorators.AuthorizationDecorators>(
    Decorators.AuthorizationDecorators
  );

@Controller("/api/iam/v1/auth/users")
export class AuthUserController {
  /**
   * @swagger
   * /auth/users/login:
   *  post:
   *    summary: Login User
   *    description: Return cookies for users
   *    tags:
   *      - Auth User
   *    produces:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *                type: string
   *                example: myemail@email.com
   *              password:
   *                type: password
   *                example: hash256('mypassword')
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
  @Post("/login")
  public async getCredentials(
    req: Types.v1.api.request.Request<
      undefined,
      api.v1.auth.users.login.POST.RequestBody
    >,
    res: Response<api.v1.auth.users.login.POST.ResponseBody>
  ): Promise<Response<api.v1.auth.users.login.POST.ResponseBody>> {
    console.log("Log-in user");
    const logRequest = new utils.LogRequest(res);
    try {
      // throw new errors.APIError(401, "");

      const body = req.body;
      const email = body.email || "";
      // validate request

      // check if user exists
      const user = await userService.userLogIn(body.email, body.password);
      //Creating cookie token
      const cookie = authService.generateUserCredentials({
        uid: user.uid,
        firstName: user.uid,
        lastName: user.lastName,
        email: user.email,
      });

      const authUser: Types.entities.AuthUser = {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: Types.enums.AuthUserType.USER,
        status: user.status,
      };

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: {
          authenticated: true,
          message: "Authentication Successful.",
          user: authUser,
        },
      };
      return res
        .status(200)
        .cookie(cookie.cookieName, cookie.data.token, cookie.data.tokenOptions)
        .send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /auth/users/logout:
   *  post:
   *    summary: Logout User
   *    description: Delete cookies and reset user connections
   *    tags:
   *      - Auth User
   *    security:
   *      - adminCookieAuth: []
   *    produces:
   *      - application/json
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
   *
   */
  @Post("/logout")
  public async logout(
    req: Request<undefined, api.v1.auth.users.logout.POST.RequestBody>,
    res: Response<api.v1.auth.users.logout.POST.ResponseBody>
  ): Promise<Response<api.v1.auth.users.logout.POST.ResponseBody>> {
    console.log("Log-in user");
    const logRequest = new utils.LogRequest(res);
    try {
      let exists = true;
      const body = req.body;
      // TO DO: Add BE log out process
      //const response = await adminUserService.getAdminUser(body.username);

      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: {
          authenticated: false,
          message: "Logout Successful",
        },
      };
      const cookieName = authService.userCookie.name;
      // response 200 with null token
      return res.status(200).cookie(cookieName, null).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  @Post("/register")
  public async registerUser(
    req: Request<undefined, api.v1.auth.users.register.POST.RequestBody>,
    res: Response<api.v1.auth.users.register.POST.ResponseBody>
  ): Promise<Response<api.v1.auth.users.register.POST.ResponseBody>> {
    console.log("register user");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const response = await userService.postUser(body);

      // prepare response
      const apiResponse: api.v1.auth.users.register.POST.ResponseBody = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: {
          authenticated: true,
          message: "User registered successfully",
          user: {
            uid: response.uid,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            userType: Types.enums.AuthUserType.USER,
            status: response.status,
          },
        },
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }
  /**
   * @swagger
   * /auth/users/verify:
   *  post:
   *    summary: Verify a User cookie
   *    description: Verify if a User cookie is valid
   *    tags:
   *      - Auth User
   *    security:
   *      - adminCookieAuth: []
   *    produces:
   *      - application/json
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
   *
   */
  @Post("/verify")
  //@AuthDecorators.IsAuthorized()
  public async verifyToken(
    req: Request<undefined, api.v1.auth.users.verify.POST.RequestBody>,
    res: Response<api.v1.auth.users.verify.POST.ResponseBody>
  ): Promise<Response<api.v1.auth.users.verify.POST.ResponseBody>> {
    console.log("verify token");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const authUser = await authService.validateUserCredentials(req, res);

      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: {
          authenticated: true,
          message: "Session is valid",
          user: authUser,
        },
      };

      return res.status(200).json(apiResponse);
    } catch (err) {
      return errors.errorHandler(res, err as Error);
    }
  }
}
