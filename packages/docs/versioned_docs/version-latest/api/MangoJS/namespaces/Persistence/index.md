---
sidebar_label: Persistence
---

# Persistence

## Description

Transaction management for database operations.

PersistenceContext implementations work with their corresponding
DatabaseManager factories to provide transaction support.

| PersistenceContext | DatabaseManager |
|--------------------|-----------------|
| PostgresPersistenceContext | PostgresDBManagerFactory |
| MongoosePersistenceContext | MongooseDBManagerFactory |
| CockroachPersistenceContext | CockRoachDBManagerFactory |
| DummyPersistenceContext | DummyDBManagerFactory |

## Example

```ts
// Bind in container
container.bind<IPersistenceContext>(TYPES.PersistenceContext)
  .to(PostgresPersistenceContext);

// Use in service
const result = await persistenceContext.inTransaction(async (em) => {
  return em.getRepository(User).find();
});
```

## Classes

### CockroachPersistenceContext

Defined in: packages/core/src/core/persistence/PersistenceContext.cockroach.ts:14

CockroachDB persistence context for transaction management.

Works with CockRoachDBManagerFactory to execute operations
within a transaction context.

#### Implements

- [`IPersistenceContext`](../../../index.md#ipersistencecontext)

#### Constructors

##### Constructor

```ts
new CockroachPersistenceContext(entityManager): CockroachPersistenceContext;
```

Defined in: packages/core/src/core/persistence/PersistenceContext.cockroach.ts:17

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](../DatabaseManager/index.md#idatabasemanagerfactory)

###### Returns

[`CockroachPersistenceContext`](#cockroachpersistencecontext)

#### Methods

##### inTransaction()

```ts
inTransaction(context): Promise<{
}>;
```

Defined in: packages/core/src/core/persistence/PersistenceContext.cockroach.ts:30

Start a transaction

###### Parameters

###### context

[`Context`](#context)\<`Connection`\>

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IPersistenceContext`](../../../index.md#ipersistencecontext).[`inTransaction`](../../../index.md#intransaction-1)

***

### DummyPersistenceContext

Defined in: packages/core/src/core/persistence/PersistenceContext.dummy.ts:13

Dummy persistence context for testing without a real database.

Returns empty results without executing actual transactions.

#### Implements

- [`IPersistenceContext`](../../../index.md#ipersistencecontext)

#### Constructors

##### Constructor

```ts
new DummyPersistenceContext(entityManager): DummyPersistenceContext;
```

Defined in: packages/core/src/core/persistence/PersistenceContext.dummy.ts:15

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](../DatabaseManager/index.md#idatabasemanagerfactory)

###### Returns

[`DummyPersistenceContext`](#dummypersistencecontext)

#### Methods

##### inTransaction()

```ts
inTransaction(context): Promise<{
}>;
```

Defined in: packages/core/src/core/persistence/PersistenceContext.dummy.ts:26

Start a transaction

###### Parameters

###### context

[`Context`](#context)\<`Connection`\>

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IPersistenceContext`](../../../index.md#ipersistencecontext).[`inTransaction`](../../../index.md#intransaction-1)

***

### MongoosePersistenceContext

Defined in: packages/core/src/core/persistence/PersistenceContext.mongoose.ts:14

Mongoose persistence context for transaction management.

Works with MongooseDBManagerFactory to execute operations
within a Mongoose connection context.

#### Implements

- [`IPersistenceContext`](../../../index.md#ipersistencecontext)

#### Constructors

##### Constructor

```ts
new MongoosePersistenceContext(entityManager): MongoosePersistenceContext;
```

Defined in: packages/core/src/core/persistence/PersistenceContext.mongoose.ts:17

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](../DatabaseManager/index.md#idatabasemanagerfactory)

###### Returns

[`MongoosePersistenceContext`](#mongoosepersistencecontext)

#### Methods

##### inTransaction()

```ts
inTransaction(context): Promise<{
}>;
```

Defined in: packages/core/src/core/persistence/PersistenceContext.mongoose.ts:30

###### Parameters

###### context

[`Context`](#context)\<`Connection`\>

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IPersistenceContext`](../../../index.md#ipersistencecontext).[`inTransaction`](../../../index.md#intransaction-1)

***

### PostgresPersistenceContext

Defined in: packages/core/src/core/persistence/PersistenceContext.postgres.ts:19

PostgreSQL persistence context for transaction management.

Works with PostgresDBManagerFactory to execute operations
within a TypeORM EntityManager context.

#### Example

```ts
const result = await persistenceContext.inTransaction(async (em) => {
  return em.getRepository(User).find();
});
```

#### Implements

- [`IPersistenceContext`](../../../index.md#ipersistencecontext)

#### Constructors

##### Constructor

```ts
new PostgresPersistenceContext(entityManager): PostgresPersistenceContext;
```

Defined in: packages/core/src/core/persistence/PersistenceContext.postgres.ts:22

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](../DatabaseManager/index.md#idatabasemanagerfactory)

###### Returns

[`PostgresPersistenceContext`](#postgrespersistencecontext)

#### Methods

##### inTransaction()

```ts
inTransaction(context): Promise<{
}>;
```

Defined in: packages/core/src/core/persistence/PersistenceContext.postgres.ts:35

Start a transaction

###### Parameters

###### context

[`Context`](#context)\<`EntityManager`\>

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IPersistenceContext`](../../../index.md#ipersistencecontext).[`inTransaction`](../../../index.md#intransaction-1)

## Type Aliases

### Context()

```ts
type Context<T> = (em) => unknown;
```

Defined in: packages/core/src/core/persistence/types.ts:14

Context function type for transaction execution.
Receives an entity manager/connection and executes operations within it.

#### Type Parameters

##### T

`T`

The connection/entity manager type (e.g., mongoose.Connection, EntityManager)

#### Parameters

##### em

`T`

#### Returns

`unknown`

## References

### IPersistenceContext

Re-exports [IPersistenceContext](../../../index.md#ipersistencecontext)

***

### ~~PersistenceContext2~~

Re-exports [PersistenceContext2](../../../index.md#persistencecontext2)
