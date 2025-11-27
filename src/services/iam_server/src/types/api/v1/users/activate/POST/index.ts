import { Types } from "@giusmento/mangojs-core";
import { ResponseBodyData } from "..";
import { userActivate } from "../../../../../entities/user.type";

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
export type Params = { magiclink: string };

export type RequestBody = userActivate;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
