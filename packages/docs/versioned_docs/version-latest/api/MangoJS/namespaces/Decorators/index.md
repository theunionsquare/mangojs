---
sidebar_label: Decorators
---

# Decorators

## Description

TypeScript decorators for HTTP routing, authorization, scheduling, and queues.

## Namespaces

- [Auth](namespaces/Auth/index.md)

## Enumerations

### Methods

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:6

HTTP VERB ENUM

#### Enumeration Members

##### DELETE

```ts
DELETE: "delete";
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:10

##### GET

```ts
GET: "get";
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:7

##### POST

```ts
POST: "post";
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:8

##### PUT

```ts
PUT: "put";
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:9

## Interfaces

### IRouter

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:16

Router interface

#### Properties

##### handlerName

```ts
handlerName: string | symbol;
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:19

##### method

```ts
method: Methods;
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:17

##### path

```ts
path: string;
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:18

## Variables

### Delete()

```ts
const Delete: (path) => MethodDecorator;
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:58

#### Parameters

##### path

`string`

#### Returns

`MethodDecorator`

***

### Get()

```ts
const Get: (path) => MethodDecorator;
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:52

#### Parameters

##### path

`string`

#### Returns

`MethodDecorator`

***

### Post()

```ts
const Post: (path) => MethodDecorator;
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:54

#### Parameters

##### path

`string`

#### Returns

`MethodDecorator`

***

### Put()

```ts
const Put: (path) => MethodDecorator;
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:56

#### Parameters

##### path

`string`

#### Returns

`MethodDecorator`

***

### QUEUE\_WORKER\_METADATA\_KEY

```ts
const QUEUE_WORKER_METADATA_KEY: typeof QUEUE_WORKER_METADATA_KEY;
```

Defined in: packages/core/src/core/decorators/queue/queueWorker.decorator.ts:5

***

### Use()

```ts
const Use: (handler) => MethodDecorator;
```

Defined in: packages/core/src/core/decorators/http/handlers.decorator.ts:82

#### Parameters

##### handler

`Function`

#### Returns

`MethodDecorator`

## Functions

### Controller()

```ts
function Controller(basePath): ClassDecorator;
```

Defined in: packages/core/src/core/decorators/http/controller.decorator.ts:8

Define the base API address

#### Parameters

##### basePath

`string`

string

#### Returns

`ClassDecorator`

***

### ~~loggedMethod()~~

```ts
function loggedMethod(): any;
```

Defined in: packages/core/src/core/decorators/logger.decorator.ts:7

Method decorator that logs method calls with timestamps.

#### Returns

`any`

#### Deprecated

Use the Loggers module for proper logging instead.
This decorator uses console.log which is not suitable for production.

***

### Middleware()

```ts
function Middleware(middleware): MethodDecorator;
```

Defined in: packages/core/src/core/decorators/http/middleware.decorator.ts:11

Generic Middleware decoratoor

#### Parameters

##### middleware

`RequestHandler`

function in the form (req: Request, res: Response, next: NextFunction) =\> \{
       next();
   \})

#### Returns

`MethodDecorator`

## References

### QueueWorker

Re-exports [QueueWorker](../../../index.md#queueworker)

***

### Schedule

Re-exports [Schedule](../../../index.md#schedule)
