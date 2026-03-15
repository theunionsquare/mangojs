---
sidebar_label: LoggerPino
---

# Class: LoggerPino

Defined in: [src/core/loggers/LoggerPino.ts:14](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/LoggerPino.ts#L14)

Pino-based logger implementation.

## Example

```ts
const logger = new LoggerPino('my-app', 'info');
const pino = logger.getLogger();
pino.info('Hello world');
```

## Implements

- [`ILoggerFactory`](../interfaces/ILoggerFactory.md)

## Constructors

### Constructor

```ts
new LoggerPino(name, logLevel): LoggerPino;
```

Defined in: [src/core/loggers/LoggerPino.ts:18](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/LoggerPino.ts#L18)

#### Parameters

##### name

`string`

##### logLevel

`string`

#### Returns

`LoggerPino`

## Methods

### getLogger()

```ts
getLogger(): Logger;
```

Defined in: [src/core/loggers/LoggerPino.ts:26](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/LoggerPino.ts#L26)

#### Returns

`Logger`

#### Implementation of

[`ILoggerFactory`](../interfaces/ILoggerFactory.md).[`getLogger`](../interfaces/ILoggerFactory.md#getlogger)
