[**MangoJS**](../../../../README.md)

***

# Class: PostgresPersistenceContext

Defined in: [src/core/persistence/PersistenceContext.postgres.ts:19](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/persistence/PersistenceContext.postgres.ts#L19)

PostgreSQL persistence context for transaction management.

Works with PostgresDBManagerFactory to execute operations
within a TypeORM EntityManager context.

## Example

```ts
const result = await persistenceContext.inTransaction(async (em) => {
  return em.getRepository(User).find();
});
```

## Implements

- [`IPersistenceContext`](../../../../interfaces/IPersistenceContext.md)

## Constructors

### Constructor

```ts
new PostgresPersistenceContext(entityManager): PostgresPersistenceContext;
```

Defined in: [src/core/persistence/PersistenceContext.postgres.ts:22](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/persistence/PersistenceContext.postgres.ts#L22)

#### Parameters

##### entityManager

[`IDatabaseManagerFactory`](../../DatabaseManager/interfaces/IDatabaseManagerFactory.md)

#### Returns

`PostgresPersistenceContext`

## Methods

### inTransaction()

```ts
inTransaction(context): Promise<{
}>;
```

Defined in: [src/core/persistence/PersistenceContext.postgres.ts:35](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/persistence/PersistenceContext.postgres.ts#L35)

Start a transaction

#### Parameters

##### context

[`Context`](../type-aliases/Context.md)\<`EntityManager`\>

#### Returns

`Promise`\<\{
\}\>

#### Implementation of

[`IPersistenceContext`](../../../../interfaces/IPersistenceContext.md).[`inTransaction`](../../../../interfaces/IPersistenceContext.md#intransaction)
