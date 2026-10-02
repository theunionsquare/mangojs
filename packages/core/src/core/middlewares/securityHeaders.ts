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
 * Use directly with `.expressUse(...)` for manual control, or configure via
 * `ServerBuilder.setSecurityHeaders(...)` — `ServerBuilder` applies this by
 * default, since forgetting to wire up security headers is a real recurring
 * failure mode, not a hypothetical one.
 *
 * @example
 * // Manual, API-only service with a custom CSP
 * new ServerBuilder().expressUse(
 *   Middlewares.securityHeaders.createSecurityHeaders({
 *     api: { contentSecurityPolicy: { directives: { "default-src": ["'self'"] } } },
 *   }),
 * );
 */
export function createSecurityHeaders(
  options: SecurityHeadersOptions = {},
): RequestHandler {
  const docsPath = options.docsPath ?? DEFAULT_DOCS_PATH;

  const apiOptions = options.api === undefined ? defaultApiOptions : options.api;
  const docsOptions = options.docs === undefined ? defaultDocsOptions : options.docs;

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
