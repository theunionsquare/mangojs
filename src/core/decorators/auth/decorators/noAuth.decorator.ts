import { MetadataKeys } from "../../../utils/metadata.keys";

/**
 * Method decorator that removes all authorization requirements from a method.
 *
 * This decorator is useful when you have a class-level authorization decorator
 * (like @ClassHasUserType) but want to make specific methods publicly accessible
 * without any authentication or authorization checks.
 *
 * @returns A method decorator that clears all authorization middleware
 *
 * @example
 * ```typescript
 * @Controller("/api/iam/v1/partners/users")
 * @ClassHasUserType([AuthUserType.PARTNER])
 * export class PartnerUserController {
 *   @Get("/")
 *   async getPartnerUsers(req: Request, res: Response) {
 *     // Protected: Only PARTNER users
 *   }
 *
 *   @Get("/magiclinks/:magiclink")
 *   @NoAuth()
 *   async getPartnerUserByMagicLink(req: Request, res: Response) {
 *     // Public: No authentication required
 *   }
 * }
 * ```
 *
 * @remarks
 * - Use this decorator to override class-level authorization
 * - Removes all authorization middleware from the method
 * - Should be used carefully as it makes endpoints publicly accessible
 */
export function NoAuth(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    // Clear any existing authorization metadata for this method
    Reflect.defineMetadata(
      MetadataKeys.AUTHORIZATION,
      [],
      target,
      propertyKey
    );
  };
}
