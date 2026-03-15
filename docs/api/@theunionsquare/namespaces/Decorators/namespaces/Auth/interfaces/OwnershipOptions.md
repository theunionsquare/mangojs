# Interface: OwnershipOptions

Defined in: [src/core/decorators/auth/requiresOwnership.decorator.ts:29](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/requiresOwnership.decorator.ts#L29)

Configuration options for the RequiresOwnership decorator

## Extends

- [`DecoratorOptions`](DecoratorOptions.md)

## Properties

### arrayField?

```ts
optional arrayField: boolean;
```

Defined in: [src/core/decorators/auth/requiresOwnership.decorator.ts:54](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/requiresOwnership.decorator.ts#L54)

Whether the user field contains an array of IDs
If true, checks if resource ID is in the user's array
If false, checks direct equality

#### Default

```ts
false
```

***

### auditLog?

```ts
optional auditLog: boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:90](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L90)

Enable audit logging for this endpoint
Overrides global setting

#### Inherited from

[`DecoratorOptions`](DecoratorOptions.md).[`auditLog`](DecoratorOptions.md#auditlog)

***

### cache?

```ts
optional cache: boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:96](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L96)

Enable caching for this endpoint
Overrides global setting

#### Inherited from

[`DecoratorOptions`](DecoratorOptions.md).[`cache`](DecoratorOptions.md#cache)

***

### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:102](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L102)

Cache TTL for this endpoint in milliseconds
Overrides global setting

#### Inherited from

[`DecoratorOptions`](DecoratorOptions.md).[`cacheTTL`](DecoratorOptions.md#cachettl)

***

### customValidator?

```ts
optional customValidator: OwnershipValidator;
```

Defined in: [src/core/decorators/auth/requiresOwnership.decorator.ts:60](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/requiresOwnership.decorator.ts#L60)

Custom validation function for complex ownership logic
If provided, overrides the default equality/array checks

***

### disabled?

```ts
optional disabled: boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:112](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L112)

Disable this auth check (useful for testing)

#### Inherited from

[`DecoratorOptions`](DecoratorOptions.md).[`disabled`](DecoratorOptions.md#disabled)

***

### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:107](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L107)

Custom error handler for this endpoint

#### Inherited from

[`DecoratorOptions`](DecoratorOptions.md).[`errorHandler`](DecoratorOptions.md#errorhandler)

***

### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:84](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L84)

Custom error message for this endpoint

#### Inherited from

[`DecoratorOptions`](DecoratorOptions.md).[`errorMessage`](DecoratorOptions.md#errormessage)

***

### paramName?

```ts
optional paramName: string;
```

Defined in: [src/core/decorators/auth/requiresOwnership.decorator.ts:40](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/requiresOwnership.decorator.ts#L40)

Parameter name in the request (params/query/body)

#### Default

`${resourceName}Id`

***

### paramSource?

```ts
optional paramSource: ParameterSource;
```

Defined in: [src/core/decorators/auth/requiresOwnership.decorator.ts:46](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/requiresOwnership.decorator.ts#L46)

Source of the parameter in the request

#### Default

```ts
"params"
```

***

### userField?

```ts
optional userField: string;
```

Defined in: [src/core/decorators/auth/requiresOwnership.decorator.ts:34](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/requiresOwnership.decorator.ts#L34)

Field name in the user context to check

#### Default

`${resourceName}Id`
