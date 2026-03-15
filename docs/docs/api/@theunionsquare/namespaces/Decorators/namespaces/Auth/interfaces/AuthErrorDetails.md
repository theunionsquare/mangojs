---
sidebar_label: AuthErrorDetails
---

# Interface: AuthErrorDetails

Defined in: [src/core/decorators/auth/core/authErrors.ts:4](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/core/authErrors.ts#L4)

Detailed authorization error information

## Properties

### actual

```ts
actual: string;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:8](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/core/authErrors.ts#L8)

What the user actually has

***

### context?

```ts
optional context: Record<string, any>;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:16](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/core/authErrors.ts#L16)

Additional context

***

### failedValidator

```ts
failedValidator: string;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:10](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/core/authErrors.ts#L10)

Which decorator/validator failed

***

### required

```ts
required: string;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:6](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/core/authErrors.ts#L6)

What authorization was required

***

### userGroups?

```ts
optional userGroups: string[];
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:14](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/core/authErrors.ts#L14)

User groups if available

***

### userType?

```ts
optional userType: string;
```

Defined in: [src/core/decorators/auth/core/authErrors.ts:12](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/core/authErrors.ts#L12)

User type if available
