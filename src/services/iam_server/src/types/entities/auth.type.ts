import { models } from "../../../";

// auth log in
export type AuthLogin = {
  email: string;
  password: string;
};

export type AuthResponse = { authenticated: boolean; message: string };

export type AuthAdminRegister = Pick<
  models.IAdminUser,
  "firstName" | "lastName" | "email" | "password" | "age" | "phoneNumber"
>;

export type AuthPartnerRegister = Pick<
  models.IPartner,
  | "companyName"
  | "businessType"
  | "taxCode"
  | "email"
  | "addressStreet"
  | "addressCity"
  | "addressState"
  | "addressCountry"
  | "addressPostalCode"
> & {
  user: Pick<
    models.IPartnerUser,
    "firstName" | "lastName" | "email" | "password" | "age" | "phoneNumber"
  >;
};

export type AuthUserRegister = Pick<
  models.IUser,
  "firstName" | "lastName" | "email" | "password" | "age" | "phoneNumber"
>;
