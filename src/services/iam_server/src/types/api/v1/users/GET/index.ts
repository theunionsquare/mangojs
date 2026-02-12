/**
 * Get all Partner Users
 */
import type { Types } from "@theunionsquare/mangojs-core/";
import { ResponseBodyData } from "..";

/*
 * REQUEST
 * @see
 *
 * REQUEST: GET /api/iam/v1/partners
 */

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
