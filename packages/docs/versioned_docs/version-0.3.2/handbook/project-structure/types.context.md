---
sidebar_label: "Types"
---

# Type Organization Guide

## Overview

MangoJS uses TypeScript for type safety across the entire application. This guide explains how to organize types in monorepo projects.

**Key Principles:**

- **Single source of truth**: Entity types are the base truth
- **Derived types**: Use `Pick`, `Omit`, `Partial` to derive API and service types
- **Shared types**: Export to `packages/types/{service_name}`
- **API types**: Organized by endpoint path structure
- **Service request types**: Namespace-organized service layer types

---

## Type Folder Structure

```
├── packages/types/                  # Shared across services
│   ├── partner/
│   │   ├── entities/               # Source of truth
│   │   │   ├── shop.entity.ts
│   │   │   ├── working-hours.entity.ts
│   │   │   └── index.ts
│   │   ├── requests/               # Service layer types (namespaced)
│   │   │   ├── shop.requests.ts
│   │   │   ├── working-hours.requests.ts
│   │   │   └── index.ts
│   │   ├── api/v1/                 # HTTP layer types
│   │   │   ├── shops/
│   │   │   └── working-hours/
│   │   ├── index.ts
│   │   └── package.json
│   └── iam/
│       └── (same structure)
└── services/
    ├── partner-service/
    │   └── src/
    │       └── services/            # Uses packages/types
    └── iam-service/
```

---

## Entity Types (Source of Truth)

Entity types represent the **single source of truth** for your domain models. All other types (API, Service) are derived from entities.

### Structure

```
packages/types/{service}/entities/
├── shop.entity.ts
├── working-hours.entity.ts
├── common.ts              # Shared utility types
└── index.ts
```

### Example: Shop Entity Type

**File**: `packages/types/partner/entities/shop.entity.ts`

```typescript
import { BusinessTypeShort } from "./common";

/**
 * Full Shop entity with all fields
 * This is the source of truth for the shop structure
 */
export type Shop = {
  uid: string;
  partner_uid: string;
  shop_name: string;
  business_type: BusinessTypeShort;
  description: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

/**
 * API POST request body - Fields required when creating a new shop
 * Derived from Shop entity using Pick
 */
export type ShopPost = Pick<
  Shop,
  | "partner_uid"
  | "shop_name"
  | "description"
  | "address"
  | "city"
  | "state"
  | "country"
  | "postal_code"
  | "latitude"
  | "longitude"
  | "phone"
  | "email"
  | "website"
  | "instagram"
>;

/**
 * API PUT request body - Fields that can be updated
 * Derived from Shop entity using Partial and Omit
 */
export type ShopPut = Partial<Omit<ShopPost, "partner_uid">> & {
  business_type?: string;
  status?: string;
};
```

---

## Service Request Types (Namespaced)

Service request types extend API types when the service layer needs different data structures.

### Structure

```
packages/types/{service}/requests/
├── shop.requests.ts
├── working-hours.requests.ts
└── index.ts                 # Namespace exports
```

### Example: Service Request Types

**File**: `packages/types/partner/requests/shop.requests.ts`

```typescript
import type { ShopPost, ShopPut } from "../entities";

/**
 * Service layer: Create shop request
 */
export type CreateShopRequest = ShopPost;

/**
 * Service layer: Update shop request
 */
export type UpdateShopRequest = ShopPut;
```

### Namespace Exports

**File**: `packages/types/partner/requests/index.ts`

```typescript
export * as shop from "./shop.requests";
export * as workingHours from "./working-hours.requests";
export * as specialHours from "./special-hours.requests";
```

---

## API Types

API types follow the **endpoint path structure** and are derived from entity types.

### Structure Pattern

```
types/api/{version}/{resource}/{METHOD}/index.ts
```

### Example: Working Hours API Types

**File**: `packages/types/partner/api/v1/working-hours/POST/index.ts`

```typescript
import { Types } from "@mangojs/core";
import { ShopWorkingHoursPost } from "../../../../entities";
import { ResponseBodyData } from "..";

/*
 * REQUEST
 * POST /api/v1/shops/:shop_uid/working-hours
 */
export type Params = { shop_uid: string };

export type RequestBody = ShopWorkingHoursPost; // Derived from entity

/**
 * RESPONSE
 * 200 OK
 */
export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
```

---

## Usage Examples

### In Services

```typescript
import type * as PBTypes from "@theunionsquare/pulcherbook-types";

type CreateShopRequest = PBTypes.partner.requests.shop.CreateShopRequest;

@injectable()
export class ShopService {
  public async create(data: CreateShopRequest): Promise<PBTypes.partner.entities.Shop> {
    // Implementation
  }
}
```

### In Controllers

```typescript
@Controller("/api/v1/shops/:shop_uid/working-hours")
export class WorkingHoursController {
  @Post("/")
  public async create(
    req: Request<
      PBTypes.partner.api.v1.workingHours.POST.Params,
      PBTypes.partner.api.v1.workingHours.POST.RequestBody
    >,
    res: Response<PBTypes.partner.api.v1.workingHours.POST.ResponseBody>,
  ): Promise<Response> {
    const { shop_uid } = req.params;
    const data = req.body;

    const workingHours = await this.workingHoursService.create({
      ...data,
      shop_uid,
    });

    return res.status(201).send({ ok: true, data: workingHours });
  }
}
```

---

## Type Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│  Entity (Source of Truth)                           │
│  ┌─────────────────┐                                │
│  │ Shop            │                                 │
│  └────────┬────────┘                                │
│           │                                          │
│           ├─ Pick ──────────► ShopPost (API)        │
│           └─ Partial+Omit ──► ShopPut (API)         │
└─────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────┐
│  Service Request Types (can diverge from API)       │
│  ┌─────────────────┐                                │
│  │ CreateRequest   │ = ShopPost + service fields    │
│  │ UpdateRequest   │ = ShopPut (or custom)          │
│  └─────────────────┘                                │
└─────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────┐
│  API Types (HTTP Layer)                             │
│  ┌─────────────────┐                                │
│  │ POST/index.ts   │ = Params + RequestBody         │
│  │ PUT/index.ts    │ = Params + RequestBody         │
│  └─────────────────┘                                │
└─────────────────────────────────────────────────────┘
```

---

## Summary

**Type Organization Checklist:**

1. **Entity types**: Define once as the source of truth (`entities/`)
2. **Derive API types**: Use `Pick`, `Omit`, `Partial` from entities
3. **Service request types**: Namespace-organized, extend API types when needed (`requests/`)
4. **API types**: Organize by endpoint path (`api/v1/resource/METHOD`)
5. **Shared types**: Export to `packages/types/{service_name}` in monorepo
6. **Namespace exports**: Use `export * as` for clean imports

## Related

- [Folders](./folders.context.md) - Folder structure conventions
- [Architecture Overview](../architecture/index.context.md) - Framework architecture
