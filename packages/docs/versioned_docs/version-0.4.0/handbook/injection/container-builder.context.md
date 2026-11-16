---
sidebar_label: "Container Builder"
---

# ContainerBuilder

Fluent API for configuring dependency injection containers with framework presets and custom bindings.

---

## Creating Containers

### Default Container

When no name is provided, the container automatically becomes the default:

```typescript
import { Container } from "@theunionsquare/mangojs-core";

Container.ContainerBuilder.create()
  .withCore()
  .withPostgres({ connection: { url: DATABASE_URL }, entities: [User] })
  .build();

// Access from anywhere via ContainerRegistry
Container.ContainerRegistry.getDefault().get<UserService>(TYPES.UserService);
```

### Named Containers

Create named containers for different contexts (testing, microservices, etc.):

```typescript
// Named container (NOT default)
Container.ContainerBuilder.create("test")
  .withCore()
  .withDummyDB()
  .build();

// Access by name
const testContainer = Container.ContainerRegistry.getByName("test");
testContainer.get<UserService>(TYPES.UserService);
```

### Named Container as Default

Make a named container the default with `setAsDefault()`:

```typescript
Container.ContainerBuilder.create("production")
  .withCore()
  .withPostgres({ connection: { url: PROD_DB_URL }, entities: [User] })
  .setAsDefault()
  .build();
```

---

## ContainerRegistry API

Global registry for managing multiple named containers:

```typescript
import { ContainerRegistry } from "@theunionsquare/mangojs-core";

// Get default container
const container = ContainerRegistry.getDefault();

// Get named container
const testContainer = ContainerRegistry.getByName("test");

// Check existence
ContainerRegistry.has("test");
ContainerRegistry.hasDefault();

// List all containers
ContainerRegistry.listContainers();

// Reset all containers (for testing)
ContainerRegistry.reset();
```

---

## ContainerManager API

Instance methods for working with a single container:

```typescript
const container = ContainerRegistry.getDefault();

// Get service
container.get<UserService>(TYPES.UserService);

// Get with options
container.get<UserService>(TYPES.UserService, { optional: true });

// Check if bound
container.isBound(TYPES.UserService);

// Get all (multi-inject)
container.getAll<IAuthStrategy>(AUTH_STRATEGY_TAG);

// Get raw Inversify container
container.getRawContainer();

// Get container name
container.getName();

// Create child container
const child = container.createChild("request-scoped");
```

---

## Framework Presets

### `withCore(options?)`

Binds logger factory.

```typescript
.withCore()  // defaults: loggerName="server", logLevel="debug"

.withCore({ loggerName: "my-app", logLevel: "info" })
```

**Options:**
- `loggerName?: string` - Logger name (default: "server")
- `logLevel?: "debug" | "info" | "warn" | "error"` - Log level (default: "debug")

---

### `withPostgres(options)`

Binds PostgreSQL database manager and persistence context.

```typescript
.withPostgres({
  connection: { url: "postgresql://user:pass@host:5432/db" },
  entities: [User, Order],
  synchronize: true,   // optional, default: true
  logging: false       // optional, default: false
})

// Or with connection object
.withPostgres({
  connection: {
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "secret",
    database: "mydb"
  },
  entities: [User, Order]
})
```

---

### `withCockroachDB(options)`

Binds CockroachDB database manager and persistence context.

```typescript
.withCockroachDB({
  connection: { url: "postgresql://user:pass@host:26257/db" },
  entities: [User, Order]
})
```

---

### `withMongoDB(options)`

**Deprecated.** Binds MongoDB with Mongoose.

```typescript
.withMongoDB({
  uri: "mongodb://localhost:27017",
  databaseName: "mydb"
})
```

---

### `withDummyDB()`

Binds dummy database for testing.

```typescript
.withDummyDB()
```

---

### `withAuth(strategies)`

Binds authentication strategies and registry.

```typescript
import { JWTStrategy } from "./auth/JWTStrategy";
import { ApiKeyStrategy } from "./auth/ApiKeyStrategy";

.withAuth([JWTStrategy, ApiKeyStrategy])
```

This:
1. Binds each strategy to `AUTH_STRATEGY_TAG` (for multi-inject)
2. Binds `AuthStrategyRegistry` that collects all strategies

---

### `withQueueClient(options)`

Binds QueueClient for BullMQ/Redis job queues.

```typescript
.withQueueClient({
  host: 'localhost',
  port: 6379,
  password: 'secret',
  db: 0
})
```

**Options:**
- `host?: string` - Redis host (default: "localhost")
- `port?: number` - Redis port (default: 6379)
- `password?: string` - Redis password
- `db?: number` - Redis database number

