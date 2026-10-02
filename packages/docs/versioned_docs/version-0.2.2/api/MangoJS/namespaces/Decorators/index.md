---
sidebar_label: Decorators
---

# Decorators

Decorator utilities for HTTP, auth, queue, and scheduler

## Namespaces

- [Auth](namespaces/Auth/index.md)

## Classes

### AuditConfig

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:78](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L78)

Global audit-tracking configuration.

Mirrors `AuthConfig`'s `onUnauthorized` extension point: the framework
only knows how to capture generic request/response context, while the
app owns the actual persistence and domain mapping.

#### Constructors

##### Constructor

```ts
new AuditConfig(): AuditConfig;
```

###### Returns

[`AuditConfig`](#auditconfig)

#### Methods

##### configure()

```ts
static configure(options): void;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:84](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L84)

Configure global audit-tracking settings.

###### Parameters

###### options

[`AuditConfigOptions`](#auditconfigoptions)

###### Returns

`void`

##### getTracker()

```ts
static getTracker(): AuditTracker;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:98](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L98)

Get the currently configured audit tracker, if any.

###### Returns

[`AuditTracker`](#audittracker)

##### reset()

```ts
static reset(): void;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:91](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L91)

Reset to default (no-op) configuration. Useful for testing.

###### Returns

`void`

##### track()

```ts
static track(
   event, 
   req, 
   res): void;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:106](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L106)

Fire the configured audit tracker (if any), swallowing any error so
that audit-tracking issues never affect the HTTP response.

###### Parameters

###### event

[`AuditEvent`](#auditevent)

###### req

`Request`

###### res

`Response`

###### Returns

`void`

## Interfaces

### AuditConfigOptions

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:44](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L44)

#### Properties

##### onAudit?

```ts
optional onAudit: AuditTracker;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:68](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L68)

Callback invoked after every `@Audit`-decorated method completes.
Errors thrown inside this callback are caught and logged to stderr -
they never affect the HTTP response, which has already been sent.

###### Example

```typescript
AuditConfig.configure({
  onAudit: async (event) => {
    await auditService.log({
      actorUid: event.actorId,
      action: event.action,
      resource: event.resource,
      resourceUid: event.resourceUid,
      status: event.status,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      ...mapAppSpecificFields(event.metadata),
    });
  },
});
```

***

### AuditEvent

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:7](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L7)

A single audit event captured by the `@Audit` decorator once a controller
method has finished handling a request (successfully or not).

#### Properties

##### action

```ts
action: string;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:9](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L9)

Caller-supplied action identifier, e.g. "user.platform_admin.granted"

##### actorId

```ts
actorId: string;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:15](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L15)

Authenticated actor id (`IAuthUser.id`), or null if unauthenticated

##### actorUserType

```ts
actorUserType: string;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:17](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L17)

Authenticated actor's `userType` (`IAuthUser.userType`), or null

##### ipAddress

```ts
ipAddress: string;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:22](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L22)

##### metadata?

```ts
optional metadata: Record<string, unknown>;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:30](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L30)

Opaque, caller-supplied data passed through untouched. Use this for
app-specific concepts the framework has no notion of (audit scope,
actor-type enums, tenant id, etc.) - the registered `onAudit` tracker
reads it back out.

##### resource

```ts
resource: string;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:11](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L11)

Caller-supplied resource identifier, e.g. "user"

##### resourceUid

```ts
resourceUid: string;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:13](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L13)

Resource UID, resolved from a route param or the JSON response body

##### status

```ts
status: "success" | "failure";
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:21](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L21)

"success" for a 2xx/3xx response, "failure" otherwise

##### statusCode

```ts
statusCode: number;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:19](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L19)

HTTP status code the response was sent with

##### userAgent

