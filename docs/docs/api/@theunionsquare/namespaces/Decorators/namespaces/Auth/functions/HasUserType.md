---
sidebar_label: HasUserType
---

# Function: HasUserType()

```ts
function HasUserType(userTypes, options?): MethodDecorator;
```

Defined in: [src/core/decorators/auth/hasUserType.decorator.ts:89](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/hasUserType.decorator.ts#L89)

Method decorator that restricts access to routes based on user type.

This decorator creates an authorization middleware that checks if the authenticated
user's type matches one of the allowed types. If the user type doesn't match any
of the allowed types, the request is rejected with a NOT_AUTHORIZED error.

When used with @OrAuth(), this decorator can be combined with other auth decorators
using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
AND logic (all must pass).

## Parameters

### userTypes

[`AuthUserType`](../../../../Types/namespaces/enums/enumerations/AuthUserType.md)[]

Array of allowed user types

### options?

[`DecoratorOptions`](../interfaces/DecoratorOptions.md)

Optional configuration for this decorator instance

## Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

## Example

```typescript
class UserController {
  // Basic usage: User must be ADMIN
  @HasUserType([AuthUserType.ADMIN])
  async deleteUser(req: Request, res: Response) {
    // Only accessible by users with ADMIN type
  }

  // Multiple user types in one decorator (OR within decorator)
  @HasUserType([AuthUserType.ADMIN, AuthUserType.MODERATOR])
  async updateUser(req: Request, res: Response) {
    // Accessible by users with ADMIN or MODERATOR type
  }

  // With custom error message
  @HasUserType([AuthUserType.ADMIN], {
    errorMessage: "Only administrators can access this endpoint"
  })
  async adminOnlyEndpoint(req: Request, res: Response) {}

  // With custom error handler
  @HasUserType([AuthUserType.PARTNER], {
    errorHandler: (res, error) => {
      res.status(403).json({ error: "Partner access required" });
    }
  })
  async partnerEndpoint(req: Request, res: Response) {}

  // Disabled for testing
  @HasUserType([AuthUserType.ADMIN], {
    disabled: process.env.NODE_ENV === "test"
  })
  async testEndpoint(req: Request, res: Response) {}

  // AND logic (default): Must be PARTNER AND have partner_admin group
  @HasUserType([AuthUserType.PARTNER])
  @HasGroups(["partner_admin"])
  async getPartnerData(req: Request, res: Response) {
    // User must be PARTNER AND have partner_admin group
  }

  // OR logic: Must be ADMIN OR PARTNER
  @OrAuth()
  @HasUserType([AuthUserType.ADMIN])
  @HasUserType([AuthUserType.PARTNER])
  async flexibleAccess(req: Request, res: Response) {
    // User can be ADMIN OR PARTNER (at least one must match)
  }
}
```

## Remarks

- By default, multiple auth decorators use AND logic (all must pass)
- Use @OrAuth() to enable OR logic (at least one must pass)
- This decorator only checks user type, not groups
- For combined user type and group validation, use

## Requires Access

## See

 - [OrAuth](OrAuth.md) for enabling OR logic between multiple decorators
 - [RequiresAccess](RequiresAccess.md) for combined user type and group validation
