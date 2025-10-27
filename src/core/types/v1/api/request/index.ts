import type { Request as ExRequest } from "express";

export interface Request<P = { [key: string]: string }, ResBody = any>
  extends ExRequest<P, any, ResBody> {
  requestTime: string;
}
