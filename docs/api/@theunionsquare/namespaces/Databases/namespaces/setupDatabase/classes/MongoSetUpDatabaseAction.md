# ~~Class: MongoSetUpDatabaseAction~~

Defined in: [src/core/databases/setup/MongoSetUpDatabaseAction.ts:15](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L15)

MongoDB-specific database setup action.

## Deprecated

This class will be removed in a future version.

## Implements

- [`SetUpDatabaseAction`](SetUpDatabaseAction.md)

## Constructors

### Constructor

```ts
new MongoSetUpDatabaseAction(database, logger): MongoSetUpDatabaseAction;
```

Defined in: [src/core/databases/setup/MongoSetUpDatabaseAction.ts:19](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L19)

#### Parameters

##### database

[`IDatabaseManagerFactory`](../../../../DatabaseManager/interfaces/IDatabaseManagerFactory.md)

##### logger

[`ILoggerFactory`](../../../../Loggers/interfaces/ILoggerFactory.md)

#### Returns

`MongoSetUpDatabaseAction`

## Methods

### ~~onError()~~

```ts
onError(err): void;
```

Defined in: [src/core/databases/setup/MongoSetUpDatabaseAction.ts:62](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L62)

#### Parameters

##### err

`Error`

#### Returns

`void`

#### Implementation of

[`SetUpDatabaseAction`](SetUpDatabaseAction.md).[`onError`](SetUpDatabaseAction.md#onerror)

***

### ~~onFileContent()~~

```ts
onFileContent(
   record, 
   content, 
dropBeforeInsert?): Promise<void>;
```

Defined in: [src/core/databases/setup/MongoSetUpDatabaseAction.ts:29](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L29)

#### Parameters

##### record

[`SetUpDatabaseRecord`](../../../../Types/namespaces/database/interfaces/SetUpDatabaseRecord.md)

##### content

`string`

##### dropBeforeInsert?

`boolean` = `true`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SetUpDatabaseAction`](SetUpDatabaseAction.md).[`onFileContent`](SetUpDatabaseAction.md#onfilecontent)
