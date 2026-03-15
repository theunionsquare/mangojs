[**MangoJS**](../../../../README.md)

***

# Class: WorkerBuilder

Defined in: [src/core/builders/WorkerBuilder.ts:22](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L22)

WorkerBuilder - Builder for Worker Service
Similar to ServerBuilder but for queue workers

## Example

```typescript
const workerBuilder = new WorkerBuilder()
  .setName('email-worker')
  .setRedisConfig({ host: 'localhost', port: 6379 })
  .setWorkers([EmailWorker, NotificationWorker])
  .setContainer(container)
  .build()

workerBuilder.run()
```

## Constructors

### Constructor

```ts
new WorkerBuilder(): WorkerBuilder;
```

Defined in: [src/core/builders/WorkerBuilder.ts:30](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L30)

#### Returns

`WorkerBuilder`

## Methods

### build()

```ts
build(): Promise<WorkerBuilder>;
```

Defined in: [src/core/builders/WorkerBuilder.ts:60](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L60)

Build the worker service

#### Returns

`Promise`\<`WorkerBuilder`\>

***

### getQueueManager()

```ts
getQueueManager(): QueueManager;
```

Defined in: [src/core/builders/WorkerBuilder.ts:139](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L139)

Get the queue manager instance

#### Returns

[`QueueManager`](../../../../classes/QueueManager.md)

***

### run()

```ts
run(): void;
```

Defined in: [src/core/builders/WorkerBuilder.ts:35](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L35)

Start the worker service

#### Returns

`void`

***

### setCheck()

```ts
setCheck(check): this;
```

Defined in: [src/core/builders/WorkerBuilder.ts:99](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L99)

Set pre-check handler

#### Parameters

##### check

[`IApplicationPreCheck`](../../Applications/interfaces/IApplicationPreCheck.md)

#### Returns

`this`

***

### setContainer()

```ts
setContainer(container): this;
```

Defined in: [src/core/builders/WorkerBuilder.ts:131](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L131)

Set Inversify container for dependency injection

#### Parameters

##### container

`Container`

#### Returns

`this`

***

### setName()

```ts
setName(name): this;
```

Defined in: [src/core/builders/WorkerBuilder.ts:107](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L107)

Set the worker service name

#### Parameters

##### name

`string`

#### Returns

`this`

***

### setRedisConfig()

```ts
setRedisConfig(config): this;
```

Defined in: [src/core/builders/WorkerBuilder.ts:115](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L115)

Set Redis configuration

#### Parameters

##### config

[`RedisConfig`](../../Queue/interfaces/RedisConfig.md)

#### Returns

`this`

***

### setWorkers()

```ts
setWorkers(workers): this;
```

Defined in: [src/core/builders/WorkerBuilder.ts:123](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L123)

Set worker classes to register

#### Parameters

##### workers

[`QueueWorkerConstructor`](../../Queue/type-aliases/QueueWorkerConstructor.md)[]

#### Returns

`this`

***

### shutdown()

```ts
shutdown(): Promise<void>;
```

Defined in: [src/core/builders/WorkerBuilder.ts:89](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/builders/WorkerBuilder.ts#L89)

Gracefully shutdown all workers

#### Returns

`Promise`\<`void`\>
