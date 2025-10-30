import { Types } from "@giusmento/mangojs-core";

// Define PartnerUser type based on the PartnerUser model
export type User = Types.entities.AuthUser;
export type UserBase = Types.entities.AuthUserBase;

export type AuthResponse = {
  type: Types.auth.CredentialType;
  data: any;
  cookieName: string;
};
