/**
 * @deprecated Use types from './api/index.js' instead.
 */
export interface Base {
  ok: boolean;
  timestamp: string;
  requestId: string;
}

/**
 * @deprecated Use types from './api/index.js' instead.
 */
export interface Error extends Base {
  errorMessage?: string;
  errorCode?: string;
}

/**
 * @deprecated Use types from './api/index.js' instead.
 */
export interface Success<D> extends Base {
  data: D;
}
