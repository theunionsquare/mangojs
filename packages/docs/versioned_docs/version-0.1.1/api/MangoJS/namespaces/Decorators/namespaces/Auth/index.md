---
sidebar_label: Auth
---

# Auth

## Description

Authorization decorators for Express route protection.

## Classes

### AuthConfig

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:146](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L146)

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

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:162](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L162)

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

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:196](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L196)

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

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:340](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L340)

Get cache max size

###### Returns

`number`

Maximum number of cache entries

##### getCacheTTL()

```ts
static getCacheTTL(decoratorOptions?): number;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:313](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L313)

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

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:174](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L174)

Get current configuration

###### Returns

`Readonly`\<`Required`\<[`AuthConfigOptions`](#authconfigoptions)\>\>

##### getErrorHandler()

```ts
static getErrorHandler(decoratorOptions?): AuthErrorHandler;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:326](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L326)

Get error handler

###### Parameters

###### decoratorOptions?

[`DecoratorOptions`](#decoratoroptions)

Optional per-decorator options

###### Returns

[`AuthErrorHandler`](#autherrorhandler)

Custom error handler if configured

##### isAuditLogEnabled()

```ts
static isAuditLogEnabled(decoratorOptions?): boolean;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:287](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L287)

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

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:300](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L300)

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

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:181](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L181)

Reset to default configuration (useful for testing)

###### Returns

`void`

***

### AuthErrorFactory

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:88](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L88)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:128](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L128)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:188](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L188)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:108](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L108)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:148](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L148)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:159](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L159)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:92](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L92)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:22](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L22)

Authorization error class with detailed information

#### Extends

- `Error`

#### Constructors

##### Constructor

```ts
new AuthorizationError(message, details): AuthorizationError;
```

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:27](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L27)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:23](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L23)

##### details

```ts
readonly details: AuthErrorDetails;
```

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:25](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L25)

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
readonly statusCode: 401 = 401;
```

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:24](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L24)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:57](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L57)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:68](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L68)

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

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:41](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L41)

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

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:26](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L26)

Global configuration options

#### Properties

##### cacheMaxSize?

```ts
optional cacheMaxSize: number;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:68](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L68)

Maximum number of cache entries
Default: 1000

##### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:62](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L62)

Cache TTL in milliseconds
Default: 60000 (1 minute)

##### cacheValidationResults?

```ts
optional cacheValidationResults: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:56](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L56)

Enable caching of validation results
Default: false

##### enableAuditLog?

```ts
optional enableAuditLog: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:50](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L50)

Enable audit logging for all auth decisions
Default: false
Note: Logging implementation will be added in future

##### environment?

```ts
optional environment: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:74](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L74)

Environment (used for conditional behavior)
Default: process.env.NODE_ENV

##### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:43](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L43)

Custom error handler
Default: uses core error handler

##### userContextExtractor?

```ts
optional userContextExtractor: UserContextExtractor;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:37](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L37)

Custom function to extract user context from request
If provided, overrides userObjectPath

##### userObjectPath?

```ts
optional userObjectPath: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:31](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L31)

Path to user object in request (e.g., "user", "session.user")
Default: "user"

***

### AuthErrorDetails

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:4](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L4)

Detailed authorization error information

#### Properties

##### actual

```ts
actual: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:8](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L8)

What the user actually has

##### context?

```ts
optional context: Record<string, any>;
```

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:16](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L16)

Additional context

##### failedValidator

```ts
failedValidator: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:10](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L10)

Which decorator/validator failed

##### required

```ts
required: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:6](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L6)

What authorization was required

##### userGroups?

```ts
optional userGroups: string[];
```

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:14](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L14)

User groups if available

##### userType?

```ts
optional userType: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authErrors.ts:12](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authErrors.ts#L12)

User type if available

***

### DecoratorOptions

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:80](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L80)

Per-decorator configuration options

#### Extended by

- [`OwnershipOptions`](#ownershipoptions)

#### Properties

##### auditLog?

```ts
optional auditLog: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:90](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L90)

Enable audit logging for this endpoint
Overrides global setting

##### cache?

```ts
optional cache: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:96](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L96)

Enable caching for this endpoint
Overrides global setting

##### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:102](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L102)

Cache TTL for this endpoint in milliseconds
Overrides global setting

##### disabled?

