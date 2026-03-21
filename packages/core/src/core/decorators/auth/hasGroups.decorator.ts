import { Request } from "express";
import { MetadataKeys } from "../../utils/metadata.keys";
import {
  ValidatorMetadata,
  createAuthOrchestrator,
  ValidationResult,
} from "../../authz/authOrchestrator";
import { AuthConfig, DecoratorOptions } from "../../authz/authConfig";

/**
 * Method decorator that restricts access to routes based on user groups.
 *
 * This decorator creates an authorization middleware that checks if the authenticated
 * user belongs to at least one of the specified groups. If the user doesn't have any
 * of the required groups, the request is rejected with a NOT_AUTHORIZED error.
 *
 * When used with @OrAuth(), this decorator can be combined with other auth decorators
 * using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
 * AND logic (all must pass).
 *
 * @param groups - Array of group names that are allowed to access the route
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
 * class UserController {
 *   // Single decorator with multiple groups (OR within decorator)
 *   @HasGroups(["admin", "moderator"])
 *   async deleteUser(req: Request, res: Response) {
 *     // Accessible by users with "admin" OR "moderator" group
 *   }
 *
 *   // Single group requirement
 *   @HasGroups(["premium_user"])
 *   async getPremiumContent(req: Request, res: Response) {
 *     // Only accessible by users with "premium_user" group
 *   }
 *
 *   // With custom error message
 *   @HasGroups(["admin"], {
 *     errorMessage: "Only administrators can access this endpoint"
 *   })
 *   async adminOnlyEndpoint(req: Request, res: Response) {}
 *
 *   // With custom error handler
 *   @HasGroups(["premium_user"], {
 *     errorHandler: (res, error) => {
 *       res.status(403).json({ error: "Premium membership required" });
 *     }
 *   })
 *   async premiumEndpoint(req: Request, res: Response) {}
 *
 *   // Disabled for testing
 *   @HasGroups(["admin"], {
 *     disabled: process.env.NODE_ENV === "test"
 *   })
 *   async testEndpoint(req: Request, res: Response) {}
 *
 *   // AND logic (default): Must be PARTNER AND have partner_admin group
 *   @HasUserType([AuthUserType.PARTNER])
 *   @HasGroups(["partner_admin"])
 *   async restrictedEndpoint(req: Request, res: Response) {
 *     // User must be PARTNER AND have partner_admin group
 *   }
 *
 *   // OR logic: Must have admin group OR moderator group (with different types)
 *   @OrAuth()
 *   @HasGroups(["admin"])
 *   @HasGroups(["moderator"])
 *   async flexibleEndpoint(req: Request, res: Response) {
 *     // User must have admin OR moderator group
 *   }
 *
 *   // OR logic: ADMIN user OR user with special_access group
 *   @OrAuth()
 *   @HasUserType([AuthUserType.ADMIN])
 *   @HasGroups(["special_access"])
 *   async specialEndpoint(req: Request, res: Response) {
 *     // ADMIN (any group) OR any user with special_access group
 *   }
 * }
 * ```
 *
 * @remarks
 * - By default, multiple auth decorators use AND logic (all must pass)
 * - Use @OrAuth() to enable OR logic (at least one must pass)
 * - This decorator only checks groups and does not validate user type
 * - For combined user type and group validation, use @RequiresAccess instead
 *
 * @see {@link OrAuth} for enabling OR logic between multiple decorators
 * @see {@link RequiresAccess} for combined user type and group validation with wildcard support
 */
export function HasGroups(
  groups: Array<string>,
  options?: DecoratorOptions
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    // Check if this decorator is disabled (useful for testing)
    if (options?.disabled) {
      console.warn(`[HasGroups] Decorator disabled for ${String(propertyKey)}`);
      return descriptor;
    }

    // ALWAYS store validator function
    // This allows @OrAuth() to use OR orchestrator if present
    const validators: ValidatorMetadata[] =
      Reflect.getMetadata(
        MetadataKeys.AUTHORIZATION_VALIDATORS,
        target,
        propertyKey
      ) || [];

    validators.push({
      name: `HasGroups([${groups.join(", ")}])`,
      validator: (req: Request): ValidationResult => {
        // Use AuthConfig to extract user context
        const userContext = AuthConfig.extractUserContext(req);

        if (!userContext || !userContext.groups) {
          return {
            passed: false,
            reason: options?.errorMessage || "No groups found in user context",
          };
        }

        const userGroups = userContext.groups;
        const hasGroup = userGroups.some((g: string) => groups.includes(g));

        if (hasGroup) {
          return { passed: true };
        }

        return {
          passed: false,
          reason:
            options?.errorMessage ||
            `User has groups [${userGroups.join(
              ", "
            )}] but needs one of [${groups.join(", ")}]`,
        };
      },
      options, // Store options for orchestrator
    });

    Reflect.defineMetadata(
      MetadataKeys.AUTHORIZATION_VALIDATORS,
      validators,
      target,
      propertyKey
    );

    // Create AND mode orchestrator by default
    // @OrAuth() will replace this with OR orchestrator if present
    const orchestratorMiddleware = createAuthOrchestrator(
      validators,
      false, // AND mode by default
      propertyKey
    );

    Reflect.defineMetadata(
      MetadataKeys.AUTHORIZATION,
      [orchestratorMiddleware],
      target,
      propertyKey
    );
  };
}
