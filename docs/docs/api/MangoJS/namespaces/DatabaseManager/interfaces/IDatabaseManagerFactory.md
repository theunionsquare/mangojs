[**MangoJS**](../../../../README.md)

***

# Interface: IDatabaseManagerFactory

Defined in: src/core/databasemanager/types.ts:5

Interface for database manager factories.
Implementations provide database connection management for different database types.

## Methods

### dbConnection()

```ts
dbConnection(): void | Promise<void> | Promise<unknown>;
```

Defined in: src/core/databasemanager/types.ts:9

Initialize the database connection.

#### Returns

`void` \| `Promise`\<`void`\> \| `Promise`\<`unknown`\>

***

### getConnection()

```ts
getConnection(): Promise<unknown>;
```

Defined in: src/core/databasemanager/types.ts:15

Get or create a database connection.

#### Returns

`Promise`\<`unknown`\>

The database connection/manager instance

***

### getStatus()

```ts
getStatus(): unknown;
```

Defined in: src/core/databasemanager/types.ts:21

Get the current connection status.

#### Returns

`unknown`

Connection status
