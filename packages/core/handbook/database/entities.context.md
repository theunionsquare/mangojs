---
sidebar_label: "Entities"
---

# Entity Decorators

## @Entity(tableName)

Marks a class as a database table.

```typescript
@Entity("users") // ← Table name in database
export class User {}
```

---

## @PrimaryGeneratedColumn(type)

Auto-generated primary key. Always prefer UUID.

```typescript
// UUID (recommended for distributed systems)
@PrimaryGeneratedColumn("uuid")
uid: string;

// Auto-increment integer
@PrimaryGeneratedColumn("increment")
id: number;

// BigInt (for large tables)
@PrimaryGeneratedColumn("increment", { type: "bigint" })
id: string;  // Note: bigint is string in TypeScript
```

---

## @Column(options)

Define a table column.

```typescript
@Column({ name: "name", type: "varchar", length: 255 })
name: string;

@Column({ name: "description", type: "text", nullable: true })
description?: string;

@Column({ name: "view_count", type: "int", default: 0 })
viewCount: number;
```

---

## Common Column Types

### String

```typescript
@Column({ name: "name", type: "varchar", length: 255 })
name: string;

@Column({ name: "description", type: "text" })
description: string;
```

### Number

```typescript
@Column({ name: "count", type: "int" })
count: number;
```

### Boolean

```typescript
@Column({ name: "is_active", type: "boolean", default: false })
isActive: boolean;
```

### Date/Time

```typescript
@Column({ name: "created_at", type: "timestamp" })
createdAt: Date;
```

### Enum

```typescript
@Column({
  name: "status",
  type: "enum",
  enum: ["ACTIVE", "INACTIVE"],
  default: "ACTIVE"
})
status: string;
```

### Nullable

```typescript
@Column({ name: "optional_field", nullable: true })
optionalField?: string;
```

---

## @CreateDateColumn / @UpdateDateColumn

Auto-managed timestamps.

```typescript
@CreateDateColumn({ name: "created_at" })  // ← Set on insert
createdAt: Date;

@UpdateDateColumn({ name: "updated_at" })  // ← Updated on every update
updatedAt: Date;
```

---

## @Index()

Create database index for performance.

```typescript
// Single column index
@Column({ name: "email" })
@Index()
email: string;

// Composite index (at entity level)
@Entity("posts")
@Index(["userId", "postId"])
export class Post {
  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "post_id" })
  postId: string;
}
```

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Entity property | camelCase | `firstName`, `createdAt` |
| Database column | snake_case | `first_name`, `created_at` |
| Table name | snake_case plural | `users`, `shop_working_hours` |

---

## Development Checklist

- [ ] Entity uses `@Entity("table_name")` decorator
- [ ] Primary key uses `@PrimaryGeneratedColumn("uuid")`
- [ ] All columns have `@Column()` with appropriate types
- [ ] Timestamps use `@CreateDateColumn()` and `@UpdateDateColumn()`
- [ ] Frequently queried fields have `@Index()` decorator
- [ ] Entity exported from `src/db/models/index.ts`
- [ ] Use camelCase for entity properties
- [ ] Use snake_case for database column names

## Related

- [Relationships](./relationships.context.md) - Entity relationships
- [Migrations](./migrations.context.md) - Database migrations
