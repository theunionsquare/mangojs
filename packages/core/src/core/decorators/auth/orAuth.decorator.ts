import { MetadataKeys } from "../../utils/metadata.keys";

/**
 * Method decorator that enables OR logic for multiple authorization decorators.
 *
 * When applied, this decorator changes the behavior of multiple stacked authorization
 * decorators from AND logic (all must pass) to OR logic (at least one must pass).
 *
 * Without @OrAuth: All authorization decorators must pass (AND logic)
 * With @OrAuth: At least one authorization decorator must pass (OR logic)
 *
 * IMPORTANT: Due to decorator execution order, @OrAuth() must be placed at the TOP
 * of the decorator stack. Decorators execute bottom-to-top, so @OrAuth() executes last
 * but needs to set metadata that other decorators read during their execution.
 *
 * @returns A method decorator that enables OR mode for authorization
 *
 * @example
 * ```typescript
 * class PartnerUserController {
 *   // AND logic (default): Must be PARTNER AND have partner_admin group
 *   @HasUserType([AuthUserType.PARTNER])
 *   @HasGroups(["partner_admin"])
 *   async strictEndpoint(req: Request, res: Response) {
 *     // Both conditions must be true
 *   }
 *
 *   // OR logic: Must be ADMIN OR (PARTNER with partner_admin group)
 *   @OrAuth()  // MUST be at the top!
 *   @HasUserType([AuthUserType.ADMIN])
 *   @RequiresAccess({ [AuthUserType.PARTNER]: ["partner_admin"] })
 *   async flexibleEndpoint(req: Request, res: Response) {
 *     // At least one condition must be true
 *   }
 * }
 * ```
 *
 * @remarks
 * - MUST be placed at the TOP of the decorator stack (decorators execute bottom-to-top)
 * - Applies to ALL authorization decorators on the method
 * - Cannot mix AND/OR logic (it's either all AND or all OR)
 * - For complex logic like (A OR B) AND C, create separate endpoints
 */
export function OrAuth(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    // Since decorators execute bottom-to-top, @OrAuth executes LAST (even though it's written first)
    // At this point, all other auth decorators have already executed and registered their validators

    // Set the OR mode flag
    Reflect.defineMetadata(
      MetadataKeys.AUTHORIZATION_OR_MODE,
      true,
      target,
      propertyKey
    );

    console.log(`[OrAuth] OR mode enabled for method: ${String(propertyKey)}`);

    // Now we need to replace any AND-mode middleware with the OR orchestrator
    const validators = Reflect.getMetadata(
      MetadataKeys.AUTHORIZATION_VALIDATORS,
      target,
      propertyKey
    );

    if (validators && validators.length > 0) {
      console.log(`[OrAuth] Found ${validators.length} validators, creating OR orchestrator`);

      // Import the orchestrator
      const { createAuthOrchestrator } = require("../../authz/authOrchestrator");

      // Replace the middleware stack with the OR orchestrator
      const orchestratorMiddleware = createAuthOrchestrator(
        validators,
        true, // Use OR mode
        propertyKey
      );

      Reflect.defineMetadata(
        MetadataKeys.AUTHORIZATION,
        [orchestratorMiddleware],
        target,
        propertyKey
      );
    } else {
      console.warn(`[OrAuth] No validators found for method: ${String(propertyKey)}`);
    }

    return descriptor;
  };
}
