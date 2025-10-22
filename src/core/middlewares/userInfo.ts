import { IAuthorization } from "../auth/IAuthorization";
import type { NextFunction } from "express";
import { getContainer } from "../container";
import { INVERSITY_TYPES } from "../types/inversifyTypes";

/**
 * Populate req.user with an object containing the user
 */

export async function middlewareUserInfo(
  req: any,
  res: any,
  next: NextFunction
) {
  const authService = getContainer().get(INVERSITY_TYPES.AuthorizationContext, {
    autobind: true,
  }) as IAuthorization;
  console.log(req.cookies, "middlewareUserInfo");
  try {
    // try validate User
    req.user = await authService.validateUserCredentials(req, res);
  } catch (err) {
    try {
      req.user = await authService.validatePartnerCredentials(req, res);
    } catch (err) {
      try {
        req.user = await authService.validateAdminCredentials(req, res);
      } catch (err) {
        req.user = undefined;
      }
    }
  }
  console.log(req.user, "middlewareUserInfo response");
  next();
}
