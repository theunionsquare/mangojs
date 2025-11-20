# Database Layer Guide

## Overview

The Database Layer defines your application's **domain models** using TypeORM entities. This is the **core/innermost layer** in MangoJS onion architecture - it has no dependencies on other layers.

**Purpose**: Map database tables to TypeScript classes with type safety

**Location**: `src/db/models/`

**Key Principle**: Entities are pure domain objects with no business logic (no methods for calculations, validations, or transformations - these belong in services)

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Entity Decorators](#entity-decorators)
3. [Column Types](#column-types)
4. [Relationships](#relationships)
5. [Database Migrations](#database-migrations)
6. [Development Checklist](#development-checklist)
7. [Best Practices](#best-practices)

---

## Quick Start

> **💡 Tip:** See [Code Templates](../common/code-templates.context.md#entity-template) for entity boilerplate. For a complete walkthrough, see [Quick Start Tutorial](../quick-start-tutorial.context.md).

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

  @Column({ type: "varchar", length: 255 })
  @Index()
  email: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({
    type: "enum",
    enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
    default: "ACTIVE",
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
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

---

## Entity Decorators

### @Entity(tableName)

Marks a class as a database table.

```typescript
@Entity("users") // ← Table name in database
export class User {}
```

### @PrimaryGeneratedColumn(type)

Auto-generated primary key. Always prefer the UUID.

```typescript
// UUID (recommended for distributed systems)
@PrimaryGeneratedColumn("uuid")
id: string;

// Auto-increment integer
@PrimaryGeneratedColumn("increment")
id: number;

// BigInt (for large tables)
@PrimaryGeneratedColumn("increment", { type: "bigint" })
id: string;  // Note: bigint is string in TypeScript
```

### @Column(options)

Define a table column.

```typescript
@Column({ type: "varchar", length: 255 })
name: string;

@Column({ type: "text", nullable: true })
description?: string;

@Column({ type: "int", default: 0 })
viewCount: number;
```

#### Common Column Types

```typescript
// String
@Column({ type: "varchar", length: 255 })
name: string;

@Column({ type: "text" })
description: string;

// Number
@Column({ type: "int" })
count: number;

// Boolean
@Column({ type: "boolean", default: false })
isActive: boolean;

// Date/Time
@Column({ type: "timestamp" })
createdAt: Date;

// Enum
@Column({
  type: "enum",
  enum: ["ACTIVE", "INACTIVE"],
  default: "ACTIVE"
})
status: string;

// Nullable
@Column({ nullable: true })
optionalField?: string;
```

---

### @CreateDateColumn() / @UpdateDateColumn()

Auto-managed timestamps.

```typescript
@CreateDateColumn()  // ← Set on insert
createdAt: Date;

@UpdateDateColumn()  // ← Updated on every update
updatedAt: Date;
```

### @Index()

Create database index for performance.

```typescript
// Single column index
@Column()
@Index()             // ← Index this column
email: string;

// Composite index (multiple columns) - applied at entity level
@Entity("posts")
@Index(["userId", "postId"])  // ← Composite index
export class Post {
  @Column()
  userId: string;

  @Column()
  postId: string;
}
```

---

## Relationships

### @OneToMany / @ManyToOne

One-to-many relationship (e.g., User has many Posts).

```typescript
// User.ts
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}

// Post.ts
@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
```

### @ManyToMany

Many-to-many relationship (e.g., Posts have many Tags).

```typescript
// Post.ts
@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];
}

// Tag.ts
@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
```

---

## Database Migrations

TypeORM migrations track database schema changes over time. Create migrations after defining or modifying entities.

### Generate Migration

After creating or modifying entities, generate a migration:

```bash
npm run typeorm migration:generate -- -n CreateUserTable
```

This creates a file like `src/migrations/1699123456789-CreateUserTable.ts`:

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1699123456789 implements MigrationInterface {
  name = "CreateUserTable1699123456789";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "uid" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "email" varchar(255) NOT NULL,
        "name" varchar(255) NOT NULL,
        "password_hash" varchar(255) NOT NULL,
        "status" varchar DEFAULT 'ACTIVE',
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now()
      )
    `);
    await queryRunner.query(`CREATE INDEX "IDX_email" ON "users" ("email")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_email"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
```

### Run Migrations

```bash
# Run pending migrations
npm run typeorm migration:run

# Revert last migration
npm run typeorm migration:revert
```

### Migration Best Practices

- ✅ Generate migrations for all schema changes
- ✅ Review generated SQL before running
- ✅ Test migrations on development database first
- ✅ Never modify migrations after they've been run in production
- ✅ Include both `up()` and `down()` methods for rollback capability
- ❌ Don't manually edit entity files in production - use migrations

---

## Development Checklist

Use this checklist when creating or modifying the database layer:

**Entity Definition**

- [ ] Entity uses `@Entity("table_name")` decorator
- [ ] Primary key uses `@PrimaryGeneratedColumn("uuid")`
- [ ] All columns have `@Column()` with appropriate types
- [ ] Timestamps use `@CreateDateColumn()` and `@UpdateDateColumn()`
- [ ] Frequently queried fields have `@Index()` decorator
- [ ] Entity exported from `src/db/models/index.ts`

**Relationships**

- [ ] One-to-many relationships use `@OneToMany()` and `@ManyToOne()`
- [ ] Many-to-many relationships use `@ManyToMany()`
- [ ] Foreign key columns defined where needed
- [ ] Relationship directions are correct (parent → child)

**Registration**

- [ ] Entity registered in `inversify.config.ts` DatabaseManagerFactory
- [ ] Entity imported in files where needed

**Migrations**

- [ ] Migration generated with `typeorm migration:generate`
- [ ] Migration SQL reviewed for correctness
- [ ] Migration tested on development database
- [ ] Migration includes both `up()` and `down()` methods

**Documentation**

- [ ] Complex relationships documented with comments
- [ ] Enum values documented if not self-explanatory

---

## Best Practices

- Always add uuid as primary key for security and distributed systems
- Add @Index when needed for frequently queried fields
- Entity naming conventions: Use singular words (User, not Users)
- Create TypeORM migration once all entities have been created
- Avoid business logic in entities - keep them as pure data models
