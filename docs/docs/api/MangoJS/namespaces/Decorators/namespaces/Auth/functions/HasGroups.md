[**MangoJS**](../../../../../../README.md)

***

# Function: HasGroups()

```ts
function HasGroups(groups, options?): MethodDecorator;
```

Defined in: src/core/decorators/auth/hasGroups.decorator.ts:100

Method decorator that restricts access to routes based on user groups.

This decorator creates an authorization middleware that checks if the authenticated
user belongs to at least one of the specified groups. If the user doesn't have any
of the required groups, the request is rejected with a NOT_AUTHORIZED error.

When used with @OrAuth(), this decorator can be combined with other auth decorators
using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
AND logic (all must pass).

## Parameters

### groups

`string`[]

Array of group names that are allowed to access the route

### options?

[`DecoratorOptions`](../interfaces/DecoratorOptions.md)

Optional configuration for this decorator instance

## Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

## Example

```typescript
class UserController {
  // Single decorator with multiple groups (OR within decorator)
  @HasGroups(["admin", "moderator"])
  async deleteUser(req: Request, res: Response) {
    // Accessible by users with "admin" OR "moderator" group
  }

  // Single group requirement
  @HasGroups(["premium_user"])
  async getPremiumContent(req: Request, res: Response) {
    // Only accessible by users with "premium_user" group
  }

  // With custom error message
  @HasGroups(["admin"], {
    errorMessage: "Only administrators can access this endpoint"
  })
  async adminOnlyEndpoint(req: Request, res: Response) {}

  // With custom error handler
  @HasGroups(["premium_user"], {
    errorHandler: (res, error) => {
      res.status(403).json({ error: "Premium membership required" });
    }
  })
  async premiumEndpoint(req: Request, res: Response) {}

  // Disabled for testing
  @HasGroups(["admin"], {
    disabled: process.env.NODE_ENV === "test"
  })
  async testEndpoint(req: Request, res: Response) {}

  // AND logic (default): Must be PARTNER AND have partner_admin group
  @HasUserType([AuthUserType.PARTNER])
  @HasGroups(["partner_admin"])
  async restrictedEndpoint(req: Request, res: Response) {
    // User must be PARTNER AND have partner_admin group
  }

  // OR logic: Must have admin group OR moderator group (with different types)
  @OrAuth()
  @HasGroups(["admin"])
  @HasGroups(["moderator"])
  async flexibleEndpoint(req: Request, res: Response) {
    // User must have admin OR moderator group
  }

  // OR logic: ADMIN user OR user with special_access group
  @OrAuth()
  @HasUserType([AuthUserType.ADMIN])
  @HasGroups(["special_access"])
  async specialEndpoint(req: Request, res: Response) {
    // ADMIN (any group) OR any user with special_access group
  }
}
```

## Remarks

- By default, multiple auth decorators use AND logic (all must pass)
- Use @OrAuth() to enable OR logic (at least one must pass)
- This decorator only checks groups and does not validate user type
- For combined user type and group validation, use

## Requires Access

instead

## See

 - [OrAuth](OrAuth.md) for enabling OR logic between multiple decorators
 - [RequiresAccess](RequiresAccess.md) for combined user type and group validation with wildcard support
