import { Request, Response } from "express";
import {
  Controller,
  Get,
  utils,
  AuthorizationDecorators,
  Post,
  Put,
  Delete,
  Decorators,
} from "@giusmento/mangojs-core";
import { IAMDefaultContainer } from "../../../inversify.config";
import { PartnerService } from "../../../services/partner.service";
import { errors } from "@giusmento/mangojs-core";

import type { Types as coreTypes } from "@giusmento/mangojs-core";
import type { types as iamTypes } from "../../../../";
import { Or } from "typeorm";

// import partnerService
const partnerService = IAMDefaultContainer.get<PartnerService>(PartnerService, {
  autobind: true,
});

// import authorization decorators
const AuthDecorators = IAMDefaultContainer.get<AuthorizationDecorators>(
  AuthorizationDecorators,
  { autobind: true }
);

@Controller("/api/iam/v1/partners")
export class PartnerController {
  /**
   * @swagger
   * /api/iam/v1/partners:
   *  get:
   *    summary: Get list of all partners
   *    description: Return a list of all partner companies (Admin only)
   *    tags:
   *      - Partners
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: An array containing partners
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  ok:
   *                    type: boolean
   *                    example: true
   *                  data:
   *                    type: array
   *                    items:
   *                      type: object
   *      401:
   *        description: Unauthorized
   */
  @Get("/")
  @AuthDecorators.IsAuthorized()
  public async getPartners(
    req: Request,
    res: Response<iamTypes.api.v1.partners.GET.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const partners = await partnerService.getAll({});

      const apiResponse: iamTypes.api.v1.partners.GET.ResponseBody = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: partners,
      };

      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners/{uid}:
   *  get:
   *    summary: Get partner by ID
   *    description: Return a single partner company with its users
   *    tags:
   *      - Partners
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: uid
   *        required: true
   *        schema:
   *          type: string
   *        description: Partner unique identifier
   *    responses:
   *      200:
   *        description: Partner object
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *      404:
   *        description: Partner not found
   *      401:
   *        description: Unauthorized
   */
  @Get("/:uid")
  @Decorators.auth.RequiresOwnership("partner", {
    userField: "partnerUid",
    paramName: "uid",
  })
  public async getPartner(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.uid.GET.Params,
      iamTypes.api.v1.partners.uid.GET.RequestBody
    >,
    res: Response<iamTypes.api.v1.partners.uid.GET.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.uid.GET.ResponseBody>> {
    const logRequest = new utils.LogRequest(res);
    try {
      const partner = await partnerService.get(req.params.uid);

      const apiResponse = {
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: partner,
      };

      return res.status(200).send(apiResponse);
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/iam/v1/partners:
   *  post:
   *    summary: Create new partner company
   *    description: Creates a new partner company
   *    tags:
   *      - Partners
   *    produces:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            required:
   *              - companyName
   *              - email
   *            properties:
   *              companyName:
   *                type: string
   *                example: "Acme Corporation"
   *              email:
   *                type: string
   *                example: "contact@acme.com"
   *              businessType:
   *                type: string
   *                example: "Technology"
   *              taxId:
   *                type: string
   *                example: "123456789"
   *    responses:
   *      200:
   *        description: The created partner
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  uid:
   *                    type: string
   *                    example: 12345-67890-abcdef
   *      409:
   *        description: Email already exists
   *      401:
   *        description: Unauthorized
   */
  @Post("/")
  @AuthDecorators.IsAuthorized()
  public async createPartner(
    req: coreTypes.v1.api.request.Request<
      {},
      iamTypes.api.v1.partners.POST.RequestBody
    >,
    res: Response<iamTypes.api.v1.partners.POST.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.POST.ResponseBody>> {
    console.log("create Partner");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      console.log({ body }, "body");

      const postPartner = {
        companyName: body.companyName,
        addressCity: body.addressCity,
        addressCountry: body.addressCountry,
        addressState: body.addressState,
        addressStreet: body.addressStreet,
        addressPostalCode: body.addressPostalCode,
        phoneNumber: body.phoneNumber,
        email: body.email,
        businessType: body.businessType,
        taxId: body.taxId,
      };
      const response = await partnerService.post(postPartner);

      // prepare response
      const apiResponse: iamTypes.api.v1.partners.POST.ResponseBody = {
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
   * /api/iam/v1/partners/{uid}:
   *  put:
   *    summary: Update partner company
   *    description: Update partner company information (Partner Admin only)
   *    tags:
   *      - Partners
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: uid
   *        required: true
   *        schema:
   *          type: string
   *        description: Partner unique identifier
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *    responses:
   *      200:
   *        description: Partner updated successfully
   *      404:
   *        description: Partner not found
   *      401:
   *        description: Unauthorized
   */
  @Put("/:uid")
  @AuthDecorators.IsAuthorized()
  public async updatePartner(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.PUT.Params,
      iamTypes.api.v1.partners.PUT.RequestBody
    >,
    res: Response<iamTypes.api.v1.partners.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.PUT.ResponseBody>> {
    console.log("update Partner");
    const logRequest = new utils.LogRequest(res);
    try {
      const body = req.body;
      const params = req.params;
      // uid from params
      const uid = params.uid;

      console.log({ body, params }, "update partner");
      await partnerService.update(uid, body);

      // prepare response
      const apiResponse: iamTypes.api.v1.partners.PUT.ResponseBody = {
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
   * /api/iam/v1/partners/{uid}/disable:
   *  post:
   *    summary: Disable partner company
   *    description: Disable partner company (Admin only)
   *    tags:
   *      - Partners
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: uid
   *        required: true
   *        schema:
   *          type: string
   *        description: Partner unique identifier
   *    responses:
   *      200:
   *        description: Partner disabled successfully
   *      404:
   *        description: Partner not found
   *      401:
   *        description: Unauthorized
   */
  @Post("/:uid/disable")
  @AuthDecorators.IsAuthorized()
  public async disablePartner(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.PUT.Params,
      {}
    >,
    res: Response<iamTypes.api.v1.partners.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.PUT.ResponseBody>> {
    console.log("disable Partner");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      // uid from params
      const uid = params.uid;

      await partnerService.disable(uid);

      // prepare response
      const apiResponse: iamTypes.api.v1.partners.PUT.ResponseBody = {
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
   * /api/iam/v1/partners/{uid}/enable:
   *  post:
   *    summary: Enable partner company
   *    description: Enable partner company (Admin only)
   *    tags:
   *      - Partners
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: uid
   *        required: true
   *        schema:
   *          type: string
   *        description: Partner unique identifier
   *    responses:
   *      200:
   *        description: Partner enabled successfully
   *      404:
   *        description: Partner not found
   *      401:
   *        description: Unauthorized
   */
  @Post("/:uid/enable")
  @AuthDecorators.IsAuthorized()
  public async enablePartner(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.PUT.Params,
      {}
    >,
    res: Response<iamTypes.api.v1.partners.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.PUT.ResponseBody>> {
    console.log("enable Partner");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      // uid from params
      const uid = params.uid;

      await partnerService.enable(uid);

      // prepare response
      const apiResponse: iamTypes.api.v1.partners.PUT.ResponseBody = {
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
   * /api/iam/v1/partners/{uid}/delete/hard:
   *  delete:
   *    summary: Hard delete partner company
   *    description: Permanently delete partner company (Admin only)
   *    tags:
   *      - Partners
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: uid
   *        required: true
   *        schema:
   *          type: string
   *        description: Partner unique identifier
   *    responses:
   *      200:
   *        description: Partner deleted successfully
   *      400:
   *        description: Cannot delete partner with associated users
   *      404:
   *        description: Partner not found
   *      401:
   *        description: Unauthorized
   */
  @Delete("/:uid/delete/hard")
  @AuthDecorators.IsAuthorized()
  public async hardDeletePartner(
    req: coreTypes.v1.api.request.Request<
      iamTypes.api.v1.partners.PUT.Params,
      {}
    >,
    res: Response<iamTypes.api.v1.partners.PUT.ResponseBody>
  ): Promise<Response<iamTypes.api.v1.partners.PUT.ResponseBody>> {
    console.log("hard delete Partner");
    const logRequest = new utils.LogRequest(res);
    try {
      const params = req.params;
      // uid from params
      const uid = params.uid;

      await partnerService.hardDelete(uid);

      // prepare response
      const apiResponse: iamTypes.api.v1.partners.PUT.ResponseBody = {
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
