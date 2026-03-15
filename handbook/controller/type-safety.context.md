---
sidebar_label: "Type Safety"
---

# Type-Safe Controllers

## Import Request/Response

**Important**: Always import `Request` and `Response` from `@mangojs/core`, not from `express`.

```typescript
import { Request, Response } from "@mangojs/core";
```

---

## Request Type Parameters

Always specify all three generic parameters for `Request` in order:

1. **Params**: Route parameters type
2. **Body**: Request body type
3. **Query**: Query parameters type

```typescript
@Post("/")
public async createShop(
  req: Request<
    PBTypes.partner.api.v1.shops.POST.Params,
    PBTypes.partner.api.v1.shops.POST.RequestBody,
    PBTypes.partner.api.v1.shops.POST.QueryParams
  >,
  res: Response<PBTypes.partner.api.v1.shops.POST.ResponseBody>
): Promise<Response> {
  // req.params is typed as Params
  // req.body is typed as RequestBody
  // req.query is typed as QueryParams
}
```

---

## API Types Import Pattern

```typescript
import type * as PBTypes from "@theunionsquare/pulcherbook-types";

// Access types via namespace
PBTypes.partner.api.v1.shops.GET.Params
PBTypes.partner.api.v1.shops.GET.RequestBody
PBTypes.partner.api.v1.shops.GET.QueryParams
PBTypes.partner.api.v1.shops.GET.ResponseBody
```

---

## Standard Response Format

All responses follow this structure:

```typescript
return res.status(200).send({
  ok: true,
  timestamp: logRequest.timestamp,
  requestId: logRequest.requestId,
  data: shops,
});
```

**Response Structure:**

```typescript
{
  ok: true,
  timestamp: "2025-11-05T12:00:00Z",
  requestId: "abc123",
  data: { /* your data */ }
}
```

---

## LogRequest Usage

Use `LogRequest` for tracking requests:

```typescript
import { utils } from "@mangojs/core";

@Get("/")
public async getShops(req: Request, res: Response): Promise<Response> {
  const logRequest = new utils.LogRequest(res);

  // Use in response
  return res.status(200).send({
    ok: true,
    timestamp: logRequest.timestamp,
    requestId: logRequest.requestId,
    data: shops,
  });
}
```

---

## Error Handling Pattern

Wrap service calls in try-catch and use `errorHandler`:

```typescript
import { errors, utils } from "@mangojs/core";

@Get("/:shop_uid")
public async getShop(req: Request, res: Response): Promise<Response> {
  const logRequest = new utils.LogRequest(res);
  try {
    const { shop_uid } = req.params;
    const shop = await shopService.getShopById(shop_uid);

    return res.status(200).send({
      ok: true,
      timestamp: logRequest.timestamp,
      requestId: logRequest.requestId,
      data: shop,
    });
  } catch (error: unknown) {
    return errors.errorHandler(res, error as Error);
  }
}
```

---

## Development Checklist

- [ ] Request/Response imported from `@mangojs/core`
- [ ] Request typed with `Request<Params, Body, Query>`
- [ ] Response typed with `Response<ResponseBody>`
- [ ] All responses include `ok`, `timestamp`, `requestId`, `data`
- [ ] Appropriate HTTP status codes used
- [ ] All service calls wrapped in try-catch
- [ ] `errorHandler` called in catch block

## Related

- [Type Organization](../project-structure/types.context.md) - API type structure
- [Setup](./setup.context.md) - Controller setup
