/**
 * Get all Partner Users
 */
import type { Types } from "@giusmento/mangojs-core/";
import { RequestDefaultParams, ResponseBodyData } from "..";

/*
 * REQUEST
 * @see
 *
 * REQUEST: GET /api/iam/v1/partners
 */

export type Params = RequestDefaultParams;

export type RequestBody = {};

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<
  Array<ResponseBodyData>
>;
