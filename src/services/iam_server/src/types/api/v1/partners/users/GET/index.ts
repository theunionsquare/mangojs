/**
 * Get all Partner Users
 */
import type { Types } from "@theunionsquare/mangojs-core/";
import {
  RequestDefaultParams,
  RequestDefaultParamsSingle,
  ResponseBodyData,
} from "..";

/*
 * REQUEST
 * @see
 *
 * REQUEST: GET /api/iam/v1/partners
 */

export type Params = RequestDefaultParams;
export type ParamsSingle = RequestDefaultParamsSingle;

export type RequestBody = {};

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<
  Array<ResponseBodyData>
>;

export type ResponseBodySingle =
  Types.v1.api.response.response<ResponseBodyData>;
