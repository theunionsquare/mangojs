/**
 * Get Admin Group
 */
import type { Types } from "@giusmento/mangojs-core/";
import { ResponseBodyData } from "..";
import { GroupPost } from "../../../../../entities/group.type";

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/groups/admin
 */

export type RequestBody = GroupPost;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
