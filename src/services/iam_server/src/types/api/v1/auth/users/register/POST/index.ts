import { Types } from "@giusmento/mangojs-core";
import { ResponseBodyData } from "../..";
import { models } from "../../../../../../../..";

/*
 *   REQUEST BODY
 *   @see
 *
 *   REQUEST: POST /api/auth/register
 */

export type RequestBody = Pick<
  models.IUser,
  "firstName" | "lastName" | "email" | "password" | "age" | "phoneNumber"
>;

/*
 *   RESPONSE BODY
 *   @see
 *
 *   RESPONSE: 200 OK
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
