# Function: RequiresOwnership()

```ts
function RequiresOwnership(resourceName, options?): MethodDecorator;
```

Defined in: [src/core/decorators/auth/requiresOwnership.decorator.ts:175](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/requiresOwnership.decorator.ts#L175)

Method decorator that validates resource ownership based on user context.

This decorator checks if the authenticated user "owns" or has access to a specific
resource by comparing a field in the user context with a parameter from the request.
Supports both single-value and array-based ownership checks.

Common use cases:
- Prevent horizontal privilege escalation (users accessing other users' data)
- Enforce data isolation in multi-tenant applications
- Validate that users can only modify their own resources

## Parameters

### resourceName

`string`

Name of the resource (e.g., "partner", "organization")

### options?

[`OwnershipOptions`](../interfaces/OwnershipOptions.md)

Configuration options for ownership validation

## Returns

`MethodDecorator`

A method decorator that adds ownership validation middleware

## Example

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

## Remarks

- By default, looks for `${resourceName}Id` in both user context and request params
- Supports single-value equality checks and array membership checks
- Can be combined with other decorators using AND/OR logic
- Uses AuthConfig for flexible user context extraction
- Provides detailed error messages with actual vs expected values

## See

 - [HasUserType](HasUserType.md) for user type validation
 - [HasGroups](HasGroups.md) for group validation
 - [OrAuth](OrAuth.md) for enabling OR logic between decorators
