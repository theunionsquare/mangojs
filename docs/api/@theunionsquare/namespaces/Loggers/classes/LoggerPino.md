# Class: LoggerPino

Defined in: [src/core/loggers/LoggerPino.ts:14](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/loggers/LoggerPino.ts#L14)

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

Defined in: [src/core/loggers/LoggerPino.ts:18](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/loggers/LoggerPino.ts#L18)

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

Defined in: [src/core/loggers/LoggerPino.ts:26](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/loggers/LoggerPino.ts#L26)

#### Returns

`Logger`

#### Implementation of

[`ILoggerFactory`](../interfaces/ILoggerFactory.md).[`getLogger`](../interfaces/ILoggerFactory.md#getlogger)
