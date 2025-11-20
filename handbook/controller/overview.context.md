# Controller Layer Guide

## Overview

The Controller Layer handles HTTP requests and responses. This is the **outermost layer** in MangoJS onion architecture - it depends on the Service Layer but contains minimal logic.

**Purpose**: Handle HTTP requests, validate input, call services, format responses

**Location**: `src/routes/v1/`

**Key Principle**: Controllers are thin layers that orchestrate HTTP communication. Business logic belongs in services.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Controller Setup](#controller-setup)
3. [Type-Safe APIs](#type-safe-apis)
4. [Complete CRUD Example](#complete-crud-example)
5. [Authorization](#authorization)
6. [Error Handling](#error-handling)
7. [Swagger Documentation](#swagger-documentation)
8. [Development Checklist](#development-checklist)
9. [Best Practices](#best-practices)

---

## Quick Start

> **💡 Tip:** See [Code Templates](../common/code-templates.context.md#controller-template) for copy-paste ready controller boilerplate.

### Step 1: Define API Types

Controllers use **API types** from the shared types package (monorepo) or local types (standalone). API types are organized by endpoint path and HTTP method.

> **📖 See:** [Type Organization Guide](../architecture/type.context.md) for complete API type setup, structure, and examples.

### Step 2: Create Controller

Use the [Controller Template](../common/code-templates.context.md#controller-template) as your starting point.

**File**: `services/{service-name}/src/routes/v1/shops/shop.controller.ts`

```typescript
import { Controller, Get, Post, Containers } from "@giusmento/mangojs-core";
import { Request, Response } from "express";
import type * as PBTypes from "@giusmento/pulcherbook-types"; // Shared types
import { ShopService } from "../../../services";
import { errors, utils } from "@giusmento/mangojs-core";

// Resolve service OUTSIDE controller class
const shopService = Containers.getContainer().get<ShopService>(ShopService, {
  autobind: true,
});

@Controller("/api/v1/shops")
export class ShopController {
  // Add methods here - see examples below
}
```

> **Note**: For standalone services, use `import { types } from "../../../types"` instead of the shared types package.

### Step 3: Register Controller

**File**: `src/routes/v1/index.ts`

```typescript
import { ShopController } from "./shops/shop.controller";
import { PartnerController } from "./partners/partner.controller";

export const routes = [
  ShopController,
  PartnerController,
  // Other controllers...
];
```

---

## Controller Setup

> **💡 See:** [Controller Template](../common/code-templates.context.md#controller-template) for complete boilerplate.

### @Controller Decorator

Defines the base path for all routes in the controller:

```typescript
@Controller("/api/v1/shops")
export class ShopController {
  // All routes start with /api/v1/shops
}
```

### Service Resolution

**Critical**:

- Resolve services from container OUTSIDE the controller class:

```typescript
// ✅ Correct - resolve outside class
const shopService = Containers.getContainer().get<ShopService>(ShopService, {
  autobind: true,
});

@Controller("/api/v1/shops")
export class ShopController {
  @Get("/")
  public async getShops(req: Request, res: Response) {
    const shops = await shopService.getShopsByPartner(partner_uid);
    // ...
  }
}

// ❌ Wrong - don't resolve inside class
@Controller("/api/v1/shops")
export class ShopController {
  private shopService = Containers.getContainer().get<ShopService>(ShopService);
}
```

- Always use `{ autobind: true }`

### HTTP Method Decorators

```typescript
@Get("/")                 // GET /api/v1/shops
@Get("/:shop_uid")        // GET /api/v1/shops/:shop_uid
@Post("/")                // POST /api/v1/shops
@Put("/:shop_uid")        // PUT /api/v1/shops/:shop_uid
@Delete("/:shop_uid")     // DELETE /api/v1/shops/:shop_uid
```

---

## Type-Safe APIs

Controllers use **API types** organized by endpoint path structure. API types are derived from entity types and define the HTTP contract.

### Using Types in Controller (Monorepo)

**Important**: Always import `Request` and `Response` from `@giusmento/mangojs-core`, not from `express`:

```typescript
import { Request, Response } from "@giusmento/mangojs-core";
```

Always specify all three generic parameters for `Request` in order:
1. **Params**: Route parameters type
2. **Body**: Request body type
3. **Query**: Query parameters type (use `QueryParams` in the types definition)

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
  // res is typed to return ResponseBody
}
```

> **📖 See:** [Type Organization Guide](../architecture/type.context.md) for complete API type structure, directory organization, and examples.

---

## Complete CRUD Example

Complete controller with all standard REST operations using monorepo shared types:

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Decorators,
  Containers,
  Request,
  Response,
  errors,
  utils,
} from "@giusmento/mangojs-core";
import type * as PBTypes from "@giusmento/pulcherbook-types";
import { ShopService } from "../../../services";

const shopService = Containers.getContainer().get<ShopService>(ShopService, {
  autobind: true,
});

@Controller("/api/v1/shops")
export class ShopController {
  /**
   * @swagger
   * /api/v1/shops:
   *   get:
   *     summary: Get all shops for a partner
   *     tags: [Shops]
   *     parameters:
   *       - in: query
   *         name: partner_uid
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: List of shops
   */
  @Get("/")
  @Decorators.auth.NoAuth()
  public async getShops(
    req: Request<
      PBTypes.partner.api.v1.shops.GET.Params,
      PBTypes.partner.api.v1.shops.GET.RequestBody,
      PBTypes.partner.api.v1.shops.GET.QueryParams
    >,
    res: Response<PBTypes.partner.api.v1.shops.GET.ResponseBody>
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
   * /api/v1/shops/{shop_uid}:
   *   get:
   *     summary: Get shop by ID
   *     tags: [Shops]
   *     parameters:
   *       - in: path
   *         name: shop_uid
   *         required: true
   *         schema:
   *           type: string
   */
  @Get("/:shop_uid")
  @Decorators.auth.NoAuth()
  public async getShop(
    req: Request<
      PBTypes.partner.api.v1.shops.GET.Params,
      PBTypes.partner.api.v1.shops.GET.RequestBody,
      PBTypes.partner.api.v1.shops.GET.QueryParams
    >,
    res: Response<PBTypes.partner.api.v1.shops.GET.ResponseBody>
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
   * /api/v1/shops:
   *   post:
   *     summary: Create a new shop
   *     tags: [Shops]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               partner_uid:
   *                 type: string
   *               shop_name:
   *                 type: string
   *               description:
   *                 type: string
   */
  @Post("/")
  @Decorators.auth.NoAuth()
  public async createShop(
    req: Request<
      PBTypes.partner.api.v1.shops.POST.Params,
      PBTypes.partner.api.v1.shops.POST.RequestBody,
      PBTypes.partner.api.v1.shops.POST.QueryParams
    >,
    res: Response<PBTypes.partner.api.v1.shops.POST.ResponseBody>
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
   * /api/v1/shops/{shop_uid}:
   *   put:
   *     summary: Update shop
   *     tags: [Shops]
   *     parameters:
   *       - in: path
   *         name: shop_uid
   *         required: true
   */
  @Put("/:shop_uid")
  @Decorators.auth.NoAuth()
  public async updateShop(
    req: Request<
      PBTypes.partner.api.v1.shops.PUT.Params,
      PBTypes.partner.api.v1.shops.PUT.RequestBody,
      PBTypes.partner.api.v1.shops.PUT.QueryParams
    >,
    res: Response<PBTypes.partner.api.v1.shops.PUT.ResponseBody>
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
   * /api/v1/shops/{shop_uid}:
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
    res: Response<PBTypes.partner.api.v1.shops.DELETE.ResponseBody>
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

## Authorization

Protect endpoints with authorization decorators:

### Common Authorization Patterns

```typescript
// Require specific user groups
@Decorators.auth.HasGroups(["Admin", "Moderator"])
public async adminOnly() {}

// Require specific user type
@Decorators.auth.HasUserType([Types.enums.AuthUserType.ADMIN])
public async typeRestricted() {}

// Require ownership (user can only access their own resources)
@Decorators.auth.RequiresOwnership({
  paramName: "id",        // URL parameter name
  userIdField: "uid",     // Field in authenticated user object
})
public async updateOwn() {}

// Allow multiple auth options (OR logic)
@Decorators.auth.OrAuth([
  Decorators.auth.HasGroups(["Admin"]),
  Decorators.auth.RequiresOwnership({ paramName: "id", userIdField: "uid" }),
])
public async flexibleAuth() {}

// Public endpoint (no authentication)
// No decorator needed, or explicitly:
@Decorators.auth.NoAuth()
public async publicEndpoint() {}
```

For complete decorator reference, see [Decorators Guide](../architecture/decorators.context.md).

---

## Error Handling

Controllers catch all errors and delegate to `errorHandler`:

```typescript
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

**Key Points**:

- Wrap service calls in `try-catch`
- Use `LogRequest` for tracking
- Let `errorHandler` format error responses
- Catch as `unknown`, cast to `Error`
- Services throw `APIError`, controller catches them

**Standard Response Format**:

```typescript
{
  ok: true,
  timestamp: "2025-11-05T12:00:00Z",
  requestId: "abc123",
  data: { /* your data */ }
}
```

---

## Swagger Documentation

Add JSDoc Swagger comments above controller methods for automatic API documentation:

```typescript
/**
 * @swagger
 * /api/v1/shops/{shop_uid}:
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
public async getShop(req: Request, res: Response) { }
```

**Swagger Best Practices**:

- Include `summary` for brief description
- Use `tags` to group related endpoints
- Document all path/query parameters
- Document request body for POST/PUT
- List possible response codes
- Add `description` for complex endpoints

---

## Development Checklist

Use this checklist when creating or modifying controllers:

**Controller Architecture**

- [ ] Controller uses `@Controller(basePath)` decorator
- [ ] Services resolved OUTSIDE controller class
- [ ] No business logic in controller methods
- [ ] No direct database access
- [ ] Controller exported and registered in routes array

**Type Safety**

- [ ] API types defined in shared package (`packages/types/{service}/api/v1/`) or local types
- [ ] Request and Response are imported from `@giusmento/mangojs-core`, not from `express`:
- [ ] Each HTTP method has `Params`, `RequestBody`, `ResponseBody`
- [ ] `ResponseBodyData` type derived from entity
- [ ] Controllers use API types from shared package (`PBTypes.{service}.api.v1.{resource}`)
- [ ] Request typed with `Request<RequestParams, RequestBody, QueryParams>`
- [ ] Response typed with `Response<ResponseBody>`

**HTTP Methods**

- [ ] Correct decorators used (`@Get`, `@Post`, `@Put`, `@Delete`)
- [ ] Route paths correct (`:uid` for parameters)
- [ ] HTTP methods match operations (POST=create, PUT=update)

**Authorization**

- [ ] Appropriate auth decorators applied
- [ ] Public endpoints have no auth (or `@NoAuth()`)
- [ ] Sensitive endpoints protected with groups/ownership
- [ ] Minimal permissions principle followed

**Response Handling**

- [ ] All responses include `ok`, `timestamp`, `requestId`, `data`
- [ ] Appropriate HTTP status codes (200, 201, 404, etc.)
- [ ] Sensitive fields excluded (passwords, internal IDs)
- [ ] Service responses mapped to API format

**Error Handling**

- [ ] All service calls wrapped in try-catch
- [ ] `LogRequest` used for tracking
- [ ] Errors caught as `unknown`, cast to `Error`
- [ ] `errorHandler` called in catch block
- [ ] No custom error response formats

**Documentation**

- [ ] All methods have `@swagger` JSDoc
- [ ] Swagger includes path, method, summary, tags
- [ ] Parameters documented
- [ ] Request body documented for POST/PUT
- [ ] Response codes documented

**Code Quality**

- [ ] Controller under 200 lines
- [ ] One controller per resource
- [ ] Consistent method naming
- [ ] No duplicate code

---

## Best Practices

**Controller Responsibilities**:

- ✅ Handle HTTP requests/responses
- ✅ Extract parameters and body
- ✅ Call service methods
- ✅ Map service data to API format
- ✅ Return standardized responses
- ✅ Catch and delegate errors

**Controllers Should NOT**:

- ❌ Contain business logic or validation
- ❌ Access database directly
- ❌ Transform or calculate data
- ❌ Handle errors differently per endpoint
- ❌ Expose raw entity objects

**Code Organization**:

- Keep controllers thin (< 200 lines)
- One controller per resource
- Group related endpoints together
- Use consistent method naming (`getUser`, `createUser`, etc.)
- Extract common logic to middleware if needed

**Security**:

- Always apply appropriate authorization decorators
- Validate user ownership for sensitive operations
- Never expose passwords or internal tokens
- Use HTTPS in production
- Sanitize user input (validate in services)

**Performance**:

- Only load data you need from services
- Use pagination for list endpoints
- Cache responses when appropriate
- Avoid N+1 queries (handle in service layer)

**Reference Implementation**:

- Shop Controller: `services/partner-service/src/routes/v1/shops/shop.controller.ts`
- See these for complete real-world monorepo examples
