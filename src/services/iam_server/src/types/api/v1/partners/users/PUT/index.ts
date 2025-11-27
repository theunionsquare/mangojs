/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
import { Types } from "@giusmento/mangojs-core";
import { RequestDefaultParams } from "..";
import {
  PartnerUser,
  PartnerUserPut,
} from "../../../../../entities/partnerUser.type";

export type Params = RequestDefaultParams & { uid: string };

export type RequestBody = PartnerUserPut;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<PartnerUser>;
