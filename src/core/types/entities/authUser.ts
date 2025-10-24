export interface AuthUserBase {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthUser extends AuthUserBase {
  userType: AuthUserType;
}

export enum AuthUserType {
  ADMIN = "ADMIN",
  PARTNER = "PARTNER",
  USER = "USER",
}
