[**MangoJS**](../../../../README.md)

***

# Interface: IAuthContext

Defined in: [src/core/auth/types.ts:52](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L52)

Authentication context attached to requests
Provides helper methods for authorization checks

## Properties

### authenticatedAt?

```ts
readonly optional authenticatedAt: Date;
```

Defined in: [src/core/auth/types.ts:63](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L63)

When authentication occurred

***

### isAuthenticated

```ts
readonly isAuthenticated: boolean;
```

Defined in: [src/core/auth/types.ts:60](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L60)

Whether the user is authenticated

***

### strategy

```ts
readonly strategy: string;
```

Defined in: [src/core/auth/types.ts:57](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L57)

Name of the strategy that authenticated the user

***

### user

```ts
readonly user: IAuthUser;
```

Defined in: [src/core/auth/types.ts:54](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L54)

Authenticated user or null

## Methods

### belongsToAllGroups()

```ts
belongsToAllGroups(groups): boolean;
```

Defined in: [src/core/auth/types.ts:87](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L87)

Check if user belongs to all of the specified groups

#### Parameters

##### groups

`string`[]

#### Returns

`boolean`

***

### belongsToAnyGroup()

```ts
belongsToAnyGroup(groups): boolean;
```

Defined in: [src/core/auth/types.ts:84](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L84)

Check if user belongs to any of the specified groups

#### Parameters

##### groups

`string`[]

#### Returns

`boolean`

***

### belongsToGroup()

```ts
belongsToGroup(group): boolean;
```

Defined in: [src/core/auth/types.ts:81](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L81)

Check if user belongs to a specific group

#### Parameters

##### group

`string`

#### Returns

`boolean`

***

### hasAllPermissions()

```ts
hasAllPermissions(permissions): boolean;
```

Defined in: [src/core/auth/types.ts:72](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L72)

Check if user has all of the specified permissions

#### Parameters

##### permissions

`string`[]

#### Returns

`boolean`

***

### hasAnyPermission()

```ts
hasAnyPermission(permissions): boolean;
```

Defined in: [src/core/auth/types.ts:69](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L69)

Check if user has any of the specified permissions

#### Parameters

##### permissions

`string`[]

#### Returns

`boolean`

***

### hasAnyUserType()

```ts
hasAnyUserType(types): boolean;
```

Defined in: [src/core/auth/types.ts:78](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L78)

Check if user has any of the specified user types

#### Parameters

##### types

`string`[]

#### Returns

`boolean`

***

### hasPermission()

```ts
hasPermission(permission): boolean;
```

Defined in: [src/core/auth/types.ts:66](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L66)

Check if user has a specific permission

#### Parameters

##### permission

`string`

#### Returns

`boolean`

***

### hasUserType()

```ts
hasUserType(type): boolean;
```

Defined in: [src/core/auth/types.ts:75](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L75)

Check if user has a specific user type

#### Parameters

##### type

`string`

#### Returns

`boolean`
