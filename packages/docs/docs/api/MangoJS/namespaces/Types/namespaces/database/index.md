---
sidebar_label: database
---

# database

## Classes

### ~~SetUpDatabaseAction~~

Defined in: [packages/core/src/core/databases/setup/SetUpDatabaseAction.ts:8](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/databases/setup/SetUpDatabaseAction.ts#L8)

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

Defined in: [packages/core/src/core/databases/setup/SetUpDatabaseAction.ts:14](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/databases/setup/SetUpDatabaseAction.ts#L14)

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

Defined in: [packages/core/src/core/databases/setup/SetUpDatabaseAction.ts:9](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/databases/setup/SetUpDatabaseAction.ts#L9)

###### Parameters

###### file

[`SetUpDatabaseRecord`](#setupdatabaserecord)

###### content

`string`

###### dropBeforeInsert

`boolean`

###### Returns

`void`

## Interfaces

### SetUpDatabaseRecord

Defined in: [packages/core/src/core/types/database/SetUpDataBaseRecord.ts:1](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/types/database/SetUpDataBaseRecord.ts#L1)

#### Properties

##### collection

```ts
collection: string;
```

Defined in: [packages/core/src/core/types/database/SetUpDataBaseRecord.ts:3](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/types/database/SetUpDataBaseRecord.ts#L3)

##### file

```ts
file: string;
```

Defined in: [packages/core/src/core/types/database/SetUpDataBaseRecord.ts:2](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/types/database/SetUpDataBaseRecord.ts#L2)

##### key

```ts
key: string;
```

Defined in: [packages/core/src/core/types/database/SetUpDataBaseRecord.ts:4](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/types/database/SetUpDataBaseRecord.ts#L4)
