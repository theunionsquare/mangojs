import * as core from "../../../../../../";

export * as login from "./login";
export * as logout from "./logout";
export * as register from "./register";
export * as verify from "./verify";

export type ResponseBodyData = {
  authenticated: boolean;
  message: string;
  partner?: { uid: string; name: string };
  user: core.types.entities.authUser.User;
};
