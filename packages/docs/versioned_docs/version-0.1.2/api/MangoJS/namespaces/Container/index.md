---
sidebar_label: Container
---

# Container

Dependency injection container (Inversify)

## Classes

### ContainerBuilder

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:208](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L208)

Fluent builder for creating and configuring dependency injection containers.

Provides both framework presets (for common setups like databases, auth)
and generic binding methods (for application-specific classes).

#### Example

```typescript
// Default container (automatically set as default)
ContainerBuilder.create()
  .withCore()
  .withPostgres({ connection: { url: DATABASE_URL }, entities: [User, Order] })
  .withAuth([JWTStrategy, ApiKeyStrategy])
  .build();

// Named container (not default)
ContainerBuilder.create("test")
  .withCore()
  .withDummyDB()
  .build();

// Named container, explicitly set as default
ContainerBuilder.create("other")
  .withCore()
  .setAsDefault()
  .build();
```

#### Methods

##### bind()

```ts
bind<T>(identifier): BindingBuilder<T>;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:250](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L250)

Start a binding for a service identifier

###### Type Parameters

###### T

`T`

###### Parameters

###### identifier

[`ServiceIdentifier`](#serviceidentifier)\<`T`\>

###### Returns

`BindingBuilder`\<`T`\>

###### Example

```typescript
builder.bind(TYPES.UserService).to(UserService)
builder.bind(TYPES.Config).toValue(config)
builder.bind(TYPES.Factory).toFactory(() => new MyClass())
```

##### bindAll()

```ts
bindAll(bindings): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:265](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L265)

Bind multiple classes at once

###### Parameters

###### bindings

`Record`\<`string` \| `symbol`, `Newable`\<`any`\>\>

###### Returns

`this`

###### Example

```typescript
builder.bindAll({
  [TYPES.UserService]: UserService,
  [TYPES.OrderService]: OrderService,
})
```

##### bindAllTagged()

```ts
bindAllTagged<T>(tag, implementations): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:309](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L309)

Bind multiple tagged implementations at once

###### Type Parameters

###### T

`T`

###### Parameters

###### tag

`symbol`

###### implementations

`Newable`\<`T`\>[]

###### Returns

`this`

###### Example

```typescript
builder.bindAllTagged(AUTH_STRATEGY_TAG, [
  JWTStrategy,
  ApiKeyStrategy,
  SessionStrategy
])
```

##### bindTagged()

```ts
bindTagged<T>(tag, implementation): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:292](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L292)

Bind a tagged implementation (for multi-inject patterns)

###### Type Parameters

###### T

`T`

###### Parameters

###### tag

`symbol`

###### implementation

`Newable`\<`T`\>

###### Returns

`this`

###### Example

```typescript
builder
  .bindTagged(AUTH_STRATEGY_TAG, JWTStrategy)
  .bindTagged(AUTH_STRATEGY_TAG, ApiKeyStrategy)
```

##### build()

```ts
build(): ContainerManager;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:554](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L554)

Build and register the configured ContainerManager

###### Returns

[`ContainerManager`](#containermanager)

##### setAsDefault()

```ts
setAsDefault(): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:231](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L231)

Mark this container to be set as the default when built

###### Returns

`this`

##### useModule()

```ts
useModule(module): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:330](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L330)

Use a custom module to configure bindings

###### Parameters

###### module

[`ContainerModule`](#containermodule)

###### Returns

`this`

###### Example

```typescript
const PaymentModule: ContainerModule = (builder) => {
  builder
    .bind(TYPES.PaymentGateway).to(StripeGateway)
    .bind(TYPES.PaymentService).to(PaymentService);
};

builder.useModule(PaymentModule)
```

##### withAuth()

```ts
withAuth(strategies): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:501](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L501)

Configure authentication with strategies

Binds all provided strategies to the AUTH_STRATEGY_TAG for multi-inject,
then binds the AuthStrategyRegistry that collects them.

