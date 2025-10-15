/**
 * Get Admin Group
 */
import type { Types } from '@mangojs/core/'
import { ResponseBodyData } from '..'
import { IGroup } from '../../../../../../db/models/Group.model'

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/groups/admin
 */

export type RequestBody = Pick<
    IGroup,
    'uid' | 'name' | 'description' | 'permissions'
>

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>
