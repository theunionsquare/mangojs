---
sidebar_label: setupDatabase
---

# ~~setupDatabase~~

## Deprecated

Use TypeORM repositories instead

## Classes

### ~~MongoSetUpDatabaseAction~~

Defined in: [packages/core/src/core/databases/setup/MongoSetUpDatabaseAction.ts:15](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L15)

MongoDB-specific database setup action.

#### Deprecated

This class will be removed in a future version.

#### Implements

- [`SetUpDatabaseAction`](../../../Types/namespaces/database/index.md#setupdatabaseaction)

#### Constructors

##### Constructor

```ts
new MongoSetUpDatabaseAction(database, logger): MongoSetUpDatabaseAction;
```

Defined in: [packages/core/src/core/databases/setup/MongoSetUpDatabaseAction.ts:19](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L19)

###### Parameters

###### database

[`IDatabaseManagerFactory`](../../../DatabaseManager/index.md#idatabasemanagerfactory)

###### logger

[`ILoggerFactory`](../../../Loggers/index.md#iloggerfactory)

###### Returns

[`MongoSetUpDatabaseAction`](#mongosetupdatabaseaction)

#### Methods

##### ~~onError()~~

```ts
onError(err): void;
```

Defined in: [packages/core/src/core/databases/setup/MongoSetUpDatabaseAction.ts:62](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L62)

###### Parameters

###### err

`Error`

###### Returns

`void`

###### Implementation of

[`SetUpDatabaseAction`](../../../Types/namespaces/database/index.md#setupdatabaseaction).[`onError`](../../../Types/namespaces/database/index.md#onerror)

##### ~~onFileContent()~~

```ts
onFileContent(
   record, 
   content, 
dropBeforeInsert?): Promise<void>;
```

Defined in: [packages/core/src/core/databases/setup/MongoSetUpDatabaseAction.ts:29](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L29)

###### Parameters

###### record

[`SetUpDatabaseRecord`](../../../Types/namespaces/database/index.md#setupdatabaserecord)

###### content

`string`

###### dropBeforeInsert?

`boolean` = `true`

###### Returns

`Promise`\<`void`\>

###### Implementation of

[`SetUpDatabaseAction`](../../../Types/namespaces/database/index.md#setupdatabaseaction).[`onFileContent`](../../../Types/namespaces/database/index.md#onfilecontent)

## References

### ~~SetUpDatabaseAction~~

Re-exports [SetUpDatabaseAction](../../../Types/namespaces/database/index.md#setupdatabaseaction)