---

## Generic Bindings

### `bind(identifier)`

Start a binding chain.

```typescript
const APP_TYPES = {
  UserService: Symbol("UserService"),
  Config: Symbol("Config"),
};

.bind(APP_TYPES.UserService).to(UserService)           // class
.bind(APP_TYPES.Config).toValue(configObject)          // constant
.bind(APP_TYPES.Factory).toFactory(() => new MyClass()) // factory
.bind(MyClass).toSelf()                                 // self-binding
```

**Scope Modifiers:**

```typescript
.bind(TYPES.Service).asSingleton().to(MyService)  // default
.bind(TYPES.Service).asTransient().to(MyService)  // new instance per request
```

---

### `bindAll(bindings)`

Bind multiple classes at once.

```typescript
.bindAll({
  [APP_TYPES.UserService]: UserService,
  [APP_TYPES.OrderService]: OrderService,
  [APP_TYPES.PaymentService]: PaymentService,
})
```

---

### `bindTagged(tag, implementation)`

Bind to a tag for multi-inject patterns.

```typescript
const NOTIFICATION_TAG = Symbol("NotificationChannel");

.bindTagged(NOTIFICATION_TAG, EmailChannel)
.bindTagged(NOTIFICATION_TAG, SlackChannel)
.bindTagged(NOTIFICATION_TAG, SMSChannel)
```

---

### `bindAllTagged(tag, implementations)`

Bind multiple implementations to a tag.

```typescript
.bindAllTagged(NOTIFICATION_TAG, [
  EmailChannel,
  SlackChannel,
  SMSChannel
])
```

---

### `useModule(module)`

Apply a reusable module function.

```typescript
// Define module
const PaymentModule: ContainerModule = (builder) => {
  builder
    .bind(TYPES.PaymentGateway).to(StripeGateway)
    .bind(TYPES.PaymentService).to(PaymentService)
    .bind(TYPES.RefundService).to(RefundService);
};

// Use it
.useModule(PaymentModule)
```

---

## Complete Example

```typescript
import { Container, INVERSITY_TYPES } from "@theunionsquare/mangojs-core";
import { JWTStrategy } from "./auth/JWTStrategy";
import { User, Order, Payment } from "./entities";

// App-specific types
const APP_TYPES = {
  UserService: Symbol("UserService"),
  OrderService: Symbol("OrderService"),
  NotificationService: Symbol("NotificationService"),
};

const NOTIFICATION_TAG = Symbol("NotificationChannel");

// Reusable module
const NotificationModule: ContainerModule = (builder) => {
  builder
    .bindAllTagged(NOTIFICATION_TAG, [EmailChannel, SlackChannel])
    .bind(APP_TYPES.NotificationService).to(NotificationService);
};

// Build default container
Container.ContainerBuilder.create()
  // Framework presets
  .withCore({ loggerName: "order-service", logLevel: "info" })
  .withPostgres({
    connection: { url: process.env.DATABASE_URL },
    entities: [User, Order, Payment],
  })
  .withAuth([JWTStrategy])
  .withQueueClient({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
  })

  // App bindings
  .bind(APP_TYPES.UserService).to(UserService)
  .bind(APP_TYPES.OrderService).to(OrderService)

  // Modules
  .useModule(NotificationModule)

  .build();

// Access services via ContainerRegistry
const userService = Container.ContainerRegistry.getDefault()
  .get<UserService>(APP_TYPES.UserService);
```

---

## Multiple Containers Example

```typescript
// Production container (default)
Container.ContainerBuilder.create()
  .withCore({ logLevel: "info" })
  .withPostgres({ connection: { url: PROD_DB_URL }, entities })
  .build();

// Test container
Container.ContainerBuilder.create("test")
  .withCore({ logLevel: "debug" })
  .withDummyDB()
  .build();

// In tests
beforeEach(() => {
  const testContainer = Container.ContainerRegistry.getByName("test");
  // use testContainer...
});

// In production code
const service = Container.ContainerRegistry.getDefault()
  .get<MyService>(TYPES.MyService);
```

---

## Child Containers

Create child containers that inherit parent bindings:

```typescript
const parent = Container.ContainerBuilder.create()
  .withCore()
  .build();

const child = Container.ContainerBuilder.create("child", parent)
  .withPostgres({ connection: { url: DB_URL }, entities: [User] })
  .build();

// Or create child from ContainerManager instance
const parentContainer = Container.ContainerRegistry.getDefault();
const childContainer = parentContainer.createChild("request-scoped");
```

---

## See Also

- [Dependency Injection Overview](./index.context.md)
- [Injectable Types Reference](./types.context.md)
