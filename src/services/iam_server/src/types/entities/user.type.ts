import { models } from "../../..";
import { DeleteEntityResult } from "./common.type";

// Define PartnerUser type based on the PartnerUser model
export type User = models.User;

export type userActivate = {
  firstName: string;
  lastName: string;
  password: string;
};

// Define UserPost type for creating new Users
export type UserPost = Pick<
  User,
  "firstName" | "lastName" | "email" | "groups"
> & { password?: string };

export type UserPut = Partial<
  Pick<models.IUser, "firstName" | "lastName" | "phoneNumber">
>;

// Define UserDelete type for creating new Users
export type UserDelete = DeleteEntityResult;