###### Parameters

###### strategies

`Newable`\<[`IAuthStrategy`](../Authentication/index.md#iauthstrategy)\>[]

###### Returns

`this`

###### Example

```typescript
builder.withAuth([JWTStrategy, ApiKeyStrategy])
```

##### withCockroachDB()

```ts
withCockroachDB(options): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:404](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L404)

Configure CockroachDB database and persistence

###### Parameters

###### options

[`CockroachDBOptions`](#cockroachdboptions)

###### Returns

`this`

###### Example

```typescript
builder.withCockroachDB({
  connection: { url: 'postgresql://user:pass@host:26257/db' },
  entities: [User, Order]
})
```

##### withCore()

```ts
withCore(options?): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:347](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L347)

Add core framework bindings (logger)

###### Parameters

###### options?

[`CoreOptions`](#coreoptions) = `{}`

###### Returns

`this`

###### Example

```typescript
builder.withCore({ loggerName: 'my-app', logLevel: 'info' })
```

##### withDummyDB()

```ts
withDummyDB(): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:474](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L474)

Configure a dummy/in-memory database (useful for testing)

###### Returns

`this`

###### Example

```typescript
builder.withDummyDB()
```

##### ~~withMongoDB()~~

```ts
withMongoDB(options): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:439](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L439)

Configure MongoDB database and persistence

###### Parameters

###### options

[`MongoDBOptions`](#mongodboptions)

###### Returns

`this`

###### Deprecated

MongoDB support is deprecated. Use PostgreSQL or CockroachDB instead.

###### Example

```typescript
builder.withMongoDB({
  uri: 'mongodb://localhost:27017',
  databaseName: 'mydb'
})
```

##### withPostgres()

```ts
withPostgres(options): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:371](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L371)

Configure PostgreSQL database and persistence

###### Parameters

###### options

[`PostgresOptions`](#postgresoptions)

###### Returns

`this`

###### Example

```typescript
builder.withPostgres({
  connection: { url: 'postgresql://user:pass@host:5432/db' },
  entities: [User, Order],
  synchronize: true
})
```

##### withQueueClient()

```ts
withQueueClient(options): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:532](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L532)

Configure QueueClient with Redis connection

###### Parameters

###### options

`QueueOptions`

###### Returns

`this`

###### Example

```typescript
builder.withQueueClient({
  host: 'localhost',
  port: 6379,
  password: 'secret',
  db: 0
})
```

##### create()

```ts
static create(name?, parent?): ContainerBuilder;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:224](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L224)

Create a new ContainerBuilder

###### Parameters

###### name?

`string`

Optional container name. If not provided, container becomes default.

###### parent?

[`ContainerManager`](#containermanager)

Optional parent container for hierarchical DI

###### Returns

[`ContainerBuilder`](#containerbuilder)

***

### ContainerManager

Defined in: [packages/core/src/core/container/ContainerManager.ts:18](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerManager.ts#L18)

Wrapper class for an Inversify container.

Provides a clean API for dependency injection operations on a single container.

#### Example

```typescript
// Get a service from the container
const service = containerManager.get<MyService>(TYPES.MyService);

