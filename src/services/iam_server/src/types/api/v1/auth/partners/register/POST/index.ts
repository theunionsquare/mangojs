import { Types } from "@giusmento/mangojs-core";
import { ResponseBodyData } from "../..";
import { AuthPartnerRegister } from "../../../../../../entities/auth.type";

/*
 *   REQUEST BODY
 *   @see
 *
 *   REQUEST: POST /api/auth/register
 */

export type RequestBody = AuthPartnerRegister;

/*
 *   RESPONSE BODY
 *   @see
 *
 *   RESPONSE: 200 OK
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
