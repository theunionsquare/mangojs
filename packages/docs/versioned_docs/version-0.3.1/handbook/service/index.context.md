---
sidebar_label: "Overview"
---

# Service Layer Guide

## Overview

The Service Layer contains your application's **business logic** using dependency injection. This is the **middle layer** in MangoJS onion architecture - it depends on the Database Layer but has no dependencies on the Controller Layer.

**Purpose**: Implement business logic, data validation, and orchestrate database operations

**Location**: `services/{service-name}/src/services/`

**Key Principle**: Services contain business logic and validation. They remain framework-agnostic (no HTTP concerns, no request/response handling).

## Documentation

| Document                                        | Description                                      |
| ----------------------------------------------- | ------------------------------------------------ |
| [Setup](./setup.context.md)                     | Service setup, `@injectable()`, DI patterns      |
| [Transactions](./transactions.context.md)       | Transaction management, `inTransaction()` usage  |
| [Error Handling](./error-handling.context.md)   | `APIError`, status codes, error propagation      |
| [Examples](./examples.context.md)               | Complete CRUD example, type usage patterns       |

## Quick Start

### Step 1: Create Service File

```typescript
import { injectable, inject, LazyServiceIdentifier } from "inversify";
import { EntityManager } from "typeorm";
import { INVERSITY_TYPES, IPersistenceContext } from "@mangojs/core";
import type * as PBTypes from "@theunionsquare/pulcherbook-types";
import * as models from "../db/models";

type Shop = PBTypes.partner.entities.Shop;
type CreateShopRequest = PBTypes.partner.requests.shop.CreateShopRequest;

@injectable()
export class ShopService {
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: IPersistenceContext;

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
}
```

### Step 2: Export Service

**File**: `src/services/index.ts`

```typescript
export { ShopService } from "./shop.service";
```

## Related

- [Controller Layer](../controller/index.context.md) - HTTP layer
- [Database Layer](../database/index.context.md) - Data models
- [Onion Architecture](../architecture/onion-architecture.context.md) - Layer dependencies
