import { Types } from '@mangojs/core'
import { ResponseBodyData } from '..'

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
export type Params = { magiclink: string }

export type RequestBody = {}

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>
