import { Types } from "@theunionsquare/mangojs-core";
import { ResponseBodyData } from "..";
import { RequestDefaultParams } from "../..";
import { PartnerUserActivate } from "../../../../../../entities/partnerUser.type";

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
export type Params = RequestDefaultParams & { magiclink: string };

export type RequestBody = PartnerUserActivate;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
