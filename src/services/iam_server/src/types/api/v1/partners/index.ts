import { IGroup } from '../../../../db/models/Group.model'
import { IPartnerUser } from '../../../../db/models/PartnerUser.model'

export * as GET from './GET'
export * as POST from './POST'

export type ResponseBodyData = Pick<
    IPartnerUser,
    | 'uid'
    | 'firstName'
    | 'lastName'
    | 'username'
    | 'email'
    | 'age'
    | 'phoneNumber'
    | 'status'
    | 'isActive'
    | 'isVerified'
    | 'magicLink'
    | 'magicLinkExpireDate'
    | 'verifiedAt'
    | 'disabledAt'
    | 'createdAt'
    | 'updatedAt'
> & {
    groups: Array<Pick<IGroup, 'uid' | 'name' | 'description' | 'permissions'>>
}
