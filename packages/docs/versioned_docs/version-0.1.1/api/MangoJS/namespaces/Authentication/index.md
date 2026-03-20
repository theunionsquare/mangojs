---
sidebar_label: Authentication
---

# Authentication

Authentication strategies and middleware

## Other

### AuthContext

Defined in: [packages/core/src/core/auth/AuthContext.ts:26](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L26)

#### Implements

- [`IAuthContext`](#iauthcontext)

#### Constructors

##### Constructor

```ts
new AuthContext(
   user, 
   strategy, 
   authenticatedAt?): AuthContext;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:32](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L32)

###### Parameters

###### user

[`IAuthUser`](#iauthuser)

###### strategy

`string`

###### authenticatedAt?

`Date`

###### Returns

[`AuthContext`](#authcontext)

#### Properties

##### authenticatedAt?

```ts
readonly optional authenticatedAt: Date;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:30](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L30)

When authentication occurred

###### Implementation of

[`IAuthContext`](#iauthcontext).[`authenticatedAt`](#authenticatedat-1)

##### isAuthenticated

```ts
readonly isAuthenticated: boolean;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:29](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L29)

Whether the user is authenticated

###### Implementation of

[`IAuthContext`](#iauthcontext).[`isAuthenticated`](#isauthenticated-1)

##### strategy

```ts
readonly strategy: string;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:28](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L28)

Name of the strategy that authenticated the user

###### Implementation of

[`IAuthContext`](#iauthcontext).[`strategy`](#strategy-1)

##### user

```ts
readonly user: IAuthUser;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:27](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L27)

Authenticated user or null

###### Implementation of

[`IAuthContext`](#iauthcontext).[`user`](#user-1)

#### Methods

##### belongsToAllGroups()

```ts
belongsToAllGroups(groups): boolean;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:172](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L172)

Check if user belongs to all of the specified groups

###### Parameters

###### groups

`string`[]

###### Returns

`boolean`

###### Example

```typescript
if (authContext.belongsToAllGroups(['verified', 'premium'])) { ... }
```

###### Implementation of

[`IAuthContext`](#iauthcontext).[`belongsToAllGroups`](#belongstoallgroups-1)

##### belongsToAnyGroup()

```ts
belongsToAnyGroup(groups): boolean;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:159](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L159)

Check if user belongs to any of the specified groups

###### Parameters

###### groups

`string`[]

###### Returns

`boolean`

###### Example

```typescript
if (authContext.belongsToAnyGroup(['admins', 'moderators'])) { ... }
```

###### Implementation of

[`IAuthContext`](#iauthcontext).[`belongsToAnyGroup`](#belongstoanygroup-1)

##### belongsToGroup()

```ts
belongsToGroup(group): boolean;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:146](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L146)

Check if user belongs to a specific group

###### Parameters

###### group

`string`

###### Returns

`boolean`

###### Example

```typescript
if (authContext.belongsToGroup('premium_users')) { ... }
```

###### Implementation of

[`IAuthContext`](#iauthcontext).[`belongsToGroup`](#belongstogroup-1)

##### getMetadata()

```ts
getMetadata<T>(key): T;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:186](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L186)

Get a user metadata field

###### Type Parameters

###### T

`T` = `any`

###### Parameters

###### key

`string`

###### Returns

`T`

###### Example

```typescript
const tenantId = authContext.getMetadata<string>('tenantId');
```

##### getUserField()

```ts
getUserField<T>(key): T;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:198](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L198)

Get a custom user field

###### Type Parameters

###### T

`T` = `any`

###### Parameters

###### key

`string`

###### Returns

`T`

###### Example

```typescript
const organizationId = authContext.getUserField<string>('organizationId');
```

##### hasAllPermissions()

```ts
hasAllPermissions(permissions): boolean;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:107](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L107)

Check if user has all of the specified permissions

###### Parameters

###### permissions

`string`[]

###### Returns

`boolean`

###### Example

```typescript
if (authContext.hasAllPermissions(['users:read', 'users:write'])) { ... }
```

###### Implementation of

[`IAuthContext`](#iauthcontext).[`hasAllPermissions`](#hasallpermissions-1)

##### hasAnyPermission()

```ts
hasAnyPermission(permissions): boolean;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:94](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L94)

Check if user has any of the specified permissions

###### Parameters

###### permissions

`string`[]

###### Returns

`boolean`

###### Example

```typescript
if (authContext.hasAnyPermission(['users:read', 'users:write'])) { ... }
```

###### Implementation of

[`IAuthContext`](#iauthcontext).[`hasAnyPermission`](#hasanypermission-1)

##### hasAnyUserType()

```ts
hasAnyUserType(types): boolean;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:133](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L133)

Check if user has any of the specified user types

###### Parameters

###### types

`string`[]

###### Returns

`boolean`

###### Example

```typescript
if (authContext.hasAnyUserType(['ADMIN', 'MODERATOR'])) { ... }
```

###### Implementation of

[`IAuthContext`](#iauthcontext).[`hasAnyUserType`](#hasanyusertype-1)

##### hasPermission()

```ts
hasPermission(permission): boolean;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:81](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L81)

Check if user has a specific permission

###### Parameters

###### permission

`string`

###### Returns

`boolean`

###### Example

```typescript
if (authContext.hasPermission('users:delete')) { ... }
```

###### Implementation of

[`IAuthContext`](#iauthcontext).[`hasPermission`](#haspermission-1)

##### hasUserType()

```ts
hasUserType(type): boolean;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:121](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L121)

Check if user has a specific user type

###### Parameters

###### type

`string`

###### Returns

`boolean`

###### Example

```typescript
if (authContext.hasUserType('ADMIN')) { ... }
```

###### Implementation of

[`IAuthContext`](#iauthcontext).[`hasUserType`](#hasusertype-1)

##### toJSON()

```ts
toJSON(): Record<string, any>;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:206](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L206)

