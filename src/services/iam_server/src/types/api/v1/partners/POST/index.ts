/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@giusmento/mangojs-core";
import { ResponseBodyData } from "..";
import { IPartnerUser } from "../../../../../db/models/PartnerUser.model";

export type RequestBody = Pick<
  IPartnerUser,
  "firstName" | "lastName" | "username" | "email" | "age"
> & {
  groups: [string];
};

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
