import { AdminGroupController } from "./adminGroups.controller";
import { PartnerGroupController } from "./partnerGroups.controller";
import { GroupsController } from "./groups.controller";
import { UserGroupController } from "./userGroups.controller";

export const GroupControllers = [
  PartnerGroupController,
  AdminGroupController,
  GroupsController,
  UserGroupController,
];
