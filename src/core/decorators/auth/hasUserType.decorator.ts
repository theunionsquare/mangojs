import { NextFunction, Request, RequestHandler, Response } from 'express'
import { errors } from '../..'
import { MetadataKeys } from '../../utils/metadata.keys'
import { UserType } from '../../types/auth/UserType'

export function HasUserType(userType: UserType): MethodDecorator {
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
            console.log('Chack hasUserType', userType)
            if (
                typeof req === 'object' &&
                req !== null &&
                'user' in req &&
                req.user &&
                typeof req.user === 'object' &&
                req.user !== null &&
                'userType' in req.user &&
                typeof req.user.userType === 'string' &&
                req.user.userType == userType
            ) {
                //console.log(userGroups, groups, "Check groups");
                // search if the user has an allowed group
                next()
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
