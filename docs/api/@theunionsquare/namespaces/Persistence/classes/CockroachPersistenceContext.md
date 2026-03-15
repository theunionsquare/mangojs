# Class: CockroachPersistenceContext

Defined in: [src/core/persistence/PersistenceContext.cockroach.ts:14](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/persistence/PersistenceContext.cockroach.ts#L14)

CockroachDB persistence context for transaction management.

Works with CockRoachDBManagerFactory to execute operations
within a transaction context.

## Implements

- [`IPersistenceContext`](../../../../interfaces/IPersistenceContext.md)

## Constructors

### Constructor

```ts
new CockroachPersistenceContext(entityManager): CockroachPersistenceContext;
```

Defined in: [src/core/persistence/PersistenceContext.cockroach.ts:17](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/persistence/PersistenceContext.cockroach.ts#L17)

#### Parameters

##### entityManager

[`IDatabaseManagerFactory`](../../DatabaseManager/interfaces/IDatabaseManagerFactory.md)

#### Returns

`CockroachPersistenceContext`

## Methods

### inTransaction()

```ts
inTransaction(context): Promise<{
}>;
```

Defined in: [src/core/persistence/PersistenceContext.cockroach.ts:30](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/persistence/PersistenceContext.cockroach.ts#L30)

Start a transaction

#### Parameters

##### context

[`Context`](../type-aliases/Context.md)\<`Connection`\>

#### Returns

`Promise`\<\{
\}\>

#### Implementation of

[`IPersistenceContext`](../../../../interfaces/IPersistenceContext.md).[`inTransaction`](../../../../interfaces/IPersistenceContext.md#intransaction)
