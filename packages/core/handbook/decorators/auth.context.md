---
sidebar_label: "Auth Decorators"
---

# Authentication & Authorization Decorators

Decorators for controlling access to endpoints based on user authentication and permissions.

---

## Quick Reference

| Decorator | Description |
|-----------|-------------|
| `@HasUserType(types[])` | Require specific user types |
| `@ClassHasUserType(types[])` | Apply user type to all methods |
| `@HasGroups(groups[])` | Require user in specific groups |
| `@HasPermissions(perms[])` | Require specific permissions (wildcard supported) |
| `@RequiresAccess(resource, action)` | Check resource/action permission |
| `@RequiresOwnership(options)` | Verify user owns the resource |
| `@NoAuth()` | Mark endpoint as public |
| `@OrAuth()` | Apply OR logic to auth decorators |

---

## @HasUserType

Require specific user types to access endpoint.

```typescript
import { Decorators, Types } from "@theunionsquare/mangojs-core";

@Get("/admin")
@Decorators.auth.HasUserType([Types.enums.AuthUserType.ADMIN])
async adminOnly(req: Request, res: Response) {}

// Multiple types (OR logic within decorator)
@Get("/staff")
@Decorators.auth.HasUserType([
  Types.enums.AuthUserType.ADMIN,
  Types.enums.AuthUserType.MODERATOR,
])
async staffOnly(req: Request, res: Response) {}
```

---

## @ClassHasUserType

Apply user type restriction to all methods in a class.

```typescript
@Controller("/api/v1/admin")
@Decorators.auth.ClassHasUserType([Types.enums.AuthUserType.ADMIN])
export class AdminController {
  // All methods require ADMIN user type
  @Get("/dashboard")
  async dashboard(req: Request, res: Response) {}

  @Get("/settings")
  async settings(req: Request, res: Response) {}
}
```

---

## @HasGroups

Require user to belong to specific groups.

```typescript
@Get("/moderator-panel")
@Decorators.auth.HasGroups(["moderators"])
async moderatorPanel(req: Request, res: Response) {}

// Multiple groups (OR logic within decorator)
@Get("/content")
@Decorators.auth.HasGroups(["editors", "publishers", "admins"])
async manageContent(req: Request, res: Response) {}
```

---

## @HasPermissions

Require user to have specific permissions. Supports wildcard patterns.

### Basic Usage

```typescript
// Exact permission match
@Get("/")
@Decorators.auth.HasPermissions(["idm:user:read"])
async listUsers(req: Request, res: Response) {}
```

### Wildcard Patterns

```typescript
// Wildcard at end - matches any action
@Post("/")
@Decorators.auth.HasPermissions(["idm:user:*"])
async createUser(req: Request, res: Response) {
  // Matches: idm:user:read, idm:user:write, idm:user:delete
}

// Wildcard in middle - matches any resource
@Get("/all")
@Decorators.auth.HasPermissions(["idm:*:read"])
async readAll(req: Request, res: Response) {
  // Matches: idm:user:read, idm:group:read, idm:role:read
}

// Multiple patterns (OR logic)
@Delete("/:id")
@Decorators.auth.HasPermissions(["idm:user:delete", "idm:admin:*"])
async deleteUser(req: Request, res: Response) {
  // Requires "idm:user:delete" OR any idm:admin permission
}
```

### Custom Separator

```typescript
// Use dot notation instead of colon
@Get("/app")
@Decorators.auth.HasPermissions(["app.users.*"], { separator: "." })
async appEndpoint(req: Request, res: Response) {
  // Matches: app.users.read, app.users.write
}
```

### Wildcard Rules

- `*` matches exactly one segment (between separators)
- `idm:user:*` matches `idm:user:read` but NOT `idm:user:sub:read`
- Default separator is `:`, configurable via `options.separator`
- User permissions read from `req.authContext.user.permissions`

---

## @RequiresAccess

Check if user has permission for a specific resource/action combination.

```typescript
@Delete("/:id")
@Decorators.auth.RequiresAccess("posts", "delete")
async deletePost(req: Request, res: Response) {}

@Put("/:id")
@Decorators.auth.RequiresAccess("users", "update")
async updateUser(req: Request, res: Response) {}
```

---

## @RequiresOwnership

Verify user owns the resource being accessed.

```typescript
@Put("/:id")
@Decorators.auth.RequiresOwnership({
  resourceIdParam: "id",
  userIdField: "userId",
  resourceLoader: async (id) => await userRepo.findById(id),
})
async updateOwnProfile(req: Request, res: Response) {}
```

| Option | Type | Description |
|--------|------|-------------|
| `resourceIdParam` | `string` | Request param containing resource ID |
| `userIdField` | `string` | Field on resource containing owner ID |
| `resourceLoader` | `function` | Async function to load the resource |

---

## @NoAuth

Mark endpoint as public (no authentication required).

```typescript
@Get("/health")
@Decorators.auth.NoAuth()
async healthCheck(req: Request, res: Response) {
  return res.json({ status: "ok" });
}

@Post("/login")
@Decorators.auth.NoAuth()
async login(req: Request, res: Response) {}
```

---

## @OrAuth

Apply OR logic to multiple auth decorators. By default, decorators use AND logic.

```typescript
// Without @OrAuth: User must be ADMIN AND in superusers group
@Get("/admin")
@Decorators.auth.HasUserType([ADMIN])
@Decorators.auth.HasGroups(["superusers"])
async adminEndpoint(req: Request, res: Response) {}

// With @OrAuth: User must be ADMIN OR in superusers group
@Get("/admin")
@Decorators.auth.OrAuth()
@Decorators.auth.HasUserType([ADMIN])
@Decorators.auth.HasGroups(["superusers"])
async adminEndpoint(req: Request, res: Response) {}
```

---

## Combining Decorators

### AND Logic (Default)

```typescript
@Get("/secure")
@Decorators.auth.HasUserType([ADMIN])
@Decorators.auth.HasPermissions(["system:config:write"])
async updateConfig(req: Request, res: Response) {
  // Must be ADMIN AND have system:config:write permission
}
```

### OR Logic

```typescript
@Get("/content")
@Decorators.auth.OrAuth()
@Decorators.auth.HasPermissions(["admin:*"])
@Decorators.auth.HasGroups(["superusers"])
async contentEndpoint(req: Request, res: Response) {
  // Has any admin permission OR belongs to superusers group
}
```

---

## See Also

- [Decorators Overview](./index.context.md)
- [HTTP Decorators](./http.context.md)
- [Authentication Architecture](../authentication/architecture.context.md)
