/**
 * Get Admin Group
 */
import type { Types } from '@mangojs/core/'
import { ResponseBodyData } from '..'

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/groups/admin
 */

export type RequestBody = {}

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<
    Array<ResponseBodyData>
>
