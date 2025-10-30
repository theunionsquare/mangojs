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
import { AdminUserService } from "../../../services/adminUser.service";
import { Decorators } from "@giusmento/mangojs-core";
import { AuthorizationService } from "../../../services/authorizationService";
import { errors } from "@giusmento/mangojs-core";
import { Types } from "@giusmento/mangojs-core";
import { api } from "../../../types";

dotenv.config();

// import adminUserService
const adminUserService =
  IAMDefaultContainer.get<AdminUserService>(AdminUserService);

// import authorization service
const authService =
  IAMDefaultContainer.get<AuthorizationService>(AuthorizationService);

// import authorization decorators
const AuthDecorators =
  IAMDefaultContainer.get<Decorators.AuthorizationDecorators>(
    Decorators.AuthorizationDecorators
  );

@Controller("/api/iam/v1/auth/admins")
export class AuthAdminController {
  /**
   * @swagger
   * /auth/admin/login:
   *  post:
   *    summary: Login Admin users
   *    description: Return cookies for admin users
   *    tags:
   *      - Auth Admin
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
      api.v1.auth.admins.login.POST.RequestBody,
      api.v1.auth.admins.login.POST.RequestBody
    >,
    res: Response<api.v1.auth.admins.login.POST.ResponseBody>
  ): Promise<Response<api.v1.auth.admins.login.POST.ResponseBody>> {
    console.log("Log-in admin local");
    const logRequest = new utils.LogRequest(res);
    try {
      // throw new errors.APIError(401, "");

      const body = req.body;
      const email = body.email || "";
      // validate request

      // check if user exists
      const adminUser = await adminUserService.AdminUserLogIn(
        body.email,
        body.password
      );
      //Creating cookie token
      const cookie = authService.generateAdminCredentials({
        uid: adminUser.uid,
        firstName: adminUser.uid,
        lastName: adminUser.lastName,
        email: adminUser.email,
      });

      const authUser: Types.entities.AuthUser = {
        uid: adminUser.uid,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        email: adminUser.email,
        userType: Types.enums.AuthUserType.ADMIN,
        status: adminUser.status,
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
   * /auth/admin/logout:
   *  post:
   *    summary: Logout Admin users
   *    description: Delete cookies and reset user connections
   *    tags:
   *      - Auth Admin
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
    req: Request,
    res: Response<Types.apiResponses.Success<{}>>
  ): Promise<Response<Types.apiResponses.Success<{}>>> {
    console.log("Log-in admin local");
    const logRequest = new utils.LogRequest(res);
    try {
      let exists = true;
      const body = req.body;
      // check if user exists
      //const response = await adminUserService.getAdminUser(body.username);

      // prepare response
      const apiResponse: Types.apiResponses.Success<{}> = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: {
          authenticated: false,
          message: "Logout Successful",
        },
      };
      const cookieName = authService.adminCookie.name;
      // response 200 with null token
      return res.status(200).cookie(cookieName, null).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  @Post("/register")
  public async registerAdminUser(
    req: Request,
    res: Response<Types.apiResponses.Success<{}>>
  ): Promise<Response<Types.apiResponses.Success<{}>>> {
    console.log("register user");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const response = await adminUserService.postAdminUser(body);

      // prepare response
      const apiResponse: Types.apiResponses.Success<{}> = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: { response },
      };

      return res.json(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }
  /**
   * @swagger
   * /auth/admin/verify:
   *  post:
   *    summary: Verify an Admin cookie
   *    description: Verify if an Admin cookie is valid
   *    tags:
   *      - Auth Admin
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
  @AuthDecorators.IsAuthorized()
  public async verifyToken(
    req: Request,
    res: Response<api.v1.auth.partners.verify.POST.ResponseBody>
  ): Promise<Response<api.v1.auth.partners.verify.POST.ResponseBody>> {
    console.log("verify token");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const authUser = await authService.validateAdminCredentials(req, res);

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

  @Post("/test")
  @loggedMethod()
  @Middleware((req: Request, res: Response, next: NextFunction) => {
    // Example middleware: check if the user is authenticated
    console.log("MIDDLEWARE");
    next();
  })
  @AuthDecorators.IsAuthorized()
  public async testMethod(req: Request, res: Response): Promise<Response> {
    console.log("verify token");
    const logRequest = new utils.LogRequest(res);
    // prepare response
    const apiResponse: Types.apiResponses.Success<{}> = {
      ok: true,
      timestamp: logRequest.timestamp,
      requestId: logRequest.requestId,
      data: {
        ok: true,
      },
    };
    return res.status(200).json(apiResponse);
  }
}
