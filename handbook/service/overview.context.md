# Service Layer Guide

## Overview

The Service Layer contains your application's **business logic** using dependency injection. This is the **middle layer** in MangoJS onion architecture - it depends on the Database Layer but has no dependencies on the Controller Layer.

**Purpose**: Implement business logic, data validation, and orchestrate database operations

**Location**: `src/services/`

**Key Principle**: Services contain business logic and validation. They remain framework-agnostic (no HTTP concerns, no request/response handling).

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Service Setup](#service-setup)
3. [Transaction Management](#transaction-management)
4. [Type Definitions](#type-definitions)
5. [Complete CRUD Example](#complete-crud-example)
6. [Error Handling](#error-handling)
7. [Development Checklist](#development-checklist)
8. [Best Practices](#best-practices)

---

## Quick Start

> **💡 Tip:** See [Code Templates](../common/code-templates.context.md#service-template) for copy-paste ready service boilerplate.

### Step 1: Define Entity and Request Types

Before creating services, you need to define your type structure following the **hybrid type approach**:

1. **Entity types** - Single source of truth for your domain models
2. **API types** - Derived from entities using `Pick`, `Omit`, `Partial`
3. **Service request types** - Namespace-organized types for service methods

> **📖 See:** [Type Organization Guide](../architecture/type.context.md) for complete setup instructions, examples, and patterns for both **monorepo** and **standalone** projects.

### Step 2: Create Service File

Use the [Service Template](../common/code-templates.context.md#service-template) as your starting point.

**File**: `services/{service-name}/src/services/shop.service.ts`

```typescript
import { injectable, inject, LazyServiceIdentifier } from "inversify";
import { EntityManager } from "typeorm";
import {
  errors,
  INVERSITY_TYPES,
  IPersistenceContext,
} from "@giusmento/mangojs-core";
import type * as PBTypes from "@giusmento/pulcherbook-types"; // Shared types
import * as models from "../db/models";

// Type aliases for cleaner code
type Shop = PBTypes.partner.entities.Shop;
type CreateShopRequest = PBTypes.partner.requests.shop.CreateShopRequest;
type UpdateShopRequest = PBTypes.partner.requests.shop.UpdateShopRequest;

@injectable()
export class ShopService {
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: IPersistenceContext;

  constructor() {}

  // Add your methods here - see Transaction Patterns below
}
```

> **Note**: For standalone services (non-monorepo), use `import { types } from "../types"` instead of the shared types package.

### Step 3: Export Service

**File**: `src/services/index.ts`

```typescript
export { ShopService } from "./shop.service";
export { PartnerService } from "./partner.service";
// Export all services
```

---

## Service Setup

## Service Setup

Services must be marked with `@injectable()` for dependency injection.

> **💡 See:** [Service Template](../common/code-templates.context.md#service-template) for complete boilerplate.

**Key Points**:

- `@injectable()` makes the class available for dependency injection
- `@inject()` with `LazyServiceIdentifier` prevents circular dependencies
- `_persistenceContext` provides transaction management

---

## Transaction Management

**Critical Rule**: All database operations MUST run inside `inTransaction()`.

> **💡 See:** [Transaction Patterns](../common/code-templates.context.md#transaction-patterns) for all common patterns.

### Why Transactions Matter

- ✅ **Atomicity**: All operations succeed or all fail
- ✅ **Auto-rollback**: Errors automatically rollback changes
- ✅ **Data Consistency**: Prevents partial updates
- ✅ **Isolation**: Operations don't interfere with each other

### Basic Transaction Example

```typescript
// Type aliases (from shared types package)
type Shop = PBTypes.partner.entities.Shop;
type CreateShopRequest = PBTypes.partner.requests.shop.CreateShopRequest;

public async createShop(data: CreateShopRequest): Promise<Shop> {
  const response = await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      const shop = em.create(models.Shop, data);
      await em.save(shop);
      return shop;
    }
  );
  return response as Shop;
}
```

### Important Transaction Rules

- ✅ **Always use `em` (EntityManager)** - Not repositories or direct models
- ✅ **Let errors propagate** - Don't catch errors inside transaction
- ✅ **Cast return type** - Use `as Type` after transaction
- ❌ **Never use try-catch** inside `inTransaction()` - Breaks auto-rollback
- ❌ **Never use `this._persistenceContext`** inside transaction - Use `em`

**See [Code Templates](../common/code-templates.context.md#transaction-patterns) for:**

- Transaction with validation
- Transaction with relationships
- Read, Update, Delete patterns

---

## Type Definitions

Services use the **hybrid type approach** where:

- **Entity types** serve as the single source of truth
- **Service request types** are used for method parameters (namespaced in `requests/`)
- **Entity types** are used for return values

All type definitions, organization, and patterns are documented in the [Type Organization Guide](../architecture/type.context.md).

### Import Pattern (Monorepo)

```typescript
import type * as PBTypes from "@giusmento/pulcherbook-types";

// Type aliases from shared package
type Shop = PBTypes.partner.entities.Shop;
type CreateShopRequest = PBTypes.partner.requests.shop.CreateShopRequest;
type UpdateShopRequest = PBTypes.partner.requests.shop.UpdateShopRequest;
```

> **📖 See:** [Type Organization Guide](../architecture/type.context.md) for complete type setup, file structure, and examples for both **monorepo** and **standalone** projects.

---

## Complete CRUD Example

Complete service implementation using the hybrid type approach with monorepo shared types.

```typescript
import { injectable, inject, LazyServiceIdentifier } from "inversify";
import { EntityManager } from "typeorm";
import {
  errors,
  INVERSITY_TYPES,
  IPersistenceContext,
} from "@giusmento/mangojs-core";
import type * as PBTypes from "@giusmento/pulcherbook-types"; // Shared types package
import * as models from "../db/models";

// Type aliases for cleaner code (from shared types)
type Shop = PBTypes.partner.entities.Shop;
type CreateShopRequest = PBTypes.partner.requests.shop.CreateShopRequest;
type UpdateShopRequest = PBTypes.partner.requests.shop.UpdateShopRequest;

@injectable()
export class ShopService {
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: IPersistenceContext;

  constructor() {}

  /**
   * Create Shop - Create a new shop with validation
   *
   * @param data - Shop creation data
   * @returns Promise resolving to the created shop
   * @throws {APIError} 400 BAD_REQUEST if validation fails
   * @throws {APIError} 409 CONFLICT if shop already exists
   */
  public async createShop(data: CreateShopRequest): Promise<Shop> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // Validate input
        if (!data.shop_name || !data.partner_uid) {
          throw new errors.APIError(
            400,
            "BAD_REQUEST",
            "Shop name and partner UID are required"
          );
        }

        // Check for duplicates
        const existing = await em.findOne(models.Shop, {
          where: {
            shop_name: data.shop_name,
            partner_uid: data.partner_uid,
          },
        });

        if (existing) {
          throw new errors.APIError(
            409,
            "CONFLICT",
            "Shop with this name already exists for this partner"
          );
        }

        // Create and save
        const shop = em.create(models.Shop, {
          ...data,
          status: "ACTIVE",
        });
        await em.save(shop);

        return shop;
      }
    );
    return response as Shop;
  }

  /**
   * Get Shop By ID - Retrieve a shop by its ID
   *
   * @param id - Shop ID
   * @returns Promise resolving to the shop
   * @throws {APIError} 404 NOT_FOUND if shop doesn't exist
   */
  public async getShopById(id: string): Promise<Shop> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const shop = await em.findOne(models.Shop, {
          where: { uid: id },
        });

        if (!shop) {
          throw new errors.APIError(404, "NOT_FOUND", "Shop not found");
        }

        return shop;
      }
    );
    return response as Shop;
  }

  /**
   * Get All Shops - Retrieve all shops for a partner
   *
   * @param partnerUid - Partner UID
   * @returns Promise resolving to array of shops
   */
  public async getShopsByPartner(partnerUid: string): Promise<Shop[]> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const shops = await em.find(models.Shop, {
          where: { partner_uid: partnerUid },
          order: { created_at: "DESC" },
        });
        return shops;
      }
    );
    return response as Shop[];
  }

  /**
   * Update Shop - Update shop information
   *
   * @param id - Shop ID
   * @param data - Fields to update
   * @returns Promise resolving to updated shop
   * @throws {APIError} 404 NOT_FOUND if shop doesn't exist
   */
  public async updateShop(id: string, data: UpdateShopRequest): Promise<Shop> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const shop = await em.findOne(models.Shop, {
          where: { uid: id },
        });

        if (!shop) {
          throw new errors.APIError(404, "NOT_FOUND", "Shop not found");
        }

        // Update fields
        Object.assign(shop, data);
        await em.save(shop);

        return shop;
      }
    );
    return response as Shop;
  }

  /**
   * Delete Shop - Delete a shop (hard delete)
   *
   * @param id - Shop ID
   * @throws {APIError} 404 NOT_FOUND if shop doesn't exist
   */
  public async deleteShop(id: string): Promise<void> {
    await this._persistenceContext.inTransaction(async (em: EntityManager) => {
      const shop = await em.findOne(models.Shop, {
        where: { uid: id },
      });

      if (!shop) {
        throw new errors.APIError(404, "NOT_FOUND", "Shop not found");
      }

      await em.remove(shop);
    });
  }

  /**
   * Get Shop with Working Hours - Get shop with relationships (relationship example)
   *
   * @param shopUid - Shop UID
   * @returns Promise resolving to shop with working hours
   * @throws {APIError} 404 NOT_FOUND if shop doesn't exist
   */
  public async getShopWithWorkingHours(shopUid: string): Promise<Shop> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const shop = await em.findOne(models.Shop, {
          where: { uid: shopUid },
          relations: ["workingHours"], // Load relationship
        });

        if (!shop) {
          throw new errors.APIError(404, "NOT_FOUND", "Shop not found");
        }

        return shop;
      }
    );
    return response as Shop;
  }
}
```

---

## Error Handling

Always use `APIError` from MangoJS core for throwing errors.

```typescript
import { errors } from "@giusmento/mangojs-core";

throw new errors.APIError(statusCode, errorCode, message);
```

**Common HTTP Status Codes**:

| Code | Type           | When to Use                        |
| ---- | -------------- | ---------------------------------- |
| 400  | BAD_REQUEST    | Invalid input, validation failures |
| 401  | UNAUTHORIZED   | Authentication required            |
| 403  | FORBIDDEN      | User lacks permission              |
| 404  | NOT_FOUND      | Resource doesn't exist             |
| 409  | CONFLICT       | Duplicate resource, state conflict |
| 500  | INTERNAL_ERROR | Unexpected server errors           |

**Examples**:

```typescript
// Not found
if (!shop) {
  throw new errors.APIError(404, "NOT_FOUND", "Shop not found");
}

// Validation error
if (!data.shop_name) {
  throw new errors.APIError(400, "BAD_REQUEST", "Shop name is required");
}

// Duplicate
if (existing) {
  throw new errors.APIError(409, "CONFLICT", "Shop already exists");
}
```

**Error Propagation**: Errors thrown inside `inTransaction()` automatically rollback all database changes. Controllers catch these errors and pass them to `errorHandler`.

---

## Development Checklist

Use this checklist when creating or modifying services:

**Service Architecture**

- [ ] Service class uses `@injectable()` decorator
- [ ] PersistenceContext injected with `LazyServiceIdentifier`
- [ ] No HTTP/Express dependencies (no Request/Response types)
- [ ] Service exported from `src/services/index.ts`

**Type Definitions**

- [ ] Entity types defined as source of truth in `{package|src}/types/entities/`
- [ ] API types (`EntityPost`, `EntityPut`) derived from entity using `Pick`/`Omit`/`Partial`
- [ ] Service request types defined in `{package|src}/types/requests/`
- [ ] Request types namespace-exported from `requests/index.ts`
- [ ] Services use request types for parameters, entity types for return values

**Transaction Management**

- [ ] All database operations inside `inTransaction()`
- [ ] EntityManager (`em`) used for all database calls
- [ ] Return values cast to appropriate types
- [ ] No try-catch blocks inside transactions

**Error Handling**

- [ ] All errors use `errors.APIError`
- [ ] Appropriate HTTP status codes (400, 404, 409, etc.)
- [ ] Descriptive error messages provided
- [ ] Errors documented in JSDoc with `@throws` tags

**Method Documentation**

- [ ] All public methods have JSDoc comments
- [ ] JSDoc includes: description, @param, @returns, @throws
- [ ] First line: Method name and brief description

**Code Quality**

- [ ] One service per entity (focused responsibility)
- [ ] Methods under 50 lines when possible
- [ ] Complex logic extracted to private helper methods
- [ ] No business logic in entities or controllers

---

## Best Practices

---

## Best Practices

**Service Responsibilities**:

- ✅ Implement business logic and validation
- ✅ Orchestrate database operations in transactions
- ✅ Throw APIError for all errors
- ✅ Return typed results
- ✅ Remain framework-agnostic (no HTTP knowledge)

**Services Should NOT**:

- ❌ Handle HTTP requests/responses
- ❌ Import Express types (Request, Response)
- ❌ Use repositories directly (use EntityManager in transactions)
- ❌ Have circular dependencies
- ❌ Contain UI or presentation logic

**Code Organization**:

- One service per entity for focused responsibility
- Use private methods for complex helper logic
- Keep methods under 50 lines when possible
- Extract validation logic to separate functions if complex
- Document all public methods with comprehensive JSDoc

**Performance Tips**:

- Load relationships only when needed with `relations: []`
- Use pagination for large datasets (`take`, `skip`)
- Add database indexes for frequently queried fields
- Avoid N+1 queries by loading relations in single query

**Reference Implementation**:

- Partner Service: `services/partner-service/src/services/partner.service.ts`
- Shop Service: `services/partner-service/src/services/shop.service.ts`
- See these for complete real-world monorepo examples
