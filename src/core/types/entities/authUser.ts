import * as enums from "../enums";

export interface AuthUserBase {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthUser extends AuthUserBase {
  userType: enums.AuthUserType;
  status: enums.UserStatus | enums.AdminUserStatus | enums.PartnerUserStatus;
}
