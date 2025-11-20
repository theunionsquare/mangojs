# MangoJS Code Templates

Quick reference for common code patterns. Use these as starting points for new code.

---

## Table of Contents

1. [Service Template](#service-template)
2. [Controller Template](#controller-template)
3. [Entity Template](#entity-template)
4. [Type Definitions](#type-definitions)
5. [Transaction Patterns](#transaction-patterns)

---

## Service Template

**Basic Service Structure:**

```typescript
import { injectable, inject, LazyServiceIdentifier } from "inversify";
import { EntityManager } from "typeorm";
import {
  errors,
  INVERSITY_TYPES,
  IPersistenceContext,
} from "@giusmento/mangojs-core";
import * as models from "../db/models";
import { types } from "../types";

@injectable()
export class EntityNameService {
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: IPersistenceContext;

  constructor() {}

  /**
   * Method Name - Brief description
   *
   * @param data - Parameter description
   * @returns Promise resolving to result
   * @throws {APIError} 400 BAD_REQUEST if validation fails
   * @throws {APIError} 404 NOT_FOUND if not found
   */
  public async methodName(
    data: types.entities.entityname.EntityNamePost
  ): Promise<types.entities.entityname.EntityName> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // Business logic here
        return result;
      }
    );
    return response as types.entities.entityname.EntityName;
  }
}
```

**Export from `src/services/index.ts`:**

```typescript
export { EntityNameService } from "./entityname.service";
```

---

## Controller Template

**Basic Controller Structure:**

```typescript
import { Controller, Get, Post, Put, Delete } from "@giusmento/mangojs-core";
import { Request, Response } from "express";
import { ServiceContainer } from "../../../inversify.config";
import { EntityNameService } from "../../../services";
import { types } from "../../../types";
import { errors, utils } from "@giusmento/mangojs-core";

// Resolve service OUTSIDE controller class
const entityNameService =
  ServiceContainer.get<EntityNameService>(EntityNameService);

@Controller("/api/v1/resourcename")
export class EntityNameController {
  /**
   * @swagger
   * /api/v1/resourcename:
   *   get:
   *     summary: Get all resources
   *     tags: [ResourceName]
   *     responses:
   *       200:
   *         description: List of resources
   */
  @Get("/")
  public async getAll(
    req: Request,
    res: Response<types.api.v1.resourcename.GET.ResponseBody>
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const data = await entityNameService.getAll();

      return res.status(200).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: data,
      });
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }
}
```

**Export from `src/routes/v1/index.ts`:**

```typescript
import { EntityNameController } from "./resourcename/resourcename.controller";

export const routes = [
  EntityNameController,
  // Other controllers...
];
```

---

## Entity Template

**Basic Entity Structure:**

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("table_name")
export class EntityName {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ type: "varchar", length: 255 })
  @Index() // Add for frequently queried fields
  field_name: string;

  @Column({
    type: "enum",
    enum: ["OPTION1", "OPTION2"],
    default: "OPTION1",
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

**Export from `src/db/models/index.ts`:**

```typescript
export { EntityName } from "./EntityName";
```

**Register in `src/inversify.config.ts`:**

```typescript
import { EntityName } from "./db/models";

serviceContainer
  .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
  .toConstantValue(
    new databasemanager.cockroach.CockRoachDBManagerFactory(
      { url: process.env.DATABASE_URL },
      [EntityName] // ← Add entity here
    )
  );
```

---

## Type Definitions

**Entity Types (`src/types/entities/entityname.type.ts`):**

```typescript
import * as models from "../../db/models";

// Entity type (matches database model)
export type EntityName = models.EntityName;

// Create DTO (fields needed for creation)
export type EntityNamePost = Pick<EntityName, "field1" | "field2">;

// Update DTO (fields that can be updated - all optional)
export type EntityNamePut = Partial<Pick<EntityName, "field1" | "field2">>;
```

**API Types (`src/types/api/v1/resourcename/index.ts`):**

```typescript
import { Types } from "@giusmento/mangojs-core";

export type ResponseBodyData = {
  uid: string;
  field1: string;
  field2: string;
  created_at: Date;
};

export * as GET from "./GET";
export * as POST from "./POST";
export * as PUT from "./PUT";
export * as DELETE from "./DELETE";
```

**GET Types (`src/types/api/v1/resourcename/GET/index.ts`):**

```typescript
import { Types } from "@giusmento/mangojs-core";
import { ResponseBodyData } from "..";

export type Params = { id?: string };
export type RequestBody = {};
export type ResponseBody = Types.v1.api.response.response<
  ResponseBodyData | ResponseBodyData[]
>;
```

**POST Types (`src/types/api/v1/resourcename/POST/index.ts`):**

```typescript
import { Types } from "@giusmento/mangojs-core";
import { ResponseBodyData } from "..";

export type Params = {};
export type RequestBody = {
  field1: string;
  field2: string;
};
export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
```

---

## Transaction Patterns

### Basic Transaction

```typescript
public async createEntity(
  data: types.entities.entityname.EntityNamePost
): Promise<types.entities.entityname.EntityName> {
  const response = await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      const entity = em.create(models.EntityName, data);
      await em.save(entity);
      return entity;
    }
  );
  return response as types.entities.entityname.EntityName;
}
```

### Transaction with Validation

```typescript
public async createEntity(
  data: types.entities.entityname.EntityNamePost
): Promise<types.entities.entityname.EntityName> {
  const response = await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      // 1. Validate input
      if (!data.field1) {
        throw new errors.APIError(400, "BAD_REQUEST", "Field1 is required");
      }

      // 2. Check business rules
      const existing = await em.findOne(models.EntityName, {
        where: { field1: data.field1 },
      });

      if (existing) {
        throw new errors.APIError(409, "CONFLICT", "Entity already exists");
      }

      // 3. Create and save
      const entity = em.create(models.EntityName, data);
      await em.save(entity);

      return entity;
    }
  );
  return response as types.entities.entityname.EntityName;
}
```

### Transaction with Relationships

```typescript
public async createWithRelated(
  data: types.entities.entityname.EntityNamePost
): Promise<types.entities.entityname.EntityName> {
  const response = await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      // Create parent entity
      const entity = em.create(models.EntityName, data);
      await em.save(entity);

      // Create related entity
      const related = em.create(models.RelatedEntity, {
        parent_id: entity.uid,
        // ...other fields
      });
      await em.save(related);

      // Load entity with relations
      const entityWithRelations = await em.findOne(models.EntityName, {
        where: { uid: entity.uid },
        relations: ["relatedEntities"],
      });

      return entityWithRelations!;
    }
  );
  return response as types.entities.entityname.EntityName;
}
```

### Read with Transaction

```typescript
public async getById(id: string): Promise<types.entities.entityname.EntityName> {
  const response = await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      const entity = await em.findOne(models.EntityName, {
        where: { uid: id },
      });

      if (!entity) {
        throw new errors.APIError(404, "NOT_FOUND", "Entity not found");
      }

      return entity;
    }
  );
  return response as types.entities.entityname.EntityName;
}
```

### Update with Transaction

```typescript
public async update(
  id: string,
  data: types.entities.entityname.EntityNamePut
): Promise<types.entities.entityname.EntityName> {
  const response = await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      const entity = await em.findOne(models.EntityName, {
        where: { uid: id },
      });

      if (!entity) {
        throw new errors.APIError(404, "NOT_FOUND", "Entity not found");
      }

      // Update fields
      Object.assign(entity, data);
      await em.save(entity);

      return entity;
    }
  );
  return response as types.entities.entityname.EntityName;
}
```

### Delete with Transaction

```typescript
public async delete(id: string): Promise<void> {
  await this._persistenceContext.inTransaction(async (em: EntityManager) => {
    const entity = await em.findOne(models.EntityName, {
      where: { uid: id },
    });

    if (!entity) {
      throw new errors.APIError(404, "NOT_FOUND", "Entity not found");
    }

    await em.remove(entity);
  });
}
```

---

## Error Handling Pattern

**In Services:**

```typescript
// Not found
if (!entity) {
  throw new errors.APIError(404, "NOT_FOUND", "Entity not found");
}

// Validation error
if (!data.requiredField) {
  throw new errors.APIError(400, "BAD_REQUEST", "Required field is missing");
}

// Duplicate/Conflict
if (existing) {
  throw new errors.APIError(409, "CONFLICT", "Entity already exists");
}

// Unauthorized
if (!hasPermission) {
  throw new errors.APIError(403, "FORBIDDEN", "Insufficient permissions");
}
```

**In Controllers:**

```typescript
try {
  const result = await service.method(data);
  return res.status(200).send({
    ok: true,
    timestamp: logRequest.timestamp,
    requestId: logRequest.requestId,
    data: result,
  });
} catch (error: unknown) {
  return errors.errorHandler(res, error as Error);
}
```

---

## Quick Reference

**Key Rules:**

- ✅ All database operations inside `inTransaction()`
- ✅ Use `em` (EntityManager) for all database calls
- ✅ Services use `@injectable()` decorator
- ✅ Services injected with `LazyServiceIdentifier`
- ✅ Controllers resolve services OUTSIDE class
- ✅ All errors use `errors.APIError`
- ✅ Cast transaction response to correct type
- ✅ Add JSDoc to all public methods
- ❌ No try-catch inside transactions
- ❌ No HTTP/Express types in services
- ❌ No business logic in controllers

**See Also:**

- [Service Layer Overview](../service/overview.context.md)
- [Controller Layer Overview](../controller/overview.context.md)
- [Database Layer Overview](../database/overview.context.md)
- [Error Handling Guide](./error-handling.context.md)
