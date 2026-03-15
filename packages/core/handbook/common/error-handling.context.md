# Error Handling in MangoJS

Standardized error handling patterns for consistent API responses.

---

## Using APIError

Always use `errors.APIError` from MangoJS core:

```typescript
import { errors } from "@theunionsquare/mangojs-core";

throw new errors.APIError(statusCode, errorCode, message);
```

**Constructor**: `APIError(statusCode: number, errorCode: string, message: string)`

---

## HTTP Status Codes

| Code    | Type           | When to Use                          |
| ------- | -------------- | ------------------------------------ |
| **400** | BAD_REQUEST    | Validation failures, invalid input   |
| **401** | UNAUTHORIZED   | Authentication failures              |
| **403** | FORBIDDEN      | Authorization failures               |
| **404** | NOT_FOUND      | Resource not found                   |
| **409** | CONFLICT       | Duplicate resources, state conflicts |
| **500** | INTERNAL_ERROR | Unexpected errors                    |

---

## Service Layer Patterns

Services throw `APIError` - controllers catch them.

### Not Found (404)

```typescript
const user = await em.findOneBy(models.User, { id });
if (!user) {
  throw new errors.APIError(404, "NOT_FOUND", "User not found");
}
```

---

## Controller Layer Pattern

Controllers catch errors and pass to `errorHandler`:

```typescript
@Get("/:id")
public async getUser(req: Request, res: Response): Promise<Response> {
  const logRequest = new utils.LogRequest(res);
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);

    return res.status(200).send({
      ok: true,
      timestamp: logRequest.timestamp,
      requestId: logRequest.requestId,
      data: user,
    });
  } catch (error: unknown) {
    return errors.errorHandler(res, error as Error);
  }
}
```

---

## Transaction Rollback

Errors thrown inside `inTransaction()` automatically rollback all changes. See [Service Layer Guide](../service/overview.context.md#3-transaction-management) for transaction patterns.

---

## Best Practices

**DO**:

- Use `APIError` for all thrown errors
- Provide descriptive error messages
- Use appropriate HTTP status codes
- Catch errors at controller level
- Let `errorHandler` format responses
- Document errors in JSDoc `@throws`

**DON'T**:

- Throw generic `Error` objects
- Handle errors differently per endpoint
- Expose internal error details
- Use wrong status codes
- Create custom error response formats
