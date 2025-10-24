/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@giusmento/mangojs-core";
import { IAdminUser } from "../../../../../db/models/AdminUser.model";
import { ResponseBodyData } from "..";

export type RequestBody = Pick<
  IAdminUser,
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
