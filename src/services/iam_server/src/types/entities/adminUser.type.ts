import { IGroup } from "../../db/models/Group.model";

export interface AdminUser {
  uid: string;
  firstName: string;
  lastName: string;
  groups: Array<IGroup>;
}
