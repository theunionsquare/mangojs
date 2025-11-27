/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
import { Types } from "@giusmento/mangojs-core";
import { AdminUserPut } from "../../../../entities/adminUser.type";

export type Params = { uid: string };

export type RequestBody = AdminUserPut;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<{ ok: boolean }>;
