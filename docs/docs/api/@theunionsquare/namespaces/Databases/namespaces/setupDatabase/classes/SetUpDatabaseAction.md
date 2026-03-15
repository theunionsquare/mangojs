---
sidebar_label: SetUpDatabaseAction
---

# ~~Class: SetUpDatabaseAction~~

Defined in: [src/core/databases/setup/SetUpDatabaseAction.ts:8](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/setup/SetUpDatabaseAction.ts#L8)

Base class for database setup actions.

## Deprecated

This class will be removed in a future version.

## Constructors

### Constructor

```ts
new SetUpDatabaseAction(): SetUpDatabaseAction;
```

#### Returns

`SetUpDatabaseAction`

## Methods

### ~~onError()~~

```ts
onError(err): void;
```

Defined in: [src/core/databases/setup/SetUpDatabaseAction.ts:14](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/setup/SetUpDatabaseAction.ts#L14)

#### Parameters

##### err

`Error`

#### Returns

`void`

***

### ~~onFileContent()~~

```ts
onFileContent(
   file, 
   content, 
   dropBeforeInsert): void;
```

Defined in: [src/core/databases/setup/SetUpDatabaseAction.ts:9](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/setup/SetUpDatabaseAction.ts#L9)

#### Parameters

##### file

[`SetUpDatabaseRecord`](../../../../Types/namespaces/database/interfaces/SetUpDatabaseRecord.md)

##### content

`string`

##### dropBeforeInsert

`boolean`

#### Returns

`void`
