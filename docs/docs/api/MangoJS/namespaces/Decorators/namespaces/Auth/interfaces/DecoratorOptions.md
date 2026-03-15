[**MangoJS**](../../../../../../README.md)

***

# Interface: DecoratorOptions

Defined in: [src/core/decorators/auth/core/authConfig.ts:80](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L80)

Per-decorator configuration options

## Extended by

- [`OwnershipOptions`](OwnershipOptions.md)

## Properties

### auditLog?

```ts
optional auditLog: boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:90](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L90)

Enable audit logging for this endpoint
Overrides global setting

***

### cache?

```ts
optional cache: boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:96](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L96)

Enable caching for this endpoint
Overrides global setting

***

### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:102](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L102)

Cache TTL for this endpoint in milliseconds
Overrides global setting

***

### disabled?

```ts
optional disabled: boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:112](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L112)

Disable this auth check (useful for testing)

***

### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:107](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L107)

Custom error handler for this endpoint

***

### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:84](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L84)

Custom error message for this endpoint
