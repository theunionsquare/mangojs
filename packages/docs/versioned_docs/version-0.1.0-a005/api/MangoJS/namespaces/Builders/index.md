---
sidebar_label: Builders
---

# Builders

Builder patterns

## Classes

### ServerBuilder

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:31](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L31)

ServerBuilder - Builder pattern for Express HTTP server configuration.

Provides a fluent API for configuring and starting an Express server
with support for routes, middleware, scheduled tasks, and Swagger documentation.

#### Example

```typescript
const server = await new ServerBuilder()
  .setName('api-server')
  .setPort(3000)
  .setRoutes([UserController, ProductController])
  .setUserAuthentication(true)
  .enableSwagger(true)
  .setSwaggerSpec(swaggerSpec)
  .build()

server.run()
```

#### Constructors

##### Constructor

```ts
new ServerBuilder(): ServerBuilder;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:44](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L44)

###### Returns

[`ServerBuilder`](#serverbuilder)

#### Properties

##### express

```ts
express: ApplicationExpress;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:42](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L42)

#### Methods

##### build()

```ts
build(): Promise<ServerBuilder>;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:71](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L71)

Build the server with all configured options.
Must be called before run().

###### Returns

`Promise`\<[`ServerBuilder`](#serverbuilder)\>

##### enableSwagger()

```ts
enableSwagger(enable): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:179](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L179)

Enable or disable Swagger documentation.

###### Parameters

###### enable

`boolean`

Whether to enable Swagger UI at /docs

###### Returns

`this`

##### expressUse()

```ts
expressUse(handler): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:62](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L62)

Add an Express middleware handler.

###### Parameters

###### handler

`Handler`

Express middleware function

###### Returns

`this`

##### getScheduleRegistry()

```ts
getScheduleRegistry(): ScheduleRegistry;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:162](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L162)

Get the schedule registry instance.

###### Returns

[`ScheduleRegistry`](../Scheduler/index.md#scheduleregistry)

##### run()

```ts
run(): void;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:51](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L51)

Start the HTTP server and begin listening for requests.

###### Returns

`void`

##### setCheck()

```ts
setCheck(check): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:118](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L118)

Set pre-flight check handler.

###### Parameters

###### check

[`IApplicationPreCheck`](../Applications/index.md#iapplicationprecheck)

Application pre-check instance

###### Returns

`this`

##### setName()

```ts
setName(name): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:136](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L136)

Set the server name for logging.

###### Parameters

###### name

`string`

Server name

###### Returns

`this`

##### setPort()

```ts
setPort(port): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:127](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L127)

Set the server port.

###### Parameters

###### port

`number`

Port number to listen on

###### Returns

`this`

##### setRoutes()

```ts
setRoutes(routes): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:145](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L145)

Set controller classes for route registration.

###### Parameters

###### routes

`unknown`[]

Array of controller classes decorated with

###### Returns

`this`

###### Controller

##### setSwaggerSpec()

```ts
setSwaggerSpec(swaggerSpec): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:188](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L188)

Set the Swagger/OpenAPI specification.

###### Parameters

###### swaggerSpec

`Record`\<`string`, `unknown`\>

OpenAPI specification object

###### Returns

`this`

##### setTasks()

```ts
setTasks(tasks): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:154](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L154)

Set scheduled task classes.

###### Parameters

###### tasks

[`ScheduledTaskConstructor`](../Scheduler/index.md#scheduledtaskconstructor-1)[]

Array of task classes decorated with

###### Returns

`this`

###### Schedule

##### setUserAuthentication()

```ts
setUserAuthentication(enable): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:170](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/ServerBuilder.ts#L170)

Enable or disable user authentication middleware.

###### Parameters

###### enable

`boolean`

Whether to enable authentication

###### Returns

`this`

***

### WorkerBuilder

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:22](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L22)

WorkerBuilder - Builder for Worker Service
Similar to ServerBuilder but for queue workers

#### Example

```typescript
const workerBuilder = new WorkerBuilder()
  .setName('email-worker')
  .setRedisConfig({ host: 'localhost', port: 6379 })
  .setWorkers([EmailWorker, NotificationWorker])
  .setContainer(container)
  .build()

workerBuilder.run()
```

#### Constructors

##### Constructor

```ts
new WorkerBuilder(): WorkerBuilder;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:30](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L30)

###### Returns

[`WorkerBuilder`](#workerbuilder)

#### Methods

##### build()

```ts
build(): Promise<WorkerBuilder>;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:60](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L60)

Build the worker service

###### Returns

`Promise`\<[`WorkerBuilder`](#workerbuilder)\>

##### getQueueManager()

```ts
getQueueManager(): QueueManager;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:139](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L139)

Get the queue manager instance

###### Returns

[`QueueManager`](../Queue/index.md#queuemanager)

##### run()

```ts
run(): void;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:35](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L35)

Start the worker service

###### Returns

`void`

##### setCheck()

```ts
setCheck(check): this;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:99](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L99)

Set pre-check handler

###### Parameters

###### check

[`IApplicationPreCheck`](../Applications/index.md#iapplicationprecheck)

###### Returns

`this`

##### setContainer()

```ts
setContainer(container): this;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:131](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L131)

Set Inversify container for dependency injection

###### Parameters

###### container

`Container`

###### Returns

`this`

##### setName()

```ts
setName(name): this;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:107](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L107)

Set the worker service name

###### Parameters

###### name

`string`

###### Returns

`this`

##### setRedisConfig()

```ts
setRedisConfig(config): this;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:115](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L115)

Set Redis configuration

###### Parameters

###### config

[`RedisConfig`](../Queue/index.md#redisconfig)

###### Returns

`this`

##### setWorkers()

```ts
setWorkers(workers): this;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:123](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L123)

Set worker classes to register

###### Parameters

###### workers

[`QueueWorkerConstructor`](../Queue/index.md#queueworkerconstructor)[]

###### Returns

`this`

##### shutdown()

```ts
shutdown(): Promise<void>;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:89](https://github.com/theunionsquare/mangojs/blob/a27c3c3ecf5653dc474c67d026e430ad3a6bdbb0/packages/core/src/core/builders/WorkerBuilder.ts#L89)

Gracefully shutdown all workers

###### Returns

`Promise`\<`void`\>
