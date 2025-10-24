import * as models from "../../../../db/models";

export * as GET from "./GET";
export * as POST from "./POST";
export * as PUT from "./PUT";
export * as uid from "./uid";

export * as users from "./users";

export type ResponseBodyData = Pick<
  models.IPartner,
  "uid" | "companyName" | "email" | "status" | "isVerified" | "subscriptionTier"
>;
