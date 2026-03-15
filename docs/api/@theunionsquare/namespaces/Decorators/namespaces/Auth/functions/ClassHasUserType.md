# Function: ClassHasUserType()

```ts
function ClassHasUserType(userTypes): ClassDecorator;
```

Defined in: [src/core/decorators/auth/classHasUserType.decorator.ts:43](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/classHasUserType.decorator.ts#L43)

Class decorator that applies user type authorization to all methods in a class.

This decorator sets default authorization requirements for all methods in the class
based on user type. Individual methods can override this by using method-level
decorators like

## Parameters

### userTypes

[`AuthUserType`](../../../../Types/namespaces/enums/enumerations/AuthUserType.md)[]

Array of user types that are allowed to access all methods in the class

## Returns

`ClassDecorator`

A class decorator that applies user type authorization to all methods

## Requires Access

or @NoAuth.

## Example

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

## Remarks

- Applied at the class level, affects all methods by default
- Method-level decorators can override the class-level authorization
- Only checks user type, not groups. For group validation, use method-level

## Requires Access
