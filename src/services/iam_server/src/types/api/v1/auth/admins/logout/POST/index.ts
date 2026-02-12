import { Types } from "@theunionsquare/mangojs-core";
import { AuthResponse } from "../../../../../../entities/auth.type";

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

export type ResponseBodyData = AuthResponse;

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
