import { Request } from "express";
import { MetadataKeys } from "../../utils/metadata.keys";
import {
  ValidatorMetadata,
  createAuthOrchestrator,
  ValidationResult,
} from "../../authz/authOrchestrator";
import { AuthConfig, HasPermissionsOptions } from "../../authz/authConfig";
import { matchesPermissions } from "../../auth/permissions.utils";

/**
 * Default separator for permission patterns
 */
const DEFAULT_SEPARATOR = ":";

/**
 * Method decorator that restricts access to routes based on user permissions.
 *
 * This decorator creates an authorization middleware that checks if the authenticated
 * user has at least one of the specified permissions. Supports wildcard patterns
 * using `*` to match any segment.
 *
 * @param permissions - Array of permission patterns that are allowed to access the route
 * @param options - Optional configuration for this decorator instance
 * @param options.separator - Separator character for permission segments (default: ":")
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
 * class UserController {
 *   // Exact permission match
 *   @HasPermissions(["idm:user:read"])
 *   async getUsers(req: Request, res: Response) {
 *     // Requires exact "idm:user:read" permission
 *   }
 *
 *   // Wildcard at the end - matches any action on idm:user
 *   @HasPermissions(["idm:user:*"])
 *   async manageUsers(req: Request, res: Response) {
 *     // Matches: idm:user:read, idm:user:write, idm:user:delete
 *   }
 *
 *   // Wildcard in the middle - matches any resource with read permission
 *   @HasPermissions(["idm:*:read"])
 *   async readAnyResource(req: Request, res: Response) {
 *     // Matches: idm:user:read, idm:group:read, idm:role:read
 *   }
 *
 *   // Multiple patterns (OR logic within decorator)
 *   @HasPermissions(["idm:user:read", "idm:admin:*"])
 *   async getUser(req: Request, res: Response) {
 *     // Requires "idm:user:read" OR any idm:admin permission
 *   }
 *
 *   // Custom separator for dot-notation permissions
 *   @HasPermissions(["app.users.*"], { separator: "." })
 *   async appUsers(req: Request, res: Response) {
 *     // Matches: app.users.read, app.users.write
 *   }
 *
 *   // Combined with other decorators (AND logic by default)
 *   @HasUserType([AuthUserType.ADMIN])
 *   @HasPermissions(["system:config:write"])
 *   async updateConfig(req: Request, res: Response) {
 *     // Must be ADMIN AND have system:config:write permission
 *   }
 *
 *   // OR logic with other decorators
 *   @OrAuth()
 *   @HasPermissions(["admin:*"])
 *   @HasGroups(["superusers"])
 *   async adminEndpoint(req: Request, res: Response) {
 *     // Has any admin permission OR belongs to superusers group
 *   }
 * }
 * ```
 *
 * @remarks
 * - Wildcards match exactly one segment (between separators)
 * - `idm:user:*` matches `idm:user:read` but NOT `idm:user:sub:read`
 * - The default separator is `:`, but can be changed via options
 * - User permissions are extracted from `req.authContext.user.permissions` or `req.user.permissions`
 *
 * @see {@link HasGroups} for group-based authorization
 * @see {@link OrAuth} for enabling OR logic between multiple decorators
 */
export function HasPermissions(
  permissions: Array<string>,
  options?: HasPermissionsOptions,
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    // Check if this decorator is disabled (useful for testing)
    if (options?.disabled) {
      console.warn(
        `[HasPermissions] Decorator disabled for ${String(propertyKey)}`,
      );
      return descriptor;
    }

    const separator = options?.separator ?? DEFAULT_SEPARATOR;

    // Store validator function for orchestration
    const validators: ValidatorMetadata[] =
      Reflect.getMetadata(
        MetadataKeys.AUTHORIZATION_VALIDATORS,
        target,
        propertyKey,
      ) || [];

    validators.push({
      name: `HasPermissions([${permissions.join(", ")}])`,
      validator: (req: Request): ValidationResult => {
        // Use AuthConfig to extract user context
        const userContext = AuthConfig.extractUserContext(req);

        if (!userContext) {
          return {
            passed: false,
            reason: options?.errorMessage || "No user context found",
          };
        }

        // Extract permissions from user context
        const userPermissions: string[] = userContext.permissions || [];

        if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
          return {
            passed: false,
            reason:
              options?.errorMessage || "No permissions found in user context",
          };
        }

        // Check if user has any matching permission
        const hasPermission = matchesPermissions(
          userPermissions,
          permissions,
          separator,
        );

        if (hasPermission) {
          return { passed: true };
        }

        return {
          passed: false,
          reason:
            options?.errorMessage ||
            `User permissions [${userPermissions.join(
              ", ",
            )}] do not match required [${permissions.join(", ")}]`,
        };
      },
      options,
    });

    Reflect.defineMetadata(
      MetadataKeys.AUTHORIZATION_VALIDATORS,
      validators,
      target,
      propertyKey,
    );

    // Create AND mode orchestrator by default
    // @OrAuth() will replace this with OR orchestrator if present
    const orchestratorMiddleware = createAuthOrchestrator(
      validators,
      false, // AND mode by default
      propertyKey,
    );

    Reflect.defineMetadata(
      MetadataKeys.AUTHORIZATION,
      [orchestratorMiddleware],
      target,
      propertyKey,
    );
  };
}
