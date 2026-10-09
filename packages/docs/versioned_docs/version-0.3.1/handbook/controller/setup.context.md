---
sidebar_label: "Setup"
---

# Controller Setup

## @Controller Decorator

Defines the base path for all routes in the controller.

```typescript
@Controller("/api/{short-service-name}/v1/shops")
export class ShopController {
  // All routes start with /api/{short-service-name}/v1/shops
}
```

**Endpoint URL Pattern:**
- 1st position: `/api`
- 2nd position: Service short name (e.g., `/partner/`)
- 3rd position: Version (e.g., `/v1/`)

Example: `/api/partner/v1/shops`

---

## Service Resolution

**Critical**: Resolve services from container OUTSIDE the controller class.

```typescript
import { serviceNameContainer } from "../../../inversify.config.ts";

// ✅ Correct - resolve outside class
const shopService = serviceNameContainer.get<ShopService>(ShopService, {
  autobind: true,
});

@Controller("/api/partner/v1/shops")
export class ShopController {
  @Get("/")
  public async getShops(req: Request, res: Response) {
    const shops = await shopService.getShopsByPartner(partner_uid);
  }
}
```

```typescript
// ❌ Wrong - don't resolve inside class
@Controller("/api/partner/v1/shops")
export class ShopController {
  private shopService = Containers.getContainer().get<ShopService>(ShopService);
}
```

**Key Points:**
- Always use `{ autobind: true }`
- Resolve at module level, not in constructor

---

## HTTP Method Decorators

```typescript
@Get("/")                 // GET /api/v1/shops
@Get("/:shop_uid")        // GET /api/v1/shops/:shop_uid
@Post("/")                // POST /api/v1/shops
@Put("/:shop_uid")        // PUT /api/v1/shops/:shop_uid
@Delete("/:shop_uid")     // DELETE /api/v1/shops/:shop_uid
```

---

## Controller Registration

Export controllers from index file for registration.

**File**: `src/routes/v1/index.ts`

```typescript
import { ShopController } from "./shops/shop.controller";
import { PartnerController } from "./partners/partner.controller";

export const routes = [
  ShopController,
  PartnerController,
];
```

---

## Development Checklist

- [ ] Controller uses `@Controller(basePath)` decorator
- [ ] Services resolved OUTSIDE controller class
- [ ] Controller exported and registered in routes array
- [ ] Endpoint prefix follows `/api/{short-service-name}/v1/*` pattern
- [ ] No business logic in controller methods
- [ ] No direct database access

## Related

- [Type Safety](./type-safety.context.md) - Request/Response typing
- [Examples](./examples.context.md) - Complete CRUD example
