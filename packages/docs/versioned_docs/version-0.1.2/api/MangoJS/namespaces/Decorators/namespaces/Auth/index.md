---
sidebar_label: Auth
---

# Auth

## Description

Authorization decorators for Express route protection.

## Interfaces

### OwnershipOptions

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:33](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L33)

Configuration options for the RequiresOwnership decorator

#### Extends

- [`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions)

#### Properties

##### arrayField?

```ts
optional arrayField: boolean;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:58](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L58)

Whether the user field contains an array of IDs
If true, checks if resource ID is in the user's array
If false, checks direct equality

###### Default

```ts
false
```

##### auditLog?

```ts
optional auditLog: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:120](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L120)

Enable audit logging for this endpoint
Overrides global setting

###### Inherited from

[`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions).[`auditLog`](../../../Authorization/index.md#auditlog)

##### cache?

```ts
optional cache: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:126](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L126)

Enable caching for this endpoint
Overrides global setting

###### Inherited from

[`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions).[`cache`](../../../Authorization/index.md#cache)

##### cacheTTL?

```ts
optional cacheTTL: number;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:132](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L132)

Cache TTL for this endpoint in milliseconds
Overrides global setting

###### Inherited from

[`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions).[`cacheTTL`](../../../Authorization/index.md#cachettl-1)

##### customValidator?

```ts
optional customValidator: OwnershipValidator;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:64](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L64)

Custom validation function for complex ownership logic
If provided, overrides the default equality/array checks

##### disabled?

```ts
optional disabled: boolean;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:142](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L142)

Disable this auth check (useful for testing)

###### Inherited from

[`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions).[`disabled`](../../../Authorization/index.md#disabled)

##### errorHandler?

```ts
optional errorHandler: AuthErrorHandler;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:137](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L137)

Custom error handler for this endpoint

###### Inherited from

[`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions).[`errorHandler`](../../../Authorization/index.md#errorhandler-1)

##### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [packages/core/src/core/authz/authConfig.ts:114](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/authz/authConfig.ts#L114)

Custom error message for this endpoint

###### Inherited from

[`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions).[`errorMessage`](../../../Authorization/index.md#errormessage)

##### paramName?

```ts
optional paramName: string;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:44](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L44)

Parameter name in the request (params/query/body)

###### Default

`${resourceName}Id`

##### paramSource?

```ts
optional paramSource: ParameterSource;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:50](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L50)

Source of the parameter in the request

###### Default

```ts
"params"
```

##### userField?

```ts
optional userField: string;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:38](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L38)

Field name in the user context to check

###### Default

`${resourceName}Id`

## Type Aliases

### OwnershipValidator()

```ts
type OwnershipValidator = (userValue, resourceValue, req) => boolean | Promise<boolean>;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:24](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L24)

Custom ownership validator function

#### Parameters

##### userValue

`any`

The value from the user context

##### resourceValue

`any`

The value from the request

##### req

`Request`

The full request object for complex logic

#### Returns

`boolean` \| `Promise`\<`boolean`\>

true if user owns the resource, false otherwise

***

### ParameterSource

