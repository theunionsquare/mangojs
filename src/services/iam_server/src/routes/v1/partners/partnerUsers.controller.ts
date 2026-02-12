import { Request, Response } from "express";
import {
  Controller,
  Get,
  utils,
  AuthorizationDecorators,
  Decorators,
  Post,
  Put,
  Delete,
  Types,
  INVERSITY_TYPES,
} from "@theunionsquare/mangojs-core";
import { IAMDefaultContainer } from "../../../inversify.config";
import { PartnerUserService } from "../../../services/partnerUser.service";
import { errors } from "@theunionsquare/mangojs-core";
import { api } from "../../../types";
import { template } from "../../../..";

import type { Types as coreTypes, Providers } from "@theunionsquare/mangojs-core";
import type { types as iamTypes } from "../../../../";

// import adminUserService
const partnerUserService = IAMDefaultContainer.get<PartnerUserService>(
  PartnerUserService,
  { autobind: true }
);

@Controller("/api/iam/v1/partners/:partnerUid/users")
export class PartnerUserController {
  /**
   * @swagger
   * /api/iam/v1/partners/:partnerUid/users
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
  @Decorators.auth.RequiresOwnership("partner", {
    userField: "partnerUid",
    paramName: "partnerUid",
  })
  public async getPartnerUsers(
    req: Request<
      api.v1.partners.users.GET.Params,
      api.v1.partners.users.GET.RequestBody
    >,
    res: Response<api.v1.partners.users.GET.ResponseBody>
  ): Promise<Response<api.v1.partners.users.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const partnerUid = req.params.partnerUid;
      const partnerUsers = await partnerUserService.getAll(partnerUid, {});
      // prepare response
      const partnerUsersResponse = partnerUsers.map((user) => {
        return {
          uid: user.uid,
          email: user.email,
          age: user.age,
          phoneNumber: user.phoneNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status,
          groups: user.groups.map((group) => ({
            uid: group.uid,
            name: group.name,
          })),
          isActive: user.isActive,
          isVerified: user.isVerified,
          disabledAt: user.disabledAt,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          verifiedAt: user.verifiedAt,
        };
      });
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: partnerUsersResponse,
      };

      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/:partnerUid/users/:userUid
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
  @Get("/:userUid")
  @Decorators.auth.RequiresOwnership("partner", {
    userField: "partnerUid",
    paramName: "partnerUid",
  })
  public async getPartnerUserByUid(
    req: Request<
      api.v1.partners.users.GET.ParamsSingle,
      api.v1.partners.users.GET.RequestBody
    >,
    res: Response<api.v1.partners.users.GET.ResponseBodySingle>
  ): Promise<Response<api.v1.partners.users.GET.ResponseBodySingle>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const partnerUid = req.params.partnerUid;
      const userUid = req.params.userUid;
      const partnerUser = await partnerUserService.get(userUid);
      // prepare response
      const partnerUserResponse = {
        uid: partnerUser.uid,
        email: partnerUser.email,
        age: partnerUser.age,
        phoneNumber: partnerUser.phoneNumber,
        firstName: partnerUser.firstName,
        lastName: partnerUser.lastName,
        status: partnerUser.status,
        isActive: partnerUser.isActive,
      };
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: partnerUserResponse,
      } as api.v1.partners.users.GET.ResponseBodySingle;

      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/:partnerUid/users:
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
    req: Request<
      api.v1.partners.users.POST.RequestParams,
      api.v1.partners.users.POST.RequestBody
    >,
    res: Response<api.v1.partners.users.POST.ResponseBody>
  ): Promise<Response<api.v1.partners.users.POST.ResponseBody>> {
    console.log("add Partner User");
    const logRequest = new utils.LogRequest(res);
    try {
      const partnerUid = req.params.partnerUid;
      const body = req.body;
      console.log({ body }, "body");
      const responseUser = await partnerUserService.post(partnerUid, body);

      // sebd email with magic link here
      // import email service
      const emailService =
        IAMDefaultContainer.get<Providers.email.IEmailService>(
          INVERSITY_TYPES.EmailService
        );

      // send email confirmation
      const htmlTemplate = template.emails.userConfirmEmailTemplate;
      const appName = process.env.APP_NAME || "MyApp";
      const appDomainUrl =
        process.env.APP_DOMAIN_URL || "http://localhost:8081";

      const data: template.emails.UserConfirmEmailTemplateData = {
        firstName: responseUser.firstName,
        confirmationLink: `${appDomainUrl}/partner/verify?uid=${partnerUid}&magic_link=${responseUser.magicLink}`,
        expirationTime: 24,
        appName: appName,
        currentYear: new Date().getFullYear().toString(),
      };
      const renderedHtml = utils.renderHtmlTemplate(htmlTemplate, data);
      await emailService.sendTransactionEmail(
        responseUser.email,
        "Confirm your email",
        renderedHtml
      );

      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: responseUser,
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/:partnerUid/users/:uid/resend-confirmation:
   *  post:
   *    summary: Resend confirmation email to partner user
   *    description: Resends the confirmation email to a partner user
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
  @Post("/:uid/resend-confirmation")
  public async resendConfirmationEmail(
    req: Request<
      api.v1.partners.users.POST.RequestParams,
      api.v1.partners.users.POST.RequestBody
    >,
    res: Response<api.v1.partners.users.POST.ResponseBody>
  ): Promise<Response<api.v1.partners.users.POST.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const partnerUid = req.params.partnerUid;
      const uid = req.params.uid;
      const body = req.body;
      console.log({ body }, "body");
      const responseUser = await partnerUserService.updateMagicLink(uid);

      // send email with magic link here
      // import email service
      const emailService =
        IAMDefaultContainer.get<Providers.email.IEmailService>(
          INVERSITY_TYPES.EmailService
        );

      // send email confirmation
      const htmlTemplate = template.emails.userConfirmEmailTemplate;
      const appName = process.env.APP_NAME || "MyApp";
      const appDomainUrl = process.env.APP_DOMAIN_URL;

      const data: template.emails.UserConfirmEmailTemplateData = {
        firstName: responseUser.firstName,
        confirmationLink: `${appDomainUrl}/partner/verify?uid=${partnerUid}&magic_link=${responseUser.magicLink}`,
        expirationTime: 24,
        appName: appName,
        currentYear: new Date().getFullYear().toString(),
      };
      const renderedHtml = utils.renderHtmlTemplate(htmlTemplate, data);
      await emailService.sendTransactionEmail(
        responseUser.email,
        "Confirm your email",
        renderedHtml
      );

      // prepare response
      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: responseUser,
      };

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/:partnerUid/users/:user/magiclinks/{magiclink}:
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
      // magic link from params
      const magicLink = req.params.magiclink;
      const user = await partnerUserService.getByMagicLink(magicLink);

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: user,
      } as iamTypes.api.v1.partners.users.magiclinks.GET.ResponseBody;

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/:partnerUid/users/:user/activate/{magiclink}:
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
      // magic link from params
      const magicLink = req.params.magiclink;
      // post user
      const postUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
      const user = await partnerUserService.activate(magicLink, postUser);

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: user,
      } as iamTypes.api.v1.partners.users.magiclinks.GET.ResponseBody;

      return res.status(200).send(apiResponse);
    } catch (error) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/:partnerUid/users/{uid}:
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
      // uid from params
      const uid = params.uid;
      // post user
      const putUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
      const response = await partnerUserService.update(uid, putUser);
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
   * /api/iam/v1/partners/:partnerUid/users/:uid/groups
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
      iamTypes.api.v1.partners.users.groups.PUT.Params,
      iamTypes.api.v1.partners.users.groups.PUT.RequestBody
    >,
    res: Response<iamTypes.api.v1.partners.users.groups.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.users.groups.PUT.ResponseBody>> {
    console.log("update groups for Partner User");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const params = req.params;
      console.log({ body }, "body");
      // uid from params
      const uid = params.uid;
      // update groups
      await partnerUserService.updateGroups(uid, body);
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
   * /api/iam/v1/partners/:partnerUid/users/:uid/disable:
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
      // uid from params
      const uid = params.uid;
      const response = await partnerUserService.disable(uid);
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
   * /api/iam/v1/partners/:partnerUid/users/:uid/enable:
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
      // uid from params
      const uid = params.uid;
      const response = await partnerUserService.enable(uid);
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
   * /api/iam/v1/partners/:partnerUid/users/:uid/delete/hard:
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
      iamTypes.api.v1.partners.users.DELETE.Params,
      {}
    >,
    res: Response<iamTypes.api.v1.partners.users.DELETE.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.users.DELETE.ResponseBody>> {
    console.log("hard delete Partner User");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      // uid from params
      const uid = params.uid;
      await partnerUserService.hardDelete(uid);
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
