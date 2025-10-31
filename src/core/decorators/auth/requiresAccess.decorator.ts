import { NextFunction, Request, RequestHandler, Response } from "express";
import { errors } from "../..";
import { MetadataKeys } from "../../utils/metadata.keys";
import { Types } from "../../";

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
 * - No wildcard performs exact match
 *
 * @param accessMap - Object mapping user types to their allowed groups (with wildcard support)
 * @returns A method decorator that adds authorization middleware to the target method
 *
 * @example
 * ```typescript
 * class PartnerUserController {
 *   @RequiresAccess({
 *     [AuthUserType.ADMIN]: ["admin_*"],           // Any admin group
 *     [AuthUserType.PARTNER]: ["partner_admin"]    // Exact match
 *   })
 *   async getPartnerUsers(req: Request, res: Response) {
 *     // Only accessible by:
 *     // - ADMIN users with any group starting with "admin_"
 *     // - PARTNER users with exact "partner_admin" group
 *   }
 *
 *   @RequiresAccess({
 *     [AuthUserType.ADMIN]: ["*"]                  // Any group
 *   })
 *   async publicEndpoint(req: Request, res: Response) {
 *     // ADMIN users with any group can access
 *   }
 * }
 * ```
 */
export function RequiresAccess(
  accessMap: AccessRequirements
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const middlewares: RequestHandler[] =
      Reflect.getMetadata(MetadataKeys.AUTHORIZATION, target, propertyKey) ||
      [];

    const middleware: RequestHandler = (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (
        typeof req === "object" &&
        req !== null &&
        "user" in req &&
        req.user &&
        typeof req.user === "object" &&
        req.user !== null &&
        "userType" in req.user &&
        "groups" in req.user &&
        typeof req.user.userType === "string" &&
        Array.isArray(req.user.groups)
      ) {
        const userType = req.user.userType as Types.enums.AuthUserType;
        const userGroups = req.user.groups.map((g: any) => g.name);

        // Check if user type is in access map
        const allowedPatterns = accessMap[userType];

        if (!allowedPatterns) {
          // User type not allowed at all
          console.log(`User type ${userType} not allowed`);
          errors.errorHandler(res, new Error("NOT_AUTHORIZED"));
          return;
        }

        // Check if user has at least one group matching the allowed patterns
        const hasAllowedGroup = userGroups.some(userGroup =>
          allowedPatterns.some(pattern => matchesPattern(userGroup, pattern))
        );

        if (hasAllowedGroup) {
          next();
        } else {
          console.log(
            `User type ${userType} does not have required groups. Has: ${userGroups.join(", ")}, Patterns: ${allowedPatterns.join(", ")}`
          );
          errors.errorHandler(res, new Error("NOT_AUTHORIZED"));
        }
      } else {
        console.log("Not allowed will be rejected - missing user or groups");
        errors.errorHandler(res, new Error("NOT_AUTHORIZED"));
      }
    };

    middlewares.push(middleware);
    Reflect.defineMetadata(
      MetadataKeys.AUTHORIZATION,
      middlewares,
      target,
      propertyKey
    );
  };
}
