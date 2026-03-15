---
sidebar_label: Persistence
---

# Persistence

Transaction management for database operations

## Classes

### CockroachPersistenceContext

Defined in: [packages/core/src/core/persistence/PersistenceContext.cockroach.ts:14](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.cockroach.ts#L14)

CockroachDB persistence context for transaction management.

Works with CockRoachDBManagerFactory to execute operations
within a transaction context.

#### Implements

- [`IPersistenceContext`](#ipersistencecontext)

#### Constructors

##### Constructor

```ts
new CockroachPersistenceContext(entityManager): CockroachPersistenceContext;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.cockroach.ts:17](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.cockroach.ts#L17)

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

Defined in: [packages/core/src/core/persistence/PersistenceContext.cockroach.ts:30](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.cockroach.ts#L30)

Start a transaction

###### Parameters

###### context

[`Context`](#context)\<`Connection`\>

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IPersistenceContext`](#ipersistencecontext).[`inTransaction`](#intransaction-4)

***

### DummyPersistenceContext

Defined in: [packages/core/src/core/persistence/PersistenceContext.dummy.ts:13](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.dummy.ts#L13)

Dummy persistence context for testing without a real database.

Returns empty results without executing actual transactions.

#### Implements

- [`IPersistenceContext`](#ipersistencecontext)

#### Constructors

##### Constructor

```ts
new DummyPersistenceContext(entityManager): DummyPersistenceContext;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.dummy.ts:15](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.dummy.ts#L15)

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

Defined in: [packages/core/src/core/persistence/PersistenceContext.dummy.ts:26](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.dummy.ts#L26)

Start a transaction

###### Parameters

###### context

[`Context`](#context)\<`Connection`\>

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IPersistenceContext`](#ipersistencecontext).[`inTransaction`](#intransaction-4)

***

### MongoosePersistenceContext

Defined in: [packages/core/src/core/persistence/PersistenceContext.mongoose.ts:14](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.mongoose.ts#L14)

Mongoose persistence context for transaction management.

Works with MongooseDBManagerFactory to execute operations
within a Mongoose connection context.

#### Implements

- [`IPersistenceContext`](#ipersistencecontext)

#### Constructors

##### Constructor

```ts
new MongoosePersistenceContext(entityManager): MongoosePersistenceContext;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.mongoose.ts:17](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.mongoose.ts#L17)

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

Defined in: [packages/core/src/core/persistence/PersistenceContext.mongoose.ts:30](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.mongoose.ts#L30)

###### Parameters

###### context

[`Context`](#context)\<`Connection`\>

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IPersistenceContext`](#ipersistencecontext).[`inTransaction`](#intransaction-4)

***

### PostgresPersistenceContext

Defined in: [packages/core/src/core/persistence/PersistenceContext.postgres.ts:19](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.postgres.ts#L19)

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

- [`IPersistenceContext`](#ipersistencecontext)

#### Constructors

##### Constructor

```ts
new PostgresPersistenceContext(entityManager): PostgresPersistenceContext;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.postgres.ts:22](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.postgres.ts#L22)

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

Defined in: [packages/core/src/core/persistence/PersistenceContext.postgres.ts:35](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/PersistenceContext.postgres.ts#L35)

Start a transaction

###### Parameters

###### context

[`Context`](#context)\<`EntityManager`\>

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IPersistenceContext`](#ipersistencecontext).[`inTransaction`](#intransaction-4)

## Interfaces

### IPersistenceContext

Defined in: [packages/core/src/core/persistence/types.ts:28](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/types.ts#L28)

Interface for persistence context implementations.
Provides transaction management for database operations.

#### Example

```ts
class MyPersistenceContext implements IPersistenceContext {
  async inTransaction(context) {
    const connection = await this.dbManager.getConnection();
    return context(connection);
  }
}
```

#### Methods

##### inTransaction()

```ts
inTransaction(process): Promise<unknown>;
```

Defined in: [packages/core/src/core/persistence/types.ts:34](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/types.ts#L34)

Executes operations within a transaction context.

###### Parameters

###### process

[`Context`](#context)\<`unknown`\>

Function receiving the connection/entity manager

###### Returns

`Promise`\<`unknown`\>

Result of the transaction

## Type Aliases

### Context()

```ts
type Context<T> = (em) => unknown;
```

Defined in: [packages/core/src/core/persistence/types.ts:14](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/persistence/types.ts#L14)

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

### ~~PersistenceContext2~~

Re-exports [PersistenceContext2](../../../index.md#persistencecontext2)
