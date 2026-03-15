---
sidebar_label: MongoDBEntityManagerFactory
---

# ~~Class: MongoDBEntityManagerFactory~~

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:13](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L13)

MongoDB native driver manager factory.

## Deprecated

This class will be removed in a future version.
Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.

## Implements

- [`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md)

## Constructors

### Constructor

```ts
new MongoDBEntityManagerFactory(): MongoDBEntityManagerFactory;
```

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:19](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L19)

#### Returns

`MongoDBEntityManagerFactory`

## Methods

### ~~dbConnection()~~

```ts
dbConnection(): Promise<MongoClient>;
```

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:30](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L30)

Initialize the database connection.

#### Returns

`Promise`\<`MongoClient`\>

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`dbConnection`](../interfaces/IDatabaseManagerFactory.md#dbconnection)

***

### ~~getConnection()~~

```ts
getConnection(): Promise<MongoClient>;
```

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:36](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L36)

Get or create a database connection.

#### Returns

`Promise`\<`MongoClient`\>

The database connection/manager instance

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getConnection`](../interfaces/IDatabaseManagerFactory.md#getconnection)

***

### ~~getStatus()~~

```ts
getStatus(): void;
```

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:26](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L26)

Get the current connection status.

#### Returns

`void`

Connection status

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getStatus`](../interfaces/IDatabaseManagerFactory.md#getstatus)
