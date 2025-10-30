import * as models from "../../../../db/models";
export * as GET from "./GET";
export * as POST from "./POST";
export * as PUT from "./PUT";
export * as groups from "./groups";
export * as magiclinks from "./magiclinks";
export * as activate from "./activate";

export type ResponseBodyData = Pick<
  models.IUser,
  | "uid"
  | "firstName"
  | "lastName"
  | "username"
  | "email"
  | "age"
  | "phoneNumber"
  | "status"
  | "isActive"
  | "isVerified"
  | "magicLink"
  | "magicLinkExpireDate"
  | "verifiedAt"
  | "disabledAt"
  | "createdAt"
  | "updatedAt"
> & {
  groups: Array<
    Pick<models.IGroup, "uid" | "name" | "description" | "permissions">
  >;
};
