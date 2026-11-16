---
sidebar_label: Container
---

# Container

Dependency injection container (Inversify)

## Classes

### ContainerBuilder

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:209](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L209)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:251](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L251)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:266](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L266)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:310](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L310)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:293](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L293)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:555](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L555)

Build and register the configured ContainerManager

###### Returns

[`ContainerManager`](#containermanager)

##### setAsDefault()

```ts
setAsDefault(): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:232](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L232)

Mark this container to be set as the default when built

###### Returns

`this`

##### useModule()

```ts
useModule(module): this;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:331](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L331)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:502](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L502)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:405](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L405)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:348](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L348)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:475](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L475)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:440](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L440)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:372](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L372)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:533](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L533)

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

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:225](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L225)

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

Defined in: [packages/core/src/core/container/ContainerManager.ts:19](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerManager.ts#L19)

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

Defined in: [packages/core/src/core/container/ContainerManager.ts:23](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerManager.ts#L23)

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

Defined in: [packages/core/src/core/container/ContainerManager.ts:66](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerManager.ts#L66)

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

Defined in: [packages/core/src/core/container/ContainerManager.ts:31](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerManager.ts#L31)

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

Defined in: [packages/core/src/core/container/ContainerManager.ts:45](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerManager.ts#L45)

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

Defined in: [packages/core/src/core/container/ContainerManager.ts:59](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerManager.ts#L59)

Get the container name

###### Returns

`string`

##### getRawContainer()

```ts
getRawContainer(): Container;
```

Defined in: [packages/core/src/core/container/ContainerManager.ts:52](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerManager.ts#L52)

Get the underlying Inversify container

###### Returns

`Container`

##### isBound()

```ts
isBound(serviceIdentifier): boolean;
```

Defined in: [packages/core/src/core/container/ContainerManager.ts:38](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerManager.ts#L38)

Check if a service is bound

###### Parameters

###### serviceIdentifier

[`ServiceIdentifier`](#serviceidentifier)

###### Returns

`boolean`

## Interfaces

### CockroachDBOptions

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:76](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L76)

Options for CockroachDB connection

#### Properties

##### connection

```ts
connection: CockroachUrl | CockroachConnection;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:77](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L77)

##### entities

```ts
entities: any[];
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:78](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L78)

##### logging?

```ts
optional logging: boolean;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:80](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L80)

##### synchronize?

```ts
optional synchronize: boolean;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:79](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L79)

***

### CoreOptions

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:48](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L48)

Options for core module

#### Properties

##### loggerName?

```ts
optional loggerName: string;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:50](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L50)

Logger name (default: 'server')

##### logLevel?

```ts
optional logLevel: "error" | "debug" | "info" | "warn";
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:52](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L52)

Log level (default: 'debug')

***

### MongoDBOptions

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:58](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L58)

Options for MongoDB connection

#### Properties

##### databaseName

```ts
databaseName: string;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:60](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L60)

##### uri

```ts
uri: string;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:59](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L59)

***

### PostgresOptions

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:66](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L66)

Options for Postgres connection

#### Properties

##### connection

```ts
connection: PostgresUrl | PostgresConnection;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:67](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L67)

##### entities

```ts
entities: any[];
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:68](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L68)

##### logging?

```ts
optional logging: boolean;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:70](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L70)

##### synchronize?

```ts
optional synchronize: boolean;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:69](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L69)

## Type Aliases

### ContainerModule()

```ts
type ContainerModule = (builder) => void;
```

Defined in: [packages/core/src/core/container/ContainerBuilder.ts:100](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerBuilder.ts#L100)

Container module function type

#### Parameters

##### builder

[`ContainerBuilder`](#containerbuilder)

#### Returns

`void`

***

### ServiceIdentifier

```ts
type ServiceIdentifier<TInstance> = 
  | string
  | symbol
  | Newable<TInstance>
| AbstractNewable<TInstance>;
```

Defined in: [packages/core/src/core/container/types.ts:8](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/types.ts#L8)

Service identifier for dependency injection.
Can be a string, symbol, constructor, or abstract constructor.

#### Type Parameters

##### TInstance

`TInstance` = `unknown`

The type of the service instance

## Variables

### ContainerRegistry

```ts
const ContainerRegistry: ContainerRegistryImpl;
```

Defined in: [packages/core/src/core/container/ContainerRegistry.ts:104](https://github.com/theunionsquare/mangojs/blob/4b0458d43634a697002622d66f118a4ece581361/packages/core/src/core/container/ContainerRegistry.ts#L104)

Singleton instance
