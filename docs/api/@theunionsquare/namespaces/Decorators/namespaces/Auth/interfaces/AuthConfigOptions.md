# Interface: AuthConfigOptions

Defined in: [src/core/decorators/auth/core/authConfig.ts:26](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L26)

Global configuration options

## Properties

### cacheMaxSize?

```ts
optional cacheMaxSize: number;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:68](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L68)

Maximum number of cache entries
Default: 1000

***

### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:62](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L62)

Cache TTL in milliseconds
Default: 60000 (1 minute)

***

### cacheValidationResults?

```ts
optional cacheValidationResults: boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:56](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L56)

Enable caching of validation results
Default: false

***

### enableAuditLog?

```ts
optional enableAuditLog: boolean;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:50](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L50)

Enable audit logging for all auth decisions
Default: false
Note: Logging implementation will be added in future

***

### environment?

```ts
optional environment: string;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:74](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L74)

Environment (used for conditional behavior)
Default: process.env.NODE_ENV

***

### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:43](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L43)

Custom error handler
Default: uses core error handler

***

### userContextExtractor?

```ts
optional userContextExtractor: UserContextExtractor;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:37](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L37)

Custom function to extract user context from request
If provided, overrides userObjectPath

***

### userObjectPath?

```ts
optional userObjectPath: string;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:31](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L31)

Path to user object in request (e.g., "user", "session.user")
Default: "user"
