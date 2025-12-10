import type { Response as ExResponse } from "express";
import { Base, PaginatedData } from "..";

export interface Error extends Base {
  erroMessage?: string;
  errorCode?: string;
}

export interface response<D> extends Base {
  data: D;
}

export interface PaginatedResponse<T> extends Base {
  data: PaginatedData<T>;
}

export type Success<D> = ExResponse<response<D>>;
