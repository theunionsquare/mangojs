import * as core from "@theunionsquare/mangojs-core";

export * as login from "./login";
export * as logout from "./logout";
export * as register from "./register";
export * as verify from "./verify";

export type ResponseBodyData = {
  authenticated: boolean;
  message: string;
  user: core.Types.entities.AuthUser;
};