```ts
userAgent: string;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:23](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L23)

***

### AuditOptions

Defined in: [packages/core/src/core/decorators/audit/audit.decorator.ts:4](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/audit.decorator.ts#L4)

#### Properties

##### action

```ts
action: string;
```

Defined in: [packages/core/src/core/decorators/audit/audit.decorator.ts:6](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/audit.decorator.ts#L6)

Action identifier recorded on the audit event, e.g. "user.deleted"

##### metadata?

```ts
optional metadata: Record<string, unknown>;
```

Defined in: [packages/core/src/core/decorators/audit/audit.decorator.ts:26](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/audit.decorator.ts#L26)

Opaque data passed through untouched to the configured `onAudit`
tracker. Use this for app-specific concepts the framework doesn't
know about (audit scope, actor-type enums, etc.).

##### resource

```ts
resource: string;
```

Defined in: [packages/core/src/core/decorators/audit/audit.decorator.ts:8](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/audit.decorator.ts#L8)

Resource identifier recorded on the audit event, e.g. "user"

##### resourceUidFromResponse()?

```ts
optional resourceUidFromResponse: (body) => string;
```

Defined in: [packages/core/src/core/decorators/audit/audit.decorator.ts:20](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/audit.decorator.ts#L20)

Extract the resource uid from the JSON response body instead of a
route param - needed for create endpoints where the uid doesn't exist
until the handler runs. Takes precedence over `resourceUidParam` when
it returns a non-null value.

###### Parameters

###### body

`unknown`

###### Returns

`string`

##### resourceUidParam?

```ts
optional resourceUidParam: string;
```

Defined in: [packages/core/src/core/decorators/audit/audit.decorator.ts:13](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/audit.decorator.ts#L13)

Route param holding the affected resource's uid (e.g. "uid" for
`/users/:uid`). Default: "uid".

## Type Aliases

### AuditTracker()

```ts
type AuditTracker = (event, req, res) => void | Promise<void>;
```

Defined in: [packages/core/src/core/decorators/audit/auditConfig.ts:38](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/auditConfig.ts#L38)

Callback invoked whenever an `@Audit`-decorated method finishes handling
a request. Register one via `AuditConfig.configure` to persist audit
events however the app sees fit (database, log stream, etc.).

#### Parameters

##### event

[`AuditEvent`](#auditevent)

##### req

`Request`

##### res

`Response`

#### Returns

`void` \| `Promise`\<`void`\>

## Variables

### QUEUE\_WORKER\_METADATA\_KEY

```ts
const QUEUE_WORKER_METADATA_KEY: typeof QUEUE_WORKER_METADATA_KEY;
```

Defined in: [packages/core/src/core/decorators/queue/queueWorker.decorator.ts:5](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/queue/queueWorker.decorator.ts#L5)

## Functions

### Audit()

```ts
function Audit(options): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/audit/audit.decorator.ts:58](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/audit/audit.decorator.ts#L58)

Method decorator that records an audit event once the handler has
finished producing a response, via the tracker registered with
`AuditConfig.configure({ onAudit })`.

Runs *after* authentication/authorization middleware (registered
separately via `@HasPermissions` etc.), so it never fires for requests
rejected before reaching the controller - those are covered by
`AuthConfig`'s `onUnauthorized` tracker instead. Reads `res.statusCode`
after the handler resolves to determine success/failure, since MangoJS
controllers conventionally catch their own errors and send a response
rather than throwing past the handler.

No-ops (beyond the trivial wrap) if no tracker is configured.

#### Parameters

##### options

[`AuditOptions`](#auditoptions)

#### Returns

`MethodDecorator`

#### Example

```typescript
class UserController {
  @Post("/:uid/grant-admin")
  @HasPermissions(["idm:user:grant_admin"])
  @Audit({
    action: "user.platform_admin.granted",
    resource: "user",
    metadata: { scope: "system", actorType: "admin" },
  })
  async grantPlatformAdmin(req: Request, res: Response) { ... }
}
```

***

### ~~loggedMethod()~~

```ts
function loggedMethod(): any;
```

Defined in: [packages/core/src/core/decorators/logger.decorator.ts:7](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/logger.decorator.ts#L7)

Method decorator that logs method calls with timestamps.

#### Returns

`any`

#### Deprecated

Use the Loggers module for proper logging instead.
This decorator uses console.log which is not suitable for production.

***

### RateLimit()

```ts
function RateLimit(options): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/http/rate-limit.decorator.ts:18](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/decorators/http/rate-limit.decorator.ts#L18)

Applies a rate limit to a single route, using MangoJS's standard error
response shape for the 429.

#### Parameters

##### options

[`RateLimitOptions`](../Middlewares/namespaces/rateLimit/index.md#ratelimitoptions)

#### Returns

`MethodDecorator`

#### Example

```ts
class AuthController {
  @Post("/login")
  @RateLimit({ windowMs: 15 * 60_000, limit: 10, skipSuccessfulRequests: true })
  public async login() { ... }
}
```

## References

### Controller

Re-exports [Controller](../../../index.md#controller)

***

### Delete

Re-exports [Delete](../../../index.md#delete-2)

***

### Get

Re-exports [Get](../../../index.md#get-3)

***

### IRouter

Re-exports [IRouter](../../../index.md#irouter)

***

### Methods

Re-exports [Methods](../../../index.md#methods)

***

### Middleware

Re-exports [Middleware](../../../index.md#middleware)

***

### Post

Re-exports [Post](../../../index.md#post-1)

***

### Put

Re-exports [Put](../../../index.md#put-1)

***

### QueueWorker

Re-exports [QueueWorker](../../../index.md#queueworker)

***

### RateLimitOptions

Re-exports [RateLimitOptions](../Middlewares/namespaces/rateLimit/index.md#ratelimitoptions)

***

### Schedule

Re-exports [Schedule](../../../index.md#schedule)

***

### Use

Re-exports [Use](../../../index.md#use)
