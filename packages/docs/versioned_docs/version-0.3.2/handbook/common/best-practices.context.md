# MangoJS Best Practices

Essential patterns and conventions for building MangoJS services.

> **💡 Quick Start:** See [Code Templates](./code-templates.context.md) for ready-to-use boilerplate code.

---

## Naming Conventions

### Classes

- **Services**: PascalCase with `Service` suffix

  - ✅ `UserService`, `PartnerService`
  - ❌ `userService`, `Users`, `ServiceUser`

- **Controllers**: PascalCase with `Controller` suffix

  - ✅ `UserController`, `PartnerController`
  - ❌ `UsersController`, `userController`

- **Entities**: Singular PascalCase
  - ✅ `User`, `Partner`, `Team`
  - ❌ `Users`, `user`, `PARTNER`

### Methods

- **Descriptive verbs** in camelCase
  - ✅ `createUser`, `getPartnerById`, `updateTeamMember`
  - ❌ `create`, `get`, `update`, `doSomething`

### Files

- Services: `entityName.service.ts` (e.g., `partner.service.ts`)
- Controllers: `entityName.controller.ts` (e.g., `partner.controller.ts`)
- Types: `entityName.type.ts` (e.g., `partner.type.ts`)

---

## Type Safety

### Always Use Strict Types

```typescript
// ✅ Good
public async createUser(data: types.entities.user.UserPost): Promise<types.entities.user.User>

// ❌ Bad
public async createUser(data: any): Promise<any>
```

### Define DTOs for Service Layer

```typescript
// Entity type
export type User = models.User;

// Create DTO
export type UserPost = Pick<User, "email" | "name" | "password">;

// Update DTO
export type UserPut = Partial<Pick<User, "name" | "status">>;
```

### Never Use `any`

- Exception: Error casting is acceptable: `error as Error`
- Use `unknown` for error handling: `catch (error: unknown)`

---

## Code Organization

### One Service Per Entity

```
services/
  ├── user.service.ts
  ├── partner.service.ts
  └── team.service.ts
```

### One Controller Per Resource

```
routes/v1/
  ├── users/users.controller.ts
  ├── partners/partners.controller.ts
  └── teams/teams.controller.ts
```

### Keep Files Focused

- Target: Under 300 lines per file
- If longer, consider splitting into multiple services
- Extract helper methods to separate utility files

---

## Method Documentation

### JSDoc for Public Methods

```typescript
/**
 * Create User - Create a new user with validation
 *
 * @param data - User creation data
 * @returns Promise resolving to the created user
 * @throws {APIError} 400 BAD_REQUEST if validation fails
 * @throws {APIError} 409 CONFLICT if email already exists
 */
public async createUser(data: UserPost): Promise<User> {
  // implementation
}
```

### Format

- First line: Method name and brief description
- Empty line
- `@param` for each parameter
- `@returns` for return value
- `@throws` for each possible error

---

## Security

### Use Authorization Decorators

```typescript
@Get("/")
@Decorators.auth.HasGroups(["Admin"])
public async getUsers() { }
```

### Validate User Input

- Always validate in service layer, not controllers
- Use business rule validation
- Check for required fields before database operations

---

## Performance

### Add Indexes Strategically

```typescript
@Entity("users")
export class User {
  @Column()
  @Index() // For frequently queried fields
  email: string;
}
```

### Use Relations Carefully

```typescript
// Only load relations when needed
const user = await em.findOne(models.User, {
  where: { id },
  relations: ["profile", "posts"], // Be explicit
});
```

### Avoid N+1 Queries

```typescript
// ✅ Good - single query with relations
const partners = await em.find(models.Partner, {
  relations: ["teams"],
});

// ❌ Bad - N+1 queries
const partners = await em.find(models.Partner);
for (const partner of partners) {
  partner.teams = await em.find(models.Team, {
    where: { partner_id: partner.id },
  });
}
```

---

## Testing Readiness

### Design for Testability

- Services should be pure business logic
- No HTTP concerns in services
- Dependencies injected, not hardcoded
- Use interfaces for external dependencies

### Consistent Response Formats

```typescript
// All API responses follow this structure
{
  ok: true,
  timestamp: logRequest.timestamp,
  requestId: logRequest.requestId,
  data: responseData
}
```
