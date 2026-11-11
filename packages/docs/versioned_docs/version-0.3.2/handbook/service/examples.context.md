---
sidebar_label: "Examples"
---

# Service Examples

## Complete CRUD Service

```typescript
import { injectable, inject, LazyServiceIdentifier } from "inversify";
import { EntityManager } from "typeorm";
import {
  Errors,
  INVERSITY_TYPES,
  Persistence,
} from "@theunionsquare/mangojs-core";
import type * as PBTypes from "@theunionsquare/pulcherbook-types";
import * as models from "../db/models";

// Type aliases
type Shop = PBTypes.partner.entities.Shop;
type CreateShopRequest = PBTypes.partner.requests.shop.CreateShopRequest;
type UpdateShopRequest = PBTypes.partner.requests.shop.UpdateShopRequest;

@injectable()
export class ShopService {
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: Persistence.IPersistenceContext;

  constructor() {}

  /**
   * Create Shop - Create a new shop with validation
   * @throws {APIError} 400 BAD_REQUEST if validation fails
   * @throws {APIError} 409 CONFLICT if shop already exists
   */
  public async createShop(data: CreateShopRequest): Promise<Shop> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        if (!data.shop_name || !data.partner_uid) {
          throw new Errors.APIError(400, "BAD_REQUEST", "Required fields missing");
        }

        const existing = await em.findOne(models.Shop, {
          where: { shop_name: data.shop_name, partner_uid: data.partner_uid },
        });

        if (existing) {
          throw new Errors.APIError(409, "CONFLICT", "Shop already exists");
        }

        const shop = em.create(models.Shop, { ...data, status: "ACTIVE" });
        await em.save(shop);
        return shop;
      },
    );
    return response as Shop;
  }

  /**
   * Get Shop By ID
   * @throws {APIError} 404 NOT_FOUND if shop doesn't exist
   */
  public async getShopById(id: string): Promise<Shop> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const shop = await em.findOne(models.Shop, { where: { uid: id } });

        if (!shop) {
          throw new Errors.APIError(404, "NOT_FOUND", "Shop not found");
        }

        return shop;
      },
    );
    return response as Shop;
  }

  /**
   * Get All Shops for Partner
   */
  public async getShopsByPartner(partnerUid: string): Promise<Shop[]> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const shops = await em.find(models.Shop, {
          where: { partner_uid: partnerUid },
          order: { created_at: "DESC" },
        });
        return shops;
      },
    );
    return response as Shop[];
  }

  /**
   * Update Shop
   * @throws {APIError} 404 NOT_FOUND if shop doesn't exist
   */
  public async updateShop(id: string, data: UpdateShopRequest): Promise<Shop> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const shop = await em.findOne(models.Shop, { where: { uid: id } });

        if (!shop) {
          throw new Errors.APIError(404, "NOT_FOUND", "Shop not found");
        }

        Object.assign(shop, data);
        await em.save(shop);
        return shop;
      },
    );
    return response as Shop;
  }

  /**
   * Delete Shop
   * @throws {APIError} 404 NOT_FOUND if shop doesn't exist
   */
  public async deleteShop(id: string): Promise<void> {
    await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const shop = await em.findOne(models.Shop, { where: { uid: id } });

        if (!shop) {
          throw new Errors.APIError(404, "NOT_FOUND", "Shop not found");
        }

        await em.remove(shop);
      },
    );
  }

  /**
   * Get Shop with Relationships
   * @throws {APIError} 404 NOT_FOUND if shop doesn't exist
   */
  public async getShopWithWorkingHours(shopUid: string): Promise<Shop> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const shop = await em.findOne(models.Shop, {
          where: { uid: shopUid },
          relations: ["workingHours"],
        });

        if (!shop) {
          throw new Errors.APIError(404, "NOT_FOUND", "Shop not found");
        }

        return shop;
      },
    );
    return response as Shop;
  }
}
```

---

## Best Practices

**Service Responsibilities:**
- ✅ Implement business logic and validation
- ✅ Orchestrate database operations in transactions
- ✅ Throw APIError for all errors
- ✅ Return typed results
- ✅ Remain framework-agnostic (no HTTP knowledge)

**Services Should NOT:**
- ❌ Handle HTTP requests/responses
- ❌ Import Express types (Request, Response)
- ❌ Use repositories directly (use EntityManager in transactions)
- ❌ Have circular dependencies

**Code Organization:**
- One service per entity for focused responsibility
- Use private methods for complex helper logic
- Keep methods under 50 lines when possible
- Document all public methods with JSDoc

**Performance Tips:**
- Load relationships only when needed with `relations: []`
- Use pagination for large datasets (`take`, `skip`)
- Add database indexes for frequently queried fields

## Related

- [Setup](./setup.context.md) - Service setup
- [Transactions](./transactions.context.md) - Transaction patterns
- [Error Handling](./error-handling.context.md) - APIError usage
