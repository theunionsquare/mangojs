/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminUser
 */

import { Types } from '@mangojs/core'
import { IAdminUser } from '../../../../../db/models/AdminUser.model'
import { ResponseBodyData } from '..'

export type RequestBody = Pick<
    IAdminUser,
    'firstName' | 'lastName' | 'username' | 'email' | 'age'
> & {
    groups: [string]
}

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>
