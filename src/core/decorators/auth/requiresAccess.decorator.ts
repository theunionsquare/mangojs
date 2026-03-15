import { NextFunction, Request, RequestHandler, Response } from "express";
import { errors } from "../..";
import { MetadataKeys } from "../../utils/metadata.keys";
import { Types } from "../..";
import { ValidatorMetadata, createAuthOrchestrator, ValidationResult } from "./core/authOrchestrator";
import { AuthErrorFactory } from "./core/authErrors";
import { AuthConfig, DecoratorOptions } from "./core/authConfig";

/**
 * Access requirements mapping user types to their allowed groups.
 * Supports wildcard patterns using `*`:
 * - `"*"` - matches any group
 * - `"partner_*"` - matches groups starting with "partner_"
 * - `"*_admin"` - matches groups ending with "_admin"
 * - `"partner_*_admin"` - matches groups starting with "partner_" and ending with "_admin"
 * - `"exact_group"` - exact match (no wildcard)
 *
 * @example
 * ```typescript
 * {
 *   [AuthUserType.ADMIN]: ["admin_*", "root"],        // admin_superuser, admin_basic, or exact "root"
 *   [AuthUserType.PARTNER]: ["partner_admin"],        // exact match
 *   [AuthUserType.USER]: ["*"]                        // any group
 * }
 * ```
 */
type AccessRequirements = {
  [key in Types.enums.AuthUserType]?: string[];
};

/**
 * Checks if a group name matches a pattern with wildcard support.
 *
 * @param groupName - The actual group name to check
 * @param pattern - The pattern to match against (supports * wildcard)
 * @returns true if the group matches the pattern
 */
function matchesPattern(groupName: string, pattern: string): boolean {
  // Special case: "*" matches any group
  if (pattern === "*") {
    return true;
  }

  // No wildcard - exact match
  if (!pattern.includes("*")) {
    return groupName === pattern;
  }

  // Convert wildcard pattern to regex
  // Escape special regex characters except *
  const regexPattern = pattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")  // Escape special chars
    .replace(/\*/g, ".*");                   // Replace * with .*

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(groupName);
}

