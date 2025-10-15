import { Types } from '@mangojs/core'
import { ResponseBodyData } from '..'

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */
export type Params = { magiclink: string }

export type RequestBody = {
    firstName: string
    lastName: string
    password: string
}

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>
