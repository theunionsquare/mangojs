/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from "@giusmento/mangojs-core";
import { RequestDefaultParams } from "../..";

export type Params = RequestDefaultParams & { uid: string };

export type RequestBody = { groups: Array<{ value: string; name: string }> };

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<{ ok: boolean }>;
