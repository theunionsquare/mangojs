import { models } from "../../..";
import { DeleteEntityResult } from "./common.type";

// Define PartnerUser type based on the PartnerUser model
export type User = models.User;

// Define UserPost type for creating new Users
export type UserPost = Pick<
  User,
  "firstName" | "lastName" | "email" | "password" | "groups"
>;

// Define UserDelete type for creating new Users
export type UserDelete = DeleteEntityResult;
