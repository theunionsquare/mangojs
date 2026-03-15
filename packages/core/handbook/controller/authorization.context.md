---
sidebar_label: "Authorization"
---

# Controller Authorization

Protect endpoints with authorization decorators.

## Common Authorization Patterns

### Require Specific User Groups

```typescript
@Decorators.auth.HasGroups(["Admin", "Moderator"])
public async adminOnly() {}
```

### Require Specific User Type

```typescript
@Decorators.auth.HasUserType([Types.enums.AuthUserType.ADMIN])
public async typeRestricted() {}
```

### Require Ownership

User can only access their own resources:

```typescript
@Decorators.auth.RequiresOwnership({
  paramName: "id",        // URL parameter name
  userIdField: "uid",     // Field in authenticated user object
})
public async updateOwn() {}
```

### Multiple Auth Options (OR logic)

```typescript
@Decorators.auth.OrAuth([
  Decorators.auth.HasGroups(["Admin"]),
  Decorators.auth.RequiresOwnership({ paramName: "id", userIdField: "uid" }),
])
public async flexibleAuth() {}
```

### Public Endpoint

No authentication required:

```typescript
@Decorators.auth.NoAuth()
public async publicEndpoint() {}
```

---

## Authorization Decorators Reference

| Decorator | Purpose |
|-----------|---------|
| `@NoAuth()` | Public endpoint, no authentication |
| `@HasGroups([])` | Require user in specific groups |
| `@HasUserType([])` | Require specific user type |
| `@RequiresOwnership({})` | User must own the resource |
| `@OrAuth([])` | Any of the conditions must pass |

---

## Security Best Practices

- Always apply appropriate authorization decorators
- Validate user ownership for sensitive operations
- Never expose passwords or internal tokens
- Use HTTPS in production
- Follow minimal permissions principle

---

## Development Checklist

- [ ] Appropriate auth decorators applied to all endpoints
- [ ] Public endpoints have `@NoAuth()`
- [ ] Sensitive endpoints protected with groups/ownership
- [ ] Minimal permissions principle followed

## Related

- [Authentication](../authentication/index.context.md) - Authentication system
- [Decorators](../architecture/decorators.context.md) - Complete decorator reference
