//import { authenticated } from "../auth/authentication";
//import { ExpressDecoratorFunction } from "../types/express.types";
//import { MetadataKeys } from "../utils/metadata.keys";

//const CustomDecoratorFactory = (
//  metadataKeys: MetadataKeys,
//  handler: ExpressDecoratorFunction
//) => {
//  // to do: add Fucntion type
//  return (): MethodDecorator => {
//    return (target, propertyKey) => {
//      const controllerClass = target.constructor;
//      const routers: Function[] = Reflect.hasMetadata(
//        metadataKeys,
//        controllerClass
//      )
//        ? Reflect.getMetadata(metadataKeys, target, propertyKey)
//        : [];
//      routers.push(handler);
//      Reflect.defineMetadata(metadataKeys, routers, target, propertyKey);
//    };
//  };
//};
//
//export const Authenticated = CustomDecoratorFactory(
//  MetadataKeys.AUTHENTICATION_HANDLERS,
//  authenticated
//);
//
