---
sidebar_label: ILogger
---

# Interface: ILogger

Defined in: [src/core/loggers/types.ts:8](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/types.ts#L8)

Base logger interface with common logging methods.

## Methods

### debug()

```ts
debug(msg, ...args): void;
```

Defined in: [src/core/loggers/types.ts:10](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/types.ts#L10)

#### Parameters

##### msg

`string`

##### args

...`unknown`[]

#### Returns

`void`

***

### error()

```ts
error(msg, ...args): void;
```

Defined in: [src/core/loggers/types.ts:11](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/types.ts#L11)

#### Parameters

##### msg

`string`

##### args

...`unknown`[]

#### Returns

`void`

***

### info()

```ts
info(msg, ...args): void;
```

Defined in: [src/core/loggers/types.ts:9](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/types.ts#L9)

#### Parameters

##### msg

`string`

##### args

...`unknown`[]

#### Returns

`void`

***

### warn()

```ts
warn(msg, ...args): void;
```

Defined in: [src/core/loggers/types.ts:12](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/types.ts#L12)

#### Parameters

##### msg

`string`

##### args

...`unknown`[]

#### Returns

`void`
