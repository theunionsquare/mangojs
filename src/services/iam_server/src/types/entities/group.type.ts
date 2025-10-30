import { models } from "../../..";
import { DeleteEntityResult } from "./common.type";

// Define Group type based on the Group model
export type Group = models.Group;

// Define GroupPost type for creating new groups
export type GroupPost = Pick<
  Group,
  "name" | "description" | "permissions" | "default" | "default"
>;

// Define GroupPost type for creating new groups
export type GroupDelete = DeleteEntityResult;
