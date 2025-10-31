import type { Request as ExRequest } from "express";
import { MiddlewareUserInfo } from "../../../entities/middlewareUserInfo.type";

export interface Request<P = { [key: string]: string }, ResBody = any>
  extends ExRequest<P, any, ResBody> {
  requestTime: string;
  user?: MiddlewareUserInfo;
}
