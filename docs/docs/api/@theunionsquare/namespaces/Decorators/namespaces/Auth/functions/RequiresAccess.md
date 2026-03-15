---
sidebar_label: RequiresAccess
---

# Function: RequiresAccess()

```ts
function RequiresAccess(accessMap, options?): MethodDecorator;
```

Defined in: [src/core/decorators/auth/requiresAccess.decorator.ts:184](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/requiresAccess.decorator.ts#L184)

Method decorator that restricts access to routes based on user type and group combinations.

This decorator creates an authorization middleware that checks if the authenticated
user's type and group combination matches any of the allowed configurations. The user
must have the specified user type AND belong to one of the allowed groups for that type.

Supports wildcard patterns for flexible group matching:
- `"*"` matches any group
- `"partner_*"` matches groups starting with "partner_"
- `"*_admin"` matches groups ending with "_admin"
- `"partner_*_admin"` matches groups with prefix and suffix
- No wildcard performs exact match

When used with @OrAuth(), this decorator can be combined with other auth decorators
using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
AND logic (all must pass).

## Parameters

### accessMap

`AccessRequirements`

Object mapping user types to their allowed groups (with wildcard support)

### options?

[`DecoratorOptions`](../interfaces/DecoratorOptions.md)

Optional configuration for this decorator instance

## Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

## Example

```typescript
class PartnerUserController {
  // Single decorator with user type + group validation
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"],           // Any admin group
    [AuthUserType.PARTNER]: ["partner_admin"]    // Exact match
  })
  async getPartnerUsers(req: Request, res: Response) {
    // Accessible by:
    // - ADMIN users with any group starting with "admin_"
    // OR
    // - PARTNER users with exact "partner_admin" group
  }

  // Allow any group for ADMIN users
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["*"]
  })
  async adminOnlyEndpoint(req: Request, res: Response) {
    // ADMIN users with any group can access
  }

  // With custom error message
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"],
    [AuthUserType.PARTNER]: ["partner_admin"]
  }, {
    errorMessage: "Access restricted to admins and partner admins only"
  })
  async restrictedEndpoint(req: Request, res: Response) {}

  // With custom error handler
  @RequiresAccess({
    [AuthUserType.PARTNER]: ["partner_*"]
  }, {
    errorHandler: (res, error) => {
      res.status(403).json({ error: "Partner access required" });
    }
  })
  async partnerEndpoint(req: Request, res: Response) {}

  // Disabled for testing
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"]
  }, {
    disabled: process.env.NODE_ENV === "test"
  })
  async testEndpoint(req: Request, res: Response) {}

  // Wildcard patterns
  @RequiresAccess({
    [AuthUserType.PARTNER]: ["partner_*"],       // Any partner group
    [AuthUserType.USER]: ["*_premium"]           // Any premium group
  })
  async premiumContent(req: Request, res: Response) {
    // PARTNER with any partner_* group OR USER with any *_premium group
  }

  // OR logic: Multiple access patterns
  @OrAuth()
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"]
  })
  @RequiresAccess({
    [AuthUserType.PARTNER]: ["partner_admin", "partner_superuser"]
  })
  async flexibleAccess(req: Request, res: Response) {
    // Passes if ANY of these are true:
    // - ADMIN with any admin_* group
    // OR
    // - PARTNER with partner_admin or partner_superuser group
  }

  // Combining with other decorators using OR logic
  @OrAuth()
  @RequiresAccess({
    [AuthUserType.PARTNER]: ["partner_admin"]
  })
  @HasUserType([AuthUserType.SYSTEM])
  async systemOrPartnerAdmin(req: Request, res: Response) {
    // PARTNER with partner_admin group OR any SYSTEM user
  }
}
```

## Remarks

- Within a single

## Requires Access

decorator, different user types use OR logic
- Multiple

## Requires Access

decorators use AND logic by default
- Use @OrAuth() to enable OR logic between multiple decorators
- Wildcard patterns provide flexible group matching
- This is the most powerful auth decorator, combining user type and group validation

## See

 - [OrAuth](OrAuth.md) for enabling OR logic between multiple decorators
 - [HasUserType](HasUserType.md) for user type-only validation
 - [HasGroups](HasGroups.md) for group-only validation
