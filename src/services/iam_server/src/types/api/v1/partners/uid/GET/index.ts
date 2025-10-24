/**
 * Get single Partner by uid
 */
import type { Types } from "@giusmento/mangojs-core/";
import * as models from "../../../../../../db/models";

/*
 * REQUEST
 * @see
 *
 * REQUEST: GET /api/iam/v1/partners/:uid
 */

export type Params = { uid: string };

export type RequestBody = {};

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBodyData = models.IPartner;

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
