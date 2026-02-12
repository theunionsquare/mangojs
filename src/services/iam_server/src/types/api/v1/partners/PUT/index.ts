/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
import { Types } from "@theunionsquare/mangojs-core";
import { PartnerPut } from "../../../../entities/partner.type";

export type Params = { uid: string };

export type RequestBody = PartnerPut;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<{ ok: boolean }>;
