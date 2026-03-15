---
sidebar_label: BaseRepository
---

# ~~Abstract Class: BaseRepository\<T\>~~

Defined in: [src/core/databases/interfaces/BaseRepository.ts:12](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/interfaces/BaseRepository.ts#L12)

Abstract base repository implementing basic CRUD operations.

## Deprecated

This class will be removed in a future version.
Use TypeORM repositories directly instead.

## Type Parameters

### T

`T`

## Implements

- `IRead`\<`T`\>
- `IWrite`\<`T`\>

## Constructors

### Constructor

```ts
new BaseRepository<T>(): BaseRepository<T>;
```

Defined in: [src/core/databases/interfaces/BaseRepository.ts:15](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/interfaces/BaseRepository.ts#L15)

#### Returns

`BaseRepository`\<`T`\>

## Properties

### ~~\_collection~~

```ts
readonly _collection: any;
```

Defined in: [src/core/databases/interfaces/BaseRepository.ts:13](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/interfaces/BaseRepository.ts#L13)

## Methods

### ~~count()~~

```ts
count(): Promise<Number>;
```

Defined in: [src/core/databases/interfaces/BaseRepository.ts:34](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/interfaces/BaseRepository.ts#L34)

#### Returns

`Promise`\<`Number`\>

***

### ~~create()~~

```ts
create(item): Promise<boolean>;
```

Defined in: [src/core/databases/interfaces/BaseRepository.ts:25](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/interfaces/BaseRepository.ts#L25)

#### Parameters

##### item

`T`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

```ts
IWrite.create
```

***

### ~~delete()~~

```ts
delete(id): Promise<boolean>;
```

Defined in: [src/core/databases/interfaces/BaseRepository.ts:31](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/interfaces/BaseRepository.ts#L31)

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

```ts
IWrite.delete
```

***

### ~~find()~~

```ts
find(item): Promise<T[]>;
```

Defined in: [src/core/databases/interfaces/BaseRepository.ts:19](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/interfaces/BaseRepository.ts#L19)

#### Parameters

##### item

`T`

#### Returns

`Promise`\<`T`[]\>

#### Implementation of

```ts
IRead.find
```

***

### ~~findOne()~~

```ts
findOne(id): Promise<T>;
```

Defined in: [src/core/databases/interfaces/BaseRepository.ts:22](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/interfaces/BaseRepository.ts#L22)

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`T`\>

#### Implementation of

```ts
IRead.findOne
```

***

### ~~update()~~

```ts
update(id, item): Promise<boolean>;
```

Defined in: [src/core/databases/interfaces/BaseRepository.ts:28](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/databases/interfaces/BaseRepository.ts#L28)

#### Parameters

##### id

`string`

##### item

`T`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

```ts
IWrite.update
```
