---
sidebar_label: "Decorators"
---

# MangoJS Decorators Reference

## Table of Contents

1. [What Are Decorators?](#what-are-decorators)
2. [Controller & Routing Decorators](#controller--routing-decorators)
3. [Authentication & Authorization Decorators](#authentication--authorization-decorators)
4. [How to Use Decorators](#how-to-use-decorators)
5. [Testing Checklist](#testing-checklist)

---

## What Are Decorators?

Decorators are a TypeScript feature that allows you to add metadata and modify the behavior of classes, methods, and properties. In MangoJS, decorators are used to:

- **Define routes** - Map HTTP methods to controller methods
- **Apply authentication** - Protect endpoints with user type checks
- **Add middleware** - Inject custom request processing logic
- **Enable logging** - Automatically log method calls

Decorators use the `@` symbol and are placed directly above the class or method they modify.

## Controller & Routing Decorators

These decorators define HTTP routes and handle requests.

| Decorator           | Type   | Description                                         | Example                        | Parameters                                         |
| ------------------- | ------ | --------------------------------------------------- | ------------------------------ | -------------------------------------------------- |
| `@Controller(path)` | Class  | Define base route for all methods in the controller | `@Controller("/api/v1/users")` | `path: string` - Base URL path                     |
| `@Get(path)`        | Method | Handle HTTP GET requests                            | `@Get("/")` or `@Get("/:id")`  | `path: string` - Route path (supports params)      |
| `@Post(path)`       | Method | Handle HTTP POST requests                           | `@Post("/")`                   | `path: string` - Route path                        |
| `@Put(path)`        | Method | Handle HTTP PUT requests                            | `@Put("/:id")`                 | `path: string` - Route path                        |
| `@Delete(path)`     | Method | Handle HTTP DELETE requests                         | `@Delete("/:id")`              | `path: string` - Route path                        |
| `@Middleware(fn)`   | Method | Apply custom Express middleware                     | `@Middleware(corsMiddleware)`  | `fn: RequestHandler` - Express middleware function |
| `@loggedMethod()`   | Method | Log method calls with timestamp                     | `@loggedMethod()`              | None                                               |
| `@Use(handler)`     | Method | Apply generic request handler                       | `@Use(customHandler)`          | `handler: Function` - Custom handler               |

---

## Authentication & Authorization Decorators

These decorators control access to endpoints based on user authentication and permissions.

| Decorator                           | Type   | Description                                               | Example                                                | Parameters                                                                      |
| ----------------------------------- | ------ | --------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `@HasUserType(types[])`             | Method | Require specific user types to access endpoint            | `@HasUserType([AuthUserType.ADMIN])`                   | `types: AuthUserType[]` - Array of allowed user types                           |
| `@ClassHasUserType(types[])`        | Class  | Apply user type restriction to all methods in class       | `@ClassHasUserType([AuthUserType.ADMIN])`              | `types: AuthUserType[]` - Array of allowed user types                           |
| `@HasGroups(groups[])`              | Method | Require user to belong to specific groups                 | `@HasGroups(["admins", "moderators"])`                 | `groups: string[]` - Array of group names                                       |
| `@HasPermissions(perms[], opts?)`   | Method | Require user to have specific permissions (wildcard supported) | `@HasPermissions(["idm:user:*"])`                 | `perms: string[]` - Permission patterns, `opts?: { separator?: string }` (default: `:`) |
| `@RequiresAccess(resource, action)` | Method | Check if user has permission for specific resource/action | `@RequiresAccess("posts", "delete")`                   | `resource: string`, `action: string`                                            |
| `@RequiresOwnership(options)`       | Method | Verify user owns the resource being accessed              | `@RequiresOwnership({ ... })`                          | `options: OwnershipOptions` - Ownership validation config                       |
| `@NoAuth()`                         | Method | Explicitly mark endpoint as public (no auth required)     | `@NoAuth()`                                            | None                                                                            |
| `@OrAuth(decorators[])`             | Method | Apply OR logic to multiple auth decorators                | `@OrAuth([HasUserType([ADMIN]), HasGroups(["mods"])])` | `decorators: Function[]` - Array of auth decorators                             |

---

## How to Use Decorators

### Basic Usage

```typescript
import {
  Controller,
  Get,
  Decorators,
  Types,
} from "@theunionsquare/mangojs-core";
import { Request, Response } from "express";

@Controller("/api/v1/users/") // Class decorator (routing)
export class UserController {
  @Get("/") // Method decorator (HTTP verb)
  @loggedMethod() // Method decorator (logging)
  @Decorators.auth.HasUserType([
    // Method decorator (auth)
    Types.enums.AuthUserType.ADMIN,
  ])
  public async getUsers(req: Request, res: Response) {
    return res.status(200).json({ users: [] });
  }
}
```

### HasPermissions with Wildcards

The `@HasPermissions` decorator supports wildcard patterns using `*` to match permission segments.

```typescript
import { Controller, Get, Post, Delete, Decorators } from "@theunionsquare/mangojs-core";

@Controller("/api/v1/resources")
export class ResourceController {
  // Exact permission match
  @Get("/")
  @Decorators.auth.HasPermissions(["idm:user:read"])
  async listResources(req: Request, res: Response) {
    // Requires exact "idm:user:read" permission
  }

  // Wildcard at end - matches any action
  @Post("/")
  @Decorators.auth.HasPermissions(["idm:user:*"])
  async createResource(req: Request, res: Response) {
    // Matches: idm:user:read, idm:user:write, idm:user:delete
  }

  // Wildcard in middle - matches any resource
  @Get("/all")
  @Decorators.auth.HasPermissions(["idm:*:read"])
  async readAllResources(req: Request, res: Response) {
    // Matches: idm:user:read, idm:group:read, idm:role:read
  }

  // Multiple patterns (OR logic)
  @Delete("/:id")
  @Decorators.auth.HasPermissions(["idm:user:delete", "idm:admin:*"])
  async deleteResource(req: Request, res: Response) {
    // Requires "idm:user:delete" OR any idm:admin permission
  }

  // Custom separator for dot-notation
  @Get("/app")
  @Decorators.auth.HasPermissions(["app.users.*"], { separator: "." })
  async appEndpoint(req: Request, res: Response) {
    // Matches: app.users.read, app.users.write
  }
}
```

**Wildcard Rules:**
- `*` matches exactly one segment (between separators)
- `idm:user:*` matches `idm:user:read` but NOT `idm:user:sub:read`
- Default separator is `:`, configurable via `options.separator`
- User permissions are read from `req.authContext.user.permissions` or `req.user.permissions`
