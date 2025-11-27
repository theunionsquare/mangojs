import { PartnerUser } from "../../../../entities/partnerUser.type";
export * as GET from "./GET";
export * as POST from "./POST";
export * as PUT from "./PUT";
export * as DELETE from "./DELETE";
export * as groups from "./groups";
export * as magiclinks from "./magiclinks";
export * as activate from "./activate";

export type RequestDefaultParams = {
  partnerUid: string;
};

export type RequestDefaultParamsSingle = {
  partnerUid: string;
  userUid: string;
};

export type ResponseBodyData = PartnerUser;
