import { generateRandomString } from "./generics";
import type { Response } from "express";

/**
 * Adds request tracking headers to a response.
 *
 * Sets `x-request-id` and `x-request-timestamp` headers
 * for request tracing and debugging.
 *
 * @example
 * app.use((req, res, next) => {
 *   const log = new LogRequest(res);
 *   console.log(`Request ${log.requestId} at ${log.timestamp}`);
 *   next();
 * });
 */
export class LogRequest {
  public timestamp: string;
  public requestId: string;

  constructor(res: Response) {
    this.requestId = generateRandomString(20);
    this.timestamp = new Date().toISOString();
    res.setHeader("x-request-id", this.requestId);
    res.setHeader("x-request-timestamp", this.timestamp);
  }
}
