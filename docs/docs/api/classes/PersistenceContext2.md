---
sidebar_label: PersistenceContext2
---

# ~~Class: PersistenceContext2~~

Defined in: [src/core/persistence/PersistenceContext.ts:13](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/persistence/PersistenceContext.ts#L13)

Generic MongoDB persistence context.

## Deprecated

Use MongoosePersistenceContext instead.

## Implements

- [`IPersistenceContext`](../interfaces/IPersistenceContext.md)

## Constructors

### Constructor

```ts
new PersistenceContext2(entityManager): PersistenceContext2;
```

Defined in: [src/core/persistence/PersistenceContext.ts:16](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/persistence/PersistenceContext.ts#L16)

#### Parameters

##### entityManager

[`IDatabaseManagerFactory`](../@theunionsquare/namespaces/DatabaseManager/interfaces/IDatabaseManagerFactory.md)

#### Returns

`PersistenceContext2`

## Methods

### ~~inTransaction()~~

```ts
inTransaction(context): Promise<{
}>;
```

Defined in: [src/core/persistence/PersistenceContext.ts:24](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/persistence/PersistenceContext.ts#L24)

Executes operations within a transaction context.

#### Parameters

##### context

[`Context`](../@theunionsquare/namespaces/Persistence/type-aliases/Context.md)\<`Connection`\>

#### Returns

`Promise`\<\{
\}\>

Result of the transaction

#### Implementation of

[`IPersistenceContext`](../interfaces/IPersistenceContext.md).[`inTransaction`](../interfaces/IPersistenceContext.md#intransaction)
