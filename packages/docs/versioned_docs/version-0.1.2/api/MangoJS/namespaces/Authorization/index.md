---
sidebar_label: Authorization
---

# Authorization

Authorization configuration and utilities

## Classes

### AuthConfig

Defined in: [packages/core/src/core/authz/authConfig.ts:182](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L182)

Global authentication configuration

#### Constructors

##### Constructor

```ts
new AuthConfig(): AuthConfig;
```

###### Returns

[`AuthConfig`](#authconfig)

#### Methods

##### configure()

```ts
static configure(options): void;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:198](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L198)

Configure global auth settings

###### Parameters

###### options

[`AuthConfigOptions`](#authconfigoptions)

###### Returns

`void`

###### Example

```typescript
AuthConfig.configure({
  userObjectPath: "session.user",
  enableAuditLog: true,
  cacheValidationResults: true,
  cacheTTL: 300000
});
```

##### extractUserContext()

```ts
static extractUserContext(req): object;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:232](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L232)

Extract user context from request using configured extractor

Checks in order:
1. req.authContext (new strategy-based system)
2. Custom userContextExtractor (if configured)
3. Path-based extraction from req[userObjectPath] (legacy)

###### Parameters

###### req

`Request`

Express request object

###### Returns

`object`

User context with userType, groups, permissions, and raw user object

###### groups?

```ts
optional groups: string[];
```

###### permissions?

```ts
optional permissions: string[];
```

###### raw?

```ts
optional raw: any;
```

###### userType?

```ts
optional userType: string;
```

##### getCacheMaxSize()

```ts
static getCacheMaxSize(): number;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:376](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L376)

Get cache max size

###### Returns

`number`

Maximum number of cache entries

##### getCacheTTL()

```ts
static getCacheTTL(decoratorOptions?): number;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:349](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L349)

Get cache TTL

###### Parameters

###### decoratorOptions?

[`DecoratorOptions`](#decoratoroptions)

Optional per-decorator options

###### Returns

`number`

Cache TTL in milliseconds

##### getConfig()

```ts
static getConfig(): Readonly<Required<AuthConfigOptions>>;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:210](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L210)

Get current configuration

###### Returns

`Readonly`\<`Required`\<[`AuthConfigOptions`](#authconfigoptions)\>\>

##### getErrorHandler()

```ts
static getErrorHandler(decoratorOptions?): AuthErrorHandler;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:362](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L362)

Get error handler

###### Parameters

###### decoratorOptions?

[`DecoratorOptions`](#decoratoroptions)

Optional per-decorator options

###### Returns

[`AuthErrorHandler`](#autherrorhandler)

Custom error handler if configured

##### getUnauthorizedTracker()

```ts
static getUnauthorizedTracker(): UnauthorizedTracker;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:383](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L383)

Get the globally configured unauthorized tracker.

###### Returns

[`UnauthorizedTracker`](#unauthorizedtracker)

##### isAuditLogEnabled()

```ts
static isAuditLogEnabled(decoratorOptions?): boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:323](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L323)

Check if audit logging is enabled

###### Parameters

###### decoratorOptions?

[`DecoratorOptions`](#decoratoroptions)

Optional per-decorator options

###### Returns

`boolean`

true if audit logging should be enabled

##### isCachingEnabled()

```ts
static isCachingEnabled(decoratorOptions?): boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:336](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L336)

Check if caching is enabled

###### Parameters

###### decoratorOptions?

[`DecoratorOptions`](#decoratoroptions)

Optional per-decorator options

###### Returns

`boolean`

true if caching should be enabled

##### reset()

```ts
static reset(): void;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:217](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L217)

Reset to default configuration (useful for testing)

###### Returns

`void`

##### trackUnauthorized()

```ts
static trackUnauthorized(req, error): void;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:391](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L391)

Fire the unauthorized tracker (if configured), swallowing any errors
so that tracking issues never affect the HTTP response.

###### Parameters

###### req

`Request`

###### error

[`AuthorizationError`](#authorizationerror)

###### Returns

`void`

***

### AuthErrorFactory

Defined in: [packages/core/src/core/authz/authErrors.ts:88](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L88)

Factory functions for creating common authorization errors

#### Constructors

##### Constructor

```ts
new AuthErrorFactory(): AuthErrorFactory;
```

###### Returns

[`AuthErrorFactory`](#autherrorfactory)

#### Methods

##### accessDenied()

```ts
static accessDenied(
   requiredAccess, 
   userType, 
   userGroups, 
   validatorName): AuthorizationError;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:129](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L129)

