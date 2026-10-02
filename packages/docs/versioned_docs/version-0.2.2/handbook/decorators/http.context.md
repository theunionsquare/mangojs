---
sidebar_label: "HTTP Decorators"
---

# HTTP & Routing Decorators

Decorators for defining HTTP routes and request handling.

---

## Controller

Defines the base route for all methods in a class.

```typescript
@Controller("/api/v1/users")
export class UserController {
  // All routes in this class will be prefixed with /api/v1/users
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | `string` | Base URL path for all routes |

---

## HTTP Methods

### @Get(path)

Handle HTTP GET requests.

```typescript
@Get("/")           // GET /api/v1/users/
@Get("/:id")        // GET /api/v1/users/:id
@Get("/search")     // GET /api/v1/users/search
```

### @Post(path)

Handle HTTP POST requests.

```typescript
@Post("/")          // POST /api/v1/users/
@Post("/batch")     // POST /api/v1/users/batch
```

### @Put(path)

Handle HTTP PUT requests.

```typescript
@Put("/:id")        // PUT /api/v1/users/:id
```

### @Delete(path)

Handle HTTP DELETE requests.

```typescript
@Delete("/:id")     // DELETE /api/v1/users/:id
```

---

## Middleware

### @Middleware(fn)

Apply Express middleware to a specific route.

```typescript
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({ windowMs: 60000, max: 100 });

@Controller("/api/v1/users")
export class UserController {
  @Post("/")
  @Middleware(limiter)
  async createUser(req: Request, res: Response) {}
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `fn` | `RequestHandler` | Express middleware function |

---

## Utility Decorators

### @loggedMethod()

Automatically log method calls with timestamp.

```typescript
@Get("/")
@loggedMethod()
async getUsers(req: Request, res: Response) {
  // Logs: [timestamp] getUsers called
}
```

### @Use(handler)

Apply a generic request handler.

```typescript
@Get("/")
@Use(customHandler)
async getUsers(req: Request, res: Response) {}
```

---

## Complete Example

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Middleware,
  loggedMethod,
} from "@theunionsquare/mangojs-core";
import { Request, Response } from "express";

@Controller("/api/v1/products")
export class ProductController {
  @Get("/")
  @loggedMethod()
  async listProducts(req: Request, res: Response) {
    return res.json({ products: [] });
  }

  @Get("/:id")
  async getProduct(req: Request, res: Response) {
    const { id } = req.params;
    return res.json({ id });
  }

  @Post("/")
  @Middleware(validateBody)
  async createProduct(req: Request, res: Response) {
    return res.status(201).json(req.body);
  }

  @Put("/:id")
  async updateProduct(req: Request, res: Response) {
    return res.json({ updated: true });
  }

  @Delete("/:id")
  async deleteProduct(req: Request, res: Response) {
    return res.status(204).send();
  }
}
```

---

## See Also

- [Decorators Overview](./index.context.md)
- [Authentication Decorators](./auth.context.md)
