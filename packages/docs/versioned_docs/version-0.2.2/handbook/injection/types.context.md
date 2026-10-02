---
sidebar_label: "Injectable Types"
---

# Injectable Components Reference

This document lists all injectable components available in MangoJS.

---

## Database Manager Factories

Implementations of `IDatabaseManagerFactory` for different databases.

| Implementation | Database | Use Case |
|----------------|----------|----------|
| `PostgresDBManagerFactory` | PostgreSQL | Standard PostgreSQL |
| `CockRoachDBManagerFactory` | CockroachDB | PostgreSQL-compatible distributed DB |
| `MongooseDBManagerFactory` | MongoDB | MongoDB with Mongoose (deprecated) |
| `MongoDBEntityManagerFactory` | MongoDB | MongoDB with TypeORM |
| `EmbeddedMongoDBManagerFactory` | MongoDB | Testing in-memory |
| `DummyDBManagerFactory` | None | Testing without DB |

**Constructor Parameters:**

```typescript
// PostgreSQL / CockroachDB
new PostgresDBManagerFactory(
  connection: { url: string } | { host, port, username, password, database },
  entities: Entity[],
  synchronize?: boolean,  // default: true
  logging?: boolean       // default: false
)

// MongoDB
new MongooseDBManagerFactory(
  mongoURI: string,
  databaseName: string,
  loggerFactory: ILoggerFactory
)
```

---

## Persistence Contexts

Implementations of `IPersistenceContext` for transaction management.

| Implementation | Database | Use Case |
|----------------|----------|----------|
| `PostgresPersistenceContext` | PostgreSQL | PostgreSQL transactions |
| `CockroachPersistenceContext` | CockroachDB | CockroachDB transactions |
| `MongoosePersistenceContext` | MongoDB | MongoDB sessions |
| `DummyPersistenceContext` | None | Testing |

**Matching Rules:**

| Database Manager | Persistence Context |
|------------------|---------------------|
| `PostgresDBManagerFactory` | `PostgresPersistenceContext` |
| `CockRoachDBManagerFactory` | `CockroachPersistenceContext` |
| `MongooseDBManagerFactory` | `MongoosePersistenceContext` |
| `DummyDBManagerFactory` | `DummyPersistenceContext` |

---

## Logger Factory

```typescript
new LoggerPino(name: string, level: "debug" | "info" | "warn" | "error")
```

**Interface:** `ILoggerFactory`

---

## Authentication

### Auth Strategies

Implement `IAuthStrategy` interface:

```typescript
interface IAuthStrategy {
  readonly name: string;
  readonly priority: number;  // lower = higher priority
  authenticate(req: Request): Promise<IAuthUser | null>;
  generateToken?(payload, options?): Promise<AuthCredentials>;
  verifyToken?(token: string): Promise<IAuthUser | null>;
  revokeToken?(token: string): Promise<boolean>;
  canHandle?(req: Request): boolean;
}
```

**Built-in:** `JWTStrategy`

**Binding:** Use `AUTH_STRATEGY_TAG` for multi-inject pattern.

### Auth Strategy Registry

Collects all strategies via `@multiInject(AUTH_STRATEGY_TAG)`.

---

## Application Pre-Check

```typescript
interface IApplicationPreCheck {
  check(): Promise<boolean>;
}
```

Used to validate environment, database connectivity, etc. before server starts.

---

## Accessing Services

Use `ContainerRegistry` to access containers, then call instance methods:

```typescript
import { Container, INVERSITY_TYPES, Loggers } from "@theunionsquare/mangojs-core";

// Get service from default container
const container = Container.ContainerRegistry.getDefault();
const logger = container.get<Loggers.ILoggerFactory>(
  INVERSITY_TYPES.LoggerFactory
);

// Check if bound
if (container.isBound(INVERSITY_TYPES.PersistenceContext)) {
  const persistence = container.get<IPersistenceContext>(
    INVERSITY_TYPES.PersistenceContext
  );
}

// Get from named container
const testContainer = Container.ContainerRegistry.getByName("test");
const testLogger = testContainer.get<Loggers.ILoggerFactory>(
  INVERSITY_TYPES.LoggerFactory
);
```

---

## Manual Binding Example

For advanced cases without ContainerBuilder presets:

```typescript
import { Container, Loggers, INVERSITY_TYPES, DatabaseManager, Persistence } from "@theunionsquare/mangojs-core";

// Create builder and bind manually
Container.ContainerBuilder.create()
  // Logger
  .bind(INVERSITY_TYPES.LoggerFactory)
    .toValue(new Loggers.LoggerPino("my-service", "debug"))

  // Database
  .bind(INVERSITY_TYPES.DatabaseManagerFactory)
    .toValue(
      new DatabaseManager.PostgresDBManagerFactory(
        { url: "postgresql://localhost:5432/db" },
        [User, Post]
      )
    )

  // Persistence
  .bind(INVERSITY_TYPES.PersistenceContext)
    .to(Persistence.PostgresPersistenceContext)

  .build();
```

---

## See Also

- [Dependency Injection Overview](./index.context.md)
- [Container Builder](./container-builder.context.md)
