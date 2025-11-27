/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@giusmento/mangojs-core";
import { RequestDefaultParams } from "../..";
import { GroupManageForUser } from "../../../../../../entities/group.type";

export type Params = RequestDefaultParams & { uid: string };

export type RequestBody = GroupManageForUser;
/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<{ ok: boolean }>;
