import { Types } from "../../../";

/**
 * Class decorator that applies user type authorization to all methods in a class.
 *
 * This decorator sets default authorization requirements for all methods in the class
 * based on user type. Individual methods can override this by using method-level
 * decorators like @RequiresAccess or @NoAuth.
 *
 * @param userTypes - Array of user types that are allowed to access all methods in the class
 * @returns A class decorator that applies user type authorization to all methods
 *
 * @example
 * ```typescript
 * @Controller("/api/iam/v1/partners/users")
 * @ClassHasUserType([AuthUserType.ADMIN, AuthUserType.PARTNER])
 * export class PartnerUserController {
 *   @Get("/")
 *   async getPartnerUsers(req: Request, res: Response) {
 *     // Accessible by ADMIN or PARTNER users
 *   }
 *
 *   @Post("/")
 *   async addPartnerUser(req: Request, res: Response) {
 *     // Accessible by ADMIN or PARTNER users
 *   }
 *
 *   @Get("/admin-only")
 *   @RequiresAccess({
 *     [AuthUserType.ADMIN]: ["admin_*"]
 *   })
 *   async adminOnlyEndpoint(req: Request, res: Response) {
 *     // Override: Only ADMIN with specific groups
 *   }
 * }
 * ```
 *
 * @remarks
 * - Applied at the class level, affects all methods by default
 * - Method-level decorators can override the class-level authorization
 * - Only checks user type, not groups. For group validation, use method-level @RequiresAccess
 */
export function ClassHasUserType(
  userTypes: Types.enums.AuthUserType[]
): ClassDecorator {
  return function <TFunction extends Function>(target: TFunction): TFunction {
    // Get all method names from the prototype
    const prototype = target.prototype;
    const methodNames = Object.getOwnPropertyNames(prototype).filter(
      (name) => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
        return (
          name !== "constructor" &&
          descriptor &&
          typeof descriptor.value === "function"
        );
      }
    );

    // Apply HasUserType to each method
    methodNames.forEach((methodName) => {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
      if (descriptor) {
        // Import HasUserType dynamically to avoid circular dependency
        const { HasUserType } = require("./hasUserType.decorator");
        const methodDecorator = HasUserType(userTypes);
        methodDecorator(prototype, methodName, descriptor);
      }
    });

    return target;
  };
}
