[**MangoJS**](../../../../../../README.md)

***

# ~~Enumeration: AuthUserType~~

Defined in: [src/core/types/enums/index.ts:18](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/types/enums/index.ts#L18)

## Deprecated

Use string user types instead for flexibility.
The new auth system accepts any string as userType, allowing
custom roles like 'MODERATOR', 'SUPPORT', 'API_CLIENT', etc.

This enum is maintained for backwards compatibility with existing code.

## Example

```typescript
// Old way (deprecated)
if (user.userType === AuthUserType.ADMIN) { ... }

// New way - use string literals or your own constants
if (authContext.hasUserType('ADMIN')) { ... }
if (authContext.hasAnyUserType(['ADMIN', 'MODERATOR'])) { ... }
```

## Enumeration Members

### ~~ADMIN~~

```ts
ADMIN: "ADMIN";
```

Defined in: [src/core/types/enums/index.ts:19](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/types/enums/index.ts#L19)

***

### ~~PARTNER~~

```ts
PARTNER: "PARTNER";
```

Defined in: [src/core/types/enums/index.ts:20](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/types/enums/index.ts#L20)

***

### ~~USER~~

```ts
USER: "USER";
```

Defined in: [src/core/types/enums/index.ts:21](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/types/enums/index.ts#L21)