Create error for access requirements mismatch

###### Parameters

###### requiredAccess

`string`

###### userType

`string`

###### userGroups

`string`[]

###### validatorName

`string`

###### Returns

[`AuthorizationError`](#authorizationerror)

##### andModeFailure()

```ts
static andModeFailure(
   failedValidator, 
   userType?, 
   userGroups?): AuthorizationError;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:185](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L185)

Create error for AND mode validation failure

###### Parameters

###### failedValidator

###### name

`string`

###### reason

`string`

###### userType?

`string`

###### userGroups?

`string`[]

###### Returns

[`AuthorizationError`](#authorizationerror)

##### groupMismatch()

```ts
static groupMismatch(
   requiredGroups, 
   actualGroups, 
   validatorName, 
   userType?): AuthorizationError;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:108](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L108)

Create error for group mismatch

###### Parameters

###### requiredGroups

`string`[]

###### actualGroups

`string`[]

###### validatorName

`string`

###### userType?

`string`

###### Returns

[`AuthorizationError`](#authorizationerror)

##### missingUserContext()

```ts
static missingUserContext(validatorName): AuthorizationError;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:149](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L149)

Create error for missing user context

###### Parameters

###### validatorName

`string`

###### Returns

[`AuthorizationError`](#authorizationerror)

##### orModeFailure()

```ts
static orModeFailure(
   validators, 
   userType?, 
   userGroups?): AuthorizationError;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:160](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L160)

Create error for OR mode validation failure

###### Parameters

###### validators

`object`[]

###### userType?

`string`

###### userGroups?

`string`[]

###### Returns

[`AuthorizationError`](#authorizationerror)

##### userTypeMismatch()

```ts
static userTypeMismatch(
   required, 
   actual, 
   validatorName): AuthorizationError;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:92](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L92)

Create error for user type mismatch

###### Parameters

###### required

`string`[]

###### actual

`string`

###### validatorName

`string`

###### Returns

[`AuthorizationError`](#authorizationerror)

***

### AuthorizationError

Defined in: [packages/core/src/core/authz/authErrors.ts:22](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L22)

Authorization error class with detailed information

#### Extends

- `Error`

#### Constructors

##### Constructor

```ts
new AuthorizationError(message, details): AuthorizationError;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:27](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L27)

###### Parameters

###### message

`string`

###### details

[`AuthErrorDetails`](#autherrordetails)

###### Returns

[`AuthorizationError`](#authorizationerror)

###### Overrides

```ts
Error.constructor
```

#### Properties

##### code

```ts
readonly code: "NOT_AUTHORIZED" = "NOT_AUTHORIZED";
```

Defined in: [packages/core/src/core/authz/authErrors.ts:23](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L23)

##### details

```ts
readonly details: AuthErrorDetails;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:25](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L25)

##### message

```ts
message: string;
```

Defined in: node\_modules/.pnpm/typescript@5.6.3/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

```ts
Error.message
```

##### name

```ts
name: string;
```

Defined in: node\_modules/.pnpm/typescript@5.6.3/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

```ts
Error.name
```

##### stack?

```ts
optional stack: string;
```

Defined in: node\_modules/.pnpm/typescript@5.6.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

```ts
Error.stack
```

##### statusCode

```ts
readonly statusCode: 403 = 403;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:24](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L24)

##### stackTraceLimit

```ts
static stackTraceLimit: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/globals.d.ts:68

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

###### Inherited from

```ts
Error.stackTraceLimit
```

#### Methods

##### toClientResponse()

```ts
toClientResponse(): object;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:57](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L57)

Get a safe error response for client (without sensitive details)

###### Returns

`object`

###### code

```ts
code: string;
```

###### error

```ts
error: string;
```

###### message

```ts
message: string;
```

##### toFullResponse()

```ts
toFullResponse(): object;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:68](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L68)

Get full error details (for internal logging/debugging)

###### Returns

`object`

###### code

```ts
code: string;
```

###### details

```ts
details: AuthErrorDetails;
```

###### error

```ts
error: string;
```

###### message

```ts
message: string;
```

###### statusCode

```ts
statusCode: number;
```

##### toLogString()

```ts
toLogString(): string;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:41](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L41)

