import type { Response, NextFunction } from "express";
import * as containers from "../container";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import type * as Types from "../types";
import { AuthStrategyRegistry } from "../auth/AuthStrategyRegistry";
import { AuthContext } from "../auth/AuthContext";
import { IAuthContext } from "../auth/types";

/**
 * Extended request type with auth context
 */
export interface AuthenticatedRequest extends Types.v1.api.request.Request {
  authContext?: IAuthContext;
}

/**
 * Middleware using AuthStrategyRegistry
 *
 * Authenticates requests using registered strategies and attaches
 * the result to `req.authContext`.
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
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const container = containers.getContainer().getContainer();

    if (!container.isBound(INVERSITY_TYPES.AuthStrategyRegistry)) {
      throw new Error(
        "[middlewareAuthContext] AuthStrategyRegistry is not bound. " +
          "Please bind an AuthStrategyRegistry before using this middleware.",
      );
    }

    const registry = container.get<AuthStrategyRegistry>(
      INVERSITY_TYPES.AuthStrategyRegistry,
    );

    const authContext = await registry.authenticate(req);
    req.authContext = authContext;

    next();
  } catch (error) {
    // Log error but don't block request - set anonymous context
    console.error("[middlewareAuthContext] Authentication error:", error);
    req.authContext = AuthContext.anonymous();
    next();
  }
}
