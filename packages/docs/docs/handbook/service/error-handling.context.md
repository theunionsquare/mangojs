---
sidebar_label: "Error Handling"
---

# Service Error Handling

Always use `APIError` from MangoJS core for throwing errors.

## APIError Usage

```typescript
import { errors } from "@mangojs/core";

throw new errors.APIError(statusCode, errorCode, message);
```

---

## Common HTTP Status Codes

| Code | Type           | When to Use                        |
| ---- | -------------- | ---------------------------------- |
| 400  | BAD_REQUEST    | Invalid input, validation failures |
| 401  | UNAUTHORIZED   | Authentication required            |
| 403  | FORBIDDEN      | User lacks permission              |
| 404  | NOT_FOUND      | Resource doesn't exist             |
| 409  | CONFLICT       | Duplicate resource, state conflict |
| 500  | INTERNAL_ERROR | Unexpected server errors           |

---

## Error Examples

### Not Found

```typescript
const shop = await em.findOne(models.Shop, { where: { uid: id } });

if (!shop) {
  throw new errors.APIError(404, "NOT_FOUND", "Shop not found");
}
```

### Validation Error

```typescript
if (!data.shop_name) {
  throw new errors.APIError(400, "BAD_REQUEST", "Shop name is required");
}
```

### Duplicate/Conflict

```typescript
const existing = await em.findOne(models.Shop, {
  where: { shop_name: data.shop_name },
});

if (existing) {
  throw new errors.APIError(409, "CONFLICT", "Shop already exists");
}
```

### Forbidden

```typescript
if (shop.partner_uid !== currentUser.partnerId) {
  throw new errors.APIError(403, "FORBIDDEN", "Access denied to this shop");
}
```

---

## Error Propagation

Errors thrown inside `inTransaction()` automatically:
1. Rollback all database changes
2. Propagate to the controller
3. Get handled by `errorHandler`

```typescript
// Service - throw error inside transaction
public async createShop(data: CreateShopRequest): Promise<Shop> {
  const response = await this._persistenceContext.inTransaction(
    async (em: EntityManager) => {
      if (!data.shop_name) {
        throw new errors.APIError(400, "BAD_REQUEST", "Shop name required");
        // Transaction auto-rollbacks, error propagates up
      }
      // ...
    }
  );
  return response as Shop;
}

// Controller - catches and handles error
@Post("/")
public async createShop(req: Request, res: Response): Promise<Response> {
  try {
    const shop = await shopService.createShop(req.body);
    return res.status(201).send({ ok: true, data: shop });
  } catch (error: unknown) {
    return errors.errorHandler(res, error as Error);
    // errorHandler formats the APIError response
  }
}
```

---

## JSDoc Error Documentation

Document errors in service methods:

```typescript
/**
 * Create Shop - Create a new shop with validation
 *
 * @param data - Shop creation data
 * @returns Promise resolving to the created shop
 * @throws {APIError} 400 BAD_REQUEST if validation fails
 * @throws {APIError} 409 CONFLICT if shop already exists
 */
public async createShop(data: CreateShopRequest): Promise<Shop> {
  // Implementation
}
```

---

## Development Checklist

- [ ] All errors use `errors.APIError`
- [ ] Appropriate HTTP status codes used
- [ ] Descriptive error messages provided
- [ ] Errors documented in JSDoc with `@throws` tags
- [ ] No custom error response formats

## Related

- [Transactions](./transactions.context.md) - Transaction and rollback
- [Type Safety](../controller/type-safety.context.md) - Controller error handling
