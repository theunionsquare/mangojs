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

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:6](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L6)

HTTP VERB ENUM

#### Enumeration Members

##### DELETE

```ts
DELETE: "delete";
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:10](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L10)

##### GET

```ts
GET: "get";
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:7](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L7)

##### POST

```ts
POST: "post";
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:8](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L8)

##### PUT

```ts
PUT: "put";
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:9](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L9)

## Interfaces

### IRouter

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:16](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L16)

Router interface

#### Properties

##### handlerName

```ts
handlerName: string | symbol;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:19](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L19)

##### method

```ts
method: Methods;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:17](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L17)

##### path

```ts
path: string;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:18](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L18)

## Variables

### Delete()

```ts
const Delete: (path) => MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:58](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L58)

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

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:52](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L52)

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

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:54](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L54)

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

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:56](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L56)

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

Defined in: [packages/core/src/core/decorators/queue/queueWorker.decorator.ts:5](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/queue/queueWorker.decorator.ts#L5)

***

### Use()

```ts
const Use: (handler) => MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:82](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/handlers.decorator.ts#L82)

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

Defined in: [packages/core/src/core/decorators/http/controller.decorator.ts:8](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/controller.decorator.ts#L8)

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

Defined in: [packages/core/src/core/decorators/logger.decorator.ts:7](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/logger.decorator.ts#L7)

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

Defined in: [packages/core/src/core/decorators/http/middleware.decorator.ts:11](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/decorators/http/middleware.decorator.ts#L11)

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