Create a JSON-serializable representation

###### Returns

`Record`\<`string`, `any`\>

##### toString()

```ts
toString(): string;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:218](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L218)

Create a log-friendly string representation

###### Returns

`string`

##### anonymous()

```ts
static anonymous(): AuthContext;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:54](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L54)

Create an unauthenticated context

###### Returns

[`AuthContext`](#authcontext)

###### Example

```typescript
req.authContext = AuthContext.anonymous();
```

##### authenticated()

```ts
static authenticated(user, strategy): AuthContext;
```

Defined in: [packages/core/src/core/auth/AuthContext.ts:69](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthContext.ts#L69)

Create an authenticated context

###### Parameters

###### user

[`IAuthUser`](#iauthuser)

Authenticated user info

###### strategy

`string`

Name of the strategy that authenticated

###### Returns

[`AuthContext`](#authcontext)

###### Example

```typescript
req.authContext = AuthContext.authenticated(user, 'jwt');
```

***

### AuthenticationError

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:13](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L13)

Authentication error (distinct from AuthorizationError)

Authentication = "Who are you?" (401 Unauthorized)
Authorization = "What can you do?" (403 Forbidden)

Use this error when:
- Token is missing, expired, or invalid
- Credentials are incorrect
- API key is invalid
- Session has expired

#### Extends

- `Error`

#### Constructors

##### Constructor

```ts
new AuthenticationError(message, code?): AuthenticationError;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:18](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L18)

###### Parameters

###### message

`string`

###### code?

`string` = `"AUTHENTICATION_FAILED"`

###### Returns

[`AuthenticationError`](#authenticationerror)

###### Overrides

```ts
Error.constructor
```

#### Properties

##### code

```ts
readonly code: string;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:14](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L14)

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
readonly name: "AuthenticationError" = "AuthenticationError";
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:16](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L16)

###### Overrides

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
readonly statusCode: number = 401;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:15](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L15)

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

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:96](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L96)

Get safe response for client (no internal details)

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

##### toLogString()

```ts
toLogString(): string;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:107](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L107)

Get detailed log string

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

##### custom()

```ts
static custom(message, code): AuthenticationError;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:89](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L89)

Create a custom authentication error

###### Parameters

###### message

`string`

###### code

`string`

###### Returns

[`AuthenticationError`](#authenticationerror)

##### invalidApiKey()

```ts
static invalidApiKey(): AuthenticationError;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:62](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L62)

Create error for invalid API key

###### Returns

[`AuthenticationError`](#authenticationerror)

##### invalidCredentials()

```ts
static invalidCredentials(): AuthenticationError;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:55](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L55)

Create error for invalid credentials

###### Returns

[`AuthenticationError`](#authenticationerror)

##### invalidSignature()

```ts
static invalidSignature(): AuthenticationError;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:69](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L69)

Create error for invalid signature

###### Returns

[`AuthenticationError`](#authenticationerror)

##### invalidToken()

```ts
static invalidToken(details?): AuthenticationError;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:37](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L37)

Create error for invalid token

###### Parameters

###### details?

`string`

###### Returns

[`AuthenticationError`](#authenticationerror)

##### malformedToken()

```ts
static malformedToken(): AuthenticationError;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:79](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L79)

Create error for malformed token

###### Returns

[`AuthenticationError`](#authenticationerror)

##### missingCredentials()

```ts
static missingCredentials(): AuthenticationError;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:45](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L45)

Create error for missing credentials

###### Returns

