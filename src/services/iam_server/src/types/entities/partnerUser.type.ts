import { models } from "../../..";
import { DeleteEntityResult } from "./common.type";

// Define PartnerUser type based on the PartnerUser model
export type PartnerUser = Pick<
  models.PartnerUser,
  | "uid"
  | "firstName"
  | "lastName"
  | "email"
  | "age"
  | "phoneNumber"
  | "status"
  | "isActive"
  | "isVerified"
  | "disabledAt"
  | "createdAt"
  | "updatedAt"
  | "verifiedAt"
> & {
  groups?: Array<{
    uid: string;
    name: string;
  }>;
  magicLink?: string;
  magicLinkExpireDate?: Date;
  partner?: { uid: string };
};

// Define PartnerUserPost type for creating new PartnerUsers
export type PartnerUserPost = Pick<
  PartnerUser,
  "firstName" | "lastName" | "email"
> & {
  password: string;
} & {
  groups?: Array<{ uid: string }>;
};

export type PartnerUserPut = Partial<
  Pick<models.IPartnerUser, "firstName" | "lastName" | "phoneNumber">
>;

export type PartnerUserActivate = {
  firstName: string;
  lastName: string;
  password: string;
};

// Define PartnerUserDelete type for creating new PartnerUsers
export type PartnerUserDelete = DeleteEntityResult;
