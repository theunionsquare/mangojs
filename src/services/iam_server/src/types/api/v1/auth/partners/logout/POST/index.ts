import { Types } from "@theunionsquare/mangojs-core";

/*
 *   REQUEST BODY
 *   @see
 *
 *   REQUEST: POST /api/auth/logout
 */

export type RequestBody = {};

/*
 *   RESPONSE BODY
 *   @see
 *
 *   RESPONSE: 200 OK
 */

export type ResponseBodyData = { authenticated: boolean; message: string };

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
