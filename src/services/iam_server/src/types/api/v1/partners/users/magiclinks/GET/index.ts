import { Types } from "@giusmento/mangojs-core";
import { ResponseBodyData } from "..";
import { RequestDefaultParams } from "../..";

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
export type Params = RequestDefaultParams & { magiclink: string };

export type RequestBody = {};

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
