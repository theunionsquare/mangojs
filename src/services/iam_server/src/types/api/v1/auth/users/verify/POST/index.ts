import { Types } from "@theunionsquare/mangojs-core";
import { ResponseBodyData } from "../..";

/*
 *   REQUEST BODY
 *   @see
 *
 *   REQUEST: POST /api/auth/login
 */

export type RequestBody = {};

/*
 *   RESPONSE BODY
 *   @see
 *
 *   RESPONSE: 200 OK
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