Get a formatted error message for logging

###### Returns

`string`

##### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/globals.d.ts:52

Creates a `.stack` property on `targetObject`, which when accessed returns
a string representing the location in the code at which
`Error.captureStackTrace()` was called.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

The first line of the trace will be prefixed with
`${myObject.name}: ${myObject.message}`.

The optional `constructorOpt` argument accepts a function. If given, all frames
above `constructorOpt`, including `constructorOpt`, will be omitted from the
generated stack trace.

The `constructorOpt` argument is useful for hiding implementation
details of error generation from the user. For instance:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

```ts
Error.captureStackTrace
```

##### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/globals.d.ts:56

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

```ts
Error.prepareStackTrace
```

## Interfaces

### AuthConfigOptions

Defined in: [packages/core/src/core/authz/authConfig.ts:36](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L36)

Global configuration options

#### Properties

##### cacheMaxSize?

```ts
optional cacheMaxSize: number;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:78](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L78)

Maximum number of cache entries
Default: 1000

##### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:72](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L72)

Cache TTL in milliseconds
Default: 60000 (1 minute)

##### cacheValidationResults?

```ts
optional cacheValidationResults: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:66](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L66)

Enable caching of validation results
Default: false

##### enableAuditLog?

```ts
optional enableAuditLog: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:60](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L60)

Enable audit logging for all auth decisions
Default: false
Note: Logging implementation will be added in future

##### environment?

```ts
optional environment: string;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:84](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L84)

Environment (used for conditional behavior)
Default: process.env.NODE_ENV

##### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:53](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L53)

Custom error handler
Default: uses core error handler

##### onUnauthorized?

```ts
optional onUnauthorized: UnauthorizedTracker;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:104](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L104)

Callback invoked on every unauthorized request.
Receives the original request and the AuthorizationError.
Errors thrown inside this callback are silently swallowed.

###### Example

```typescript
AuthConfig.configure({
  onUnauthorized: async (req, error) => {
    await auditService.log({
      userId: req.user?.id,
      path: req.path,
      reason: error.details.failedValidator,
    });
  },
});
```

##### userContextExtractor?

```ts
optional userContextExtractor: UserContextExtractor;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:47](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L47)

Custom function to extract user context from request
If provided, overrides userObjectPath

##### userObjectPath?

```ts
optional userObjectPath: string;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:41](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L41)

Path to user object in request (e.g., "user", "session.user")
Default: "user"

***

### AuthErrorDetails

Defined in: [packages/core/src/core/authz/authErrors.ts:4](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L4)

Detailed authorization error information

#### Properties

##### actual

```ts
actual: string;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:8](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L8)

What the user actually has

##### context?

```ts
optional context: Record<string, any>;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:16](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L16)

Additional context

##### failedValidator

```ts
failedValidator: string;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:10](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L10)

Which decorator/validator failed

##### required

```ts
required: string;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:6](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L6)

What authorization was required

##### userGroups?

```ts
optional userGroups: string[];
```

Defined in: [packages/core/src/core/authz/authErrors.ts:14](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L14)

User groups if available

##### userType?

```ts
optional userType: string;
```

Defined in: [packages/core/src/core/authz/authErrors.ts:12](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authErrors.ts#L12)

User type if available

***

### DecoratorOptions

Defined in: [packages/core/src/core/authz/authConfig.ts:110](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L110)

Per-decorator configuration options

#### Extended by

- [`HasPermissionsOptions`](#haspermissionsoptions)
- [`OwnershipOptions`](../Decorators/namespaces/Auth/index.md#ownershipoptions)

#### Properties

##### auditLog?

```ts
optional auditLog: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:120](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L120)

Enable audit logging for this endpoint
Overrides global setting

##### cache?

```ts
optional cache: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:126](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L126)

Enable caching for this endpoint
Overrides global setting

##### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:132](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L132)

Cache TTL for this endpoint in milliseconds
Overrides global setting

##### disabled?

```ts
optional disabled: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:142](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L142)

Disable this auth check (useful for testing)

##### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:137](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L137)

Custom error handler for this endpoint

##### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:114](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L114)

Custom error message for this endpoint

***

### HasPermissionsOptions

