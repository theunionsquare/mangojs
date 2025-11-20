import { IAuthorization } from "../auth/IAuthorization";
import type { Response, NextFunction } from "express";
import * as containers from "../container";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import type * as Types from "../types";
import { MiddlewareUserInfo } from "../types/entities/middlewareUserInfo.type";

/**
 * Middleware that populates req.user with authenticated user information.
 *
 * Attempts to validate credentials in the following order:
 * 1. User credentials
 * 2. Partner credentials (if user validation fails)
 * 3. Admin credentials (if partner validation fails)
 *
 * If all validation attempts fail, req.user is set to undefined.
 * The middleware always calls next() to continue the request chain.
 *
 * @param req - Express request object, will be augmented with user property
 * @param res - Express response object
 * @param next - Express next function to continue middleware chain
 */
export async function middlewareUserInfo(
  req: Types.v1.api.request.Request,
  res: Response,
  next: NextFunction
) {
  const authService = containers
    .getContainer()
    .get(INVERSITY_TYPES.AuthorizationContext) as IAuthorization;

  const validationMethods = [
    authService.validateUserCredentials,
    authService.validatePartnerCredentials,
    authService.validateAdminCredentials,
  ];

  let response = undefined;

  for (const validateMethod of validationMethods) {
    try {
      response = await validateMethod.call(authService, req, res);
      break; // Success - stop trying other methods
    } catch (err) {
      // Continue to next validation method
      continue;
    }
  }

  req.user = response as MiddlewareUserInfo | undefined;
  next();
}
