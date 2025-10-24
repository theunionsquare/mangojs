/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
import { Types } from "@giusmento/mangojs-core";
import * as models from "../../../../../../db/models";

export type Params = { uid: string };

export type RequestBody = Partial<
  Pick<models.IPartnerUser, "firstName" | "lastName" | "phoneNumber">
>;

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<{ ok: boolean }>;
