---
sidebar_label: Persistence
---

# Persistence

Transaction management for database operations

## Classes

### CockroachPersistenceContext

Defined in: [packages/core/src/core/persistence/PersistenceContext.cockroach.ts:14](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.cockroach.ts#L14)

CockroachDB persistence context for transaction management.

Works with CockRoachDBManagerFactory to execute operations
within a transaction context.

#### Implements

- [`IPersistenceContext`](#ipersistencecontext)\<`mongoose.Connection`\>

#### Constructors

##### Constructor

```ts
new CockroachPersistenceContext(entityManager): CockroachPersistenceContext;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.cockroach.ts:17](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.cockroach.ts#L17)

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](../DatabaseManager/index.md#idatabasemanagerfactory)

###### Returns

[`CockroachPersistenceContext`](#cockroachpersistencecontext)

#### Methods

##### inTransaction()

```ts
inTransaction<R>(context): Promise<R>;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.cockroach.ts:30](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.cockroach.ts#L30)

Execute operations within a transaction context.

###### Type Parameters

###### R

`R`

The return type of the transaction

###### Parameters

###### context

[`Context`](#context)\<`Connection`, `R`\>

Function receiving the mongoose Connection

###### Returns

`Promise`\<`R`\>

Result of the transaction

###### Implementation of

[`IPersistenceContext`](#ipersistencecontext).[`inTransaction`](#intransaction-4)

***

### DummyPersistenceContext

Defined in: [packages/core/src/core/persistence/PersistenceContext.dummy.ts:12](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.dummy.ts#L12)

Dummy persistence context for testing without a real database.

Returns empty results without executing actual transactions.

#### Implements

- [`IPersistenceContext`](#ipersistencecontext)\<`unknown`\>

#### Constructors

##### Constructor

```ts
new DummyPersistenceContext(entityManager): DummyPersistenceContext;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.dummy.ts:14](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.dummy.ts#L14)

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](../DatabaseManager/index.md#idatabasemanagerfactory)

###### Returns

[`DummyPersistenceContext`](#dummypersistencecontext)

#### Methods

##### inTransaction()

```ts
inTransaction<R>(context): Promise<R>;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.dummy.ts:26](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.dummy.ts#L26)

Execute operations within a transaction context.

###### Type Parameters

###### R

`R`

The return type of the transaction

###### Parameters

###### context

[`Context`](#context)\<`unknown`, `R`\>

Function receiving the connection (unused in dummy)

###### Returns

`Promise`\<`R`\>

Empty object

###### Implementation of

[`IPersistenceContext`](#ipersistencecontext).[`inTransaction`](#intransaction-4)

***

### MongoosePersistenceContext

Defined in: [packages/core/src/core/persistence/PersistenceContext.mongoose.ts:14](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.mongoose.ts#L14)

Mongoose persistence context for transaction management.

Works with MongooseDBManagerFactory to execute operations
within a Mongoose connection context.

#### Implements

- [`IPersistenceContext`](#ipersistencecontext)\<`mongoose.Connection`\>

#### Constructors

##### Constructor

```ts
new MongoosePersistenceContext(entityManager): MongoosePersistenceContext;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.mongoose.ts:17](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.mongoose.ts#L17)

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](../DatabaseManager/index.md#idatabasemanagerfactory)

###### Returns

[`MongoosePersistenceContext`](#mongoosepersistencecontext)

#### Methods

##### inTransaction()

```ts
inTransaction<R>(context): Promise<R>;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.mongoose.ts:30](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.mongoose.ts#L30)

Execute operations within a transaction context.

###### Type Parameters

###### R

`R`

The return type of the transaction

###### Parameters

###### context

[`Context`](#context)\<`Connection`, `R`\>

Function receiving the mongoose Connection

###### Returns

`Promise`\<`R`\>

Result of the transaction

###### Implementation of

[`IPersistenceContext`](#ipersistencecontext).[`inTransaction`](#intransaction-4)

***

### PostgresPersistenceContext

Defined in: [packages/core/src/core/persistence/PersistenceContext.postgres.ts:20](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.postgres.ts#L20)

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

- [`IPersistenceContext`](#ipersistencecontext)\<`EntityManager`\>

#### Constructors

##### Constructor

```ts
new PostgresPersistenceContext(entityManager): PostgresPersistenceContext;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.postgres.ts:23](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.postgres.ts#L23)

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](../DatabaseManager/index.md#idatabasemanagerfactory)

###### Returns

[`PostgresPersistenceContext`](#postgrespersistencecontext)

#### Methods

##### inTransaction()

```ts
inTransaction<R>(context): Promise<R>;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.postgres.ts:36](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/PersistenceContext.postgres.ts#L36)

Execute operations within a transaction context.

###### Type Parameters

###### R

`R`

The return type of the transaction

###### Parameters

###### context

[`Context`](#context)\<`EntityManager`, `R`\>

Function receiving the EntityManager

###### Returns

`Promise`\<`R`\>

Result of the transaction

###### Implementation of

[`IPersistenceContext`](#ipersistencecontext).[`inTransaction`](#intransaction-4)

## Interfaces

### IPersistenceContext

Defined in: [packages/core/src/core/persistence/types.ts:31](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/types.ts#L31)

Interface for persistence context implementations.
Provides transaction management for database operations.

#### Example

```ts
class MyPersistenceContext implements IPersistenceContext<EntityManager> {
  async inTransaction<R>(context: Context<EntityManager, R>): Promise<R> {
    const connection = await this.dbManager.getConnection();
    return context(connection);
  }
}
```

#### Type Parameters

##### T

`T` = `unknown`

The entity manager type (defaults to unknown for flexibility)

#### Methods

##### inTransaction()

```ts
inTransaction<R>(process): Promise<R>;
```

Defined in: [packages/core/src/core/persistence/types.ts:38](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/types.ts#L38)

Executes operations within a transaction context.

###### Type Parameters

###### R

`R`

The return type of the transaction

###### Parameters

###### process

[`Context`](#context)\<`T`, `R`\>

Function receiving the connection/entity manager

###### Returns

`Promise`\<`R`\>

Result of the transaction

## Type Aliases

### Context()

```ts
type Context<T, R> = (em) => R | Promise<R>;
```

Defined in: [packages/core/src/core/persistence/types.ts:15](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/persistence/types.ts#L15)

Context function type for transaction execution.
Receives an entity manager/connection and executes operations within it.

#### Type Parameters

##### T

`T`

The connection/entity manager type (e.g., mongoose.Connection, EntityManager)

##### R

`R` = `unknown`

The return type of the context function

#### Parameters

##### em

`T`

#### Returns

`R` \| `Promise`\<`R`\>

## References

### ~~PersistenceContext2~~

Re-exports [PersistenceContext2](../../../index.md#persistencecontext2)
