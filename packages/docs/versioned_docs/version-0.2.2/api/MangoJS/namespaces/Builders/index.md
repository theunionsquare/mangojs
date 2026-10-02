---
sidebar_label: Builders
---

# Builders

Builder patterns

## Classes

### ServerBuilder

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:37](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L37)

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

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:51](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L51)

###### Returns

[`ServerBuilder`](#serverbuilder)

#### Properties

##### express

```ts
express: ApplicationExpress;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:49](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L49)

#### Methods

##### build()

```ts
build(): Promise<ServerBuilder>;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:78](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L78)

Build the server with all configured options.
Must be called before run().

###### Returns

`Promise`\<[`ServerBuilder`](#serverbuilder)\>

##### enableSwagger()

```ts
enableSwagger(enable): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:199](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L199)

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

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:69](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L69)

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

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:182](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L182)

Get the schedule registry instance.

###### Returns

[`ScheduleRegistry`](../Scheduler/index.md#scheduleregistry)

##### run()

```ts
run(): void;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:58](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L58)

Start the HTTP server and begin listening for requests.

###### Returns

`void`

##### setCheck()

```ts
setCheck(check): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:138](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L138)

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

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:156](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L156)

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

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:147](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L147)

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

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:165](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L165)

Set controller classes for route registration.

###### Parameters

###### routes

`unknown`[]

Array of controller classes decorated with

###### Returns

`this`

###### Controller

##### setSecurityHeaders()

```ts
setSecurityHeaders(options): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:222](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L222)

Configure HTTP security headers (CSP, HSTS, X-Frame-Options, etc.).
Applied by default with a strict policy even if this is never called —
pass `false` to disable them entirely, or an options object to override
the defaults. See `Middlewares.securityHeaders.createSecurityHeaders`
for the full set of options, including the `/docs` carve-out for
Swagger UI.

###### Parameters

###### options

Security header overrides, or `false` to disable

`false` | [`SecurityHeadersOptions`](../Middlewares/namespaces/securityHeaders/index.md#securityheadersoptions)

###### Returns

`this`

##### setSwaggerSpec()

```ts
setSwaggerSpec(swaggerSpec): this;
```

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:208](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L208)

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

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:174](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L174)

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

Defined in: [packages/core/src/core/builders/ServerBuilder.ts:190](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/ServerBuilder.ts#L190)

Enable or disable user authentication middleware.

###### Parameters

###### enable

`boolean`

Whether to enable authentication

###### Returns

`this`

***

### WorkerBuilder

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:22](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L22)

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

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:30](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L30)

###### Returns

[`WorkerBuilder`](#workerbuilder)

#### Methods

##### build()

```ts
build(): Promise<WorkerBuilder>;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:60](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L60)

Build the worker service

###### Returns

`Promise`\<[`WorkerBuilder`](#workerbuilder)\>

##### getQueueManager()

```ts
getQueueManager(): QueueManager;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:139](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L139)

Get the queue manager instance

###### Returns

[`QueueManager`](../Queue/index.md#queuemanager)

##### run()

```ts
run(): void;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:35](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L35)

Start the worker service

###### Returns

`void`

##### setCheck()

```ts
setCheck(check): this;
```

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:99](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L99)

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

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:131](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L131)

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

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:107](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L107)

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

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:115](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L115)

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

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:123](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L123)

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

Defined in: [packages/core/src/core/builders/WorkerBuilder.ts:89](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/builders/WorkerBuilder.ts#L89)

Gracefully shutdown all workers

###### Returns

`Promise`\<`void`\>
