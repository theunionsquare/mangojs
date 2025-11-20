# MangoJS Type Organization Guide

## Overview

MangoJS uses TypeScript for type safety across the entire application. This guide explains how to organize types in both standalone services and monorepo projects.

**Key Principles:**

- **Single source of truth**: Entity types are the base truth
- **Derived types**: Use `Pick`, `Omit`, `Partial` to derive API and service types
- **Shared types**: Export to `packages/types/{service_name}` in monorepo
- **API types**: Organized by endpoint path structure
- **Service request types**: Namespace-organized service layer types

---

## Type Folder Structure

### Standalone Service

```
src/types/
├── api/v1/                          # API request/response types
│   └── auth/admins/login/POST/
│       └── index.ts                 # RequestBody, ResponseBody
├── entities/                        # Domain entity types
│   ├── user.type.ts
│   └── index.ts
└── index.ts                         # Main export
```

### Monorepo with Shared Types (Recommended)

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

### Example: Working Hours Entity with Type Transformation

**File**: `packages/types/partner/entities/working-hours.entity.ts`

```typescript
/**
 * Full ShopWorkingHours entity with all fields
 * This is the source of truth for the working hours structure
 */
export type ShopWorkingHours = {
  uid: string;
  day_of_week: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  start_time: string; // e.g., "08:00:00"
  end_time: string; // e.g., "13:00:00"
  slot_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * API POST request body - Derived from entity
 */
export type ShopWorkingHoursPost = Pick<
  ShopWorkingHours,
  "day_of_week" | "start_time" | "end_time"
> & {
  slot_order?: number; // Optional with default value
};

/**
 * API PUT request body - Derived from entity
 */
export type ShopWorkingHoursPut = Partial<
  Pick<
    ShopWorkingHours,
    "day_of_week" | "start_time" | "end_time" | "slot_order" | "is_active"
  >
>;
```

---

## Service Request Types (Namespaced)

Service request types extend API types when the service layer needs different data structures (e.g., Date objects vs strings, additional fields from route params).

### Structure

```
packages/types/{service}/requests/
├── shop.requests.ts
├── working-hours.requests.ts
├── special-hours.requests.ts
└── index.ts                 # Namespace exports
```

### Example: Service Request Types

**File**: `packages/types/partner/requests/shop.requests.ts`

```typescript
import type { ShopPost, ShopPut } from "../entities";

/**
 * Service layer: Create shop request
 * Same as API ShopPost - can diverge if internal logic needs different fields
 */
export type CreateShopRequest = ShopPost;

/**
 * Service layer: Update shop request
 * Same as API ShopPut - can diverge if internal logic needs different fields
 */
export type UpdateShopRequest = ShopPut;
```

### Example: Service Request with Type Transformation

**File**: `packages/types/partner/requests/special-hours.requests.ts`

```typescript
import type { ShopSpecialHoursPost, ShopSpecialHoursPut } from "../entities";

/**
 * Service layer: Create special hours request
 * Extends API POST type but converts special_date from string to Date
 */
export interface CreateSpecialHoursRequest
  extends Omit<ShopSpecialHoursPost, "special_date"> {
  shop_uid: string; // Added by controller from route params
  special_date: Date; // Converted from API string to Date
}

/**
 * Service layer: Update special hours request
 * Extends API PUT type but converts special_date from string to Date
 */
export interface UpdateSpecialHoursRequest
  extends Omit<ShopSpecialHoursPut, "special_date"> {
  special_date?: Date; // Converted from API string to Date
}
```

### Namespace Exports

**File**: `packages/types/partner/requests/index.ts`

```typescript
/**
 * Service layer request types
 * These types are used by service methods and may differ from API types
 */

export * as shop from "./shop.requests";
export * as workingHours from "./working-hours.requests";
export * as specialHours from "./special-hours.requests";
```

---

## API Types

API types follow the **endpoint path structure** for easy navigation and are derived from entity types.

### Structure Pattern

```
types/api/{version}/{resource}/{METHOD}/index.ts
```

**Example**: `POST /api/v1/shops/:shop_uid/working-hours`

```
types/api/v1/working-hours/POST/index.ts
```

### Example: Working Hours API Types

**File**: `packages/types/partner/api/v1/working-hours/POST/index.ts`

```typescript
import { Types } from "@giusmento/mangojs-core";
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

**File**: `packages/types/partner/api/v1/working-hours/index.ts`

```typescript
import { ShopWorkingHours } from "../../../entities";

export * as POST from "./POST";
export * as GET from "./GET";
export * as PUT from "./PUT";
export * as DELETE from "./DELETE";

export type ResponseBodyData = ShopWorkingHours; // Derived from entity
```

---

## Usage in Services

### Import Pattern

```typescript
import type * as PBTypes from "@giusmento/pulcherbook-types";

// Service layer types (namespaced)
type CreateShopRequest = PBTypes.partner.requests.shop.CreateShopRequest;
type UpdateShopRequest = PBTypes.partner.requests.shop.UpdateShopRequest;
```

### Service Method Example

```typescript
import type * as PBTypes from "@giusmento/pulcherbook-types";

type CreateWorkingHoursRequest =
  PBTypes.partner.requests.workingHours.CreateWorkingHoursRequest;

@injectable()
export class WorkingHoursService {
  /**
   * Create Working Hours
   * @param data - Working hours creation data
   * @returns Promise resolving to the created working hours
   */
  public async create(
    data: CreateWorkingHoursRequest
  ): Promise<PBTypes.partner.entities.ShopWorkingHours> {
    // Service implementation
    return workingHours;
  }
}
```

---

## Usage in Controllers

### Import Pattern

```typescript
import type * as PBTypes from "@giusmento/pulcherbook-types";
```

### Controller Method Example

```typescript
@Controller("/api/v1/shops/:shop_uid/working-hours")
export class WorkingHoursController {
  @Post("/")
  @Decorators.auth.NoAuth()
  public async create(
    req: Request<
      PBTypes.partner.api.v1.workingHours.POST.Params,
      PBTypes.partner.api.v1.workingHours.POST.RequestBody
    >,
    res: Response<PBTypes.partner.api.v1.workingHours.POST.ResponseBody>
  ): Promise<Response<PBTypes.partner.api.v1.workingHours.POST.ResponseBody>> {
    const { shop_uid } = req.params;
    const data: ShopWorkingHoursPost = req.body;

    // Convert API types to service types if needed
    const workingHours = await this.workingHoursService.create({
      ...data,
      shop_uid, // Add route param to service request
    });

    return res.status(201).send({
      ok: true,
      data: workingHours,
    });
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
7. **Type transformations**: Handle API ↔ Service conversions in controllers

**Benefits:**

- ✅ Single source of truth (entity)
- ✅ Automatic type propagation on entity changes
- ✅ Clear layer separation (entity → request → API)
- ✅ Type safety throughout all layers
- ✅ Reduced duplication and maintenance

**Reference Implementation**:

- [Partner Service Types](../../packages/types/src/partner)
- Shop, WorkingHours, SpecialHours entities

**See Also:**

- [Architecture Overview](./overview.context.md)
- [Service Layer Guide](../service/overview.context.md)
