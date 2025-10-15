import { MetadataKeys } from '../utils/metadata.keys'

/**
 * HTTP VERB ENUM
 */
export enum Methods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

/**
 * Router interface
 */
export interface IRouter {
    method: Methods
    path: string
    handlerName: string | symbol
}

/**
 * http base method decorator
 * @param method
 * @returns
 */
const methodDecoratorFactory = (method: Methods) => {
    return (path: string): MethodDecorator => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor
            const routers: IRouter[] = Reflect.hasMetadata(
                MetadataKeys.ROUTERS,
                controllerClass
            )
                ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
                : []
            routers.push({
                method,
                path,
                handlerName: propertyKey,
            })
            Reflect.defineMetadata(
                MetadataKeys.ROUTERS,
                routers,
                controllerClass
            )
        }
    }
}

// GET
export const Get = methodDecoratorFactory(Methods.GET)
// POST
export const Post = methodDecoratorFactory(Methods.POST)
// PUT
export const Put = methodDecoratorFactory(Methods.PUT)
// DELETE
export const Delete = methodDecoratorFactory(Methods.DELETE)

/**
 * Http decorator factory
 * @param metadataKeys
 * @returns
 */
const UseDecoratorFactory = (metadataKeys: MetadataKeys) => {
    return (handler: Function): MethodDecorator => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor
            const routers: Function[] = Reflect.hasMetadata(
                metadataKeys,
                controllerClass
            )
                ? Reflect.getMetadata(metadataKeys, target, propertyKey)
                : []
            routers.push(handler)
            Reflect.defineMetadata(metadataKeys, routers, target, propertyKey)
        }
    }
}

// export factory
export const Use = UseDecoratorFactory(MetadataKeys.EXPRESS_USE_HANDLERS)
