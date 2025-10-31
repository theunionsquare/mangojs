import { IAuthorization } from "../auth/IAuthorization";
import type { NextFunction } from "express";
import { getContainer } from "../container";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import { partner } from "../../services/iam_server/src/types/entities";

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
  const response = {
    user: {
      uid: req.user?.uid,
      userType: req.user?.userType,
      email: req.user?.email,
      firstName: req.user?.firstName,
      lastName: req.user?.lastName,
      groups: req.user?.groups,
      partnerUid: req.user?.partnerUid,
    },
  };
  console.log(response, "middlewareUserInfo response");
  next();
}
