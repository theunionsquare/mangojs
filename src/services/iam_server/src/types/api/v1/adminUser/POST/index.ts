/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@theunionsquare/mangojs-core";
import { IAdminUser } from "../../../../../db/models/AdminUser.model";
import { ResponseBodyData } from "..";
import { AdminUserPost } from "../../../../entities/adminUser.type";

export type RequestBody = AdminUserPost;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