/**
 * Method decorator that restricts access to routes based on user type and group combinations.
 *
 * This decorator creates an authorization middleware that checks if the authenticated
 * user's type and group combination matches any of the allowed configurations. The user
 * must have the specified user type AND belong to one of the allowed groups for that type.
 *
 * Supports wildcard patterns for flexible group matching:
 * - `"*"` matches any group
 * - `"partner_*"` matches groups starting with "partner_"
 * - `"*_admin"` matches groups ending with "_admin"
 * - `"partner_*_admin"` matches groups with prefix and suffix
 * - No wildcard performs exact match
 *
 * When used with @OrAuth(), this decorator can be combined with other auth decorators
 * using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
 * AND logic (all must pass).
 *
 * @param accessMap - Object mapping user types to their allowed groups (with wildcard support)
 * @param options - Optional configuration for this decorator instance
 * @param options.errorMessage - Custom error message for auth failures
 * @param options.disabled - Disable this decorator (useful for testing)
 * @param options.errorHandler - Custom error handler for this endpoint
 * @param options.auditLog - Enable audit logging for this endpoint
 * @param options.cache - Enable caching for this endpoint
 * @param options.cacheTTL - Cache TTL in milliseconds
 * @returns A method decorator that adds authorization middleware to the target method
 *
 * @example
 * ```typescript
 * class PartnerUserController {
 *   // Single decorator with user type + group validation
 *   @RequiresAccess({
 *     [AuthUserType.ADMIN]: ["admin_*"],           // Any admin group
 *     [AuthUserType.PARTNER]: ["partner_admin"]    // Exact match
 *   })
 *   async getPartnerUsers(req: Request, res: Response) {
 *     // Accessible by:
 *     // - ADMIN users with any group starting with "admin_"
 *     // OR
 *     // - PARTNER users with exact "partner_admin" group
 *   }
 *
 *   // Allow any group for ADMIN users
 *   @RequiresAccess({
 *     [AuthUserType.ADMIN]: ["*"]
 *   })
 *   async adminOnlyEndpoint(req: Request, res: Response) {
 *     // ADMIN users with any group can access
 *   }
 *
 *   // With custom error message
 *   @RequiresAccess({
 *     [AuthUserType.ADMIN]: ["admin_*"],
 *     [AuthUserType.PARTNER]: ["partner_admin"]
 *   }, {
 *     errorMessage: "Access restricted to admins and partner admins only"
 *   })
 *   async restrictedEndpoint(req: Request, res: Response) {}
 *
 *   // With custom error handler
 *   @RequiresAccess({
 *     [AuthUserType.PARTNER]: ["partner_*"]
 *   }, {
 *     errorHandler: (res, error) => {
 *       res.status(403).json({ error: "Partner access required" });
 *     }
 *   })
 *   async partnerEndpoint(req: Request, res: Response) {}
 *
 *   // Disabled for testing
 *   @RequiresAccess({
 *     [AuthUserType.ADMIN]: ["admin_*"]
 *   }, {
 *     disabled: process.env.NODE_ENV === "test"
 *   })
 *   async testEndpoint(req: Request, res: Response) {}
 *
 *   // Wildcard patterns
 *   @RequiresAccess({
 *     [AuthUserType.PARTNER]: ["partner_*"],       // Any partner group
 *     [AuthUserType.USER]: ["*_premium"]           // Any premium group
 *   })
 *   async premiumContent(req: Request, res: Response) {
 *     // PARTNER with any partner_* group OR USER with any *_premium group
 *   }
 *
 *   // OR logic: Multiple access patterns
 *   @OrAuth()
 *   @RequiresAccess({
 *     [AuthUserType.ADMIN]: ["admin_*"]
 *   })
 *   @RequiresAccess({
 *     [AuthUserType.PARTNER]: ["partner_admin", "partner_superuser"]
 *   })
 *   async flexibleAccess(req: Request, res: Response) {
 *     // Passes if ANY of these are true:
 *     // - ADMIN with any admin_* group
 *     // OR
 *     // - PARTNER with partner_admin or partner_superuser group
 *   }
 *
 *   // Combining with other decorators using OR logic
 *   @OrAuth()
 *   @RequiresAccess({
 *     [AuthUserType.PARTNER]: ["partner_admin"]
 *   })
 *   @HasUserType([AuthUserType.SYSTEM])
 *   async systemOrPartnerAdmin(req: Request, res: Response) {
 *     // PARTNER with partner_admin group OR any SYSTEM user
 *   }
 * }
 * ```
 *
 * @remarks
 * - Within a single @RequiresAccess decorator, different user types use OR logic
 * - Multiple @RequiresAccess decorators use AND logic by default
 * - Use @OrAuth() to enable OR logic between multiple decorators
 * - Wildcard patterns provide flexible group matching
 * - This is the most powerful auth decorator, combining user type and group validation
 *
 * @see {@link OrAuth} for enabling OR logic between multiple decorators
 * @see {@link HasUserType} for user type-only validation
 * @see {@link HasGroups} for group-only validation
 */
