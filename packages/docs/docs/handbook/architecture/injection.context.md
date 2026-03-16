---
sidebar_label: "Dependency Injection"
---

# MangoJS Dependency Injection Configuration

## Overview

MangoJS uses **Inversify** for dependency injection. All dependencies are registered in the core component `src/core/container/index.ts` and extended on file `src/inversify.config.ts`.

**Key Benefits:**

- **Testability**: Replace implementations with mocks
- **Flexibility**: Switch databases by changing one binding
- **Maintainability**: Services declare dependencies via `@inject()`
- **Type Safety**: Full TypeScript support

---

## Basic Configuration

**Injection Tokens** (`INVERSITY_TYPES`):

- `PersistenceContext` - Transaction management
- `DatabaseManagerFactory` - Database connections
- `AuthorizationContext` - Authentication
- `LoggerFactory` - Logging
- `ApplicationPreCheck` - Startup validation
- `EmailService` - Email operations

---

## Injectable Components

### Database Manager Factories

| Implementation                  | Database    | Use Case                         |
| ------------------------------- | ----------- | -------------------------------- |
| `CockRoachDBManagerFactory`     | CockroachDB | Production PostgreSQL-compatible |
| `PostgresDBManagerFactory`      | PostgreSQL  | Standard PostgreSQL              |
| `MongooseDBManagerFactory`      | MongoDB     | MongoDB with Mongoose            |
| `MongoDBEntityManagerFactory`   | MongoDB     | MongoDB with TypeORM             |
| `EmbeddedMongoDBManagerFactory` | MongoDB     | Testing in-memory                |
| `DummyDBManagerFactory`         | None        | Testing without DB               |

**Configuration**: `{ url: string }, entities: Entity[]`

```typescript
serviceContainer
  .bind<DatabaseManager.IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
  .toConstantValue(
    new DatabaseManager.PostgresDBManagerFactory(
      { url: "postgresql://localhost:5432/db" },
      [User, Post],
    ),
  );
```

### Persistence Contexts

| Implementation                 | Database    | Use Case                 |
| ------------------------------ | ----------- | ------------------------ |
| `CockroachPersistenceContext` | CockroachDB | CockroachDB transactions |
| `PostgresPersistenceContext`  | PostgreSQL  | PostgreSQL transactions  |
| `MongoosePersistenceContext`   | MongoDB     | MongoDB sessions         |
| `DummyPersistenceContext`      | None        | Testing                  |

**Important**: Match with database manager:

```
CockRoachDBManagerFactory → CockroachPersistenceContext
PostgresDBManagerFactory  → PostgresPersistenceContext
MongooseDBManagerFactory  → MongoosePersistenceContext
```

```typescript
serviceContainer
  .bind<Persistence.IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
  .to(Persistence.PostgresPersistenceContext);
```

### Authentication Validators

**RemoteAuthValidator**: Validate against IAM microservice

```typescript
serviceContainer
  .bind<Authentication.IAuthValidator>(INVERSITY_TYPES.AuthorizationContext)
  .toConstantValue(
    new Authentication.RemoteAuthValidator("http://iam-service.internal", 3031),
  );
```

**Custom**: Implement `IAuthValidator` interface

```typescript
class CustomAuthValidator implements Authentication.IAuthValidator {
  async validate(token: string): Promise<boolean> {
    // Custom logic
    return true;
  }
}
```

**Reference**: See `src/services/iam_server/src/services/authorizationService.ts` for JWT-based implementation.

### Logger Factories

```typescript
serviceContainer
  .bind<Loggers.ILoggerFactory>(INVERSITY_TYPES.LoggerFactory)
  .toConstantValue(new Loggers.LoggerPino("my-service", "debug"));
```

### Application Pre-Checks

```typescript
@injectable()
class ApplicationPreCheck implements IApplicationPreCheck {
  async check(): Promise<boolean> {
    // Validate database, env vars, etc.
    return true;
  }
}

serviceContainer
  .bind<IApplicationPreCheck>(INVERSITY_TYPES.ApplicationPreCheck)
  .to(ApplicationPreCheck);
```

---

## Usage in Services

See [Service Layer Guide](../service/overview.context.md) for complete injection patterns.

---

## Usage in Controllers

See [Controller Layer Guide](../controller/overview.context.md) for service resolution patterns.

---

## Configuration Example

```typescript
import {
  Container,
  Loggers,
  INVERSITY_TYPES,
  DatabaseManager,
  Persistence,
  Authentication,
} from "@theunionsquare/mangojs-core";

const containerManager = Container.getContainer();
const serviceContainer = containerManager.getContainer();

serviceContainer
  .bind<Loggers.ILoggerFactory>(INVERSITY_TYPES.LoggerFactory)
  .toConstantValue(new Loggers.LoggerPino("dev-service", "debug"));

serviceContainer
  .bind<DatabaseManager.IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
  .toConstantValue(
    new DatabaseManager.PostgresDBManagerFactory(
      { url: "postgresql://localhost:5432/dev_db" },
      [User, Post, Comment],
    ),
  );

serviceContainer
  .bind<Persistence.IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
  .to(Persistence.PostgresPersistenceContext);

serviceContainer
  .bind<Authentication.IAuthValidator>(INVERSITY_TYPES.AuthorizationContext)
  .toConstantValue(new Authentication.RemoteAuthValidator("http://localhost", 3031));

export { serviceContainer };
```

---

## Testing Checklist

- [ ] Select the rigth Database Manager
- [ ] Match persistence context with database manager
