[**MangoJS**](../../../../../../README.md)

***

# ~~Class: SetUpDatabaseAction~~

Defined in: [src/core/databases/setup/SetUpDatabaseAction.ts:8](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/databases/setup/SetUpDatabaseAction.ts#L8)

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

Defined in: [src/core/databases/setup/SetUpDatabaseAction.ts:14](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/databases/setup/SetUpDatabaseAction.ts#L14)

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

Defined in: [src/core/databases/setup/SetUpDatabaseAction.ts:9](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/databases/setup/SetUpDatabaseAction.ts#L9)

#### Parameters

##### file

[`SetUpDatabaseRecord`](../../../../Types/namespaces/database/interfaces/SetUpDatabaseRecord.md)

##### content

`string`

##### dropBeforeInsert

`boolean`

#### Returns

`void`
