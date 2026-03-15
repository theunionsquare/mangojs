# Class: AuthContext

Defined in: [src/core/auth/AuthContext.ts:26](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L26)

## Implements

- [`IAuthContext`](../interfaces/IAuthContext.md)

## Constructors

### Constructor

```ts
new AuthContext(
   user, 
   strategy, 
   authenticatedAt?): AuthContext;
```

Defined in: [src/core/auth/AuthContext.ts:32](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L32)

#### Parameters

##### user

[`IAuthUser`](../interfaces/IAuthUser.md)

##### strategy

`string`

##### authenticatedAt?

`Date`

#### Returns

`AuthContext`

## Properties

### authenticatedAt?

```ts
readonly optional authenticatedAt: Date;
```

Defined in: [src/core/auth/AuthContext.ts:30](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L30)

When authentication occurred

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`authenticatedAt`](../interfaces/IAuthContext.md#authenticatedat)

***

### isAuthenticated

```ts
readonly isAuthenticated: boolean;
```

Defined in: [src/core/auth/AuthContext.ts:29](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L29)

Whether the user is authenticated

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`isAuthenticated`](../interfaces/IAuthContext.md#isauthenticated)

***

### strategy

```ts
readonly strategy: string;
```

Defined in: [src/core/auth/AuthContext.ts:28](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L28)

Name of the strategy that authenticated the user

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`strategy`](../interfaces/IAuthContext.md#strategy)

***

### user

```ts
readonly user: IAuthUser;
```

Defined in: [src/core/auth/AuthContext.ts:27](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L27)

Authenticated user or null

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`user`](../interfaces/IAuthContext.md#user)

## Methods

### belongsToAllGroups()

```ts
belongsToAllGroups(groups): boolean;
```

Defined in: [src/core/auth/AuthContext.ts:172](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L172)

Check if user belongs to all of the specified groups

#### Parameters

##### groups

`string`[]

#### Returns

`boolean`

#### Example

```typescript
if (authContext.belongsToAllGroups(['verified', 'premium'])) { ... }
```

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`belongsToAllGroups`](../interfaces/IAuthContext.md#belongstoallgroups)

***

### belongsToAnyGroup()

```ts
belongsToAnyGroup(groups): boolean;
```

Defined in: [src/core/auth/AuthContext.ts:159](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L159)

Check if user belongs to any of the specified groups

#### Parameters

##### groups

`string`[]

#### Returns

`boolean`

#### Example

```typescript
if (authContext.belongsToAnyGroup(['admins', 'moderators'])) { ... }
```

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`belongsToAnyGroup`](../interfaces/IAuthContext.md#belongstoanygroup)

***

### belongsToGroup()

```ts
belongsToGroup(group): boolean;
```

Defined in: [src/core/auth/AuthContext.ts:146](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L146)

Check if user belongs to a specific group

#### Parameters

##### group

`string`

#### Returns

`boolean`

#### Example

```typescript
if (authContext.belongsToGroup('premium_users')) { ... }
```

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`belongsToGroup`](../interfaces/IAuthContext.md#belongstogroup)

***

### getMetadata()

```ts
getMetadata<T>(key): T;
```

Defined in: [src/core/auth/AuthContext.ts:186](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L186)

Get a user metadata field

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### key

`string`

#### Returns

`T`

#### Example

```typescript
const tenantId = authContext.getMetadata<string>('tenantId');
```

***

### getUserField()

```ts
getUserField<T>(key): T;
```

Defined in: [src/core/auth/AuthContext.ts:198](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L198)

Get a custom user field

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### key

`string`

#### Returns

`T`

#### Example

```typescript
const organizationId = authContext.getUserField<string>('organizationId');
```

***

### hasAllPermissions()

```ts
hasAllPermissions(permissions): boolean;
```

Defined in: [src/core/auth/AuthContext.ts:107](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L107)

Check if user has all of the specified permissions

#### Parameters

##### permissions

`string`[]

#### Returns

`boolean`

#### Example

```typescript
if (authContext.hasAllPermissions(['users:read', 'users:write'])) { ... }
```

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`hasAllPermissions`](../interfaces/IAuthContext.md#hasallpermissions)

***

### hasAnyPermission()

```ts
hasAnyPermission(permissions): boolean;
```

Defined in: [src/core/auth/AuthContext.ts:94](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L94)

Check if user has any of the specified permissions

#### Parameters

##### permissions

`string`[]

#### Returns

`boolean`

#### Example

```typescript
if (authContext.hasAnyPermission(['users:read', 'users:write'])) { ... }
```

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`hasAnyPermission`](../interfaces/IAuthContext.md#hasanypermission)

***

### hasAnyUserType()

```ts
hasAnyUserType(types): boolean;
```

Defined in: [src/core/auth/AuthContext.ts:133](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L133)

Check if user has any of the specified user types

#### Parameters

##### types

`string`[]

#### Returns

`boolean`

#### Example

```typescript
if (authContext.hasAnyUserType(['ADMIN', 'MODERATOR'])) { ... }
```

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`hasAnyUserType`](../interfaces/IAuthContext.md#hasanyusertype)

***

### hasPermission()

```ts
hasPermission(permission): boolean;
```

Defined in: [src/core/auth/AuthContext.ts:81](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L81)

Check if user has a specific permission

#### Parameters

##### permission

`string`

#### Returns

`boolean`

#### Example

```typescript
if (authContext.hasPermission('users:delete')) { ... }
```

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`hasPermission`](../interfaces/IAuthContext.md#haspermission)

***

### hasUserType()

```ts
hasUserType(type): boolean;
```

Defined in: [src/core/auth/AuthContext.ts:121](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L121)

Check if user has a specific user type

#### Parameters

##### type

`string`

#### Returns

`boolean`

#### Example

```typescript
if (authContext.hasUserType('ADMIN')) { ... }
```

#### Implementation of

[`IAuthContext`](../interfaces/IAuthContext.md).[`hasUserType`](../interfaces/IAuthContext.md#hasusertype)

***

### toJSON()

```ts
toJSON(): Record<string, any>;
```

Defined in: [src/core/auth/AuthContext.ts:206](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L206)

Create a JSON-serializable representation

#### Returns

`Record`\<`string`, `any`\>

***

### toString()

```ts
toString(): string;
```

Defined in: [src/core/auth/AuthContext.ts:218](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L218)

Create a log-friendly string representation

#### Returns

`string`

***

### anonymous()

```ts
static anonymous(): AuthContext;
```

Defined in: [src/core/auth/AuthContext.ts:54](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L54)

Create an unauthenticated context

#### Returns

`AuthContext`

#### Example

```typescript
req.authContext = AuthContext.anonymous();
```

***

### authenticated()

```ts
static authenticated(user, strategy): AuthContext;
```

Defined in: [src/core/auth/AuthContext.ts:69](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/AuthContext.ts#L69)

Create an authenticated context

#### Parameters

##### user

[`IAuthUser`](../interfaces/IAuthUser.md)

Authenticated user info

##### strategy

`string`

Name of the strategy that authenticated

#### Returns

`AuthContext`

#### Example

```typescript
req.authContext = AuthContext.authenticated(user, 'jwt');
```
