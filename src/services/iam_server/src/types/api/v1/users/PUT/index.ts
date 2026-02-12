/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
import { Types } from "@theunionsquare/mangojs-core";
import { UserPut } from "../../../../entities/user.type";

export type Params = { uid: string };

export type RequestBody = UserPut;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<{ ok: boolean }>;
