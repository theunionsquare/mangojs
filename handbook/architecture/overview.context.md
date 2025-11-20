# MangoJS Architecture Overview

## Purpose

MangoJS is a **lightweight TypeScript framework** for building microservices using **dependency injection** and **onion architecture** principles.

### Core Goals

1. **Rapid Development**: AI-assisted patterns for fast service creation
2. **Type Safety**: Full TypeScript with strict type checking
3. **Loose Coupling**: Dependency injection for testable, modular code
4. **Database Agnostic**: Switch databases without changing business logic
5. **Decorator-Driven**: Clean, declarative Express routing

---

## Onion Architecture

MangoJS follows the **Onion Architecture** pattern with three main layers. Dependencies flow **inward only**.

```
┌─────────────────────────────────────┐
│   Controller Layer (Outer)          │  ← HTTP/API requests
│   • @Controller(), @Get(), @Post()  │
│   • Request/Response handling       │
│   • Call services                   │
└──────────────┬──────────────────────┘
               │ depends on
┌──────────────▼──────────────────────┐
│   Service Layer (Middle)            │  ← Business Logic
│   • @injectable() classes           │
│   • Validation & business rules     │
│   • Transaction orchestration       │
└──────────────┬──────────────────────┘
               │ depends on
┌──────────────▼──────────────────────┐
│   Database Layer (Core)             │  ← Data Models
│   • @Entity() declarations          │
│   • TypeORM relationships           │
│   • Pure domain objects             │
└─────────────────────────────────────┘
```

**Dependency Rule**: Outer layers depend on inner layers, never the reverse.

---

## Layer Responsibilities

### Controller Layer (HTTP/API)

**Purpose**: Handle HTTP requests and route to services

**Location**: `src/routes/v1/`

**Key Pattern**:

- MangoJS decorators for routing

**📚 Full Documentation**: [../controller/](../controller/)

---

### Service Layer (Business Logic)

**Purpose**: Implement business logic and orchestrate data operations

**Location**: `src/services/`

**Key Pattern**:

- Dependency injection with database transactions
- Automatic rollback on exceptions
- Focus on business logic

**📚 Full Documentation**: [../service/](../service/)

---

### Database Layer (Data Models)

**Purpose**: Define database schema using TypeORM

**Location**: `src/db/models/`

**Key Pattern**:

- TypeORM entity decorators
- Database Migration

**📚 Full Documentation**: [../database/overview.context.md](../database/overview.context.md)

---

## Key Concepts

MangoJS uses three core patterns throughout the framework:

- **Decorators**: See [decorators.context.md](./decorators.context.md) for complete reference
- **Dependency Injection**: See [injection.context.md](./injection.context.md) for configuration patterns
- **Type Organization**: See [type.context.md](./type.context.md) for type structure