```ts
optional disabled: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:112](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L112)

Disable this auth check (useful for testing)

##### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:107](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L107)

Custom error handler for this endpoint

##### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:84](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L84)

Custom error message for this endpoint

##### separator?

```ts
optional separator: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:126](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L126)

Separator character for permission patterns with wildcards.
Used by HasPermissions decorator for wildcard matching.
Default: ":"

###### Example

```ts
// With default separator ":"
@HasPermissions(["idm:user:*"]) // matches idm:user:read, idm:user:write

// With custom separator "."
@HasPermissions(["idm.user.*"], { separator: "." }) // matches idm.user.read
```

***

### OwnershipOptions

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:29](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L29)

Configuration options for the RequiresOwnership decorator

#### Extends

- [`DecoratorOptions`](#decoratoroptions)

#### Properties

##### arrayField?

```ts
optional arrayField: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:54](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L54)

Whether the user field contains an array of IDs
If true, checks if resource ID is in the user's array
If false, checks direct equality

###### Default

```ts
false
```

##### auditLog?

```ts
optional auditLog: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:90](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L90)

Enable audit logging for this endpoint
Overrides global setting

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`auditLog`](#auditlog)

##### cache?

```ts
optional cache: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:96](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L96)

Enable caching for this endpoint
Overrides global setting

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`cache`](#cache)

##### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:102](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L102)

Cache TTL for this endpoint in milliseconds
Overrides global setting

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`cacheTTL`](#cachettl-1)

##### customValidator?

```ts
optional customValidator: OwnershipValidator;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:60](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L60)

Custom validation function for complex ownership logic
If provided, overrides the default equality/array checks

##### disabled?

```ts
optional disabled: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:112](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L112)

Disable this auth check (useful for testing)

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`disabled`](#disabled)

##### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:107](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L107)

Custom error handler for this endpoint

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`errorHandler`](#errorhandler-1)

##### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:84](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L84)

Custom error message for this endpoint

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`errorMessage`](#errormessage)

##### paramName?

```ts
optional paramName: string;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:40](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L40)

Parameter name in the request (params/query/body)

###### Default

`${resourceName}Id`

##### paramSource?

```ts
optional paramSource: ParameterSource;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:46](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L46)

Source of the parameter in the request

###### Default

```ts
"params"
```

##### separator?

```ts
optional separator: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:126](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L126)

Separator character for permission patterns with wildcards.
Used by HasPermissions decorator for wildcard matching.
Default: ":"

###### Example

```ts
// With default separator ":"
@HasPermissions(["idm:user:*"]) // matches idm:user:read, idm:user:write

// With custom separator "."
@HasPermissions(["idm.user.*"], { separator: "." }) // matches idm.user.read
```

###### Inherited from

[`DecoratorOptions`](#decoratoroptions).[`separator`](#separator)

##### userField?

```ts
optional userField: string;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:34](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L34)

Field name in the user context to check

###### Default

`${resourceName}Id`

***

### UserCacheContext

Defined in: [packages/core/src/core/decorators/auth/core/authCacheUtils.ts:8](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authCacheUtils.ts#L8)

User context for cache key generation

#### Properties

##### groups?

```ts
optional groups: string[];
```

Defined in: [packages/core/src/core/decorators/auth/core/authCacheUtils.ts:11](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authCacheUtils.ts#L11)

##### userId?

```ts
optional userId: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authCacheUtils.ts:9](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authCacheUtils.ts#L9)

##### userType?

```ts
optional userType: string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authCacheUtils.ts:10](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authCacheUtils.ts#L10)

## Type Aliases

### AuthErrorHandler()

```ts
type AuthErrorHandler = (res, error) => void;
```

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:8](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L8)

Error handler function type

#### Parameters

##### res

`Response`

##### error

[`AuthorizationError`](#authorizationerror)

#### Returns

`void`

***

### OwnershipValidator()

```ts
type OwnershipValidator = (userValue, resourceValue, req) => boolean | Promise<boolean>;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:20](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L20)

Custom ownership validator function

#### Parameters

##### userValue

`any`

The value from the user context

##### resourceValue

`any`

The value from the request

##### req

`Request`

The full request object for complex logic

#### Returns

`boolean` \| `Promise`\<`boolean`\>

true if user owns the resource, false otherwise

***

### ParameterSource

