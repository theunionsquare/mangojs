[**MangoJS**](../../../../../../README.md)

***

# Class: AuthConfig

Defined in: [src/core/decorators/auth/core/authConfig.ts:132](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L132)

Global authentication configuration

## Constructors

### Constructor

```ts
new AuthConfig(): AuthConfig;
```

#### Returns

`AuthConfig`

## Methods

### configure()

```ts
static configure(options): void;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:148](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L148)

Configure global auth settings

#### Parameters

##### options

[`AuthConfigOptions`](../interfaces/AuthConfigOptions.md)

#### Returns

`void`

#### Example

```typescript
AuthConfig.configure({
  userObjectPath: "session.user",
  enableAuditLog: true,
  cacheValidationResults: true,
  cacheTTL: 300000
});
```

***

### extractUserContext()

```ts
static extractUserContext(req): object;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:182](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L182)

Extract user context from request using configured extractor

Checks in order:
1. req.authContext (new strategy-based system)
2. Custom userContextExtractor (if configured)
3. Path-based extraction from req[userObjectPath] (legacy)

#### Parameters

##### req

`Request`

Express request object

#### Returns

`object`

User context with userType, groups, and raw user object

##### groups?

```ts
optional groups: string[];
```

##### raw?

```ts
optional raw: any;
```

##### userType?

```ts
optional userType: string;
```

***

### getCacheMaxSize()

```ts
static getCacheMaxSize(): number;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:309](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L309)

Get cache max size

#### Returns

`number`

Maximum number of cache entries

***

### getCacheTTL()

```ts
static getCacheTTL(decoratorOptions?): number;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:282](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L282)

Get cache TTL

#### Parameters

##### decoratorOptions?

[`DecoratorOptions`](../interfaces/DecoratorOptions.md)

Optional per-decorator options

#### Returns

`number`

Cache TTL in milliseconds

***

### getConfig()

```ts
static getConfig(): Readonly<Required<AuthConfigOptions>>;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:160](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L160)

Get current configuration

#### Returns

`Readonly`\<`Required`\<[`AuthConfigOptions`](../interfaces/AuthConfigOptions.md)\>\>

***

### getErrorHandler()

```ts
static getErrorHandler(decoratorOptions?): AuthErrorHandler;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:295](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L295)

Get error handler

#### Parameters

##### decoratorOptions?

[`DecoratorOptions`](../interfaces/DecoratorOptions.md)

Optional per-decorator options

#### Returns

[`AuthErrorHandler`](../type-aliases/AuthErrorHandler.md)

Custom error handler if configured

***

### isAuditLogEnabled()

```ts
static isAuditLogEnabled(decoratorOptions?): boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:256](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L256)

Check if audit logging is enabled

#### Parameters

##### decoratorOptions?

[`DecoratorOptions`](../interfaces/DecoratorOptions.md)

Optional per-decorator options

#### Returns

`boolean`

true if audit logging should be enabled

***

### isCachingEnabled()

```ts
static isCachingEnabled(decoratorOptions?): boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:269](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L269)

Check if caching is enabled

#### Parameters

##### decoratorOptions?

[`DecoratorOptions`](../interfaces/DecoratorOptions.md)

Optional per-decorator options

#### Returns

`boolean`

true if caching should be enabled

***

### reset()

```ts
static reset(): void;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:167](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L167)

Reset to default configuration (useful for testing)

#### Returns

`void`
