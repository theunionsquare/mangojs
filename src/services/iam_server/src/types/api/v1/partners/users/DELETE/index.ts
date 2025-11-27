/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
import { Types } from "@giusmento/mangojs-core";
import * as models from "../../../../../../db/models";
import { RequestDefaultParams } from "..";
import { PartnerUser } from "../../../../../entities/partnerUser.type";

export type Params = RequestDefaultParams & { uid: string };

export type RequestBody = undefined;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<{ ok: boolean }>;
