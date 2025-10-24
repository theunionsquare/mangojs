/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
import { Types } from "@giusmento/mangojs-core";
import { IAdminUser } from "../../../../../db/models/AdminUser.model";

export type Params = { uid: string };

export type RequestBody = Partial<
  Pick<IAdminUser, "firstName" | "lastName" | "phoneNumber">
>;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<{ ok: boolean }>;
