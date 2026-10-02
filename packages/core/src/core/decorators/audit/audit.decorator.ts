import { Request, Response } from "express";
import { AuditConfig, AuditEvent } from "./auditConfig";

export interface AuditOptions {
  /** Action identifier recorded on the audit event, e.g. "user.deleted" */
  action: string;
  /** Resource identifier recorded on the audit event, e.g. "user" */
  resource: string;
  /**
   * Route param holding the affected resource's uid (e.g. "uid" for
   * `/users/:uid`). Default: "uid".
   */
  resourceUidParam?: string;
  /**
   * Extract the resource uid from the JSON response body instead of a
   * route param - needed for create endpoints where the uid doesn't exist
   * until the handler runs. Takes precedence over `resourceUidParam` when
   * it returns a non-null value.
   */
  resourceUidFromResponse?: (body: unknown) => string | null;
  /**
   * Opaque data passed through untouched to the configured `onAudit`
   * tracker. Use this for app-specific concepts the framework doesn't
   * know about (audit scope, actor-type enums, etc.).
   */
  metadata?: Record<string, unknown>;
}

/**
 * Method decorator that records an audit event once the handler has
 * finished producing a response, via the tracker registered with
 * `AuditConfig.configure({ onAudit })`.
 *
 * Runs *after* authentication/authorization middleware (registered
 * separately via `@HasPermissions` etc.), so it never fires for requests
 * rejected before reaching the controller - those are covered by
 * `AuthConfig`'s `onUnauthorized` tracker instead. Reads `res.statusCode`
 * after the handler resolves to determine success/failure, since MangoJS
 * controllers conventionally catch their own errors and send a response
 * rather than throwing past the handler.
 *
 * No-ops (beyond the trivial wrap) if no tracker is configured.
 *
 * @example
 * ```typescript
 * class UserController {
 *   @Post("/:uid/grant-admin")
 *   @HasPermissions(["idm:user:grant_admin"])
 *   @Audit({
 *     action: "user.platform_admin.granted",
 *     resource: "user",
 *     metadata: { scope: "system", actorType: "admin" },
 *   })
 *   async grantPlatformAdmin(req: Request, res: Response) { ... }
 * }
 * ```
 */
export function Audit(options: AuditOptions): MethodDecorator {
  return function (
    _target: unknown,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      ...rest: unknown[]
    ) {
      let capturedBody: unknown;
      const originalJson = res.json.bind(res);
      res.json = ((body: unknown) => {
        capturedBody = body;
        return originalJson(body);
      }) as typeof res.json;

      const result = await original.apply(this, [req, res, ...rest]);

      const tracker = AuditConfig.getTracker();
      if (tracker) {
        const authContext = (req as unknown as { authContext?: { isAuthenticated: boolean; user: { id: string; userType: string } | null } }).authContext;
        const actor = authContext?.isAuthenticated ? authContext.user : null;

        const resourceUid =
          (req.params as Record<string, string | undefined>)[
            options.resourceUidParam ?? "uid"
          ] ??
          options.resourceUidFromResponse?.(capturedBody) ??
          null;

        const event: AuditEvent = {
          action: options.action,
          resource: options.resource,
          resourceUid,
          actorId: actor?.id ?? null,
          actorUserType: actor?.userType ?? null,
          statusCode: res.statusCode,
          status: res.statusCode < 400 ? "success" : "failure",
          ipAddress: req.ip ?? null,
          userAgent: req.get("user-agent") ?? null,
          metadata: options.metadata,
        };

        AuditConfig.track(event, req, res);
      }

      return result;
    };

    return descriptor;
  };
}