// Check if a service is bound
if (containerManager.isBound(TYPES.MyService)) { ... }
```

#### Constructors

##### Constructor

```ts
new ContainerManager(container, name): ContainerManager;
```

Defined in: [packages/core/src/core/container/ContainerManager.ts:22](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerManager.ts#L22)

###### Parameters

###### container

`Container`

###### name

`string`

###### Returns

[`ContainerManager`](#containermanager)

#### Methods

##### createChild()

```ts
createChild(childName): ContainerManager;
```

Defined in: [packages/core/src/core/container/ContainerManager.ts:65](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerManager.ts#L65)

Create a child container

###### Parameters

###### childName

`string`

###### Returns

[`ContainerManager`](#containermanager)

##### get()

```ts
get<T>(serviceIdentifier, options?): T;
```

Defined in: [packages/core/src/core/container/ContainerManager.ts:30](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerManager.ts#L30)

Get a service from this container

###### Type Parameters

###### T

`T`

###### Parameters

###### serviceIdentifier

[`ServiceIdentifier`](#serviceidentifier)\<`T`\>

###### options?

`GetOptions`

###### Returns

`T`

##### getAll()

```ts
getAll<T>(serviceIdentifier, options?): T[];
```

Defined in: [packages/core/src/core/container/ContainerManager.ts:44](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerManager.ts#L44)

Get all services bound to an identifier

###### Type Parameters

###### T

`T`

###### Parameters

###### serviceIdentifier

[`ServiceIdentifier`](#serviceidentifier)\<`T`\>

###### options?

`GetOptions`

###### Returns

`T`[]

##### getName()

```ts
getName(): string;
```

Defined in: [packages/core/src/core/container/ContainerManager.ts:58](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerManager.ts#L58)

Get the container name

###### Returns

`string`

##### getRawContainer()

```ts
getRawContainer(): Container;
```

Defined in: [packages/core/src/core/container/ContainerManager.ts:51](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerManager.ts#L51)

Get the underlying Inversify container

###### Returns

`Container`

##### isBound()

```ts
isBound(serviceIdentifier): boolean;
```

Defined in: [packages/core/src/core/container/ContainerManager.ts:37](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerManager.ts#L37)

Check if a service is bound

###### Parameters

###### serviceIdentifier

[`ServiceIdentifier`](#serviceidentifier)

###### Returns

`boolean`

## Interfaces

### CockroachDBOptions

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:75](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L75)

Options for CockroachDB connection

#### Properties

##### connection

```ts
connection: CockroachUrl | CockroachConnection;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:76](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L76)

##### entities

```ts
entities: any[];
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:77](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L77)

##### logging?

```ts
optional logging: boolean;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:79](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L79)

##### synchronize?

```ts
optional synchronize: boolean;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:78](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L78)

***

### CoreOptions

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:47](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L47)

Options for core module

#### Properties

##### loggerName?

```ts
optional loggerName: string;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:49](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L49)

Logger name (default: 'server')

##### logLevel?

```ts
optional logLevel: "error" | "debug" | "info" | "warn";
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:51](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L51)

Log level (default: 'debug')

***

### MongoDBOptions

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:57](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L57)

Options for MongoDB connection

#### Properties

##### databaseName

```ts
databaseName: string;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:59](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L59)

##### uri

```ts
uri: string;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:58](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L58)

***

### PostgresOptions

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:65](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L65)

Options for Postgres connection

#### Properties

##### connection

```ts
connection: PostgresUrl | PostgresConnection;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:66](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L66)

##### entities

```ts
entities: any[];
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:67](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L67)

##### logging?

```ts
optional logging: boolean;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:69](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L69)

##### synchronize?

```ts
optional synchronize: boolean;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:68](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L68)

## Type Aliases

### ContainerModule()

```ts
type ContainerModule = (builder) => void;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:99](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerBuilder.ts#L99)

Container module function type

#### Parameters

##### builder

[`ContainerBuilder`](#containerbuilder)

#### Returns

`void`

***

### ServiceIdentifier

```ts
type ServiceIdentifier<TInstance> = string | symbol | Newable<TInstance> | Function;
```

Defined in: [packages/core/src/core/container/types.ts:8](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/types.ts#L8)

Service identifier for dependency injection.
Can be a string, symbol, constructor, or function.

#### Type Parameters

##### TInstance

`TInstance` = `unknown`

The type of the service instance

## Variables

### ContainerRegistry

```ts
const ContainerRegistry: ContainerRegistryImpl;
```

Defined in: [packages/core/src/core/container/ContainerRegistry.ts:104](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/container/ContainerRegistry.ts#L104)

Singleton instance
