---
sidebar_label: GenerateTokenPayload
---

# Interface: GenerateTokenPayload

Defined in: [src/core/auth/types.ts:223](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L223)

Payload for generating tokens

## Indexable

```ts
[key: string]: any
```

Additional claims

## Properties

### email?

```ts
optional email: string;
```

Defined in: [src/core/auth/types.ts:234](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L234)

User email

***

### groups?

```ts
optional groups: string[];
```

Defined in: [src/core/auth/types.ts:237](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L237)

User groups

***

### id?

```ts
optional id: string;
```

Defined in: [src/core/auth/types.ts:225](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L225)

User ID (will become 'sub' claim in JWT)

***

### permissions?

```ts
optional permissions: string[];
```

Defined in: [src/core/auth/types.ts:240](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L240)

User permissions

***

### sub?

```ts
optional sub: string;
```

Defined in: [src/core/auth/types.ts:228](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L228)

Alternative: subject claim directly

***

### userType?

```ts
optional userType: string;
```

Defined in: [src/core/auth/types.ts:231](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L231)

User type
