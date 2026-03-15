# Interface: IDatabaseManagerFactory

Defined in: [src/core/databasemanager/types.ts:5](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databasemanager/types.ts#L5)

Interface for database manager factories.
Implementations provide database connection management for different database types.

## Methods

### dbConnection()

```ts
dbConnection(): void | Promise<void> | Promise<unknown>;
```

Defined in: [src/core/databasemanager/types.ts:9](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databasemanager/types.ts#L9)

Initialize the database connection.

#### Returns

`void` \| `Promise`\<`void`\> \| `Promise`\<`unknown`\>

***

### getConnection()

```ts
getConnection(): Promise<unknown>;
```

Defined in: [src/core/databasemanager/types.ts:15](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databasemanager/types.ts#L15)

Get or create a database connection.

#### Returns

`Promise`\<`unknown`\>

The database connection/manager instance

***

### getStatus()

```ts
getStatus(): unknown;
```

Defined in: [src/core/databasemanager/types.ts:21](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databasemanager/types.ts#L21)

Get the current connection status.

#### Returns

`unknown`

Connection status
