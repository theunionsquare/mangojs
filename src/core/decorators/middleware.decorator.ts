import { RequestHandler } from 'express'
import { MetadataKeys } from '../utils/metadata.keys'

/**
 * Generic Middleware decoratoor
 * @param middleware function in the form (req: Request, res: Response, next: NextFunction) => {
        next();
    })
 * @returns 
 */
export function Middleware(middleware: RequestHandler): MethodDecorator {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const middlewares: RequestHandler[] =
            Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, propertyKey) ||
            []
        middlewares.push(middleware)
        Reflect.defineMetadata(
            MetadataKeys.MIDDLEWARE,
            middlewares,
            target,
            propertyKey
        )
    }
}