```ts
type ParameterSource = "params" | "query" | "body";
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:15](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L15)

Source of the resource identifier in the request

## Functions

### ClassHasUserType()

```ts
function ClassHasUserType(userTypes): ClassDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/classHasUserType.decorator.ts:43](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/classHasUserType.decorator.ts#L43)

Class decorator that applies user type authorization to all methods in a class.

This decorator sets default authorization requirements for all methods in the class
based on user type. Individual methods can override this by using method-level
decorators like

#### Parameters

##### userTypes

[`AuthUserType`](../../../Types/namespaces/enums/index.md#authusertype)[]

Array of user types that are allowed to access all methods in the class

#### Returns

`ClassDecorator`

A class decorator that applies user type authorization to all methods

#### Requires Access

or @NoAuth.

#### Example

```typescript
@Controller("/api/iam/v1/partners/users")
@ClassHasUserType([AuthUserType.ADMIN, AuthUserType.PARTNER])
export class PartnerUserController {
  @Get("/")
  async getPartnerUsers(req: Request, res: Response) {
    // Accessible by ADMIN or PARTNER users
  }

  @Post("/")
  async addPartnerUser(req: Request, res: Response) {
    // Accessible by ADMIN or PARTNER users
  }

  @Get("/admin-only")
  @RequiresAccess({
    [AuthUserType.ADMIN]: ["admin_*"]
  })
  async adminOnlyEndpoint(req: Request, res: Response) {
    // Override: Only ADMIN with specific groups
  }
}
```

#### Remarks

- Applied at the class level, affects all methods by default
- Method-level decorators can override the class-level authorization
- Only checks user type, not groups. For group validation, use method-level

#### Requires Access

***

### HasGroups()

```ts
function HasGroups(groups, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/hasGroups.decorator.ts:100](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/hasGroups.decorator.ts#L100)

Method decorator that restricts access to routes based on user groups.

This decorator creates an authorization middleware that checks if the authenticated
user belongs to at least one of the specified groups. If the user doesn't have any
of the required groups, the request is rejected with a NOT_AUTHORIZED error.

When used with @OrAuth(), this decorator can be combined with other auth decorators
using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
AND logic (all must pass).

#### Parameters

##### groups

`string`[]

Array of group names that are allowed to access the route

##### options?

[`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions)

Optional configuration for this decorator instance

#### Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

#### Example

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

#### Remarks

- By default, multiple auth decorators use AND logic (all must pass)
- Use @OrAuth() to enable OR logic (at least one must pass)
- This decorator only checks groups and does not validate user type
- For combined user type and group validation, use

#### Requires Access

instead

#### See

 - [OrAuth](#orauth) for enabling OR logic between multiple decorators
 - [RequiresAccess](#requiresaccess) for combined user type and group validation with wildcard support

***

### HasPermissions()

```ts
function HasPermissions(permissions, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/hasPermissions.decorator.ts:93](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/hasPermissions.decorator.ts#L93)

Method decorator that restricts access to routes based on user permissions.

This decorator creates an authorization middleware that checks if the authenticated
user has at least one of the specified permissions. Supports wildcard patterns
using `*` to match any segment.

#### Parameters

##### permissions

`string`[]

Array of permission patterns that are allowed to access the route

##### options?

[`HasPermissionsOptions`](../../../Authorization/index.md#haspermissionsoptions)

Optional configuration for this decorator instance

#### Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

#### Example

```typescript
class UserController {
  // Exact permission match
  @HasPermissions(["idm:user:read"])
  async getUsers(req: Request, res: Response) {
    // Requires exact "idm:user:read" permission
  }

  // Wildcard at the end - matches any action on idm:user
  @HasPermissions(["idm:user:*"])
  async manageUsers(req: Request, res: Response) {
    // Matches: idm:user:read, idm:user:write, idm:user:delete
  }

  // Wildcard in the middle - matches any resource with read permission
  @HasPermissions(["idm:*:read"])
  async readAnyResource(req: Request, res: Response) {
    // Matches: idm:user:read, idm:group:read, idm:role:read
  }

  // Multiple patterns (OR logic within decorator)
  @HasPermissions(["idm:user:read", "idm:admin:*"])
  async getUser(req: Request, res: Response) {
    // Requires "idm:user:read" OR any idm:admin permission
  }

  // Custom separator for dot-notation permissions
  @HasPermissions(["app.users.*"], { separator: "." })
  async appUsers(req: Request, res: Response) {
    // Matches: app.users.read, app.users.write
  }

  // Combined with other decorators (AND logic by default)
  @HasUserType([AuthUserType.ADMIN])
  @HasPermissions(["system:config:write"])
  async updateConfig(req: Request, res: Response) {
    // Must be ADMIN AND have system:config:write permission
  }

  // OR logic with other decorators
  @OrAuth()
  @HasPermissions(["admin:*"])
  @HasGroups(["superusers"])
  async adminEndpoint(req: Request, res: Response) {
    // Has any admin permission OR belongs to superusers group
  }
}
```

#### Remarks

- Wildcards match exactly one segment (between separators)
- `idm:user:*` matches `idm:user:read` but NOT `idm:user:sub:read`
- The default separator is `:`, but can be changed via options
- User permissions are extracted from `req.authContext.user.permissions` or `req.user.permissions`

#### See

 - [HasGroups](#hasgroups) for group-based authorization
 - [OrAuth](#orauth) for enabling OR logic between multiple decorators

***

### HasUserType()

```ts
function HasUserType(userTypes, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/hasUserType.decorator.ts:93](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/hasUserType.decorator.ts#L93)

Method decorator that restricts access to routes based on user type.

This decorator creates an authorization middleware that checks if the authenticated
user's type matches one of the allowed types. If the user type doesn't match any
of the allowed types, the request is rejected with a NOT_AUTHORIZED error.

When used with @OrAuth(), this decorator can be combined with other auth decorators
using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
AND logic (all must pass).

#### Parameters

##### userTypes

[`AuthUserType`](../../../Types/namespaces/enums/index.md#authusertype)[]

Array of allowed user types

##### options?

[`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions)

Optional configuration for this decorator instance

#### Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

#### Example

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

#### Remarks

- By default, multiple auth decorators use AND logic (all must pass)
- Use @OrAuth() to enable OR logic (at least one must pass)
- This decorator only checks user type, not groups
- For combined user type and group validation, use

#### Requires Access

#### See

 - [OrAuth](#orauth) for enabling OR logic between multiple decorators
 - [RequiresAccess](#requiresaccess) for combined user type and group validation

***

### NoAuth()

```ts
function NoAuth(): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/noAuth.decorator.ts:35](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/noAuth.decorator.ts#L35)

Method decorator that removes all authorization requirements from a method.

This decorator is useful when you have a class-level authorization decorator
(like @ClassHasUserType) but want to make specific methods publicly accessible
without any authentication or authorization checks.

#### Returns

`MethodDecorator`

A method decorator that clears all authorization middleware

#### Example

```typescript
@Controller("/api/iam/v1/partners/users")
@ClassHasUserType([AuthUserType.PARTNER])
export class PartnerUserController {
  @Get("/")
  async getPartnerUsers(req: Request, res: Response) {
    // Protected: Only PARTNER users
  }

  @Get("/magiclinks/:magiclink")
  @NoAuth()
  async getPartnerUserByMagicLink(req: Request, res: Response) {
    // Public: No authentication required
  }
}
```

#### Remarks

- Use this decorator to override class-level authorization
- Removes all authorization middleware from the method
- Should be used carefully as it makes endpoints publicly accessible

***

### OrAuth()

```ts
function OrAuth(): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/orAuth.decorator.ts:44](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/orAuth.decorator.ts#L44)

Method decorator that enables OR logic for multiple authorization decorators.

When applied, this decorator changes the behavior of multiple stacked authorization
decorators from AND logic (all must pass) to OR logic (at least one must pass).

Without @OrAuth: All authorization decorators must pass (AND logic)
With @OrAuth: At least one authorization decorator must pass (OR logic)

IMPORTANT: Due to decorator execution order, @OrAuth() must be placed at the TOP
of the decorator stack. Decorators execute bottom-to-top, so @OrAuth() executes last
but needs to set metadata that other decorators read during their execution.

#### Returns

`MethodDecorator`

A method decorator that enables OR mode for authorization

#### Example

```typescript
class PartnerUserController {
  // AND logic (default): Must be PARTNER AND have partner_admin group
  @HasUserType([AuthUserType.PARTNER])
  @HasGroups(["partner_admin"])
  async strictEndpoint(req: Request, res: Response) {
    // Both conditions must be true
  }

  // OR logic: Must be ADMIN OR (PARTNER with partner_admin group)
  @OrAuth()  // MUST be at the top!
  @HasUserType([AuthUserType.ADMIN])
  @RequiresAccess({ [AuthUserType.PARTNER]: ["partner_admin"] })
  async flexibleEndpoint(req: Request, res: Response) {
    // At least one condition must be true
  }
}
```

#### Remarks

- MUST be placed at the TOP of the decorator stack (decorators execute bottom-to-top)
- Applies to ALL authorization decorators on the method
- Cannot mix AND/OR logic (it's either all AND or all OR)
- For complex logic like (A OR B) AND C, create separate endpoints

***

### RequiresAccess()

```ts
function RequiresAccess(accessMap, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/requiresAccess.decorator.ts:188](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresAccess.decorator.ts#L188)

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

#### Parameters

##### accessMap

`AccessRequirements`

Object mapping user types to their allowed groups (with wildcard support)

##### options?

[`DecoratorOptions`](../../../Authorization/index.md#decoratoroptions)

Optional configuration for this decorator instance

#### Returns

`MethodDecorator`

A method decorator that adds authorization middleware to the target method

#### Example

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

#### Remarks

- Within a single

#### Requires Access

decorator, different user types use OR logic
- Multiple

#### Requires Access

decorators use AND logic by default
- Use @OrAuth() to enable OR logic between multiple decorators
- Wildcard patterns provide flexible group matching
- This is the most powerful auth decorator, combining user type and group validation

#### See

 - [OrAuth](#orauth) for enabling OR logic between multiple decorators
 - [HasUserType](#hasusertype) for user type-only validation
 - [HasGroups](#hasgroups) for group-only validation

***

### RequiresOwnership()

```ts
function RequiresOwnership(resourceName, options?): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts:179](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/decorators/auth/requiresOwnership.decorator.ts#L179)

Method decorator that validates resource ownership based on user context.

This decorator checks if the authenticated user "owns" or has access to a specific
resource by comparing a field in the user context with a parameter from the request.
Supports both single-value and array-based ownership checks.

Common use cases:
- Prevent horizontal privilege escalation (users accessing other users' data)
- Enforce data isolation in multi-tenant applications
- Validate that users can only modify their own resources

#### Parameters

##### resourceName

`string`

Name of the resource (e.g., "partner", "organization")

##### options?

[`OwnershipOptions`](#ownershipoptions)

Configuration options for ownership validation

#### Returns

`MethodDecorator`

A method decorator that adds ownership validation middleware

#### Example

```typescript
class PartnerController {
  // Basic ownership check
  // Checks: req.user.partnerId === req.params.partnerId
  @RequiresOwnership("partner")
  async updatePartner(@Param("partnerId") partnerId: string) {
    // Only the partner who owns this resource can update it
  }

  // Admin bypass with OR logic
  @OrAuth()
  @HasUserType([AuthUserType.ADMIN])
  @RequiresOwnership("partner")
  async updatePartner(@Param("partnerId") partnerId: string) {
    // Admin OR owner can update
  }

  // Custom field names
  @RequiresOwnership("partner", {
    userField: "partnerUuid",
    paramName: "id"
  })
  async getPartner(@Param("id") id: string) {
    // Checks: req.user.partnerUuid === req.params.id
  }

  // Multi-organization access (array field)
  @RequiresOwnership("organization", {
    userField: "organizationIds",
    arrayField: true
  })
  async getOrgData(@Param("organizationId") organizationId: string) {
    // Checks: req.user.organizationIds.includes(req.params.organizationId)
  }

  // Query parameter source
  @RequiresOwnership("partner", {
    paramSource: "query",
    paramName: "partnerId"
  })
  async getPartnerData(@Query("partnerId") partnerId: string) {
    // Checks: req.user.partnerId === req.query.partnerId
  }

  // Body parameter source
  @RequiresOwnership("partner", {
    paramSource: "body",
    paramName: "targetPartnerId"
  })
  async transferData(@Body() body: TransferDto) {
    // Checks: req.user.partnerId === req.body.targetPartnerId
  }

  // Custom validation logic
  @RequiresOwnership("resource", {
    customValidator: (userValue, resourceValue, req) => {
      // Complex ownership logic
      return userValue.includes(resourceValue) && req.user.isActive;
    }
  })
  async complexOwnership(@Param("resourceId") resourceId: string) {}

  // With custom error message
  @RequiresOwnership("partner", {
    errorMessage: "You can only modify your own partner data"
  })
  async updatePartner(@Param("partnerId") partnerId: string) {}

  // Disabled for testing
  @RequiresOwnership("partner", {
    disabled: process.env.NODE_ENV === "test"
  })
  async testEndpoint(@Param("partnerId") partnerId: string) {}

  // Complex pattern: Partner admin OR owner
  @OrAuth()
  @HasGroups(["partner_admin"])
  @RequiresOwnership("partner")
  async deletePartner(@Param("partnerId") partnerId: string) {
    // Partner admins OR the owner can delete
  }
}
```

#### Remarks

- By default, looks for `${resourceName}Id` in both user context and request params
- Supports single-value equality checks and array membership checks
- Can be combined with other decorators using AND/OR logic
- Uses AuthConfig for flexible user context extraction
- Provides detailed error messages with actual vs expected values

#### See

 - [HasUserType](#hasusertype) for user type validation
 - [HasGroups](#hasgroups) for group validation
 - [OrAuth](#orauth) for enabling OR logic between decorators

## References

### authCache

Re-exports [authCache](../../../Authorization/index.md#authcache)

***

### AuthConfig

Re-exports [AuthConfig](../../../Authorization/index.md#authconfig)

***

### AuthConfigOptions

Re-exports [AuthConfigOptions](../../../Authorization/index.md#authconfigoptions)

***

### AuthErrorDetails

Re-exports [AuthErrorDetails](../../../Authorization/index.md#autherrordetails)

***

### AuthErrorFactory

Re-exports [AuthErrorFactory](../../../Authorization/index.md#autherrorfactory)

***

### AuthErrorHandler

Re-exports [AuthErrorHandler](../../../Authorization/index.md#autherrorhandler)

***

### AuthorizationError

Re-exports [AuthorizationError](../../../Authorization/index.md#authorizationerror)

***

### CacheEntry

Re-exports [CacheEntry](../../../Cache/index.md#cacheentry)

***

### CacheOptions

Re-exports [CacheOptions](../../../Cache/index.md#cacheoptions)

***

### CacheStats

Re-exports [CacheStats](../../../Cache/index.md#cachestats)

***

### clearUserCache

Re-exports [clearUserCache](../../../Authorization/index.md#clearusercache)

***

### DecoratorOptions

Re-exports [DecoratorOptions](../../../Authorization/index.md#decoratoroptions)

***

### defaultUserContextExtractor

Re-exports [defaultUserContextExtractor](../../../Authorization/index.md#defaultusercontextextractor)

***

### generateCacheKey

Re-exports [generateCacheKey](../../../Authorization/index.md#generatecachekey)

***

### HasPermissionsOptions

Re-exports [HasPermissionsOptions](../../../Authorization/index.md#haspermissionsoptions)

***

### UserCacheContext

Re-exports [UserCacheContext](../../../Authorization/index.md#usercachecontext)

***

### UserContextExtractor

Re-exports [UserContextExtractor](../../../Authorization/index.md#usercontextextractor-1)
