export interface MiddlewareUserInfo {
  uid: string;
  userType: string;
  email: string;
  firstName: string;
  lastName: string;
  partnerUid?: string;
  groups: Array<{ name: string; uid: string; description: string }>;
}