Defined in: [packages/core/src/core/authz/authConfig.ts:149](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L149)

Options specific to the HasPermissions decorator.
Extends DecoratorOptions with permission-pattern-related settings.

#### Extends

- [`DecoratorOptions`](#decoratoroptions)

#### Properties

##### auditLog?

```ts
optional auditLog: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:120](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L120)

Enable audit logging for this endpoint
Overrides global setting

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`auditLog`](#auditlog)

##### cache?

```ts
optional cache: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:126](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L126)

Enable caching for this endpoint
Overrides global setting

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`cache`](#cache)

##### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:132](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L132)

Cache TTL for this endpoint in milliseconds
Overrides global setting

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`cacheTTL`](#cachettl-1)

##### disabled?

```ts
optional disabled: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:142](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L142)

Disable this auth check (useful for testing)

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`disabled`](#disabled)

##### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:137](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L137)

Custom error handler for this endpoint

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`errorHandler`](#errorhandler-1)

##### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:114](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L114)

Custom error message for this endpoint

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`errorMessage`](#errormessage)

##### separator?

```ts
optional separator: string;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:161](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L161)

Separator character for permission patterns with wildcards.
Default: ":"

###### Example

```ts
// With default separator ":"
@HasPermissions(["idm:user:*"]) // matches idm:user:read, idm:user:write

// With custom separator "."
@HasPermissions(["idm.user.*"], { separator: "." }) // matches idm.user.read
```

***

### UserCacheContext

