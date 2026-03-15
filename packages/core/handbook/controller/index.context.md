---
sidebar_label: "Overview"
---

# Controller Layer Guide

## Overview

The Controller Layer handles HTTP requests and responses. This is the **outermost layer** in MangoJS onion architecture - it depends on the Service Layer but contains minimal logic.

**Purpose**: Handle HTTP requests, validate input, call services, format responses

**Location**: `services/{service-name}/src/routes/v1/`

**Key Principle**: Controllers are thin layers that orchestrate HTTP communication. Business logic belongs in services.

## Documentation

| Document                                      | Description                                    |
| --------------------------------------------- | ---------------------------------------------- |
| [Setup](./setup.context.md)                   | Controller setup, decorators, service resolution |
| [Type Safety](./type-safety.context.md)       | Using API types, Request/Response typing       |
| [Authorization](./authorization.context.md)   | Auth decorators and protection patterns        |
| [Examples](./examples.context.md)             | Complete CRUD example, error handling, swagger |

## Quick Start

### Step 1: Define API Types

Controllers use **API types** from the shared types package. See [Type Organization Guide](../project-structure/types.context.md).

### Step 2: Create Controller

```typescript
import { Controller, Get, Post } from "@mangojs/core";
import { Request, Response } from "@mangojs/core";
import type * as PBTypes from "@theunionsquare/pulcherbook-types";
import { serviceNameContainer } from "../../../inversify.config.ts";

const shopService = serviceNameContainer.get<ShopService>(ShopService, {
  autobind: true,
});

@Controller("/api/{short-service-name}/v1/shops")
export class ShopController {
  @Get("/")
  public async getShops(req: Request, res: Response): Promise<Response> {
    // Implementation
  }
}
```

### Step 3: Register Controller

**File**: `src/routes/v1/index.ts`

```typescript
import { ShopController } from "./shops/shop.controller";

export const routes = [ShopController];
```

## Related

- [Service Layer](../service/index.context.md) - Business logic layer
- [Onion Architecture](../architecture/onion-architecture.context.md) - Layer dependencies
