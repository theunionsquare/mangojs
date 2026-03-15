# Interface: IAuthUser

Defined in: [src/core/auth/types.ts:25](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/types.ts#L25)

Extensible user interface - no hardcoded enum
Developers can use any string for userType

## Indexable

```ts
[key: string]: any
```

Allow extension with custom fields

## Properties

### email?

```ts
optional email: string;
```

Defined in: [src/core/auth/types.ts:33](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/types.ts#L33)

User email address

***

### groups?

```ts
optional groups: string[];
```

Defined in: [src/core/auth/types.ts:36](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/types.ts#L36)

Groups the user belongs to

***

### id

```ts
id: string;
```

Defined in: [src/core/auth/types.ts:27](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/types.ts#L27)

Unique identifier for the user

***

### metadata?

```ts
optional metadata: Record<string, any>;
```

Defined in: [src/core/auth/types.ts:42](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/types.ts#L42)

Additional metadata

***

### permissions?

```ts
optional permissions: string[];
```

Defined in: [src/core/auth/types.ts:39](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/types.ts#L39)

Fine-grained permissions

***

### userType

```ts
userType: string;
```

Defined in: [src/core/auth/types.ts:30](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/types.ts#L30)

User type/role - any string value (e.g., 'ADMIN', 'CUSTOMER', 'API_CLIENT')
