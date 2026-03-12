import type { Response, NextFunction } from "express";
import * as containers from "../container";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import type * as Types from "../types";
import { MiddlewareUserInfo } from "../types/entities/middlewareUserInfo.type";
import { AuthStrategyRegistry } from "../auth/AuthStrategyRegistry";
import { AuthContext } from "../auth/AuthContext";
import { IAuthContext, IAuthUser } from "../auth/types";

// Legacy imports for backwards compatibility
import { IAuthorization } from "../auth/IAuthorization";

/**
 * Extended request type with auth context
 */
export interface AuthenticatedRequest extends Types.v1.api.request.Request {
  authContext?: IAuthContext;
}

/**
 * Modern middleware using AuthStrategyRegistry
 *
 * Authenticates requests using registered strategies and attaches
 * the result to `req.authContext`. Also populates `req.user` for
 * backwards compatibility with existing code.
 *
 * @example
 * ```typescript
 * // In ServerBuilder or Express app
 * app.use(middlewareAuthContext);
 *
 * // In controller
 * if (req.authContext.isAuthenticated) {
 *   console.log(`User ${req.authContext.user.id} via ${req.authContext.strategy}`);
 * }
 * ```
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export async function middlewareAuthContext(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const container = containers.getContainer().getContainer();

    // Check if new registry is bound
    if (container.isBound(INVERSITY_TYPES.AuthStrategyRegistry)) {
      const registry = container.get<AuthStrategyRegistry>(
        INVERSITY_TYPES.AuthStrategyRegistry
      );

      const authContext = await registry.authenticate(req);
      req.authContext = authContext;

      // Also populate req.user for backwards compatibility
      if (authContext.isAuthenticated && authContext.user) {
        req.user = mapToLegacyUser(authContext.user);
      }

      next();
      return;
    }

    // Fallback to legacy middleware if registry not bound
    await middlewareUserInfoLegacy(req, res, next);
  } catch (error) {
    // Log error but don't block request - set anonymous context
    console.error("[middlewareAuthContext] Authentication error:", error);
    req.authContext = AuthContext.anonymous();
    next();
  }
}

/**
 * @deprecated Use middlewareAuthContext instead
 *
 * Legacy middleware that populates req.user with authenticated user information.
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
): Promise<void> {
  const container = containers.getContainer().getContainer();

  // Use new system if available
  if (container.isBound(INVERSITY_TYPES.AuthStrategyRegistry)) {
    return middlewareAuthContext(req as AuthenticatedRequest, res, next);
  }

  // Otherwise use legacy
  return middlewareUserInfoLegacy(req, res, next);
}

/**
 * Internal legacy implementation
 */
async function middlewareUserInfoLegacy(
  req: Types.v1.api.request.Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const container = containers.getContainer().getContainer();

    if (!container.isBound(INVERSITY_TYPES.AuthorizationContext)) {
      // No auth service bound - continue without auth
      req.user = undefined;
      next();
      return;
    }

    const authService = container.get(
      INVERSITY_TYPES.AuthorizationContext
    ) as IAuthorization;

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

    // Also populate authContext for code using new API
    if (response) {
      (req as AuthenticatedRequest).authContext = AuthContext.authenticated(
        mapFromLegacyUser(response as MiddlewareUserInfo),
        "legacy"
      );
    } else {
      (req as AuthenticatedRequest).authContext = AuthContext.anonymous();
    }

    next();
  } catch (error) {
    console.error("[middlewareUserInfo] Error:", error);
    req.user = undefined;
    (req as AuthenticatedRequest).authContext = AuthContext.anonymous();
    next();
  }
}

/**
 * Map new IAuthUser to legacy MiddlewareUserInfo format
 */
function mapToLegacyUser(user: IAuthUser): MiddlewareUserInfo {
  return {
    uid: user.id,
    userType: user.userType,
    email: user.email || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    partnerUid: user.partnerUid || user.metadata?.partnerUid,
    groups: (user.groups || []).map((g: string | { name: string; uid?: string; description?: string }) =>
      typeof g === "string"
        ? { name: g, uid: "", description: "" }
        : { name: g.name, uid: g.uid || "", description: g.description || "" }
    ),
  };
}

/**
 * Map legacy MiddlewareUserInfo to new IAuthUser format
 */
function mapFromLegacyUser(user: MiddlewareUserInfo): IAuthUser {
  return {
    id: user.uid,
    userType: user.userType,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    groups: user.groups?.map((g) => g.name) || [],
    partnerUid: user.partnerUid,
  };
}
