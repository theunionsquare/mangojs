import "reflect-metadata";
import express, { Application as ExApplication, Handler } from "express";
import { printTable, Table } from "console-table-printer";

import { MetadataKeys } from "../utils/metadata.keys";
import { IRouter } from "../decorators/handlers.decorator";

// To be migrated to ES6
const passport = require("passport");

export class ApplicationExpress {
  private readonly _instance: ExApplication;
  private readonly _routes: any[];
  private readonly _apiTable;
  private _routeIndex: number = 0;

  get instance(): ExApplication {
    return this._instance;
  }
  constructor(routes: any[]) {
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
      sort: (row1, row2) => +row2.api - +row1.api, // desc sorting order of rows (optional),
    });
  }

  public registerRouters() {
    // this._instance.get("/", (req, res) => {
    //   res.json({ message: "Hello World!" });
    // });

    const info: Array<{ method: string; api: string; handler: string }> = [];

    this._routes.forEach((routeClass) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new routeClass() as any;

      // get decorator with key BASE_PATH
      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        routeClass
      );
      // get decorator with key BASE_PATH
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        routeClass
      );
      if (routers) {
        routers.forEach(({ method, path, handlerName }) => {
          const handles: any[] = [];

          // for (let key in MetadataKeys) {
          //   if (isNaN(Number(key))) {
          //     console.log(key, "qwe");
          //   }
          // }

          // USE HANDLER TAG
          const useHandlers: Function[] = Reflect.getMetadata(
            MetadataKeys.EXPRESS_USE_HANDLERS,
            routeClass.prototype,
            handlerName
          );
          // push to handles
          if (useHandlers !== undefined) {
            useHandlers.forEach((useHandler) => handles.push(useHandler));
          }

          // MIDDLEWARE DECORATOR
          const expressMiddlewares: Function[] = Reflect.getMetadata(
            MetadataKeys.MIDDLEWARE,
            routeClass.prototype,
            handlerName
          );
          // push all express middleware
          if (expressMiddlewares !== undefined) {
            expressMiddlewares.forEach((middleware) =>
              handles.push(middleware)
            );
          }

          // AUTHORIZATION DECORATOR
          const authorizationMiddlewares: Function[] = Reflect.getMetadata(
            MetadataKeys.AUTHORIZATION,
            routeClass.prototype,
            handlerName
          );
          // push all express middleware
          if (authorizationMiddlewares !== undefined) {
            authorizationMiddlewares.forEach((middleware) =>
              handles.push(middleware)
            );
          }

          // AUTHENTICATION DECORATOR
          const authenticationHandlers: Function[] = Reflect.getMetadata(
            MetadataKeys.AUTHENTICATION_HANDLERS,
            routeClass.prototype,
            handlerName
          );
          // push
          if (authenticationHandlers !== undefined) {
            authenticationHandlers.forEach((authenticationHandler) =>
              handles.push(authenticationHandler)
            );
          }

          // create route
          const exRouter = express.Router();

          exRouter[method](basePath + path, [
            ...handles.map((handler) => {
              return handler.bind(handler);
            }),
            // authenticated !== undefined ? authenticated : undefined,
            controllerInstance[String(handlerName)].bind(controllerInstance),
          ]);

          this._apiTable.addRow(
            {
              index: this._routeIndex,
              method: `${method.toLocaleUpperCase()}`,
              api: `${basePath + path}`,
              handler: `${routeClass.name}.${String(handlerName)}`,
            },
            { color: "green" }
          );
          this._routeIndex = this._routeIndex + 1;

          // set use
          this._instance.use("/", exRouter);
        });
      }
    });

    this._apiTable.printTable();
    //console.table(info);
  }
}
