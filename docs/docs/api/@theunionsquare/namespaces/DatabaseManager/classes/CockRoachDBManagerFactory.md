---
sidebar_label: CockRoachDBManagerFactory
---

# Class: CockRoachDBManagerFactory

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:36](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L36)

CockroachDB database manager factory using TypeORM.

Supports both URL-based and connection object configuration.

## Example

```typescript
// URL-based connection
const factory = new CockRoachDBManagerFactory(
  { url: 'postgresql://user:pass@host:26257/db?sslmode=verify-full' },
  [UserEntity, OrderEntity]
);

// Connection object
const factory = new CockRoachDBManagerFactory(
  { host: 'localhost', port: 26257, username: 'root', database: 'mydb' },
  [UserEntity]
);
```

## Implements

- [`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md)

## Constructors

### Constructor

```ts
new CockRoachDBManagerFactory(
   connection, 
   entities?, 
   synchronize?, 
   logging?): CockRoachDBManagerFactory;
```

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:46](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L46)

#### Parameters

##### connection

`CockroachUrl` | `CockroachConnection`

##### entities?

`any`[] = `[]`

##### synchronize?

`boolean` = `true`

##### logging?

`boolean` = `false`

#### Returns

`CockRoachDBManagerFactory`

## Methods

### dbConnection()

```ts
dbConnection(): void;
```

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:59](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L59)

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

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:61](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L61)

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

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:109](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L109)

Get the current connection status.

#### Returns

`Promise`\<`boolean`\>

Connection status

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getStatus`](../interfaces/IDatabaseManagerFactory.md#getstatus)
