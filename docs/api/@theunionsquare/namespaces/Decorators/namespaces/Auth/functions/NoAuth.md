# Function: NoAuth()

```ts
function NoAuth(): MethodDecorator;
```

Defined in: [src/core/decorators/auth/noAuth.decorator.ts:35](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/noAuth.decorator.ts#L35)

Method decorator that removes all authorization requirements from a method.

This decorator is useful when you have a class-level authorization decorator
(like @ClassHasUserType) but want to make specific methods publicly accessible
without any authentication or authorization checks.

## Returns

`MethodDecorator`

A method decorator that clears all authorization middleware

## Example

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

## Remarks

- Use this decorator to override class-level authorization
- Removes all authorization middleware from the method
- Should be used carefully as it makes endpoints publicly accessible
