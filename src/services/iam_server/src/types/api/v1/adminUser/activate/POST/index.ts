import { Types } from "@giusmento/mangojs-core";
import { ResponseBodyData } from "..";
import { AdminUserActivate } from "../../../../../entities/adminUser.type";

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
export type Params = { magiclink: string };

export type RequestBody = AdminUserActivate;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
