import { models } from "../../..";
import { DeleteEntityResult } from "./common.type";

// Define Partner type based on the Partner model
export type Partner = models.Partner;

// Define PartnerPost type for creating new Partners
export type PartnerPost = Pick<
  Partner,
  | "companyName"
  | "phoneNumber"
  | "email"
  | "addressStreet"
  | "addressCity"
  | "addressState"
  | "addressCountry"
  | "addressPostalCode"
  | "businessType"
  | "taxId"
>;

// Define PartnerDelete type for creating new Partners
export type PartnerDelete = DeleteEntityResult;
