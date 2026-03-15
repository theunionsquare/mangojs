[**MangoJS**](../../../../README.md)

***

# ~~Class: EmbeddedMongoDBManagerFactory~~

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:13](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L13)

Embedded MongoDB manager factory for testing purposes.

## Deprecated

This class will be removed in a future version.
Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.

## Implements

- [`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md)

## Constructors

### Constructor

```ts
new EmbeddedMongoDBManagerFactory(): EmbeddedMongoDBManagerFactory;
```

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:17](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L17)

#### Returns

`EmbeddedMongoDBManagerFactory`

## Methods

### ~~dbConnection()~~

```ts
dbConnection(): Promise<void>;
```

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:24](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L24)

Initialize the database connection.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`dbConnection`](../interfaces/IDatabaseManagerFactory.md#dbconnection)

***

### ~~getConnection()~~

```ts
getConnection(): Promise<__module>;
```

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:32](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L32)

Get or create a database connection.

#### Returns

`Promise`\<`__module`\>

The database connection/manager instance

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getConnection`](../interfaces/IDatabaseManagerFactory.md#getconnection)

***

### ~~getStatus()~~

```ts
getStatus(): void;
```

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:20](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L20)

Get the current connection status.

#### Returns

`void`

Connection status

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getStatus`](../interfaces/IDatabaseManagerFactory.md#getstatus)
