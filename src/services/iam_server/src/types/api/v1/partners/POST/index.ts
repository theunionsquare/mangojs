/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@theunionsquare/mangojs-core";
import { ResponseBodyData } from "..";
import { PartnerPost } from "../../../../entities/partner.type";

export type RequestBody = PartnerPost;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
