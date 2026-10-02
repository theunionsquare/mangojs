---
sidebar_label: securityHeaders
---

# securityHeaders

## Interfaces

### SecurityHeadersOptions

Defined in: [packages/core/src/core/middlewares/securityHeaders.ts:8](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/securityHeaders.ts#L8)

Configuration for MangoJS's HTTP security headers.

#### Properties

##### api?

```ts
optional api: false | HelmetOptions;
```

Defined in: [packages/core/src/core/middlewares/securityHeaders.ts:15](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/securityHeaders.ts#L15)

Helmet options applied to every request outside of `docsPath`. Passed
straight through to `helmet()` with no narrowing, so every directive and
sub-middleware it supports is configurable. Pass `false` to disable
headers on API routes entirely.

##### docs?

```ts
optional docs: false | HelmetOptions;
```

Defined in: [packages/core/src/core/middlewares/securityHeaders.ts:22](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/securityHeaders.ts#L22)

Helmet options applied only to requests under `docsPath`, relaxed enough
for `swagger-ui-express` to render (it bootstraps via inline scripts and
styles, which a strict `default-src 'none'` policy blocks). Pass `false`
to apply the `api` policy there too.

##### docsPath?

```ts
optional docsPath: string;
```

Defined in: [packages/core/src/core/middlewares/securityHeaders.ts:27](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/securityHeaders.ts#L27)

Path prefix routed to the `docs` policy instead of `api`. Defaults to
the path `ServerBuilder` mounts Swagger UI at.

## Functions

### createSecurityHeaders()

```ts
function createSecurityHeaders(options?): RequestHandler;
```

Defined in: [packages/core/src/core/middlewares/securityHeaders.ts:98](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/securityHeaders.ts#L98)

Creates a route-aware HTTP security-headers middleware (CSP, HSTS,
X-Content-Type-Options, X-Frame-Options, etc. — see the `helmet` package).
Requests under `docsPath` get a relaxed policy so Swagger UI can render;
everything else gets the strict `api` policy.

`api`/`docs` options are shallow-merged over the defaults (per top-level
helmet option, e.g. `contentSecurityPolicy`, `hsts`), not replaced
wholesale — overriding `hsts` alone doesn't require re-declaring the
default CSP too. Supply a full `contentSecurityPolicy` to replace that
piece entirely; it isn't deep-merged with the default directives.

Use directly with `.expressUse(...)` for manual control, or configure via
`ServerBuilder.setSecurityHeaders(...)` — `ServerBuilder` applies this by
default, since forgetting to wire up security headers is a real recurring
failure mode, not a hypothetical one.

#### Parameters

##### options?

[`SecurityHeadersOptions`](#securityheadersoptions) = `{}`

#### Returns

`RequestHandler`

#### Example

```ts
// Keep the default CSP, just scope HSTS to production
new ServerBuilder().expressUse(
  Middlewares.securityHeaders.createSecurityHeaders({
    api: { hsts: isProduction ? { maxAge: 15552000, includeSubDomains: true } : false },
  }),
);
```
