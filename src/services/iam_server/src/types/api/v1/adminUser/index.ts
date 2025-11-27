import { IGroup } from "../../../../db/models/Group.model";
import { IAdminUser } from "../../../../db/models/AdminUser.model";
export * as POST from "./POST";
export * as PUT from "./PUT";
export * as groups from "./groups";
export * as magiclinks from "./magiclinks";
export * as activate from "./activate";

export type ResponseBodyData = Pick<
  IAdminUser,
  | "uid"
  | "firstName"
  | "lastName"
  | "email"
  | "age"
  | "phoneNumber"
  | "status"
  | "isActive"
  | "isVerified"
  | "verifiedAt"
  | "disabledAt"
  | "createdAt"
  | "updatedAt"
> & {
  groups: Array<{ uid: string; name: string }>;
  magicLink?: string;
  magicLinkExpireDate?: Date;
};
