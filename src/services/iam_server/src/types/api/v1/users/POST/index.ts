/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@theunionsquare/mangojs-core";
import { ResponseBodyData } from "..";
import { UserPost } from "../../../../entities/user.type";

export type RequestBody = UserPost;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