[`AuthenticationError`](#authenticationerror)

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

##### tokenExpired()

```ts
static tokenExpired(): AuthenticationError;
```

Defined in: [packages/core/src/core/auth/errors/AuthenticationError.ts:30](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/errors/AuthenticationError.ts#L30)

Create error for expired token

###### Returns

[`AuthenticationError`](#authenticationerror)

***

### AuthStrategyRegistry

Defined in: [packages/core/src/core/auth/AuthStrategyRegistry.ts:32](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthStrategyRegistry.ts#L32)

#### Constructors

##### Constructor

```ts
new AuthStrategyRegistry(strategies?): AuthStrategyRegistry;
```

Defined in: [packages/core/src/core/auth/AuthStrategyRegistry.ts:35](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthStrategyRegistry.ts#L35)

###### Parameters

###### strategies?

[`IAuthStrategy`](#iauthstrategy)[] = `[]`

###### Returns

[`AuthStrategyRegistry`](#authstrategyregistry)

#### Methods

##### authenticate()

```ts
authenticate(req): Promise<AuthContext>;
```

Defined in: [packages/core/src/core/auth/AuthStrategyRegistry.ts:91](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthStrategyRegistry.ts#L91)

Authenticate a request by trying strategies in priority order

###### Parameters

###### req

`Request`

Express request object

###### Returns

`Promise`\<[`AuthContext`](#authcontext)\>

AuthContext with user info if authenticated, anonymous otherwise

###### Throws

AuthenticationError if a strategy explicitly rejects (invalid token, etc.)

###### Example

```typescript
const authContext = await registry.authenticate(req);
if (authContext.isAuthenticated) {
  console.log(`User ${authContext.user.id} authenticated via ${authContext.strategy}`);
}
```

##### generateCredentials()

```ts
generateCredentials(
   strategyName, 
   payload, 
options?): Promise<AuthCredentials>;
```

Defined in: [packages/core/src/core/auth/AuthStrategyRegistry.ts:142](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthStrategyRegistry.ts#L142)

Generate credentials using a specific strategy

###### Parameters

###### strategyName

`string`

Name of the strategy to use

###### payload

[`GenerateTokenPayload`](#generatetokenpayload)

User data to encode

###### options?

`Record`\<`string`, `any`\>

Additional options for token generation

###### Returns

`Promise`\<[`AuthCredentials`](#authcredentials)\>

AuthCredentials with token(s)

###### Throws

Error if strategy not found or doesn't support generation

###### Example

```typescript
const credentials = await registry.generateCredentials('jwt', {
  id: user.id,
  userType: 'ADMIN',
  email: user.email
});

res.cookie(credentials.cookie.name, credentials.cookie.value, credentials.cookie.options);
```

##### getStrategies()

```ts
getStrategies(): readonly IAuthStrategy[];
```

Defined in: [packages/core/src/core/auth/AuthStrategyRegistry.ts:53](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthStrategyRegistry.ts#L53)

Get all registered strategies (sorted by priority)

###### Returns

readonly [`IAuthStrategy`](#iauthstrategy)[]

##### getStrategy()

```ts
getStrategy(name): IAuthStrategy;
```

Defined in: [packages/core/src/core/auth/AuthStrategyRegistry.ts:63](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthStrategyRegistry.ts#L63)

Get a strategy by name

###### Parameters

###### name

`string`

Strategy name

###### Returns

[`IAuthStrategy`](#iauthstrategy)

Strategy or undefined if not found

##### hasStrategy()

```ts
hasStrategy(name): boolean;
```

Defined in: [packages/core/src/core/auth/AuthStrategyRegistry.ts:72](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthStrategyRegistry.ts#L72)

Check if a strategy is registered

###### Parameters

###### name

`string`

Strategy name

###### Returns

`boolean`

##### revokeToken()

```ts
revokeToken(strategyName, token): Promise<boolean>;
```

Defined in: [packages/core/src/core/auth/AuthStrategyRegistry.ts:197](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthStrategyRegistry.ts#L197)

Revoke a token using a specific strategy

###### Parameters

###### strategyName

`string`

Name of the strategy to use

###### token

`string`

Token to revoke

###### Returns

`Promise`\<`boolean`\>

true if revoked, false otherwise

##### verifyToken()

```ts
verifyToken(strategyName, token): Promise<AuthContext>;
```

Defined in: [packages/core/src/core/auth/AuthStrategyRegistry.ts:169](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/AuthStrategyRegistry.ts#L169)

Verify a token using a specific strategy

###### Parameters

###### strategyName

`string`

Name of the strategy to use

###### token

`string`

Token to verify

###### Returns

`Promise`\<[`AuthContext`](#authcontext)\>

User info if valid, null if invalid

***

### ApiKeyStrategyOptions

Defined in: [packages/core/src/core/auth/types.ts:204](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L204)

API Key Strategy configuration options

#### Properties

##### headerName?

```ts
optional headerName: string;
```

Defined in: [packages/core/src/core/auth/types.ts:206](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L206)

Header name to extract API key from (default: 'X-API-Key')

##### queryParam?

```ts
optional queryParam: string;
```

Defined in: [packages/core/src/core/auth/types.ts:209](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L209)

Query parameter name (optional, for fallback)

##### validator()

```ts
validator: (apiKey, req) => Promise<IAuthUser>;
```

Defined in: [packages/core/src/core/auth/types.ts:217](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L217)

Validation function to verify the API key and return user info

###### Parameters

###### apiKey

`string`

The API key from the request

###### req

`Request`

The Express request object

###### Returns

`Promise`\<[`IAuthUser`](#iauthuser)\>

User info if valid, null if invalid

***

### AuthCookieOptions

Defined in: [packages/core/src/core/auth/types.ts:11](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L11)

Cookie options for token storage

#### Properties

##### domain?

```ts
optional domain: string;
```

Defined in: [packages/core/src/core/auth/types.ts:17](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L17)

##### httpOnly?

```ts
optional httpOnly: boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:12](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L12)

##### maxAge?

```ts
optional maxAge: number;
```

Defined in: [packages/core/src/core/auth/types.ts:15](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L15)

##### path?

```ts
optional path: string;
```

Defined in: [packages/core/src/core/auth/types.ts:16](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L16)

##### sameSite?

```ts
optional sameSite: "strict" | "lax" | "none";
```

Defined in: [packages/core/src/core/auth/types.ts:14](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L14)

##### secure?

```ts
optional secure: boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:13](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L13)

***

### AuthCredentials

Defined in: [packages/core/src/core/auth/types.ts:94](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L94)

Standardized token generation response
All strategies return this format for consistency

#### Properties

##### accessToken

```ts
accessToken: string;
```

Defined in: [packages/core/src/core/auth/types.ts:96](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L96)

The access token

##### cookie?

```ts
optional cookie: object;
```

Defined in: [packages/core/src/core/auth/types.ts:111](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L111)

Cookie configuration (for cookie-based tokens)

###### name

```ts
name: string;
```

###### options

```ts
options: AuthCookieOptions;
```

###### value

```ts
value: string;
```

##### expiresAt?

```ts
optional expiresAt: Date;
```

Defined in: [packages/core/src/core/auth/types.ts:108](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L108)

Absolute expiration time

##### expiresIn?

```ts
optional expiresIn: number;
```

Defined in: [packages/core/src/core/auth/types.ts:105](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L105)

Time until expiration in seconds

##### metadata?

```ts
optional metadata: Record<string, any>;
```

Defined in: [packages/core/src/core/auth/types.ts:118](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L118)

Additional metadata

##### refreshToken?

```ts
optional refreshToken: string;
```

Defined in: [packages/core/src/core/auth/types.ts:102](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L102)

Optional refresh token

##### tokenType

```ts
tokenType: string;
```

Defined in: [packages/core/src/core/auth/types.ts:99](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L99)

Type of token (Bearer, Cookie, ApiKey, or custom)

***

### GenerateTokenPayload

Defined in: [packages/core/src/core/auth/types.ts:223](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L223)

Payload for generating tokens

#### Indexable

```ts
[key: string]: any
```

Additional claims

#### Properties

##### email?

```ts
optional email: string;
```

Defined in: [packages/core/src/core/auth/types.ts:234](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L234)

User email

##### groups?

```ts
optional groups: string[];
```

Defined in: [packages/core/src/core/auth/types.ts:237](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L237)

User groups

##### id?

```ts
optional id: string;
```

Defined in: [packages/core/src/core/auth/types.ts:225](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L225)

User ID (will become 'sub' claim in JWT)

##### permissions?

```ts
optional permissions: string[];
```

Defined in: [packages/core/src/core/auth/types.ts:240](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L240)

User permissions

##### sub?

```ts
optional sub: string;
```

Defined in: [packages/core/src/core/auth/types.ts:228](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L228)

Alternative: subject claim directly

##### userType?

```ts
optional userType: string;
```

Defined in: [packages/core/src/core/auth/types.ts:231](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L231)

User type

***

### IAuthContext

Defined in: [packages/core/src/core/auth/types.ts:52](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L52)

Authentication context attached to requests
Provides helper methods for authorization checks

#### Properties

##### authenticatedAt?

```ts
readonly optional authenticatedAt: Date;
```

Defined in: [packages/core/src/core/auth/types.ts:63](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L63)

When authentication occurred

##### isAuthenticated

```ts
readonly isAuthenticated: boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:60](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L60)

Whether the user is authenticated

##### strategy

```ts
readonly strategy: string;
```

Defined in: [packages/core/src/core/auth/types.ts:57](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L57)

Name of the strategy that authenticated the user

##### user

```ts
readonly user: IAuthUser;
```

Defined in: [packages/core/src/core/auth/types.ts:54](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L54)

Authenticated user or null

#### Methods

##### belongsToAllGroups()

```ts
belongsToAllGroups(groups): boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:87](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L87)

Check if user belongs to all of the specified groups

###### Parameters

###### groups

`string`[]

###### Returns

`boolean`

##### belongsToAnyGroup()

```ts
belongsToAnyGroup(groups): boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:84](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L84)

Check if user belongs to any of the specified groups

###### Parameters

###### groups

`string`[]

###### Returns

`boolean`

##### belongsToGroup()

```ts
belongsToGroup(group): boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:81](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L81)

Check if user belongs to a specific group

###### Parameters

###### group

`string`

###### Returns

`boolean`

##### hasAllPermissions()

```ts
hasAllPermissions(permissions): boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:72](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L72)

Check if user has all of the specified permissions

###### Parameters

###### permissions

`string`[]

###### Returns

`boolean`

##### hasAnyPermission()

```ts
hasAnyPermission(permissions): boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:69](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L69)

Check if user has any of the specified permissions

###### Parameters

###### permissions

`string`[]

###### Returns

`boolean`

##### hasAnyUserType()

```ts
hasAnyUserType(types): boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:78](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L78)

Check if user has any of the specified user types

###### Parameters

###### types

`string`[]

###### Returns

`boolean`

##### hasPermission()

```ts
hasPermission(permission): boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:66](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L66)

Check if user has a specific permission

###### Parameters

###### permission

`string`

###### Returns

`boolean`

##### hasUserType()

```ts
hasUserType(type): boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:75](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L75)

Check if user has a specific user type

###### Parameters

###### type

`string`

###### Returns

`boolean`

***

### IAuthUser

Defined in: [packages/core/src/core/auth/types.ts:25](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L25)

Extensible user interface - no hardcoded enum
Developers can use any string for userType

#### Indexable

```ts
[key: string]: any
```

Allow extension with custom fields

#### Properties

##### email?

```ts
optional email: string;
```

Defined in: [packages/core/src/core/auth/types.ts:33](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L33)

User email address

##### groups?

```ts
optional groups: string[];
```

Defined in: [packages/core/src/core/auth/types.ts:36](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L36)

Groups the user belongs to

##### id

```ts
id: string;
```

Defined in: [packages/core/src/core/auth/types.ts:27](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L27)

Unique identifier for the user

##### metadata?

```ts
optional metadata: Record<string, any>;
```

Defined in: [packages/core/src/core/auth/types.ts:42](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L42)

Additional metadata

##### permissions?

```ts
optional permissions: string[];
```

Defined in: [packages/core/src/core/auth/types.ts:39](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L39)

Fine-grained permissions

##### userType

```ts
userType: string;
```

Defined in: [packages/core/src/core/auth/types.ts:30](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L30)

User type/role - any string value (e.g., 'ADMIN', 'CUSTOMER', 'API_CLIENT')

***

### JWTStrategyOptions

Defined in: [packages/core/src/core/auth/types.ts:124](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L124)

JWT Strategy configuration options

#### Properties

##### algorithm?

```ts
optional algorithm: 
  | "HS256"
  | "HS384"
  | "HS512"
  | "RS256"
  | "RS384"
  | "RS512"
  | "ES256"
  | "ES384"
  | "ES512";
```

Defined in: [packages/core/src/core/auth/types.ts:139](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L139)

JWT algorithm to use

##### audience?

```ts
optional audience: string | string[];
```

Defined in: [packages/core/src/core/auth/types.ts:159](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L159)

Token audience (aud claim)

##### clockTolerance?

```ts
optional clockTolerance: number;
```

Defined in: [packages/core/src/core/auth/types.ts:195](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L195)

Clock tolerance for expiration checks in seconds

##### cookie?

```ts
optional cookie: AuthCookieOptions;
```

Defined in: [packages/core/src/core/auth/types.ts:178](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L178)

Cookie options when generating tokens

##### cookieName?

```ts
optional cookieName: string;
```

Defined in: [packages/core/src/core/auth/types.ts:173](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L173)

Cookie name (default: 'auth_token')

##### expiresIn?

```ts
optional expiresIn: number;
```

Defined in: [packages/core/src/core/auth/types.ts:153](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L153)

Token expiration time in seconds (default: 3600)

##### extractFrom?

```ts
optional extractFrom: "header" | "cookie" | "both";
```

Defined in: [packages/core/src/core/auth/types.ts:164](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L164)

Where to extract the token from

##### headerName?

```ts
optional headerName: string;
```

Defined in: [packages/core/src/core/auth/types.ts:167](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L167)

Header name (default: 'Authorization')

##### headerScheme?

```ts
optional headerScheme: string;
```

Defined in: [packages/core/src/core/auth/types.ts:170](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L170)

Header scheme (default: 'Bearer')

##### ignoreExpiration?

```ts
optional ignoreExpiration: boolean;
```

Defined in: [packages/core/src/core/auth/types.ts:198](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L198)

Ignore token expiration (not recommended for production)

##### issuer?

```ts
optional issuer: string;
```

Defined in: [packages/core/src/core/auth/types.ts:156](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L156)

Token issuer (iss claim)

##### privateKey?

```ts
optional privateKey: string;
```

Defined in: [packages/core/src/core/auth/types.ts:134](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L134)

Private key for asymmetric algorithms (RS256, ES256)

##### publicKey?

```ts
optional publicKey: string;
```

Defined in: [packages/core/src/core/auth/types.ts:131](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L131)

Public key for asymmetric algorithms (RS256, ES256)

##### refreshToken?

```ts
optional refreshToken: object;
```

Defined in: [packages/core/src/core/auth/types.ts:183](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L183)

Refresh token configuration

###### cookieName?

```ts
optional cookieName: string;
```

Refresh token cookie name

###### enabled

```ts
enabled: boolean;
```

Enable refresh token generation

###### expiresIn?

```ts
optional expiresIn: number;
```

Refresh token expiration in seconds (default: 604800 = 7 days)

##### secret?

```ts
optional secret: string;
```

Defined in: [packages/core/src/core/auth/types.ts:128](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/types.ts#L128)

Secret for symmetric algorithms (HS256, HS384, HS512)

## Strategies

### ApiKeyStrategy

Defined in: [packages/core/src/core/auth/strategies/ApiKeyStrategy.ts:59](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/ApiKeyStrategy.ts#L59)

API Key Authentication Strategy

Authenticates requests using an API key provided in a header or query parameter.
You must provide a validator function that verifies the key and returns user info.

#### Example

```typescript
// Basic usage with header
const apiKeyStrategy = new ApiKeyStrategy({
  validator: async (apiKey, req) => {
    const user = await db.users.findByApiKey(apiKey);
    if (!user) return null;
    return {
      id: user.id,
      userType: 'API_CLIENT',
      permissions: user.scopes,
    };
  }
});

// With custom header and query fallback
const apiKeyStrategy = new ApiKeyStrategy({
  headerName: 'Authorization',  // Different header
  queryParam: 'api_key',        // Fallback to ?api_key=xxx
  validator: async (apiKey, req) => {
    // Handle "Bearer sk_xxx" format
    const key = apiKey.replace(/^Bearer\s+/i, '');
    return validateAndFetchUser(key);
  }
});

// Register with container
container.bind(AUTH_STRATEGY_TAG).toConstantValue(apiKeyStrategy);
```

#### Extends

- [`BaseAuthStrategy`](#abstract-baseauthstrategy)

#### Constructors

##### Constructor

```ts
new ApiKeyStrategy(options): ApiKeyStrategy;
```

Defined in: [packages/core/src/core/auth/strategies/ApiKeyStrategy.ts:68](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/ApiKeyStrategy.ts#L68)

###### Parameters

###### options

[`ApiKeyStrategyOptions`](#apikeystrategyoptions)

###### Returns

[`ApiKeyStrategy`](#apikeystrategy)

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`constructor`](#constructor-4)

#### Properties

##### name

```ts
readonly name: "apikey" = "apikey";
```

Defined in: [packages/core/src/core/auth/strategies/ApiKeyStrategy.ts:60](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/ApiKeyStrategy.ts#L60)

Unique name for this strategy (must be implemented)

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`name`](#name-2)

##### priority

```ts
readonly priority: number;
```

Defined in: [packages/core/src/core/auth/strategies/ApiKeyStrategy.ts:61](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/ApiKeyStrategy.ts#L61)

Default priority (can be overridden)
Lower numbers = higher priority

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`priority`](#priority-1)

#### Methods

##### authenticate()

```ts
authenticate(req): Promise<IAuthUser>;
```

Defined in: [packages/core/src/core/auth/strategies/ApiKeyStrategy.ts:96](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/ApiKeyStrategy.ts#L96)

Authenticate the request by validating the API key

###### Parameters

###### req

`Request`

###### Returns

`Promise`\<[`IAuthUser`](#iauthuser)\>

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`authenticate`](#authenticate-2)

##### canHandle()

```ts
canHandle(req): boolean;
```

Defined in: [packages/core/src/core/auth/strategies/ApiKeyStrategy.ts:89](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/ApiKeyStrategy.ts#L89)

Check if this strategy can handle the request
Returns true if an API key is present in header or query

###### Parameters

###### req

`Request`

###### Returns

`boolean`

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`canHandle`](#canhandle-1)

##### extractApiKey()

```ts
protected extractApiKey(req, headerName?): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:124](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L124)

Extract API key from header

###### Parameters

###### req

`Request`

Express request

###### headerName?

`string` = `"x-api-key"`

Header name (default: 'x-api-key')

###### Returns

`string`

API key or null if not found

###### Example

```typescript
// X-API-Key: sk_live_abc123
const apiKey = this.extractApiKey(req);
```

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`extractApiKey`](#extractapikey-1)

##### extractBearerToken()

```ts
protected extractBearerToken(
   req, 
   headerName?, 
   scheme?): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:73](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L73)

Extract Bearer token from Authorization header

###### Parameters

###### req

`Request`

Express request

###### headerName?

`string` = `"authorization"`

Header name (default: 'authorization')

###### scheme?

`string` = `"bearer"`

Expected scheme (default: 'bearer')

###### Returns

`string`

Token string or null if not found

###### Example

```typescript
// Authorization: Bearer eyJhbGc...
const token = this.extractBearerToken(req);
```

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`extractBearerToken`](#extractbearertoken-1)

##### extractCookieToken()

```ts
protected extractCookieToken(req, cookieName): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:102](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L102)

Extract token from cookie

###### Parameters

###### req

`Request`

Express request

###### cookieName

`string`

Name of the cookie

###### Returns

`string`

Cookie value or null if not found

###### Example

```typescript
const token = this.extractCookieToken(req, 'auth_token');
```

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`extractCookieToken`](#extractcookietoken-1)

##### extractQueryParam()

```ts
protected extractQueryParam(req, paramName): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:140](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L140)

Extract value from query parameter

###### Parameters

###### req

`Request`

Express request

###### paramName

`string`

Query parameter name

###### Returns

`string`

Parameter value or null if not found

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`extractQueryParam`](#extractqueryparam-1)

##### getClientIp()

```ts
protected getClientIp(req): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:150](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L150)

Get client IP address from request
Handles common proxy headers

###### Parameters

###### req

`Request`

###### Returns

`string`

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`getClientIp`](#getclientip-1)

##### getUserAgent()

```ts
protected getUserAgent(req): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:170](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L170)

Get user agent from request

###### Parameters

###### req

`Request`

###### Returns

`string`

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`getUserAgent`](#getuseragent-1)

***

### `abstract` BaseAuthStrategy

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:34](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L34)

Abstract base class for authentication strategies

Provides common functionality and helper methods for extracting
credentials from requests. Extend this class to create custom strategies.

#### Example

```typescript
@injectable()
class MyStrategy extends BaseAuthStrategy {
  readonly name = 'my-strategy';
  readonly priority = 50;

  async authenticate(req: Request): Promise<IAuthUser | null> {
    const token = this.extractBearerToken(req);
    if (!token) return null;
    // validate token...
  }
}
```

#### Extended by

- [`JWTStrategy`](#jwtstrategy)
- [`ApiKeyStrategy`](#apikeystrategy)

#### Implements

- [`IAuthStrategy`](#iauthstrategy)

#### Constructors

##### Constructor

```ts
new BaseAuthStrategy(): BaseAuthStrategy;
```

###### Returns

[`BaseAuthStrategy`](#abstract-baseauthstrategy)

#### Properties

##### name

```ts
abstract readonly name: string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:38](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L38)

Unique name for this strategy (must be implemented)

###### Implementation of

[`IAuthStrategy`](#iauthstrategy).[`name`](#name-4)

##### priority

```ts
readonly priority: number = 100;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:44](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L44)

Default priority (can be overridden)
Lower numbers = higher priority

###### Implementation of

[`IAuthStrategy`](#iauthstrategy).[`priority`](#priority-3)

#### Methods

##### authenticate()

```ts
abstract authenticate(req): Promise<IAuthUser>;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:49](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L49)

Authenticate the request (must be implemented)

###### Parameters

###### req

`Request`

###### Returns

`Promise`\<[`IAuthUser`](#iauthuser)\>

###### Implementation of

[`IAuthStrategy`](#iauthstrategy).[`authenticate`](#authenticate-4)

##### canHandle()

```ts
canHandle(req): boolean;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:55](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L55)

Default implementation - strategy can handle any request
Override to add request filtering for early bailout

###### Parameters

###### req

`Request`

###### Returns

`boolean`

###### Implementation of

[`IAuthStrategy`](#iauthstrategy).[`canHandle`](#canhandle-3)

##### extractApiKey()

```ts
protected extractApiKey(req, headerName?): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:124](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L124)

Extract API key from header

###### Parameters

###### req

`Request`

Express request

###### headerName?

`string` = `"x-api-key"`

Header name (default: 'x-api-key')

###### Returns

`string`

API key or null if not found

###### Example

```typescript
// X-API-Key: sk_live_abc123
const apiKey = this.extractApiKey(req);
```

##### extractBearerToken()

```ts
protected extractBearerToken(
   req, 
   headerName?, 
   scheme?): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:73](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L73)

Extract Bearer token from Authorization header

###### Parameters

###### req

`Request`

Express request

###### headerName?

`string` = `"authorization"`

Header name (default: 'authorization')

###### scheme?

`string` = `"bearer"`

Expected scheme (default: 'bearer')

###### Returns

`string`

Token string or null if not found

###### Example

```typescript
// Authorization: Bearer eyJhbGc...
const token = this.extractBearerToken(req);
```

##### extractCookieToken()

```ts
protected extractCookieToken(req, cookieName): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:102](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L102)

Extract token from cookie

###### Parameters

###### req

`Request`

Express request

###### cookieName

`string`

Name of the cookie

###### Returns

`string`

Cookie value or null if not found

###### Example

```typescript
const token = this.extractCookieToken(req, 'auth_token');
```

##### extractQueryParam()

```ts
protected extractQueryParam(req, paramName): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:140](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L140)

Extract value from query parameter

###### Parameters

###### req

`Request`

Express request

###### paramName

`string`

Query parameter name

###### Returns

`string`

Parameter value or null if not found

##### getClientIp()

```ts
protected getClientIp(req): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:150](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L150)

Get client IP address from request
Handles common proxy headers

###### Parameters

###### req

`Request`

###### Returns

`string`

##### getUserAgent()

```ts
protected getUserAgent(req): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:170](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L170)

Get user agent from request

###### Parameters

###### req

`Request`

###### Returns

`string`

***

### JWTStrategy

Defined in: [packages/core/src/core/auth/strategies/JWTStrategy.ts:95](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/JWTStrategy.ts#L95)

JWT Authentication Strategy

Supports both symmetric (HS256, HS384, HS512) and asymmetric
(RS256, RS384, RS512, ES256, ES384, ES512) algorithms.

Can extract tokens from:
- Authorization header (Bearer scheme)
- Cookies
- Both (tries header first, then cookie)

#### Example

```typescript
// Symmetric JWT via header
const jwtStrategy = new JWTStrategy({
  secret: process.env.JWT_SECRET,
  expiresIn: 3600,
});

// Asymmetric JWT via cookie
const jwtStrategy = new JWTStrategy({
  publicKey: fs.readFileSync('./public.pem', 'utf8'),
  privateKey: fs.readFileSync('./private.pem', 'utf8'),
  algorithm: 'RS256',
  extractFrom: 'cookie',
  cookieName: 'session',
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 86400000,
  }
});

// Register with container
container.bind(AUTH_STRATEGY_TAG).toConstantValue(jwtStrategy);
```

#### Extends

- [`BaseAuthStrategy`](#abstract-baseauthstrategy)

#### Constructors

##### Constructor

```ts
new JWTStrategy(options?): JWTStrategy;
```

Defined in: [packages/core/src/core/auth/strategies/JWTStrategy.ts:101](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/JWTStrategy.ts#L101)

###### Parameters

###### options?

[`JWTStrategyOptions`](#jwtstrategyoptions) = `{}`

###### Returns

[`JWTStrategy`](#jwtstrategy)

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`constructor`](#constructor-4)

#### Properties

##### name

```ts
readonly name: "jwt" = "jwt";
```

Defined in: [packages/core/src/core/auth/strategies/JWTStrategy.ts:96](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/JWTStrategy.ts#L96)

Unique name for this strategy (must be implemented)

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`name`](#name-2)

##### priority

```ts
readonly priority: number;
```

Defined in: [packages/core/src/core/auth/strategies/JWTStrategy.ts:97](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/JWTStrategy.ts#L97)

Default priority (can be overridden)
Lower numbers = higher priority

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`priority`](#priority-1)

#### Methods

##### authenticate()

```ts
authenticate(req): Promise<IAuthUser>;
```

Defined in: [packages/core/src/core/auth/strategies/JWTStrategy.ts:174](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/JWTStrategy.ts#L174)

Authenticate the request by verifying the JWT

###### Parameters

###### req

`Request`

###### Returns

`Promise`\<[`IAuthUser`](#iauthuser)\>

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`authenticate`](#authenticate-2)

##### canHandle()

```ts
canHandle(req): boolean;
```

Defined in: [packages/core/src/core/auth/strategies/JWTStrategy.ts:153](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/JWTStrategy.ts#L153)

Check if this strategy can handle the request
Returns true if the expected token source has a value

###### Parameters

###### req

`Request`

###### Returns

`boolean`

###### Overrides

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`canHandle`](#canhandle-1)

##### extractApiKey()

```ts
protected extractApiKey(req, headerName?): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:124](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L124)

Extract API key from header

###### Parameters

###### req

`Request`

Express request

###### headerName?

`string` = `"x-api-key"`

Header name (default: 'x-api-key')

###### Returns

`string`

API key or null if not found

###### Example

```typescript
// X-API-Key: sk_live_abc123
const apiKey = this.extractApiKey(req);
```

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`extractApiKey`](#extractapikey-1)

##### extractBearerToken()

```ts
protected extractBearerToken(
   req, 
   headerName?, 
   scheme?): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:73](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L73)

Extract Bearer token from Authorization header

###### Parameters

###### req

`Request`

Express request

###### headerName?

`string` = `"authorization"`

Header name (default: 'authorization')

###### scheme?

`string` = `"bearer"`

Expected scheme (default: 'bearer')

###### Returns

`string`

Token string or null if not found

###### Example

```typescript
// Authorization: Bearer eyJhbGc...
const token = this.extractBearerToken(req);
```

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`extractBearerToken`](#extractbearertoken-1)

##### extractCookieToken()

```ts
protected extractCookieToken(req, cookieName): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:102](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L102)

Extract token from cookie

###### Parameters

###### req

`Request`

Express request

###### cookieName

`string`

Name of the cookie

###### Returns

`string`

Cookie value or null if not found

###### Example

```typescript
const token = this.extractCookieToken(req, 'auth_token');
```

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`extractCookieToken`](#extractcookietoken-1)

##### extractQueryParam()

```ts
protected extractQueryParam(req, paramName): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:140](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L140)

Extract value from query parameter

###### Parameters

###### req

`Request`

Express request

###### paramName

`string`

Query parameter name

###### Returns

`string`

Parameter value or null if not found

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`extractQueryParam`](#extractqueryparam-1)

##### generateToken()

```ts
generateToken(payload, options?): Promise<AuthCredentials>;
```

Defined in: [packages/core/src/core/auth/strategies/JWTStrategy.ts:248](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/JWTStrategy.ts#L248)

Generate a JWT token

###### Parameters

###### payload

[`GenerateTokenPayload`](#generatetokenpayload)

###### options?

###### expiresIn?

`number`

###### Returns

`Promise`\<[`AuthCredentials`](#authcredentials)\>

##### getClientIp()

```ts
protected getClientIp(req): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:150](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L150)

Get client IP address from request
Handles common proxy headers

###### Parameters

###### req

`Request`

###### Returns

`string`

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`getClientIp`](#getclientip-1)

##### getUserAgent()

```ts
protected getUserAgent(req): string;
```

Defined in: [packages/core/src/core/auth/strategies/BaseAuthStrategy.ts:170](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/BaseAuthStrategy.ts#L170)

Get user agent from request

###### Parameters

###### req

`Request`

###### Returns

`string`

###### Inherited from

[`BaseAuthStrategy`](#abstract-baseauthstrategy).[`getUserAgent`](#getuseragent-1)

##### verifyToken()

```ts
verifyToken(token): Promise<IAuthUser>;
```

Defined in: [packages/core/src/core/auth/strategies/JWTStrategy.ts:337](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/JWTStrategy.ts#L337)

Verify a token without request context

###### Parameters

###### token

`string`

###### Returns

`Promise`\<[`IAuthUser`](#iauthuser)\>

***

### IAuthStrategy

Defined in: [packages/core/src/core/auth/strategies/IAuthStrategy.ts:39](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/IAuthStrategy.ts#L39)

Authentication strategy interface

Implement this interface to create custom authentication mechanisms.
Strategies are tried in priority order (lower number = higher priority).

#### Example

```typescript
@injectable()
class MyCustomStrategy implements IAuthStrategy {
  readonly name = 'custom';
  readonly priority = 50;

  async authenticate(req: Request): Promise<IAuthUser | null> {
    const token = req.headers['x-custom-token'];
    if (!token) return null;

    const user = await this.validateToken(token);
    return user;
  }
}
```

#### Properties

##### name

```ts
readonly name: string;
```

Defined in: [packages/core/src/core/auth/strategies/IAuthStrategy.ts:44](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/IAuthStrategy.ts#L44)

Unique name for this strategy
Used for logging and identification

##### priority

```ts
readonly priority: number;
```

Defined in: [packages/core/src/core/auth/strategies/IAuthStrategy.ts:55](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/IAuthStrategy.ts#L55)

Priority for strategy execution (lower = higher priority)
Strategies are tried in priority order until one succeeds

Recommended ranges:
- 1-10: High priority (API keys, service tokens)
- 10-50: Normal priority (JWT, session)
- 50-100: Low priority (fallback strategies)

#### Methods

##### authenticate()

```ts
authenticate(req): Promise<IAuthUser>;
```

Defined in: [packages/core/src/core/auth/strategies/IAuthStrategy.ts:73](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/IAuthStrategy.ts#L73)

Attempt to authenticate the request

###### Parameters

###### req

`Request`

Express request object

###### Returns

`Promise`\<[`IAuthUser`](#iauthuser)\>

IAuthUser if successful, null if this strategy doesn't apply

###### Throws

AuthenticationError for explicit failures (invalid token, expired, etc.)

Return null when:
- The required credentials aren't present (no token, no cookie)
- The strategy simply doesn't apply to this request

Throw AuthenticationError when:
- Credentials are present but invalid
- Token is expired
- Signature verification fails

##### canHandle()?

```ts
optional canHandle(req): boolean;
```

Defined in: [packages/core/src/core/auth/strategies/IAuthStrategy.ts:121](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/IAuthStrategy.ts#L121)

Optional: Check if this strategy can handle this request
Use this for early filtering before attempting authentication

###### Parameters

###### req

`Request`

Express request object

###### Returns

`boolean`

false to skip this strategy entirely

###### Example

```typescript
canHandle(req: Request): boolean {
  // Only handle requests with X-API-Key header
  return !!req.headers['x-api-key'];
}
```

##### generateToken()?

```ts
optional generateToken(payload, options?): Promise<AuthCredentials>;
```

Defined in: [packages/core/src/core/auth/strategies/IAuthStrategy.ts:83](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/IAuthStrategy.ts#L83)

Optional: Generate credentials/tokens for a user
Not all strategies support token generation (e.g., session-based)

###### Parameters

###### payload

[`GenerateTokenPayload`](#generatetokenpayload)

User data to encode in the token

###### options?

`Record`\<`string`, `any`\>

Additional generation options

###### Returns

`Promise`\<[`AuthCredentials`](#authcredentials)\>

AuthCredentials with token(s) and metadata

##### revokeToken()?

```ts
optional revokeToken(token): Promise<boolean>;
```

Defined in: [packages/core/src/core/auth/strategies/IAuthStrategy.ts:104](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/IAuthStrategy.ts#L104)

Optional: Revoke/invalidate a token
Useful for logout, token rotation, or blacklisting

###### Parameters

###### token

`string`

The token to revoke

###### Returns

`Promise`\<`boolean`\>

true if revoked, false if not found or already revoked

##### verifyToken()?

```ts
optional verifyToken(token): Promise<IAuthUser>;
```

Defined in: [packages/core/src/core/auth/strategies/IAuthStrategy.ts:95](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/IAuthStrategy.ts#L95)

Optional: Verify a token without the full request context
Useful for token validation in non-HTTP contexts

###### Parameters

###### token

`string`

The raw token string

###### Returns

`Promise`\<[`IAuthUser`](#iauthuser)\>

User info if valid, null if invalid

***

### AUTH\_STRATEGY\_TAG

```ts
const AUTH_STRATEGY_TAG: typeof AUTH_STRATEGY_TAG;
```

Defined in: [packages/core/src/core/auth/strategies/IAuthStrategy.ts:14](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/auth/strategies/IAuthStrategy.ts#L14)

Symbol for multi-inject binding
Use this to bind multiple strategies to the container

#### Example

```typescript
container.bind(AUTH_STRATEGY_TAG).to(JWTStrategy);
container.bind(AUTH_STRATEGY_TAG).to(ApiKeyStrategy);
```
