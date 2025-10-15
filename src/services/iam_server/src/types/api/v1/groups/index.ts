import { IGroup } from '../../../../db/models/Group.model'

export * as admin from './admin'
export * as partner from './partner'

export * as GET from './GET'
export * as POST from './POST'
export * as DELETE from './DELETE'

export type ResponseBodyData = Pick<
    IGroup,
    'uid' | 'name' | 'description' | 'permissions' | 'userType'
>
