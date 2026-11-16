---
sidebar_label: "Migrations"
---

# Database Migrations

TypeORM migrations track database schema changes over time. Create migrations after defining or modifying entities.

## Generate Migration

After creating or modifying entities:

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

---

## Run Migrations

```bash
# Run pending migrations
npm run typeorm migration:run

# Revert last migration
npm run typeorm migration:revert
```

---

## Migration Best Practices

| Do | Don't |
|----|-------|
| ✅ Generate migrations for all schema changes | ❌ Manually edit entities in production |
| ✅ Review generated SQL before running | ❌ Modify migrations after production run |
| ✅ Test migrations on development first | ❌ Skip `down()` method |
| ✅ Include both `up()` and `down()` methods | ❌ Run untested migrations in production |

---

## Development Checklist

- [ ] Migration generated with `typeorm migration:generate`
- [ ] Migration SQL reviewed for correctness
- [ ] Migration tested on development database
- [ ] Migration includes both `up()` and `down()` methods
- [ ] No manual entity changes in production

## Related

- [Entities](./entities.context.md) - Entity decorators
- [Relationships](./relationships.context.md) - Entity relationships
