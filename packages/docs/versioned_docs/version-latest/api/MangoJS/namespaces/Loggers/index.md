---
sidebar_label: Loggers
---

# Loggers

## Description

Logging utilities with Pino integration.

## Example

```ts
import { LoggerPino } from '@anthropic/mangojs';

const logger = new LoggerPino('my-service', 'info');
const pino = logger.getLogger();
pino.info('Server started');
```

## Classes

### LoggerPino

Defined in: packages/core/src/core/loggers/LoggerPino.ts:14

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

Defined in: packages/core/src/core/loggers/LoggerPino.ts:18

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

Defined in: packages/core/src/core/loggers/LoggerPino.ts:26

###### Returns

`Logger`

###### Implementation of

[`ILoggerFactory`](#iloggerfactory).[`getLogger`](#getlogger-1)

## Interfaces

### ILogger

Defined in: packages/core/src/core/loggers/types.ts:8

Base logger interface with common logging methods.

#### Methods

##### debug()

```ts
debug(msg, ...args): void;
```

Defined in: packages/core/src/core/loggers/types.ts:10

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

Defined in: packages/core/src/core/loggers/types.ts:11

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

Defined in: packages/core/src/core/loggers/types.ts:9

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

Defined in: packages/core/src/core/loggers/types.ts:12

###### Parameters

###### msg

`string`

###### args

...`unknown`[]

###### Returns

`void`

***

### ILoggerFactory

Defined in: packages/core/src/core/loggers/types.ts:25

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

Defined in: packages/core/src/core/loggers/types.ts:27

###### Returns

`any`