export function RequiresAccess(
  accessMap: AccessRequirements,
  options?: DecoratorOptions
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    // Check if this decorator is disabled (useful for testing)
    if (options?.disabled) {
      console.warn(
        `[RequiresAccess] Decorator disabled for ${String(propertyKey)}`
      );
      return descriptor;
    }

    // Check if OR mode is enabled
    const isOrMode = Reflect.getMetadata(
      MetadataKeys.AUTHORIZATION_OR_MODE,
      target,
      propertyKey
    );

    if (isOrMode) {
      // OR mode: Store validator function
      const validators: ValidatorMetadata[] =
        Reflect.getMetadata(
          MetadataKeys.AUTHORIZATION_VALIDATORS,
          target,
          propertyKey
        ) || [];

      const accessMapStr = Object.entries(accessMap)
        .map(([type, patterns]) => `${type}:[${patterns?.join(", ")}]`)
        .join(", ");

      validators.push({
        name: `RequiresAccess({${accessMapStr}})`,
        validator: (req: Request): ValidationResult => {
          // Use AuthConfig to extract user context
          const userContext = AuthConfig.extractUserContext(req);

          if (!userContext || !userContext.userType || !userContext.groups) {
            return {
              passed: false,
              reason: options?.errorMessage || "No valid user context found",
            };
          }

          const userType = userContext.userType as Types.enums.AuthUserType;
          const userGroups = userContext.groups;

          const allowedPatterns = accessMap[userType];
          if (!allowedPatterns) {
            return {
              passed: false,
              reason: options?.errorMessage ||
                `User type '${userType}' is not in allowed access map`,
            };
          }

          const hasAccess = userGroups.some((userGroup: string) =>
            allowedPatterns.some((pattern) =>
              matchesPattern(userGroup, pattern)
            )
          );

          if (hasAccess) {
            return { passed: true };
          }

          return {
            passed: false,
            reason: options?.errorMessage ||
              `User has groups [${userGroups.join(", ")}] but needs to match patterns [${allowedPatterns.join(", ")}] for type '${userType}'`,
          };
        },
        options,  // Store options for orchestrator
      });

      Reflect.defineMetadata(
        MetadataKeys.AUTHORIZATION_VALIDATORS,
        validators,
        target,
        propertyKey
      );

      // Create orchestrator middleware (will be replaced if more validators are added)
      const orchestratorMiddleware = createAuthOrchestrator(
        validators,
        true,
        propertyKey
      );

      Reflect.defineMetadata(
        MetadataKeys.AUTHORIZATION,
        [orchestratorMiddleware],
        target,
        propertyKey
      );
    } else {
      // AND mode (default): Add middleware as before
      const middlewares: RequestHandler[] =
        Reflect.getMetadata(MetadataKeys.AUTHORIZATION, target, propertyKey) ||
        [];

      const middleware: RequestHandler = (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        const accessMapStr = Object.entries(accessMap)
          .map(([type, patterns]) => `${type}:[${patterns?.join(", ")}]`)
          .join(", ");
        console.log(`[RequiresAccess] Checking access. Required: {${accessMapStr}}`);

        // Use AuthConfig to extract user context
        const userContext = AuthConfig.extractUserContext(req);

        if (!userContext || !userContext.userType || !userContext.groups) {
          const authError = AuthErrorFactory.missingUserContext(
            `RequiresAccess({${accessMapStr}})`
          );
          console.error(`[RequiresAccess] Access denied:\n${authError.toLogString()}`);

          // Use custom error handler if configured
          const customErrorHandler = AuthConfig.getErrorHandler(options);
          if (customErrorHandler) {
            customErrorHandler(res, authError);
          } else {
            errors.errorHandler(res, authError);
          }
          return;
        }

        const userType = userContext.userType as Types.enums.AuthUserType;
        const userGroups = userContext.groups;

        // Check if user type is in access map
        const allowedPatterns = accessMap[userType];

        if (!allowedPatterns) {
          // User type not allowed at all
          const authError = AuthErrorFactory.accessDenied(
            `User type must be one of: ${Object.keys(accessMap).join(", ")}`,
            userType,
            userGroups,
            `RequiresAccess({${accessMapStr}})`
          );
          console.error(`[RequiresAccess] Access denied:\n${authError.toLogString()}`);

          // Use custom error handler if configured
          const customErrorHandler = AuthConfig.getErrorHandler(options);
          if (customErrorHandler) {
            customErrorHandler(res, authError);
          } else {
            errors.errorHandler(res, authError);
          }
          return;
        }

        // Check if user has at least one group matching the allowed patterns
        const hasAllowedGroup = userGroups.some((userGroup: string) =>
          allowedPatterns.some((pattern) =>
            matchesPattern(userGroup, pattern)
          )
        );

        if (hasAllowedGroup) {
          console.log(`[RequiresAccess] Access granted for ${userType} with groups: ${userGroups.join(", ")}`);
          next();
        } else {
          const authError = AuthErrorFactory.accessDenied(
            `User type '${userType}' needs groups matching patterns: ${allowedPatterns.join(", ")}`,
            userType,
            userGroups,
            `RequiresAccess({${accessMapStr}})`
          );
          console.error(`[RequiresAccess] Access denied:\n${authError.toLogString()}`);

          // Use custom error handler if configured
          const customErrorHandler = AuthConfig.getErrorHandler(options);
          if (customErrorHandler) {
            customErrorHandler(res, authError);
          } else {
            errors.errorHandler(res, authError);
          }
        }
      };

      middlewares.push(middleware);
      Reflect.defineMetadata(
        MetadataKeys.AUTHORIZATION,
        middlewares,
        target,
        propertyKey
      );
    }
  };
}
