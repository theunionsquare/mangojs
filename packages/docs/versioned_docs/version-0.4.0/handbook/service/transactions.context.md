---
sidebar_label: "Transactions"
---

# Transaction Management

**Critical Rule**: All database operations MUST run inside `inTransaction()`.

## Why Transactions Matter

- ✅ **Atomicity**: All operations succeed or all fail
- ✅ **Auto-rollback**: Errors automatically rollback changes
- ✅ **Data Consistency**: Prevents partial updates
- ✅ **Isolation**: Operations don't interfere with each other

---

## Basic Transaction Pattern

```typescript
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

---

## Transaction with Validation

```typescript
public async createShop(data: CreateShopRequest): Promise<Shop> {
  const response = await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      // Validate input
      if (!data.shop_name || !data.partner_uid) {
        throw new errors.APIError(400, "BAD_REQUEST", "Required fields missing");
      }

      // Check for duplicates
      const existing = await em.findOne(models.Shop, {
        where: { shop_name: data.shop_name, partner_uid: data.partner_uid },
      });

      if (existing) {
        throw new errors.APIError(409, "CONFLICT", "Shop already exists");
      }

      // Create and save
      const shop = em.create(models.Shop, data);
      await em.save(shop);
      return shop;
    }
  );
  return response as Shop;
}
```

---

## Read Pattern

```typescript
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
```

---

## Update Pattern

```typescript
public async updateShop(id: string, data: UpdateShopRequest): Promise<Shop> {
  const response = await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      const shop = await em.findOne(models.Shop, {
        where: { uid: id },
      });

      if (!shop) {
        throw new errors.APIError(404, "NOT_FOUND", "Shop not found");
      }

      Object.assign(shop, data);
      await em.save(shop);
      return shop;
    }
  );
  return response as Shop;
}
```

---

## Delete Pattern

```typescript
public async deleteShop(id: string): Promise<void> {
  await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      const shop = await em.findOne(models.Shop, {
        where: { uid: id },
      });

      if (!shop) {
        throw new errors.APIError(404, "NOT_FOUND", "Shop not found");
      }

      await em.remove(shop);
    }
  );
}
```

---

## Transaction with Relationships

```typescript
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
```

---

## Important Transaction Rules

| Do | Don't |
|----|-------|
| ✅ Always use `em` (EntityManager) | ❌ Use repositories directly |
| ✅ Let errors propagate | ❌ Catch errors inside transaction |
| ✅ Cast return type with `as Type` | ❌ Use `this._persistenceContext` inside |
| ✅ Throw `APIError` for validation | ❌ Use try-catch inside `inTransaction()` |

---

## Development Checklist

- [ ] All database operations inside `inTransaction()`
- [ ] EntityManager (`em`) used for all database calls
- [ ] Return values cast to appropriate types
- [ ] No try-catch blocks inside transactions
- [ ] Errors thrown inside transaction auto-rollback

## Related

- [Error Handling](./error-handling.context.md) - APIError usage
- [Examples](./examples.context.md) - Complete service example
