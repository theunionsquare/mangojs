/**
 * Add new Admin Group
 */
import type { Types } from '@mangojs/core/'
import { IGroup } from '../../../../../db/models/Group.model'
import { ResponseBodyData } from '..'

/*
 * REQUEST
 * @see
 *
 * REQUEST: POST /api/v1/adminGroups
 */

export type RequestBody = { uid: string }

/**
 * RESPONSE
 *
 * @see
 */

export type ResponseBody = { ok: boolean }
