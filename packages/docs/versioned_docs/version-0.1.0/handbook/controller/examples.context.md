---
sidebar_label: "Examples"
---

# Controller Examples

## Complete CRUD Controller

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Decorators,
  Request,
  Response,
  errors,
  utils,
} from "@mangojs/core";
import type * as PBTypes from "@theunionsquare/pulcherbook-types";
import { ShopService } from "../../../services";
import { serviceNameContainer } from "../../../inversify.config.ts";

const shopService = serviceNameContainer.get<ShopService>(ShopService, {
  autobind: true,
});

@Controller("/api/partner/v1/shops")
export class ShopController {
  /**
   * @swagger
   * /api/partner/v1/shops:
   *   get:
   *     summary: Get all shops for a partner
   *     tags: [Shops]
   */
  @Get("/")
  @Decorators.auth.NoAuth()
  public async getShops(
    req: Request<
      PBTypes.partner.api.v1.shops.GET.Params,
      PBTypes.partner.api.v1.shops.GET.RequestBody,
      PBTypes.partner.api.v1.shops.GET.QueryParams
    >,
    res: Response<PBTypes.partner.api.v1.shops.GET.ResponseBody>,
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const { partner_uid } = req.query as { partner_uid: string };
      const shops = await shopService.getShopsByPartner(partner_uid);

      return res.status(200).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: shops,
      });
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/partner/v1/shops/{shop_uid}:
   *   get:
   *     summary: Get shop by ID
   *     tags: [Shops]
   */
  @Get("/:shop_uid")
  @Decorators.auth.NoAuth()
  public async getShop(
    req: Request<
      PBTypes.partner.api.v1.shops.GET.Params,
      PBTypes.partner.api.v1.shops.GET.RequestBody,
      PBTypes.partner.api.v1.shops.GET.QueryParams
    >,
    res: Response<PBTypes.partner.api.v1.shops.GET.ResponseBody>,
  ): Promise<Response> {
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

  /**
   * @swagger
   * /api/partner/v1/shops:
   *   post:
   *     summary: Create a new shop
   *     tags: [Shops]
   */
  @Post("/")
  @Decorators.auth.NoAuth()
  public async createShop(
    req: Request<
      PBTypes.partner.api.v1.shops.POST.Params,
      PBTypes.partner.api.v1.shops.POST.RequestBody,
      PBTypes.partner.api.v1.shops.POST.QueryParams
    >,
    res: Response<PBTypes.partner.api.v1.shops.POST.ResponseBody>,
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const shop = await shopService.createShop(req.body);

      return res.status(201).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: shop,
      });
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/partner/v1/shops/{shop_uid}:
   *   put:
   *     summary: Update shop
   *     tags: [Shops]
   */
  @Put("/:shop_uid")
  @Decorators.auth.NoAuth()
  public async updateShop(
    req: Request<
      PBTypes.partner.api.v1.shops.PUT.Params,
      PBTypes.partner.api.v1.shops.PUT.RequestBody,
      PBTypes.partner.api.v1.shops.PUT.QueryParams
    >,
    res: Response<PBTypes.partner.api.v1.shops.PUT.ResponseBody>,
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const { shop_uid } = req.params;
      const shop = await shopService.updateShop(shop_uid, req.body);

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

  /**
   * @swagger
   * /api/partner/v1/shops/{shop_uid}:
   *   delete:
   *     summary: Delete shop
   *     tags: [Shops]
   */
  @Delete("/:shop_uid")
  @Decorators.auth.NoAuth()
  public async deleteShop(
    req: Request<
      PBTypes.partner.api.v1.shops.DELETE.Params,
      PBTypes.partner.api.v1.shops.DELETE.RequestBody,
      PBTypes.partner.api.v1.shops.DELETE.QueryParams
    >,
    res: Response<PBTypes.partner.api.v1.shops.DELETE.ResponseBody>,
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const { shop_uid } = req.params;
      await shopService.deleteShop(shop_uid);

      return res.status(200).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: { message: "Shop deleted successfully" },
      });
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }
}
```

---

## Swagger Documentation

Add JSDoc Swagger comments for API documentation:

```typescript
/**
 * @swagger
 * /api/partner/v1/shops/{shop_uid}:
 *   get:
 *     summary: Get shop by ID
 *     description: Retrieve detailed information about a specific shop
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: shop_uid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Shop ID
 *     responses:
 *       200:
 *         description: Shop found
 *       404:
 *         description: Shop not found
 *       401:
 *         description: Unauthorized
 */
@Get("/:shop_uid")
public async getShop(req: Request, res: Response) {}
```

**Swagger Best Practices:**
- Include `summary` for brief description
- Use `tags` to group related endpoints
- Document all path/query parameters
- Document request body for POST/PUT
- List possible response codes

---

## Best Practices

**Controller Responsibilities:**
- ✅ Handle HTTP requests/responses
- ✅ Extract parameters and body
- ✅ Call service methods
- ✅ Map service data to API format
- ✅ Return standardized responses
- ✅ Catch and delegate errors

**Controllers Should NOT:**
- ❌ Contain business logic or validation
- ❌ Access database directly
- ❌ Transform or calculate data
- ❌ Handle errors differently per endpoint

**Code Organization:**
- Keep controllers thin (< 200 lines)
- One controller per resource
- Group related endpoints together
- Use consistent method naming (`getUser`, `createUser`, etc.)

## Related

- [Setup](./setup.context.md) - Controller setup
- [Service Layer](../service/index.context.md) - Business logic
