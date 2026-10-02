import helmet from "helmet";
import type { HelmetOptions } from "helmet";
import type { RequestHandler } from "express";

/**
 * Configuration for MangoJS's HTTP security headers.
 */
export interface SecurityHeadersOptions {
  /**
   * Helmet options applied to every request outside of `docsPath`. Passed
   * straight through to `helmet()` with no narrowing, so every directive and
   * sub-middleware it supports is configurable. Pass `false` to disable
   * headers on API routes entirely.
   */
  api?: HelmetOptions | false;
  /**
   * Helmet options applied only to requests under `docsPath`, relaxed enough
   * for `swagger-ui-express` to render (it bootstraps via inline scripts and
   * styles, which a strict `default-src 'none'` policy blocks). Pass `false`
   * to apply the `api` policy there too.
   */
  docs?: HelmetOptions | false;
  /**
   * Path prefix routed to the `docs` policy instead of `api`. Defaults to
   * the path `ServerBuilder` mounts Swagger UI at.
   */
  docsPath?: string;
}

const DEFAULT_DOCS_PATH = "/docs";

/**
 * Shallow-merges helmet options per top-level key (e.g. `hsts`,
 * `contentSecurityPolicy`). The explicit `HelmetOptions` return type keeps
 * TypeScript from trying to infer a union/intersection of two already-huge
 * conditional types, which it can't represent.
 */
function mergeHelmetOptions(
  defaults: HelmetOptions,
  overrides: HelmetOptions,
): HelmetOptions {
  // `HelmetOptions` is a union of mutually-exclusive shapes (it forbids
  // mixing an option with its legacy alias via `?: never`), which TypeScript
  // can't re-verify after a generic spread merge. The cast is safe as long
  // as callers don't mix an option with its legacy alias across defaults
  // and overrides — the same constraint `helmet()` itself enforces.
  return { ...defaults, ...overrides } as unknown as HelmetOptions;
}

const defaultApiOptions: HelmetOptions = {
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      "default-src": ["'none'"],
      "base-uri": ["'none'"],
      "form-action": ["'none'"],
      "frame-ancestors": ["'none'"],
    },
  },
};

const defaultDocsOptions: HelmetOptions = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:"],
    },
  },
};

/**
 * Creates a route-aware HTTP security-headers middleware (CSP, HSTS,
 * X-Content-Type-Options, X-Frame-Options, etc. — see the `helmet` package).
 * Requests under `docsPath` get a relaxed policy so Swagger UI can render;
 * everything else gets the strict `api` policy.
 *
 * `api`/`docs` options are shallow-merged over the defaults (per top-level
 * helmet option, e.g. `contentSecurityPolicy`, `hsts`), not replaced
 * wholesale — overriding `hsts` alone doesn't require re-declaring the
 * default CSP too. Supply a full `contentSecurityPolicy` to replace that
 * piece entirely; it isn't deep-merged with the default directives.
 *
 * Use directly with `.expressUse(...)` for manual control, or configure via
 * `ServerBuilder.setSecurityHeaders(...)` — `ServerBuilder` applies this by
 * default, since forgetting to wire up security headers is a real recurring
 * failure mode, not a hypothetical one.
 *
 * @example
 * // Keep the default CSP, just scope HSTS to production
 * new ServerBuilder().expressUse(
 *   Middlewares.securityHeaders.createSecurityHeaders({
 *     api: { hsts: isProduction ? { maxAge: 15552000, includeSubDomains: true } : false },
 *   }),
 * );
 */
export function createSecurityHeaders(
  options: SecurityHeadersOptions = {},
): RequestHandler {
  const docsPath = options.docsPath ?? DEFAULT_DOCS_PATH;

  const apiOptions =
    options.api === undefined
      ? defaultApiOptions
      : options.api === false
        ? false
        : mergeHelmetOptions(defaultApiOptions, options.api);
  const docsOptions =
    options.docs === undefined
      ? defaultDocsOptions
      : options.docs === false
        ? false
        : mergeHelmetOptions(defaultDocsOptions, options.docs);

  const apiHandler = apiOptions === false ? undefined : helmet(apiOptions);
  const docsHandler = docsOptions === false ? undefined : helmet(docsOptions);

  return (req, res, next) => {
    const isDocsRequest =
      req.path === docsPath || req.path.startsWith(`${docsPath}/`);

    const handler = isDocsRequest ? docsHandler : apiHandler;
    if (!handler) {
      return next();
    }
    return handler(req, res, next);
  };
}
