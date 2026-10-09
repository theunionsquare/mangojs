---
sidebar_label: "Examples"
---

# Database Examples

## Complete User Entity

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from "typeorm";
import { Post } from "./Post";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ name: "email", type: "varchar", length: 255 })
  @Index()
  email: string;

  @Column({ name: "name", type: "varchar", length: 255 })
  name: string;

  @Column({ name: "password_hash", type: "varchar", length: 255 })
  passwordHash: string;

  @Column({
    name: "status",
    type: "enum",
    enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
    default: "ACTIVE",
  })
  status: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
```

---

## Shop Entity with Relationships

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Partner } from "./Partner";
import { ShopWorkingHours } from "./ShopWorkingHours";

@Entity("shops")
export class Shop {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ name: "partner_uid", type: "uuid" })
  @Index()
  partnerUid: string;

  @Column({ name: "shop_name", type: "varchar", length: 255 })
  shopName: string;

  @Column({ name: "description", type: "text", nullable: true })
  description?: string;

  @Column({ name: "address", type: "varchar", length: 500, nullable: true })
  address?: string;

  @Column({ name: "latitude", type: "decimal", precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column({ name: "longitude", type: "decimal", precision: 11, scale: 8, nullable: true })
  longitude?: number;

  @Column({
    name: "status",
    type: "enum",
    enum: ["ACTIVE", "INACTIVE", "PENDING"],
    default: "PENDING",
  })
  status: string;

  @ManyToOne(() => Partner, (partner) => partner.shops)
  partner: Partner;

  @OneToMany(() => ShopWorkingHours, (wh) => wh.shop)
  workingHours: ShopWorkingHours[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
```

---

## Working Hours Entity

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from "typeorm";
import { Shop } from "./Shop";

@Entity("shop_working_hours")
@Index(["shopUid", "dayOfWeek"])
export class ShopWorkingHours {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ name: "shop_uid", type: "uuid" })
  shopUid: string;

  @Column({ name: "day_of_week", type: "int" }) // 0 = Sunday, 6 = Saturday
  dayOfWeek: number;

  @Column({ name: "start_time", type: "time" })
  startTime: string;

  @Column({ name: "end_time", type: "time" })
  endTime: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @ManyToOne(() => Shop, (shop) => shop.workingHours)
  shop: Shop;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
```

---

## Entity Export

**File**: `src/db/models/index.ts`

```typescript
export { User } from "./User";
export { Partner } from "./Partner";
export { Shop } from "./Shop";
export { ShopWorkingHours } from "./ShopWorkingHours";
```

---

## Best Practices

- Always add UUID as primary key for security and distributed systems
- Add `@Index()` for frequently queried fields
- Use singular words for entity names (User, not Users)
- Use snake_case for database columns
- Use camelCase for entity properties
- Avoid business logic in entities - keep them as pure data models
- Create TypeORM migrations once all entities have been created

## Related

- [Entities](./entities.context.md) - Entity decorators
- [Relationships](./relationships.context.md) - Relationship patterns
- [Migrations](./migrations.context.md) - Database migrations
