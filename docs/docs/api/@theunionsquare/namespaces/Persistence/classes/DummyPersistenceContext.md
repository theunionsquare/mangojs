---
sidebar_label: DummyPersistenceContext
---

# Class: DummyPersistenceContext

Defined in: [src/core/persistence/PersistenceContext.dummy.ts:13](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/persistence/PersistenceContext.dummy.ts#L13)

Dummy persistence context for testing without a real database.

Returns empty results without executing actual transactions.

## Implements

- [`IPersistenceContext`](../../../../interfaces/IPersistenceContext.md)

## Constructors

### Constructor

```ts
new DummyPersistenceContext(entityManager): DummyPersistenceContext;
```

Defined in: [src/core/persistence/PersistenceContext.dummy.ts:15](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/persistence/PersistenceContext.dummy.ts#L15)

#### Parameters

##### entityManager

[`IDatabaseManagerFactory`](../../DatabaseManager/interfaces/IDatabaseManagerFactory.md)

#### Returns

`DummyPersistenceContext`

## Methods

### inTransaction()

```ts
inTransaction(context): Promise<{
}>;
```

Defined in: [src/core/persistence/PersistenceContext.dummy.ts:26](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/persistence/PersistenceContext.dummy.ts#L26)

Start a transaction

#### Parameters

##### context

[`Context`](../type-aliases/Context.md)\<`Connection`\>

#### Returns

`Promise`\<\{
\}\>

#### Implementation of

[`IPersistenceContext`](../../../../interfaces/IPersistenceContext.md).[`inTransaction`](../../../../interfaces/IPersistenceContext.md#intransaction)
