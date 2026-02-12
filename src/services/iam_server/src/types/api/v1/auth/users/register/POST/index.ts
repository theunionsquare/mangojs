import { Types } from "@theunionsquare/mangojs-core";
import { ResponseBodyData } from "../..";
import { models } from "../../../../../../../..";
import { AuthUserRegister } from "../../../../../../entities/auth.type";

/*
 *   REQUEST BODY
 *   @see
 *
 *   REQUEST: POST /api/auth/register
 */

export type RequestBody = AuthUserRegister;

/*
 *   RESPONSE BODY
 *   @see
 *
 *   RESPONSE: 200 OK
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