Defined in: [packages/core/src/core/authz/authCacheUtils.ts:8](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authCacheUtils.ts#L8)

User context for cache key generation

#### Properties

##### groups?

```ts
optional groups: string[];
```

Defined in: [packages/core/src/core/authz/authCacheUtils.ts:11](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authCacheUtils.ts#L11)

##### userId?

```ts
optional userId: string;
```

Defined in: [packages/core/src/core/authz/authCacheUtils.ts:9](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authCacheUtils.ts#L9)

##### userType?

```ts
optional userType: string;
```

Defined in: [packages/core/src/core/authz/authCacheUtils.ts:10](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authCacheUtils.ts#L10)

***

### ValidationResult

Defined in: [packages/core/src/core/authz/authOrchestrator.ts:10](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authOrchestrator.ts#L10)

Result from an authorization validator

#### Properties

##### passed

```ts
passed: boolean;
```

Defined in: [packages/core/src/core/authz/authOrchestrator.ts:11](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authOrchestrator.ts#L11)

##### reason?

```ts
optional reason: string;
```

Defined in: [packages/core/src/core/authz/authOrchestrator.ts:12](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authOrchestrator.ts#L12)

***

### ValidatorMetadata

Defined in: [packages/core/src/core/authz/authOrchestrator.ts:27](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authOrchestrator.ts#L27)

Type definition for validator metadata stored on methods.

#### Properties

##### name

```ts
name: string;
```

Defined in: [packages/core/src/core/authz/authOrchestrator.ts:28](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authOrchestrator.ts#L28)

##### options?

```ts
optional options: DecoratorOptions;
```

Defined in: [packages/core/src/core/authz/authOrchestrator.ts:30](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authOrchestrator.ts#L30)

##### validator

```ts
validator: AuthValidator;
```

Defined in: [packages/core/src/core/authz/authOrchestrator.ts:29](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authOrchestrator.ts#L29)

## Type Aliases

### AuthErrorHandler()

```ts
type AuthErrorHandler = (res, error) => void;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:18](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L18)

Error handler function type

#### Parameters

##### res

`Response`

##### error

[`AuthorizationError`](#authorizationerror)

#### Returns

`void`

***

### AuthValidator()

```ts
type AuthValidator = (req) => 
  | ValidationResult
| Promise<ValidationResult>;
```

Defined in: [packages/core/src/core/authz/authOrchestrator.ts:20](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authOrchestrator.ts#L20)

Type definition for an authorization validator function.
Returns validation result with pass/fail and optional reason.
Can be async for validators that need to perform async operations.

#### Parameters

##### req

`Request`

#### Returns

  \| [`ValidationResult`](#validationresult)
  \| `Promise`\<[`ValidationResult`](#validationresult)\>

***

### UnauthorizedTracker()

```ts
type UnauthorizedTracker = (req, error) => void | Promise<void>;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:10](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L10)

Callback invoked whenever an authorization check fails.
Receives the original request and the full authorization error.
Use this to write audit logs, database records, metrics, etc.

#### Parameters

##### req

`Request`

##### error

[`AuthorizationError`](#authorizationerror)

#### Returns

`void` \| `Promise`\<`void`\>

***

### UserContextExtractor()

```ts
type UserContextExtractor = (req) => 
  | {
[key: string]: any;
  groups?: (
     | {
     name: string;
   }
    | string)[];
  userType?: string;
}
  | null;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:27](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L27)

User context extractor function
Allows custom logic for extracting user from request

#### Parameters

##### req

`Request`

#### Returns

  \| \{
\[`key`: `string`\]: `any`;
  `groups?`: (
     \| \{
     `name`: `string`;
   \}
    \| `string`)[];
  `userType?`: `string`;
\}
  \| `null`

## Variables

### authCache

```ts
const authCache: Cache<ValidationResult>;
```

Defined in: [packages/core/src/core/authz/authCacheUtils.ts:104](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authCacheUtils.ts#L104)

Singleton cache instance for authorization results.
Use this instance throughout your application.

#### Example

```typescript
import { authCache } from '@giusmento/mangojs-core';

// Get cache statistics
const stats = authCache.getStats();

// Clear cache for specific user
import { clearUserCache } from '@giusmento/mangojs-core';
clearUserCache(authCache, 'user-123');

// Clear entire cache
authCache.clear();
```

***

### defaultUserContextExtractor

```ts
const defaultUserContextExtractor: UserContextExtractor;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:416](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L416)

Default user context extractor
Extracts user from req.user (standard Express pattern)

## Functions

### clearUserCache()

```ts
function clearUserCache(cache, userId): number;
```

Defined in: [packages/core/src/core/authz/authCacheUtils.ts:78](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authCacheUtils.ts#L78)

Clear cache entries for a specific user.
Useful when user permissions change.

#### Parameters

##### cache

[`Cache`](../Cache/index.md#cache)\<[`ValidationResult`](#validationresult)\>

Cache instance to clear from

##### userId

`string`

User identifier

#### Returns

`number`

Number of entries removed

***

### createAuthOrchestrator()

```ts
function createAuthOrchestrator(
   validators, 
   useOrMode, 
methodName): (req, res, next) => Promise<void>;
```

Defined in: [packages/core/src/core/authz/authOrchestrator.ts:42](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authOrchestrator.ts#L42)

Creates an orchestrator middleware that runs multiple authorization validators
with either AND or OR logic.

#### Parameters

##### validators

[`ValidatorMetadata`](#validatormetadata)[]

Array of validator functions to run

##### useOrMode

`boolean`

If true, use OR logic (at least one passes); if false, use AND logic (all must pass)

##### methodName

Name of the method being protected (for logging)

`string` | `symbol`

#### Returns

Express middleware function

```ts
(
   req, 
   res, 
next): Promise<void>;
```

##### Parameters

###### req

`Request`

###### res

`Response`

###### next

`NextFunction`

##### Returns

`Promise`\<`void`\>

***

### generateCacheKey()

```ts
function generateCacheKey(
   userContext, 
   methodName, 
   validatorName): string;
```

Defined in: [packages/core/src/core/authz/authCacheUtils.ts:48](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authCacheUtils.ts#L48)

Generate cache key for validation result.

The cache key is composed of:
- User identifier (userId or 'anonymous')
- User type
- Groups hash (MD5 hash of sorted groups for consistent key)
- Method name
- Validator name

This ensures that:
- Different users get different cache entries
- Same user with different permissions gets different cache entries
- Same validation on different methods uses different cache entries

#### Parameters

##### userContext

[`UserCacheContext`](#usercachecontext)

User context information

##### methodName

Method/endpoint name

`string` | `symbol`

##### validatorName

`string`

Name of the validator

#### Returns

`string`

Cache key string

#### Example

```typescript
const key = generateCacheKey(
  {
    userId: '123',
    userType: 'PARTNER',
    groups: ['partner_admin', 'partner_user']
  },
  'getPartnerUsers',
  'HasUserType([PARTNER])'
);
// Result: "auth:user:123:PARTNER:a1b2c3d4:getPartnerUsers:HasUserType([PARTNER])"
```
