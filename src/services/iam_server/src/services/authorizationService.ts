import { Request, Response } from "express";
import { Auth, Types, errors } from "@mangojs/core";
import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IAMDefaultContainer } from "../inversify.config";
import { AdminUserService } from "./adminUser.service";
import { PartnerUserService } from "./partnerUser.service";

dotenv.config();

/**
 * Authentication services for the microservice
 * @method verify verifies that a user has a valid credential
 * @method
 */
@injectable()
export class AuthorizationService implements Auth.IAuthProvider {
  private adminTokenSecret: string;
  private partnerTokenSecret: string;
  private userTokenSecret: string;
  private adminUserService: AdminUserService;
  private partnerUserService: PartnerUserService;

  public partnerCookie: { name: string };
  public adminCookie: { name: string };

  constructor() {
    // inject AdminUserService
    this.adminUserService = IAMDefaultContainer.get<AdminUserService>(
      AdminUserService,
      { autobind: true }
    );
    // inject PartnerUserService
    this.partnerUserService = IAMDefaultContainer.get<PartnerUserService>(
      PartnerUserService,
      { autobind: true }
    );

    this.adminTokenSecret = [
      process.env.ADMIN_COOKIE_KEY_FIRST,
      process.env.ADMIN_COOKIE_KEY_SECOND,
    ].join(":");
    this.partnerTokenSecret = [
      process.env.PARTNER_COOKIE_KEY_FIRST,
      process.env.PARTNER_COOKIE_KEY_SECOND,
    ].join(":");
    this.userTokenSecret = [
      process.env.USER_COOKIE_KEY_FIRST,
      process.env.USER_COOKIE_KEY_SECOND,
    ].join(":");

    this.partnerCookie = {
      name: process.env.PARTNER_COOKIE_NAME || "mango",
    };
    this.adminCookie = {
      name: process.env.ADMIN_COOKIE_NAME || "mango",
    };
  }

  // Partner
  public generatePartnerCredentials(data: Types.entities.AuthUserBase): {
    type: Types.auth.CredentialType;
    data: any;
    cookieName: string;
  } {
    const cookieName = process.env.PARTNER_COOKIE_NAME || "mango";
    const tokenOptions = {
      domain: process.env.PARTNER_COOKIE_DOMAIN || null, // a string indicating the domain of the cookie (no default).
      maxAge: process.env.PARTNER_COOKIE_MAX_AGE || 1000 * 60 * 60 * 24, // default 1 day
      sameSite: process.env.PARTNER_COOKIE_SAMESITE || "none", //This can be set to 'strict', 'lax', 'none'
      httpOnly: process.env.PARTNER_COOKIE_HTTPONLY || true, // The cookie only accessible by the web server
      secure: process.env.PARTNER_COOKIE_SECURE === "true", // A boolean indicating whether the cookie is only to be sent over HTTPS
      signed: process.env.PARTNER_COOKIE_SIGNED === "true", // Indicates if the cookie should be signed
      overwrite: process.env.PARTNER_COOKIE_OVERWRITE === "true", //a boolean indicating whether to overwrite previously set cookies of the same name
      priority: process.env.PARTNER_COOKIE_PRIORITY || "medium", // This can be set to 'low', 'medium', or 'high'
      partitioned: process.env.PARTNER_COOKIE_PARTITIONED == "true", // If this is true, Cookies from embedded sites will be partitioned and only readable from the same top level site from which it was created.
      path: process.env.PARTNER_COOKIE_PATH || "/", // A string indicating the path of the cookie
    };

    const cookieData: Types.auth.Cookie = {
      id: data.uid,
    };

    const token = jwt.sign(
      {
        cookieData,
      },
      this.partnerTokenSecret
    );
    return {
      type: Types.auth.CredentialType.COOKIE,
      data: { token, tokenOptions },
      cookieName,
    };
  }
  public async validatePartnerCredentials(
    req: Request,
    res: Response
  ): Promise<Types.entities.AuthUser> {
    try {
      const cookie = req.cookies[process.env.PARTNER_COOKIE_NAME || ""];

      const verify: Types.auth.DecodedCookie<Types.auth.Cookie> = jwt.verify(
        cookie,
        this.partnerTokenSecret
      );

      const authUser = await this.partnerUserService.getPartnerUser(
        verify.cookieData.id
      );
      // TODO check user and prepare response
      const response = {
        userType: Types.entities.AuthUserType.PARTNER,
        uid: authUser.uid,
        firstName: authUser.firstName,
        lastName: authUser.lastName || "",
        email: authUser.email,
        groups: authUser.groups,
      };

      return response;
    } catch (err) {
      throw new errors.DecoratorErrors.Unauthorized(
        "UNAUTHORIZED",
        "UNAUTHORIZED"
      );
    }
  }

