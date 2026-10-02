import { Request, Response } from "express";

/**
 * A single audit event captured by the `@Audit` decorator once a controller
 * method has finished handling a request (successfully or not).
 */
export interface AuditEvent {
  /** Caller-supplied action identifier, e.g. "user.platform_admin.granted" */
  action: string;
  /** Caller-supplied resource identifier, e.g. "user" */
  resource: string;
  /** Resource UID, resolved from a route param or the JSON response body */
  resourceUid: string | null;
  /** Authenticated actor id (`IAuthUser.id`), or null if unauthenticated */
  actorId: string | null;
  /** Authenticated actor's `userType` (`IAuthUser.userType`), or null */
  actorUserType: string | null;
  /** HTTP status code the response was sent with */
  statusCode: number;
  /** "success" for a 2xx/3xx response, "failure" otherwise */
  status: "success" | "failure";
  ipAddress: string | null;
  userAgent: string | null;
  /**
   * Opaque, caller-supplied data passed through untouched. Use this for
   * app-specific concepts the framework has no notion of (audit scope,
   * actor-type enums, tenant id, etc.) - the registered `onAudit` tracker
   * reads it back out.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Callback invoked whenever an `@Audit`-decorated method finishes handling
 * a request. Register one via `AuditConfig.configure` to persist audit
 * events however the app sees fit (database, log stream, etc.).
 */
export type AuditTracker = (
  event: AuditEvent,
  req: Request,
  res: Response,
) => void | Promise<void>;

export interface AuditConfigOptions {
  /**
   * Callback invoked after every `@Audit`-decorated method completes.
   * Errors thrown inside this callback are caught and logged to stderr -
   * they never affect the HTTP response, which has already been sent.
   *
   * @example
   * ```typescript
   * AuditConfig.configure({
   *   onAudit: async (event) => {
   *     await auditService.log({
   *       actorUid: event.actorId,
   *       action: event.action,
   *       resource: event.resource,
   *       resourceUid: event.resourceUid,
   *       status: event.status,
   *       ipAddress: event.ipAddress,
   *       userAgent: event.userAgent,
   *       ...mapAppSpecificFields(event.metadata),
   *     });
   *   },
   * });
   * ```
   */
  onAudit?: AuditTracker;
}

/**
 * Global audit-tracking configuration.
 *
 * Mirrors `AuthConfig`'s `onUnauthorized` extension point: the framework
 * only knows how to capture generic request/response context, while the
 * app owns the actual persistence and domain mapping.
 */
export class AuditConfig {
  private static config: AuditConfigOptions = {};

  /**
   * Configure global audit-tracking settings.
   */
  static configure(options: AuditConfigOptions): void {
    this.config = { ...this.config, ...options };
  }

  /**
   * Reset to default (no-op) configuration. Useful for testing.
   */
  static reset(): void {
    this.config = {};
  }

  /**
   * Get the currently configured audit tracker, if any.
   */
  static getTracker(): AuditTracker | undefined {
    return this.config.onAudit;
  }

  /**
   * Fire the configured audit tracker (if any), swallowing any error so
   * that audit-tracking issues never affect the HTTP response.
   */
  static track(event: AuditEvent, req: Request, res: Response): void {
    const tracker = this.config.onAudit;
    if (!tracker) return;

    try {
      const result = tracker(event, req, res);
      if (result instanceof Promise) {
        result.catch((err) =>
          console.error("[AuditConfig] onAudit tracker threw:", err),
        );
      }
    } catch (err) {
      console.error("[AuditConfig] onAudit tracker threw:", err);
    }
  }
}
