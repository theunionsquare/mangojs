export { AdminUser, IAdminUser } from "./AdminUser.entity";
export { PartnerUser, IPartnerUser } from "./PartnerUser.entity";
export { Group, IGroup } from "./Group.entity";
export { User, IUser } from "./User.entity";

import { AdminUser } from "./AdminUser.entity";
import { PartnerUser } from "./PartnerUser.entity";
import { Group } from "./Group.entity";
import { User } from "./User.entity";

export const IAMEntities = [AdminUser, PartnerUser, Group, User];
