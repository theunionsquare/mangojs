import * as core from "@giusmento/mangojs-core";

export * as login from "./login";

export type ResponseBodyData = {
  authenticated: boolean;
  message: string;
  user: core.Types.entities.AuthUser;
};
