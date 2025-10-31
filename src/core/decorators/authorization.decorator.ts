import { NextFunction, Request, RequestHandler, Response } from "express";
import { MetadataKeys } from "../utils/metadata.keys";
import { inject, injectable } from "inversify";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import { IAuthorization } from "../auth/IAuthorization";
import { errors } from "..";
import { deprecated } from "./deprecated.decorator";

@injectable()
export class AuthorizationDecorators {
  @inject(INVERSITY_TYPES.AuthorizationContext)
  private authService!: IAuthorization;

  @deprecated("deprecated")
  public IsAuthorized(): MethodDecorator {
    const authService = this.authService;
    return function (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const middlewares: RequestHandler[] =
        Reflect.getMetadata(MetadataKeys.AUTHORIZATION, target, propertyKey) ||
        [];
      // isAuthorized function
      const middleware: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          console.log("target:", target, propertyKey, descriptor);
          console.log("Start IsAuthorized decorator");
          await authService.validateAdminCredentials(req, res);
          req.headers["isAuthorized"] = "true";
          console.log("End IsAuthorized decorator");
          next();
        } catch (err) {
          errors.errorHandler(res, err as Error);
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
}
