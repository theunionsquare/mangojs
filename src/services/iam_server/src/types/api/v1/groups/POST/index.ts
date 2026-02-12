/**
 * POST group
 */
import type { Types } from "@theunionsquare/mangojs-core/";
import { ResponseBodyData } from "..";
import { GroupPost } from "../../../../entities/group.type";

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/groups
 */

export type RequestBody = GroupPost;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
