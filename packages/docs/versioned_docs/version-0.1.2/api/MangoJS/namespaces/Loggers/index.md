---
sidebar_label: Loggers
---

# Loggers

Logging utilities

## Classes

### LoggerPino

Defined in: [packages/core/src/core/loggers/LoggerPino.ts:14](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/LoggerPino.ts#L14)

Pino-based logger implementation.

#### Example

```ts
const logger = new LoggerPino('my-app', 'info');
const pino = logger.getLogger();
pino.info('Hello world');
```

#### Implements

- [`ILoggerFactory`](#iloggerfactory)

#### Constructors

##### Constructor

```ts
new LoggerPino(name, logLevel): LoggerPino;
```

Defined in: [packages/core/src/core/loggers/LoggerPino.ts:18](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/LoggerPino.ts#L18)

###### Parameters

###### name

`string`

###### logLevel

`string`

###### Returns

[`LoggerPino`](#loggerpino)

#### Methods

##### getLogger()

```ts
getLogger(): Logger;
```

Defined in: [packages/core/src/core/loggers/LoggerPino.ts:26](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/LoggerPino.ts#L26)

###### Returns

`Logger`

###### Implementation of

[`ILoggerFactory`](#iloggerfactory).[`getLogger`](#getlogger-1)

## Interfaces

### ILogger

Defined in: [packages/core/src/core/loggers/types.ts:8](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/types.ts#L8)

Base logger interface with common logging methods.

#### Methods

##### debug()

```ts
debug(msg, ...args): void;
```

Defined in: [packages/core/src/core/loggers/types.ts:10](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/types.ts#L10)

###### Parameters

###### msg

`string`

###### args

...`unknown`[]

###### Returns

`void`

##### error()

```ts
error(msg, ...args): void;
```

Defined in: [packages/core/src/core/loggers/types.ts:11](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/types.ts#L11)

###### Parameters

###### msg

`string`

###### args

...`unknown`[]

###### Returns

`void`

##### info()

```ts
info(msg, ...args): void;
```

Defined in: [packages/core/src/core/loggers/types.ts:9](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/types.ts#L9)

###### Parameters

###### msg

`string`

###### args

...`unknown`[]

###### Returns

`void`

##### warn()

```ts
warn(msg, ...args): void;
```

Defined in: [packages/core/src/core/loggers/types.ts:12](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/types.ts#L12)

###### Parameters

###### msg

`string`

###### args

...`unknown`[]

###### Returns

`void`

***

### ILoggerFactory

Defined in: [packages/core/src/core/loggers/types.ts:25](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/types.ts#L25)

Factory interface for creating logger instances.

#### Example

```ts
class MyLogger implements ILoggerFactory {
  getLogger() {
    return console;
  }
}
```

#### Methods

##### getLogger()

```ts
getLogger(): any;
```

Defined in: [packages/core/src/core/loggers/types.ts:27](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/loggers/types.ts#L27)

###### Returns

`any`
