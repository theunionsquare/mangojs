---
sidebar_label: PostgresDBManagerFactory
---

# Class: PostgresDBManagerFactory

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:38](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L38)

PostgreSQL database manager factory using TypeORM.

Supports both URL-based and connection object configuration.

## Example

```typescript
// URL-based connection
const factory = new PostgresDBManagerFactory(
  { url: 'postgresql://user:pass@host:5432/db' },
  [UserEntity, OrderEntity]
);

// Connection object
const factory = new PostgresDBManagerFactory(
  { host: 'localhost', port: 5432, username: 'postgres', database: 'mydb' },
  [UserEntity],
  true,  // synchronize
  true   // logging
);
```

## Implements

- [`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md)

## Constructors

### Constructor

```ts
new PostgresDBManagerFactory(
   connection, 
   entities?, 
   synchronize?, 
   logging?): PostgresDBManagerFactory;
```

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:50](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L50)

#### Parameters

##### connection

`PostgresUrl` | `PostgresConnection`

##### entities?

`any`[] = `[]`

##### synchronize?

`boolean` = `true`

##### logging?

`boolean` = `false`

#### Returns

`PostgresDBManagerFactory`

## Methods

### dbConnection()

```ts
dbConnection(): void;
```

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:63](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L63)

Initialize the database connection.

#### Returns

`void`

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`dbConnection`](../interfaces/IDatabaseManagerFactory.md#dbconnection)

***

### getConnection()

```ts
getConnection(): Promise<{
}>;
```

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:65](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L65)

Get or create a database connection.

#### Returns

`Promise`\<\{
\}\>

The database connection/manager instance

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getConnection`](../interfaces/IDatabaseManagerFactory.md#getconnection)

***

### getStatus()

```ts
getStatus(): Promise<boolean>;
```

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:109](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L109)

Get the current connection status.

#### Returns

`Promise`\<`boolean`\>

Connection status

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getStatus`](../interfaces/IDatabaseManagerFactory.md#getstatus)