```ts
type ParameterSource = "params" | "query" | "body";
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:11](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L11)

Source of the resource identifier in the request

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

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:17](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L17)

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

Defined in: [packages/core/src/core/decorators/auth/core/authCacheUtils.ts:108](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authCacheUtils.ts#L108)

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

Defined in: [packages/core/src/core/decorators/auth/core/authConfig.ts:349](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authConfig.ts#L349)

Default user context extractor
Extracts user from req.user (standard Express pattern)

## Functions

### ClassHasUserType()

```ts
function ClassHasUserType(userTypes): ClassDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/classHasUserType.decorator.ts:43](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/classHasUserType.decorator.ts#L43)

Class decorator that applies user type authorization to all methods in a class.

This decorator sets default authorization requirements for all methods in the class
based on user type. Individual methods can override this by using method-level
decorators like

#### Parameters

##### userTypes

[`AuthUserType`](../../../Types/namespaces/enums/index.md#authusertype)[]

Array of user types that are allowed to access all methods in the class

#### Returns

`ClassDecorator`

A class decorator that applies user type authorization to all methods

#### Requires Access

or @NoAuth.

#### Example

```typescript
@Controller("/api/iam/v1/partners/users")
@ClassHasUserType([AuthUserType.ADMIN, AuthUserType.PARTNER])
export class PartnerUserController {
  @Get("/")
  async getPartnerUsers(req: Request, res: Response) {
    // Accessible by ADMIN or PARTNER users
  }

  @Post("/")
  async addPartnerUser(req: Request, res: Response) {
    // Accessible by ADMIN or PARTNER users
  }

  @Get("/admin-only")
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"]
  })
  async adminOnlyEndpoint(req: Request, res: Response) {
    // Override: Only ADMIN with specific groups
  }
}
```

#### Remarks

- Applied at the class level, affects all methods by default
- Method-level decorators can override the class-level authorization
- Only checks user type, not groups. For group validation, use method-level

#### Requires Access

***

### clearUserCache()

```ts
function clearUserCache(cache, userId): number;
```

Defined in: [packages/core/src/core/decorators/auth/core/authCacheUtils.ts:82](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authCacheUtils.ts#L82)

Clear cache entries for a specific user.
Useful when user permissions change.

#### Parameters

##### cache

[`Cache`](../../../Cache/index.md#cache)\<`ValidationResult`\>

Cache instance to clear from

##### userId

`string`

User identifier

#### Returns

`number`

Number of entries removed

***

### generateCacheKey()

```ts
function generateCacheKey(
   userContext, 
   methodName, 
   validatorName): string;
```

Defined in: [packages/core/src/core/decorators/auth/core/authCacheUtils.ts:48](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/core/authCacheUtils.ts#L48)

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

***

### HasGroups()

```ts
function HasGroups(groups, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/hasGroups.decorator.ts:100](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/hasGroups.decorator.ts#L100)

Method decorator that restricts access to routes based on user groups.

This decorator creates an authorization middleware that checks if the authenticated
user belongs to at least one of the specified groups. If the user doesn't have any
of the required groups, the request is rejected with a NOT_AUTHORIZED error.

When used with @OrAuth(), this decorator can be combined with other auth decorators
using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
AND logic (all must pass).

#### Parameters

##### groups

`string`[]

Array of group names that are allowed to access the route

##### options?

[`DecoratorOptions`](#decoratoroptions)

Optional configuration for this decorator instance

#### Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

#### Example

```typescript
class UserController {
  // Single decorator with multiple groups (OR within decorator)
  @HasGroups(["admin", "moderator"])
  async deleteUser(req: Request, res: Response) {
    // Accessible by users with "admin" OR "moderator" group
  }

  // Single group requirement
  @HasGroups(["premium_user"])
  async getPremiumContent(req: Request, res: Response) {
    // Only accessible by users with "premium_user" group
  }

  // With custom error message
  @HasGroups(["admin"], {
    errorMessage: "Only administrators can access this endpoint"
  })
  async adminOnlyEndpoint(req: Request, res: Response) {}

  // With custom error handler
  @HasGroups(["premium_user"], {
    errorHandler: (res, error) => {
      res.status(403).json({ error: "Premium membership required" });
    }
  })
  async premiumEndpoint(req: Request, res: Response) {}

  // Disabled for testing
  @HasGroups(["admin"], {
    disabled: process.env.NODE_ENV === "test"
  })
  async testEndpoint(req: Request, res: Response) {}

  // AND logic (default): Must be PARTNER AND have partner_admin group
  @HasUserType([AuthUserType.PARTNER])
  @HasGroups(["partner_admin"])
  async restrictedEndpoint(req: Request, res: Response) {
    // User must be PARTNER AND have partner_admin group
  }

  // OR logic: Must have admin group OR moderator group (with different types)
  @OrAuth()
  @HasGroups(["admin"])
  @HasGroups(["moderator"])
  async flexibleEndpoint(req: Request, res: Response) {
    // User must have admin OR moderator group
  }

  // OR logic: ADMIN user OR user with special_access group
  @OrAuth()
  @HasUserType([AuthUserType.ADMIN])
  @HasGroups(["special_access"])
  async specialEndpoint(req: Request, res: Response) {
    // ADMIN (any group) OR any user with special_access group
  }
}
```

#### Remarks

- By default, multiple auth decorators use AND logic (all must pass)
- Use @OrAuth() to enable OR logic (at least one must pass)
- This decorator only checks groups and does not validate user type
- For combined user type and group validation, use

#### Requires Access

instead

#### See

 - [OrAuth](#orauth) for enabling OR logic between multiple decorators
 - [RequiresAccess](#requiresaccess) for combined user type and group validation with wildcard support

***

### HasPermissions()

```ts
function HasPermissions(permissions, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/hasPermissions.decorator.ts:142](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/hasPermissions.decorator.ts#L142)

Method decorator that restricts access to routes based on user permissions.

This decorator creates an authorization middleware that checks if the authenticated
user has at least one of the specified permissions. Supports wildcard patterns
using `*` to match any segment.

#### Parameters

##### permissions

`string`[]

Array of permission patterns that are allowed to access the route

##### options?

[`DecoratorOptions`](#decoratoroptions)

Optional configuration for this decorator instance

#### Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

#### Example

```typescript
class UserController {
  // Exact permission match
  @HasPermissions(["idm:user:read"])
  async getUsers(req: Request, res: Response) {
    // Requires exact "idm:user:read" permission
  }

  // Wildcard at the end - matches any action on idm:user
  @HasPermissions(["idm:user:*"])
  async manageUsers(req: Request, res: Response) {
    // Matches: idm:user:read, idm:user:write, idm:user:delete
  }

  // Wildcard in the middle - matches any resource with read permission
  @HasPermissions(["idm:*:read"])
  async readAnyResource(req: Request, res: Response) {
    // Matches: idm:user:read, idm:group:read, idm:role:read
  }

  // Multiple patterns (OR logic within decorator)
  @HasPermissions(["idm:user:read", "idm:admin:*"])
  async getUser(req: Request, res: Response) {
    // Requires "idm:user:read" OR any idm:admin permission
  }

  // Custom separator for dot-notation permissions
  @HasPermissions(["app.users.*"], { separator: "." })
  async appUsers(req: Request, res: Response) {
    // Matches: app.users.read, app.users.write
  }

  // Combined with other decorators (AND logic by default)
  @HasUserType([AuthUserType.ADMIN])
  @HasPermissions(["system:config:write"])
  async updateConfig(req: Request, res: Response) {
    // Must be ADMIN AND have system:config:write permission
  }

  // OR logic with other decorators
  @OrAuth()
  @HasPermissions(["admin:*"])
  @HasGroups(["superusers"])
  async adminEndpoint(req: Request, res: Response) {
    // Has any admin permission OR belongs to superusers group
  }
}
```

#### Remarks

- Wildcards match exactly one segment (between separators)
- `idm:user:*` matches `idm:user:read` but NOT `idm:user:sub:read`
- The default separator is `:`, but can be changed via options
- User permissions are extracted from `req.authContext.user.permissions` or `req.user.permissions`

#### See

 - [HasGroups](#hasgroups) for group-based authorization
 - [OrAuth](#orauth) for enabling OR logic between multiple decorators

***

### HasUserType()

```ts
function HasUserType(userTypes, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/hasUserType.decorator.ts:89](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/hasUserType.decorator.ts#L89)

Method decorator that restricts access to routes based on user type.

This decorator creates an authorization middleware that checks if the authenticated
user's type matches one of the allowed types. If the user type doesn't match any
of the allowed types, the request is rejected with a NOT_AUTHORIZED error.

When used with @OrAuth(), this decorator can be combined with other auth decorators
using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
AND logic (all must pass).

#### Parameters

##### userTypes

[`AuthUserType`](../../../Types/namespaces/enums/index.md#authusertype)[]

Array of allowed user types

##### options?

[`DecoratorOptions`](#decoratoroptions)

Optional configuration for this decorator instance

#### Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

#### Example

```typescript
class UserController {
  // Basic usage: User must be ADMIN
  @HasUserType([AuthUserType.ADMIN])
  async deleteUser(req: Request, res: Response) {
    // Only accessible by users with ADMIN type
  }

  // Multiple user types in one decorator (OR within decorator)
  @HasUserType([AuthUserType.ADMIN, AuthUserType.MODERATOR])
  async updateUser(req: Request, res: Response) {
    // Accessible by users with ADMIN or MODERATOR type
  }

  // With custom error message
  @HasUserType([AuthUserType.ADMIN], {
    errorMessage: "Only administrators can access this endpoint"
  })
  async adminOnlyEndpoint(req: Request, res: Response) {}

  // With custom error handler
  @HasUserType([AuthUserType.PARTNER], {
    errorHandler: (res, error) => {
      res.status(403).json({ error: "Partner access required" });
    }
  })
  async partnerEndpoint(req: Request, res: Response) {}

  // Disabled for testing
  @HasUserType([AuthUserType.ADMIN], {
    disabled: process.env.NODE_ENV === "test"
  })
  async testEndpoint(req: Request, res: Response) {}

  // AND logic (default): Must be PARTNER AND have partner_admin group
  @HasUserType([AuthUserType.PARTNER])
  @HasGroups(["partner_admin"])
  async getPartnerData(req: Request, res: Response) {
    // User must be PARTNER AND have partner_admin group
  }

  // OR logic: Must be ADMIN OR PARTNER
  @OrAuth()
  @HasUserType([AuthUserType.ADMIN])
  @HasUserType([AuthUserType.PARTNER])
  async flexibleAccess(req: Request, res: Response) {
    // User can be ADMIN OR PARTNER (at least one must match)
  }
}
```

#### Remarks

- By default, multiple auth decorators use AND logic (all must pass)
- Use @OrAuth() to enable OR logic (at least one must pass)
- This decorator only checks user type, not groups
- For combined user type and group validation, use

#### Requires Access

#### See

 - [OrAuth](#orauth) for enabling OR logic between multiple decorators
 - [RequiresAccess](#requiresaccess) for combined user type and group validation

***

### NoAuth()

```ts
function NoAuth(): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/noAuth.decorator.ts:35](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/noAuth.decorator.ts#L35)

Method decorator that removes all authorization requirements from a method.

This decorator is useful when you have a class-level authorization decorator
(like @ClassHasUserType) but want to make specific methods publicly accessible
without any authentication or authorization checks.

#### Returns

`MethodDecorator`

A method decorator that clears all authorization middleware

#### Example

```typescript
@Controller("/api/iam/v1/partners/users")
@ClassHasUserType([AuthUserType.PARTNER])
export class PartnerUserController {
  @Get("/")
  async getPartnerUsers(req: Request, res: Response) {
    // Protected: Only PARTNER users
  }

  @Get("/magiclinks/:magiclink")
  @NoAuth()
  async getPartnerUserByMagicLink(req: Request, res: Response) {
    // Public: No authentication required
  }
}
```

#### Remarks

- Use this decorator to override class-level authorization
- Removes all authorization middleware from the method
- Should be used carefully as it makes endpoints publicly accessible

***

### OrAuth()

```ts
function OrAuth(): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/orAuth.decorator.ts:44](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/orAuth.decorator.ts#L44)

Method decorator that enables OR logic for multiple authorization decorators.

When applied, this decorator changes the behavior of multiple stacked authorization
decorators from AND logic (all must pass) to OR logic (at least one must pass).

Without @OrAuth: All authorization decorators must pass (AND logic)
With @OrAuth: At least one authorization decorator must pass (OR logic)

IMPORTANT: Due to decorator execution order, @OrAuth() must be placed at the TOP
of the decorator stack. Decorators execute bottom-to-top, so @OrAuth() executes last
but needs to set metadata that other decorators read during their execution.

#### Returns

`MethodDecorator`

A method decorator that enables OR mode for authorization

#### Example

```typescript
class PartnerUserController {
  // AND logic (default): Must be PARTNER AND have partner_admin group
  @HasUserType([AuthUserType.PARTNER])
  @HasGroups(["partner_admin"])
  async strictEndpoint(req: Request, res: Response) {
    // Both conditions must be true
  }

  // OR logic: Must be ADMIN OR (PARTNER with partner_admin group)
  @OrAuth()  // MUST be at the top!
  @HasUserType([AuthUserType.ADMIN])
  @RequiresAccess({ [AuthUserType.PARTNER]: ["partner_admin"] })
  async flexibleEndpoint(req: Request, res: Response) {
    // At least one condition must be true
  }
}
```

#### Remarks

- MUST be placed at the TOP of the decorator stack (decorators execute bottom-to-top)
- Applies to ALL authorization decorators on the method
- Cannot mix AND/OR logic (it's either all AND or all OR)
- For complex logic like (A OR B) AND C, create separate endpoints

***

### RequiresAccess()

```ts
function RequiresAccess(accessMap, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/requiresAccess.decorator.ts:184](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresAccess.decorator.ts#L184)

Method decorator that restricts access to routes based on user type and group combinations.

This decorator creates an authorization middleware that checks if the authenticated
user's type and group combination matches any of the allowed configurations. The user
must have the specified user type AND belong to one of the allowed groups for that type.

Supports wildcard patterns for flexible group matching:
- `"*"` matches any group
- `"partner_*"` matches groups starting with "partner_"
- `"*_admin"` matches groups ending with "_admin"
- `"partner_*_admin"` matches groups with prefix and suffix
- No wildcard performs exact match

When used with @OrAuth(), this decorator can be combined with other auth decorators
using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
AND logic (all must pass).

#### Parameters

##### accessMap

`AccessRequirements`

Object mapping user types to their allowed groups (with wildcard support)

##### options?

[`DecoratorOptions`](#decoratoroptions)

Optional configuration for this decorator instance

#### Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

#### Example

```typescript
class PartnerUserController {
  // Single decorator with user type + group validation
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"],           // Any admin group
    [AuthUserType.PARTNER]: ["partner_admin"]    // Exact match
  })
  async getPartnerUsers(req: Request, res: Response) {
    // Accessible by:
    // - ADMIN users with any group starting with "admin_"
    // OR
    // - PARTNER users with exact "partner_admin" group
  }

  // Allow any group for ADMIN users
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["*"]
  })
  async adminOnlyEndpoint(req: Request, res: Response) {
    // ADMIN users with any group can access
  }

  // With custom error message
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"],
    [AuthUserType.PARTNER]: ["partner_admin"]
  }, {
    errorMessage: "Access restricted to admins and partner admins only"
  })
  async restrictedEndpoint(req: Request, res: Response) {}

  // With custom error handler
  @RequiresAccess({
    [AuthUserType.PARTNER]: ["partner_*"]
  }, {
    errorHandler: (res, error) => {
      res.status(403).json({ error: "Partner access required" });
    }
  })
  async partnerEndpoint(req: Request, res: Response) {}

  // Disabled for testing
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"]
  }, {
    disabled: process.env.NODE_ENV === "test"
  })
  async testEndpoint(req: Request, res: Response) {}

  // Wildcard patterns
  @RequiresAccess({
    [AuthUserType.PARTNER]: ["partner_*"],       // Any partner group
    [AuthUserType.USER]: ["*_premium"]           // Any premium group
  })
  async premiumContent(req: Request, res: Response) {
    // PARTNER with any partner_* group OR USER with any *_premium group
  }

  // OR logic: Multiple access patterns
  @OrAuth()
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"]
  })
  @RequiresAccess({
    [AuthUserType.PARTNER]: ["partner_admin", "partner_superuser"]
  })
  async flexibleAccess(req: Request, res: Response) {
    // Passes if ANY of these are true:
    // - ADMIN with any admin_* group
    // OR
    // - PARTNER with partner_admin or partner_superuser group
  }

  // Combining with other decorators using OR logic
  @OrAuth()
  @RequiresAccess({
    [AuthUserType.PARTNER]: ["partner_admin"]
  })
  @HasUserType([AuthUserType.SYSTEM])
  async systemOrPartnerAdmin(req: Request, res: Response) {
    // PARTNER with partner_admin group OR any SYSTEM user
  }
}
```

#### Remarks

- Within a single

#### Requires Access

decorator, different user types use OR logic
- Multiple

#### Requires Access

decorators use AND logic by default
- Use @OrAuth() to enable OR logic between multiple decorators
- Wildcard patterns provide flexible group matching
- This is the most powerful auth decorator, combining user type and group validation

#### See

 - [OrAuth](#orauth) for enabling OR logic between multiple decorators
 - [HasUserType](#hasusertype) for user type-only validation
 - [HasGroups](#hasgroups) for group-only validation

***

### RequiresOwnership()

```ts
function RequiresOwnership(resourceName, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:175](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L175)

Method decorator that validates resource ownership based on user context.

This decorator checks if the authenticated user "owns" or has access to a specific
resource by comparing a field in the user context with a parameter from the request.
Supports both single-value and array-based ownership checks.

Common use cases:
- Prevent horizontal privilege escalation (users accessing other users' data)
- Enforce data isolation in multi-tenant applications
- Validate that users can only modify their own resources

#### Parameters

##### resourceName

`string`

Name of the resource (e.g., "partner", "organization")

##### options?

[`OwnershipOptions`](#ownershipoptions)

Configuration options for ownership validation

#### Returns

`MethodDecorator`

A method decorator that adds ownership validation middleware

#### Example

```typescript
class PartnerController {
  // Basic ownership check
  // Checks: req.user.partnerId === req.params.partnerId
  @RequiresOwnership("partner")
  async updatePartner(@Param("partnerId") partnerId: string) {
    // Only the partner who owns this resource can update it
  }

  // Admin bypass with OR logic
  @OrAuth()
  @HasUserType([AuthUserType.ADMIN])
  @RequiresOwnership("partner")
  async updatePartner(@Param("partnerId") partnerId: string) {
    // Admin OR owner can update
  }

  // Custom field names
  @RequiresOwnership("partner", {
    userField: "partnerUuid",
    paramName: "id"
  })
  async getPartner(@Param("id") id: string) {
    // Checks: req.user.partnerUuid === req.params.id
  }

  // Multi-organization access (array field)
  @RequiresOwnership("organization", {
    userField: "organizationIds",
    arrayField: true
  })
  async getOrgData(@Param("organizationId") organizationId: string) {
    // Checks: req.user.organizationIds.includes(req.params.organizationId)
  }

  // Query parameter source
  @RequiresOwnership("partner", {
    paramSource: "query",
    paramName: "partnerId"
  })
  async getPartnerData(@Query("partnerId") partnerId: string) {
    // Checks: req.user.partnerId === req.query.partnerId
  }

  // Body parameter source
  @RequiresOwnership("partner", {
    paramSource: "body",
    paramName: "targetPartnerId"
  })
  async transferData(@Body() body: TransferDto) {
    // Checks: req.user.partnerId === req.body.targetPartnerId
  }

  // Custom validation logic
  @RequiresOwnership("resource", {
    customValidator: (userValue, resourceValue, req) => {
      // Complex ownership logic
      return userValue.includes(resourceValue) && req.user.isActive;
    }
  })
  async complexOwnership(@Param("resourceId") resourceId: string) {}

  // With custom error message
  @RequiresOwnership("partner", {
    errorMessage: "You can only modify your own partner data"
  })
  async updatePartner(@Param("partnerId") partnerId: string) {}

  // Disabled for testing
  @RequiresOwnership("partner", {
    disabled: process.env.NODE_ENV === "test"
  })
  async testEndpoint(@Param("partnerId") partnerId: string) {}

  // Complex pattern: Partner admin OR owner
  @OrAuth()
  @HasGroups(["partner_admin"])
  @RequiresOwnership("partner")
  async deletePartner(@Param("partnerId") partnerId: string) {
    // Partner admins OR the owner can delete
  }
}
```

#### Remarks

- By default, looks for `${resourceName}Id` in both user context and request params
- Supports single-value equality checks and array membership checks
- Can be combined with other decorators using AND/OR logic
- Uses AuthConfig for flexible user context extraction
- Provides detailed error messages with actual vs expected values

#### See

 - [HasUserType](#hasusertype) for user type validation
 - [HasGroups](#hasgroups) for group validation
 - [OrAuth](#orauth) for enabling OR logic between decorators

## References

### CacheEntry

Re-exports [CacheEntry](../../../Cache/index.md#cacheentry)

***

### CacheOptions

Re-exports [CacheOptions](../../../Cache/index.md#cacheoptions)

***

### CacheStats

Re-exports [CacheStats](../../../Cache/index.md#cachestats)
