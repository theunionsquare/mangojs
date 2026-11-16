---
sidebar_label: "Decorators"
---

# MangoJS Decorators

Decorators are TypeScript features that add metadata and modify behavior of classes and methods.

**In MangoJS, decorators are used to:**

- Define routes (map HTTP methods to controller methods)
- Apply authentication (protect endpoints)
- Add middleware (inject custom request processing)
- Enable logging (automatically log method calls)

---

## Decorator Categories

| Category | Description |
|----------|-------------|
| [HTTP & Routing](./http.context.md) | Controller, route methods, middleware |
| [Authentication](./auth.context.md) | User types, groups, permissions, ownership |

---

## Quick Example

```typescript
import {
  Controller,
  Get,
  Decorators,
  Types,
} from "@theunionsquare/mangojs-core";
import { Request, Response } from "express";

@Controller("/api/v1/users")
export class UserController {
  @Get("/")
  @Decorators.auth.HasUserType([Types.enums.AuthUserType.ADMIN])
  public async getUsers(req: Request, res: Response) {
    return res.status(200).json({ users: [] });
  }
}
```

---

## Decorator Execution Order

When multiple decorators are applied:

1. **Class decorators** execute first (e.g., `@Controller`)
2. **Method decorators** execute bottom-to-top
3. **Auth decorators** default to AND logic (all must pass)
4. Use `@OrAuth()` to switch to OR logic

```typescript
@Controller("/api/v1/admin")
export class AdminController {
  @Get("/")
  @Decorators.auth.HasUserType([ADMIN])       // 2. Must be ADMIN
  @Decorators.auth.HasGroups(["superusers"])  // 1. AND in superusers group
  async dashboard(req: Request, res: Response) {}
}
```

---

## Testing Checklist

- [ ] Decorator order is correct (bottom-to-top for methods)
- [ ] Auth decorators match endpoint requirements
- [ ] `@NoAuth()` used for public endpoints
- [ ] `@OrAuth()` used when OR logic is needed
