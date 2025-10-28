import { Container } from "inversify";

export * as routes from "./src/routes";
export * as services from "./src/services";
export * as models from "./src/db/models";

export * as types from "./src/types";

export * as template from "./src/templates";

export { default as swaggerJson } from "./swagger.json";

export { IAMDefaultContainer } from "./src/inversify.config";
