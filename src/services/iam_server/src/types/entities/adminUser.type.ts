import { models } from "../../..";
import { DeleteEntityResult } from "./common.type";

// Define PartnerUser type based on the PartnerUser model
export type AdminUser = Omit<models.AdminUser, "password">;

// Define AdminUserPost type for creating new AdminUsers
export type AdminUserPost = Pick<AdminUser, "firstName" | "lastName" | "email">;

// Define AdminUserDelete type for creating new AdminUsers
export type AdminUserDelete = DeleteEntityResult;
