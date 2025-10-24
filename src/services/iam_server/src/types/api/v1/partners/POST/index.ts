/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@giusmento/mangojs-core";
import { ResponseBodyData } from "..";
import * as models from "../../../../../db/models";

export type RequestBody = Pick<
  models.IPartner,
  | "companyName"
  | "email"
  | "phoneNumber"
  | "businessType"
  | "taxId"
  | "addressStreet"
  | "addressCity"
  | "addressState"
  | "addressCountry"
  | "addressPostalCode"
  | "websiteUrl"
  | "logoUrl"
  | "subscriptionTier"
  | "contractStartDate"
  | "contractEndDate"
>;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
