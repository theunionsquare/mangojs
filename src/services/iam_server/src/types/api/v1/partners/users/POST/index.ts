/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@giusmento/mangojs-core";
import { RequestDefaultParams, ResponseBodyData } from "..";
import { PartnerUserPost } from "../../../../../entities/partnerUser.type";

export type RequestParams = RequestDefaultParams & {};

export type RequestBody = PartnerUserPost;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
