---
sidebar_label: "Dependency Injection"
---

# MangoJS Dependency Injection

## Overview

MangoJS uses **Inversify** for dependency injection. The framework provides:

- **ContainerBuilder** - Fluent API for configuring containers
- **ContainerRegistry** - Global registry for accessing named containers
- **ContainerManager** - Wrapper for a single container instance

**Key Benefits:**

- **Testability**: Replace implementations with mocks
- **Flexibility**: Switch databases by changing one binding
- **Maintainability**: Services declare dependencies via `@inject()`
- **Type Safety**: Full TypeScript support
- **Multiple Containers**: Named containers for different contexts

---

## Quick Start

```typescript
import { Container, INVERSITY_TYPES, Loggers } from "@theunionsquare/mangojs-core";
import { JWTStrategy } from "./auth/JWTStrategy";
import { User, Order } from "./entities";

// Build and register the default container
Container.ContainerBuilder.create()
  .withCore({ loggerName: "my-app", logLevel: "info" })
  .withPostgres({
    connection: { url: process.env.DATABASE_URL },
    entities: [User, Order],
  })
  .withAuth([JWTStrategy])
  .build();

// Access services via ContainerRegistry
const logger = Container.ContainerRegistry.getDefault()
  .get<Loggers.ILoggerFactory>(INVERSITY_TYPES.LoggerFactory);
```

---

## Architecture

```
ContainerBuilder              ContainerRegistry              ContainerManager
     │                              │                              │
     │ .create()                    │                              │
     │ .withCore()                  │                              │
     │ .withPostgres()              │                              │
     │ .build() ─────────────────►  register()                     │
     │                              │                              │
     │                        stores named                   instance methods:
     │                        containers                       get<T>()
     │                              │                           isBound()
     │                        getDefault() ──────────────────► getAll()
     │                        getByName()                      getRawContainer()
     │                        has()                            getName()
     │                        listContainers()                 createChild()
     │                        reset()
```

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [Container Builder](./container-builder.context.md) | Full ContainerBuilder API and usage |
| [Injectable Types](./types.context.md) | Available injectable components |
| [Service Layer](../service/index.context.md) | Using DI in services |
| [Controller Layer](../controller/index.context.md) | Service resolution in controllers |

---

## Injection Tokens

All tokens are defined in `INVERSITY_TYPES`:

| Token | Purpose |
|-------|---------|
| `PersistenceContext` | Transaction management |
| `DatabaseManagerFactory` | Database connections |
| `LoggerFactory` | Logging |
| `AuthStrategyRegistry` | Authentication strategies |
| `ApplicationPreCheck` | Startup validation |
| `EmailServiceFactory` | Email operations |
| `ScheduleRegistry` | Scheduled tasks |
| `QueueClient` | Queue connections |
| `QueueManager` | Queue management |
