---
sidebar_label: "Overview"
---

# Database Layer Guide

## Overview

The Database Layer defines your application's **domain models** using TypeORM entities. This is the **core/innermost layer** in MangoJS onion architecture - it has no dependencies on other layers.

**Purpose**: Map database tables to TypeScript classes with type safety

**Location**: `services/{service-name}/src/db/models/`

**Key Principle**: Entities are pure domain objects with no business logic (no methods for calculations, validations, or transformations - these belong in services).

## Documentation

| Document                                        | Description                                      |
| ----------------------------------------------- | ------------------------------------------------ |
| [Entities](./entities.context.md)               | Entity decorators, `@Entity`, `@Column`, `@Index` |
| [Relationships](./relationships.context.md)    | `@OneToMany`, `@ManyToOne`, `@ManyToMany`        |
| [Migrations](./migrations.context.md)           | TypeORM migrations, generate, run                |
| [Examples](./examples.context.md)               | Complete entity examples                         |

## Quick Start

### Step 1: Create Entity File

**File**: `src/db/models/User.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ name: "email", type: "varchar", length: 255 })
  @Index()
  email: string;

  @Column({ name: "name", type: "varchar", length: 255 })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
```

### Step 2: Export Entity

**File**: `src/db/models/index.ts`

```typescript
export { User } from "./User";
```

### Step 3: Register in Database Manager

**File**: `src/inversify.config.ts`

```typescript
import { User } from "./db/models";

serviceContainer
  .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
  .toConstantValue(
    new databasemanager.cockroach.CockRoachDBManagerFactory(
      { url: process.env.DATABASE_URL },
      [User] // ← Register entities
    )
  );
```

## Related

- [Service Layer](../service/index.context.md) - Business logic layer
- [Onion Architecture](../architecture/onion-architecture.context.md) - Layer dependencies
