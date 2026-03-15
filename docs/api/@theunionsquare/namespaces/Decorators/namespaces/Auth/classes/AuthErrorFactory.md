# Class: AuthErrorFactory

Defined in: [src/core/decorators/auth/core/authErrors.ts:88](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authErrors.ts#L88)

Factory functions for creating common authorization errors

## Constructors

### Constructor

```ts
new AuthErrorFactory(): AuthErrorFactory;
```

#### Returns

`AuthErrorFactory`

## Methods

### accessDenied()

```ts
static accessDenied(
   requiredAccess, 
   userType, 
   userGroups, 
   validatorName): AuthorizationError;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:128](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authErrors.ts#L128)

Create error for access requirements mismatch

#### Parameters

##### requiredAccess

`string`

##### userType

`string`

##### userGroups

`string`[]

##### validatorName

`string`

#### Returns

[`AuthorizationError`](AuthorizationError.md)

***

### andModeFailure()

```ts
static andModeFailure(
   failedValidator, 
   userType?, 
   userGroups?): AuthorizationError;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:188](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authErrors.ts#L188)

Create error for AND mode validation failure

#### Parameters

##### failedValidator

###### name

`string`

###### reason

`string`

##### userType?

`string`

##### userGroups?

`string`[]

#### Returns

[`AuthorizationError`](AuthorizationError.md)

***

### groupMismatch()

```ts
static groupMismatch(
   requiredGroups, 
   actualGroups, 
   validatorName, 
   userType?): AuthorizationError;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:108](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authErrors.ts#L108)

Create error for group mismatch

#### Parameters

##### requiredGroups

`string`[]

##### actualGroups

`string`[]

##### validatorName

`string`

##### userType?

`string`

#### Returns

[`AuthorizationError`](AuthorizationError.md)

***

### missingUserContext()

```ts
static missingUserContext(validatorName): AuthorizationError;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:148](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authErrors.ts#L148)

Create error for missing user context

#### Parameters

##### validatorName

`string`

#### Returns

[`AuthorizationError`](AuthorizationError.md)

***

### orModeFailure()

```ts
static orModeFailure(
   validators, 
   userType?, 
   userGroups?): AuthorizationError;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:159](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authErrors.ts#L159)

Create error for OR mode validation failure

#### Parameters

##### validators

`object`[]

##### userType?

`string`

##### userGroups?

`string`[]

#### Returns

[`AuthorizationError`](AuthorizationError.md)

***

### userTypeMismatch()

```ts
static userTypeMismatch(
   required, 
   actual, 
   validatorName): AuthorizationError;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:92](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authErrors.ts#L92)

Create error for user type mismatch

#### Parameters

##### required

`string`[]

##### actual

`string`

##### validatorName

`string`

#### Returns

[`AuthorizationError`](AuthorizationError.md)
