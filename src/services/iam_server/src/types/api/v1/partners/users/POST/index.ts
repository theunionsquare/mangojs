/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@giusmento/mangojs-core";
import * as models from "../../../../../../db/models";
import { RequestDefaultParams, ResponseBodyData } from "..";

export type RequestParams = RequestDefaultParams & {};

export type RequestBody = Pick<
  models.IPartnerUser,
  "firstName" | "lastName" | "username" | "email" | "password" | "age"
> & {
  groups: [string];
};

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
