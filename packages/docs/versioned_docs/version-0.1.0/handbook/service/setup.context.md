---
sidebar_label: "Setup"
---

# Service Setup

## @injectable() Decorator

Services must be marked with `@injectable()` for dependency injection.

```typescript
import { injectable, inject, LazyServiceIdentifier } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@mangojs/core";

@injectable()
export class ShopService {
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: IPersistenceContext;

  constructor() {}
}
```

**Key Points:**
- `@injectable()` makes the class available for dependency injection
- `@inject()` with `LazyServiceIdentifier` prevents circular dependencies
- `_persistenceContext` provides transaction management

---

## Dependency Injection Pattern

Use `LazyServiceIdentifier` for injecting dependencies to avoid circular reference issues.

```typescript
@inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
private _persistenceContext: IPersistenceContext;

@inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.Logger))
private _logger: ILogger;
```

---

## Type Aliases

Use type aliases at the top of the file for cleaner code:

```typescript
import type * as PBTypes from "@theunionsquare/pulcherbook-types";

// Type aliases for cleaner code
type Shop = PBTypes.partner.entities.Shop;
type CreateShopRequest = PBTypes.partner.requests.shop.CreateShopRequest;
type UpdateShopRequest = PBTypes.partner.requests.shop.UpdateShopRequest;

@injectable()
export class ShopService {
  public async createShop(data: CreateShopRequest): Promise<Shop> {
    // Implementation
  }
}
```

---

## Service Export

Export all services from index file:

**File**: `src/services/index.ts`

```typescript
export { ShopService } from "./shop.service";
export { PartnerService } from "./partner.service";
export { WorkingHoursService } from "./working-hours.service";
```

---

## Development Checklist

- [ ] Service class uses `@injectable()` decorator
- [ ] PersistenceContext injected with `LazyServiceIdentifier`
- [ ] No HTTP/Express dependencies (no Request/Response types)
- [ ] Service exported from `src/services/index.ts`
- [ ] Type aliases defined at top of file

## Related

- [Transactions](./transactions.context.md) - Transaction management
- [Dependency Injection](../architecture/injection.context.md) - DI patterns
