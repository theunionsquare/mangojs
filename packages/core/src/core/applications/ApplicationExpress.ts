import "reflect-metadata";
import express, { Application as ExApplication, Handler } from "express";
import { printTable, Table } from "console-table-printer";

import { MetadataKeys } from "../utils/metadata.keys";
import { IRouter } from "../decorators/http/handlers.decorator";

/**
 * Internal Express application wrapper that handles route registration
 * from decorated controller classes.
 *
 * @internal This class is used internally by ServerBuilder and should not
 * be instantiated directly.
 */
export class ApplicationExpress {
  private readonly _instance: ExApplication;
  private readonly _routes: unknown[];
  private readonly _apiTable: Table;
  private _routeIndex: number = 0;

  /**
   * Returns the underlying Express application instance.
   */
  get instance(): ExApplication {
    return this._instance;
  }

  /**
   * Creates a new ApplicationExpress instance.
   * @param routes - Array of controller classes decorated with @Controller
   */
  constructor(routes: unknown[]) {
    this._instance = express();
    this._routes = routes;
    this._routeIndex = 0;
    this._apiTable = new Table({
      columns: [
        { name: "index", alignment: "left" },
        { name: "method", alignment: "left" },
        { name: "api", alignment: "left" },
        { name: "handler", alignment: "left" },
      ],
      sort: (row1, row2) => +row2.api - +row1.api,
    });
  }

  /**
   * Registers all routes from the controller classes.
   * Reads metadata from decorators and creates Express routes accordingly.
   * Prints a table of registered routes to the console.
   */
  public registerRouters(): void {
    this._routes.forEach((routeClass) => {
      const RouteClass = routeClass as new () => { [handleName: string]: Handler };
      const controllerInstance = new RouteClass();

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        routeClass
      );

      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        routeClass
      );

      if (routers) {
        routers.forEach(({ method, path, handlerName }) => {
          const handles: Handler[] = [];

          // USE HANDLER TAG
          const useHandlers: Handler[] | undefined = Reflect.getMetadata(
            MetadataKeys.EXPRESS_USE_HANDLERS,
            RouteClass.prototype,
            handlerName
          );
          if (useHandlers !== undefined) {
            useHandlers.forEach((useHandler) => handles.push(useHandler));
          }

          // MIDDLEWARE DECORATOR
          const expressMiddlewares: Handler[] | undefined = Reflect.getMetadata(
            MetadataKeys.MIDDLEWARE,
            RouteClass.prototype,
            handlerName
          );
          if (expressMiddlewares !== undefined) {
            expressMiddlewares.forEach((middleware) =>
              handles.push(middleware)
            );
          }

          // AUTHORIZATION DECORATOR
          const authorizationMiddlewares: Handler[] | undefined = Reflect.getMetadata(
            MetadataKeys.AUTHORIZATION,
            RouteClass.prototype,
            handlerName
          );
          if (authorizationMiddlewares !== undefined) {
            authorizationMiddlewares.forEach((middleware) =>
              handles.push(middleware)
            );
          }

          // AUTHENTICATION DECORATOR
          const authenticationHandlers: Handler[] | undefined = Reflect.getMetadata(
            MetadataKeys.AUTHENTICATION_HANDLERS,
            RouteClass.prototype,
            handlerName
          );
          if (authenticationHandlers !== undefined) {
            authenticationHandlers.forEach((authenticationHandler) =>
              handles.push(authenticationHandler)
            );
          }

          // create route
          const exRouter = express.Router();

          exRouter[method](basePath + path, [
            ...handles.map((handler) => handler.bind(handler)),
            controllerInstance[String(handlerName)].bind(controllerInstance),
          ]);

          this._apiTable.addRow(
            {
              index: this._routeIndex,
              method: `${method.toLocaleUpperCase()}`,
              api: `${basePath + path}`,
              handler: `${RouteClass.name}.${String(handlerName)}`,
            },
            { color: "green" }
          );
          this._routeIndex = this._routeIndex + 1;

          this._instance.use("/", exRouter);
        });
      }
    });

    this._apiTable.printTable();
  }
}
