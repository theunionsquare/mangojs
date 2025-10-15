import { IGroup } from '../../../../../db/models/Group.model'

export * as GET from './GET'
export * as POST from './POST'

export type ResponseBodyData = Pick<
    IGroup,
    'uid' | 'name' | 'description' | 'permissions'
>
