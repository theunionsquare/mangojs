# ~~Class: DummyDBManagerFactory~~

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:11](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databasemanager/DummyDBManagerFactory.ts#L11)

Dummy database manager factory for testing purposes.

## Deprecated

This class will be removed in a future version.
Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.

## Implements

- [`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md)

## Constructors

### Constructor

```ts
new DummyDBManagerFactory(connection): DummyDBManagerFactory;
```

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:14](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databasemanager/DummyDBManagerFactory.ts#L14)

#### Parameters

##### connection

`string`

#### Returns

`DummyDBManagerFactory`

## Methods

### ~~dbConnection()~~

```ts
dbConnection(): void;
```

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:20](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databasemanager/DummyDBManagerFactory.ts#L20)

Initialize the database connection.

#### Returns

`void`

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`dbConnection`](../interfaces/IDatabaseManagerFactory.md#dbconnection)

***

### ~~getConnection()~~

```ts
getConnection(): Promise<{
}>;
```

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:22](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databasemanager/DummyDBManagerFactory.ts#L22)

Get or create a database connection.

#### Returns

`Promise`\<\{
\}\>

The database connection/manager instance

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getConnection`](../interfaces/IDatabaseManagerFactory.md#getconnection)

***

### ~~getStatus()~~

```ts
getStatus(): Promise<boolean>;
```

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:26](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databasemanager/DummyDBManagerFactory.ts#L26)

Get the current connection status.

#### Returns

`Promise`\<`boolean`\>

Connection status

#### Implementation of

[`IDatabaseManagerFactory`](../interfaces/IDatabaseManagerFactory.md).[`getStatus`](../interfaces/IDatabaseManagerFactory.md#getstatus)
