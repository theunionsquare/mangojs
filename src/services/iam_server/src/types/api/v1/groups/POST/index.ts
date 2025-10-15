/**
 * POST group
 */
import type { Types } from '@mangojs/core/'
import { IGroup } from '../../../../../db/models/Group.model'
import { ResponseBodyData } from '..'

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/groups
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
