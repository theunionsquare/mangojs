import { models } from "../../..";
import { DeleteEntityResult } from "./common.type";

// Define PartnerUser type based on the PartnerUser model
export type PartnerUser = models.PartnerUser;

// Define PartnerUserPost type for creating new PartnerUsers
export type PartnerUserPost = Pick<
  PartnerUser,
  "firstName" | "lastName" | "email" | "password" | "groups" | "partner"
>;

// Define PartnerUserDelete type for creating new PartnerUsers
export type PartnerUserDelete = DeleteEntityResult;
