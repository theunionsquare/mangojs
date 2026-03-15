/**
 * @deprecated Use types from './api' instead.
 */
export interface Base {
  ok: boolean;
  timestamp: string;
  requestId: string;
}

/**
 * @deprecated Use types from './api' instead.
 */
export interface Error extends Base {
  errorMessage?: string;
  errorCode?: string;
}

/**
 * @deprecated Use types from './api' instead.
 */
export interface Success<D> extends Base {
  data: D;
}
