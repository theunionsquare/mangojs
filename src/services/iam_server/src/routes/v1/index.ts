import { PartnerControllers } from "./partners";
import { AdminControllers } from "./admins";
import { GroupControllers } from "./groups";
import { AuthControllers } from "./auth";
import { UserControllers } from "./users";

export const v1 = [
  ...PartnerControllers,
  ...AdminControllers,
  ...AuthControllers,
  ...GroupControllers,
  ...UserControllers,
];
