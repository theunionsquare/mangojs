import type { Response, NextFunction } from "express";
import { ContainerRegistry } from "../container";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import { AuthStrategyRegistry } from "../auth/AuthStrategyRegistry";
import { AuthContext } from "../auth/AuthContext";
import { AuthenticatedRequest } from "./types";
import { AuthConfig } from "../authz/authConfig";
import { AuthorizationError } from "../authz/authErrors";

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
    const container = ContainerRegistry.getDefault();
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

    console.error("[middlewareAuthContext] Authentication error:");
    req.authContext = AuthContext.anonymous();

    const authError = new AuthorizationError(
      error instanceof Error ? error.message : "Authentication failed",
      {
        required: "Valid authentication credentials",
        actual: "Authentication failed",
        failedValidator: "middlewareAuthContext",
        context: {
          originalError: error instanceof Error ? error.message : String(error),
        },
      },
    );
    console.log("[middlewareAuthContext] Tracking unauthorized access:");
    AuthConfig.trackUnauthorized(req, authError);
    console.log("[middlewareAuthContext] Post Tracking unauthorized access:");
    next();
  }
}
