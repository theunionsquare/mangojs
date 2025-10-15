import { NextFunction, Request, RequestHandler, Response } from 'express'
import { errors } from '../..'
import { MetadataKeys } from '../../utils/metadata.keys'

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
