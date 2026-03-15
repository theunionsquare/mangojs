---
sidebar_label: MongooseDBManagerFactory
---

# ~~Class: MongooseDBManagerFactory~~

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:16](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongooseDBManagerFactory.ts#L16)

Mongoose database manager factory for MongoDB connections.

## Deprecated

This class will be removed in a future version.
Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.

## Implements

- [`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md)

## Constructors

### Constructor

```ts
new MongooseDBManagerFactory(
   mongoURI, 
   databaseName, 
   loggerFactory): MongooseDBManagerFactory;
```

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:26](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongooseDBManagerFactory.ts#L26)

#### Parameters

##### mongoURI

`string`

##### databaseName

`string`

##### loggerFactory

[`ILoggerFactory`](../../Loggers/interfaces/ILoggerFactory.md)

#### Returns

`MongooseDBManagerFactory`

## Methods

### ~~dbConnection()~~

```ts
dbConnection(): void;
```

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:38](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongooseDBManagerFactory.ts#L38)

Initialize the database connection.

#### Returns

`void`

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`dbConnection`](../interfaces/IDatabaseManagerFactory.md#dbconnection)

***

### ~~getConnection()~~

```ts
getConnection(): Promise<__module>;
```

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:40](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongooseDBManagerFactory.ts#L40)

Get or create a database connection.

#### Returns

`Promise`\<`__module`\>

The database connection/manager instance

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getConnection`](../interfaces/IDatabaseManagerFactory.md#getconnection)

***

### ~~getStatus()~~

```ts
getStatus(): Promise<string>;
```

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:60](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databasemanager/MongooseDBManagerFactory.ts#L60)

Get the current connection status.

#### Returns

`Promise`\<`string`\>

Connection status

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getStatus`](../interfaces/IDatabaseManagerFactory.md#getstatus)