  // User
  public generateUserCredentials(data: Types.entities.AuthUserBase): {
    type: Types.auth.CredentialType;
    data: any;
    cookieName: string;
  } {
    const cookieName = process.env.USER_COOKIE_NAME || "mango";
    const tokenOptions = {
      domain: process.env.USER_COOKIE_DOMAIN || null, // a string indicating the domain of the cookie (no default).
      maxAge: process.env.USER_COOKIE_MAX_AGE || 1000 * 60 * 60 * 24, // default 1 day
      sameSite: process.env.USER_COOKIE_SAMESITE || "none", //This can be set to 'strict', 'lax', 'none'
      httpOnly: process.env.USER_COOKIE_HTTPONLY || true, // The cookie only accessible by the web server
      secure: process.env.USER_COOKIE_SECURE === "true", // A boolean indicating whether the cookie is only to be sent over HTTPS
      signed: process.env.USER_COOKIE_SIGNED === "true", // Indicates if the cookie should be signed
      overwrite: process.env.USER_COOKIE_OVERWRITE === "true", //a boolean indicating whether to overwrite previously set cookies of the same name
      priority: process.env.USER_COOKIE_PRIORITY || "medium", // This can be set to 'low', 'medium', or 'high'
      partitioned: process.env.USER_COOKIE_PARTITIONED == "true", // If this is true, Cookies from embedded sites will be partitioned and only readable from the same top level site from which it was created.
      path: process.env.USER_COOKIE_PATH || "/", // A string indicating the path of the cookie
    };

    const cookieData: Types.auth.Cookie = {
      id: data.uid,
    };

    const token = jwt.sign(
      {
        cookieData,
      },
      this.userTokenSecret
    );
    return {
      type: Types.auth.CredentialType.COOKIE,
      data: { token, tokenOptions },
      cookieName,
    };
  }
  public async validateUserCredentials(
    req: Request,
    res: Response
  ): Promise<Types.entities.AuthUser> {
    try {
      const cookie = req.cookies[process.env.USER_COOKIE_NAME || ""];

      const verify: Types.auth.DecodedCookie<Types.auth.Cookie> = jwt.verify(
        cookie,
        this.userTokenSecret
      );

      const authUser = await this.adminUserService.getAdminUser(
        verify.cookieData.id
      );
      // TODO check user and prepare response
      const response = {
        userType: Types.entities.AuthUserType.USER,
        uid: authUser.uid,
        firstName: authUser.firstName,
        lastName: authUser.lastName || "",
        email: authUser.email,
        groups: authUser.groups,
      };

      return response;
    } catch (err) {
      throw new errors.DecoratorErrors.Unauthorized(
        "UNAUTHORIZED",
        "UNAUTHORIZED"
      );
    }
  }

  /**
   * Generate Credentials for Admin User
   * @param data object: the cookie data
   * @param expiresIn number: (sec)
   * @returns
   */
  public generateAdminCredentials(data: Types.entities.AuthUserBase): {
    type: Types.auth.CredentialType;
    data: Types.auth.SignedCookie;
    cookieName: string;
  } {
    const cookieName = process.env.ADMIN_COOKIE_NAME || "mango";
    const tokenOptions = {
      domain: process.env.ADMIN_COOKIE_DOMAIN || null, // a string indicating the domain of the cookie (no default).
      maxAge: process.env.ADMIN_COOKIE_MAX_AGE || 1000 * 60 * 60 * 24, // default 1 day
      sameSite: process.env.ADMIN_COOKIE_SAMESITE || "none", //This can be set to 'strict', 'lax', 'none'
      httpOnly: process.env.ADMIN_COOKIE_HTTPONLY || true, // The cookie only accessible by the web server
      secure: process.env.ADMIN_COOKIE_SECURE === "true", // A boolean indicating whether the cookie is only to be sent over HTTPS
      signed: process.env.ADMIN_COOKIE_SIGNED === "true", // Indicates if the cookie should be signed
      overwrite: process.env.ADMIN_COOKIE_OVERWRITE === "true", //a boolean indicating whether to overwrite previously set cookies of the same name
      priority: process.env.ADMIN_COOKIE_PRIORITY || "medium", // This can be set to 'low', 'medium', or 'high'
      partitioned: process.env.ADMIN_COOKIE_PARTITIONED == "true", // If this is true, Cookies from embedded sites will be partitioned and only readable from the same top level site from which it was created.
      path: process.env.ADMIN_COOKIE_PATH || "/", // A string indicating the path of the cookie
    };

    const cookieData: Types.auth.Cookie = {
      id: data.uid,
    };

    const token = jwt.sign(
      {
        cookieData,
      },
      this.adminTokenSecret
    );
    return {
      type: Types.auth.CredentialType.COOKIE,
      data: { token, tokenOptions },
      cookieName,
    };
  }

  /**
   * Verifies that the request is authenticated.
   *
   * @param req: Request
   * @param res: Response
   *
   * @returns boolean
   */
  public async validateAdminCredentials(
    req: Request,
    res: Response
  ): Promise<Types.entities.AuthUser> {
    try {
      const cookie = req.cookies[process.env.ADMIN_COOKIE_NAME || ""];

      const verify: Types.auth.DecodedCookie<Types.auth.Cookie> = jwt.verify(
        cookie,
        this.adminTokenSecret
      );

      const authUser = await this.adminUserService.getAdminUser(
        verify.cookieData.id
      );
      // TODO check user and prepare response
      const response = {
        userType: Types.entities.AuthUserType.ADMIN,
        uid: authUser.uid,
        firstName: authUser.firstName,
        lastName: authUser.lastName || "",
        email: authUser.email,
        groups: authUser.groups,
      };

      return response;
    } catch (err) {
      throw new errors.DecoratorErrors.Unauthorized(
        "UNAUTHORIZED",
        "UNAUTHORIZED"
      );
    }
  }
}
