import { NextFunction, Request, RequestHandler, Response } from "express";
import { errors } from "../..";
import { MetadataKeys } from "../../utils/metadata.keys";
import { Types } from "../../";

/**
 * Method decorator that restricts access to routes based on user type.
 *
 * This decorator creates an authorization middleware that checks if the authenticated
 * user's type matches one of the allowed types. If the user type doesn't match any
 * of the allowed types, the request is rejected with a NOT_AUTHORIZED error.
 *
 * @param userTypes - Array of allowed user types
 * @returns A method decorator that adds authorization middleware to the target method
 *
 * @example
 * ```typescript
 * class UserController {
 *   @HasUserType([AuthUserType.ADMIN])
 *   async deleteUser(req: Request, res: Response) {
 *     // Only accessible by users with ADMIN type
 *   }
 *
 *   @HasUserType([AuthUserType.ADMIN, AuthUserType.MODERATOR])
 *   async updateUser(req: Request, res: Response) {
 *     // Accessible by users with ADMIN or MODERATOR type
 *   }
 * }
 * ```
 */
export function HasUserType(
  userTypes: Types.enums.AuthUserType[]
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const middlewares: RequestHandler[] =
      Reflect.getMetadata(MetadataKeys.AUTHORIZATION, target, propertyKey) ||
      [];
    // isAuthorized function
    const middleware: RequestHandler = (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      console.log(
        "Decorator HasUserType for function '",
        descriptor.value,
        ". Requires: ",
        userTypes.join(", ")
      );
      if (
        typeof req === "object" &&
        req !== null &&
        "user" in req &&
        req.user &&
        typeof req.user === "object" &&
        req.user !== null &&
        "userType" in req.user &&
        typeof req.user.userType === "string" &&
        userTypes.includes(req.user.userType as Types.enums.AuthUserType)
      ) {
        //console.log(userGroups, groups, "Check groups");
        // search if the user has an allowed group
        next();
      } else {
        console.log("Not allowed will be rejected");
        // reject
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
