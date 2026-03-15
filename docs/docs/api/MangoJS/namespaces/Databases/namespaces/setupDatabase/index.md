---
sidebar_label: setupDatabase
---

# ~~setupDatabase~~

## Deprecated

Use TypeORM repositories instead

## Classes

### ~~MongoSetUpDatabaseAction~~

Defined in: [src/core/databases/setup/MongoSetUpDatabaseAction.ts:15](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L15)

MongoDB-specific database setup action.

#### Deprecated

This class will be removed in a future version.

#### Implements

- [`SetUpDatabaseAction`](#setupdatabaseaction)

#### Constructors

##### Constructor

```ts
new MongoSetUpDatabaseAction(database, logger): MongoSetUpDatabaseAction;
```

Defined in: [src/core/databases/setup/MongoSetUpDatabaseAction.ts:19](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L19)

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

Defined in: [src/core/databases/setup/MongoSetUpDatabaseAction.ts:62](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L62)

###### Parameters

###### err

`Error`

###### Returns

`void`

###### Implementation of

[`SetUpDatabaseAction`](#setupdatabaseaction).[`onError`](#onerror-1)

##### ~~onFileContent()~~

```ts
onFileContent(
   record, 
   content, 
dropBeforeInsert?): Promise<void>;
```

Defined in: [src/core/databases/setup/MongoSetUpDatabaseAction.ts:29](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databases/setup/MongoSetUpDatabaseAction.ts#L29)

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

[`SetUpDatabaseAction`](#setupdatabaseaction).[`onFileContent`](#onfilecontent-1)

***

### ~~SetUpDatabaseAction~~

Defined in: [src/core/databases/setup/SetUpDatabaseAction.ts:8](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databases/setup/SetUpDatabaseAction.ts#L8)

Base class for database setup actions.

#### Deprecated

This class will be removed in a future version.

#### Constructors

##### Constructor

```ts
new SetUpDatabaseAction(): SetUpDatabaseAction;
```

###### Returns

[`SetUpDatabaseAction`](#setupdatabaseaction)

#### Methods

##### ~~onError()~~

```ts
onError(err): void;
```

Defined in: [src/core/databases/setup/SetUpDatabaseAction.ts:14](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databases/setup/SetUpDatabaseAction.ts#L14)

###### Parameters

###### err

`Error`

###### Returns

`void`

##### ~~onFileContent()~~

```ts
onFileContent(
   file, 
   content, 
   dropBeforeInsert): void;
```

Defined in: [src/core/databases/setup/SetUpDatabaseAction.ts:9](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databases/setup/SetUpDatabaseAction.ts#L9)

###### Parameters

###### file

[`SetUpDatabaseRecord`](../../../Types/namespaces/database/index.md#setupdatabaserecord)

###### content

`string`

###### dropBeforeInsert

`boolean`

###### Returns

`void`
