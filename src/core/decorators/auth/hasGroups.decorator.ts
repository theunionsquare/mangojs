import { NextFunction, Request, RequestHandler, Response } from 'express'
import { errors } from '../..'
import { MetadataKeys } from '../../utils/metadata.keys'

/**
 * Method decorator that restricts access to routes based on user groups.
 *
 * This decorator creates an authorization middleware that checks if the authenticated
 * user belongs to at least one of the specified groups. If the user doesn't have any
 * of the required groups, the request is rejected with a NOT_AUTHORIZED error.
 *
 * @param groups - Array of group names that are allowed to access the route
 * @returns A method decorator that adds authorization middleware to the target method
 *
 * @example
 * ```typescript
 * class UserController {
 *   @HasGroups(["admin", "moderator"])
 *   async deleteUser(req: Request, res: Response) {
 *     // Only accessible by users with "admin" or "moderator" group
 *   }
 *
 *   @HasGroups(["premium_user"])
 *   async getPremiumContent(req: Request, res: Response) {
 *     // Only accessible by users with "premium_user" group
 *   }
 * }
 * ```
 *
 * @remarks
 * This decorator only checks groups and does not validate user type.
 * For combined user type and group validation, consider using @RequiresAccess instead.
 */
export function HasGroups(groups: Array<string>): MethodDecorator {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const middlewares: RequestHandler[] =
            Reflect.getMetadata(
                MetadataKeys.AUTHORIZATION,
                target,
                propertyKey
            ) || []
        // isAuthorized function
        const middleware: RequestHandler = (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            if (
                typeof req === 'object' &&
                req !== null &&
                'user' in req &&
                req.user &&
                typeof req.user === 'object' &&
                req.user !== null &&
                'groups' in req.user &&
                Array.isArray(req.user.groups) &&
                req.user.groups.length > 0
            ) {
                const userGroups = req.user.groups
                //console.log(userGroups, groups, "Check groups");
                // search if the user has an allowed group
                if (
                    userGroups.filter((gr) => groups.includes(gr.name)).length >
                    0
                ) {
                    next()
                } else {
                    // reject
                    errors.errorHandler(res, new Error('NOT_AUTHORIZED'))
                }
            } else {
                console.log('Not allowed will be rejected')
                // reject
                errors.errorHandler(res, new Error('NOT_AUTHORIZED'))
            }
        }
        middlewares.push(middleware)
        Reflect.defineMetadata(
            MetadataKeys.AUTHORIZATION,
            middlewares,
            target,
            propertyKey
        )
    }
}
