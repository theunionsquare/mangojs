# MangoJS Troubleshooting Guide

Common errors, their causes, and solutions when building MangoJS services.

---

## Dependency Injection Errors

### Error: "No matching bindings found for serviceIdentifier"

**Symptom**:

```
Error: No matching bindings found for serviceIdentifier: Symbol(PersistenceContext)
```

**Causes**:

1. Service not registered in `inversify.config.ts`
2. Wrong identifier used in `@inject()`
3. Container not properly initialized

**Solutions**:

```typescript
// ✅ Correct - Use LazyServiceIdentifier
@inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
private _persistenceContext: IPersistenceContext;

// ❌ Wrong - Direct reference causes circular dependency
@inject(INVERSITY_TYPES.PersistenceContext)
private _persistenceContext: IPersistenceContext;
```

**Check `inversify.config.ts`**:

```typescript
serviceContainer
  .bind<IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
  .to(persistanceContext.CockroachPersistenceContext); // Must be registered
```

---

### Error: "Missing required @injectable annotation"

**Symptom**:

```
Error: Missing required @injectable annotation in: UserService
```

**Cause**: Forgot `@injectable()` decorator on service class

**Solution**:

```typescript
// ✅ Correct
@injectable()
export class UserService {
  // ...
}

// ❌ Wrong - missing decorator
export class UserService {
  // ...
}
```

---

## Database Errors

### Error: "Entity was not found"

**Symptom**:

```
EntityNotFound: Could not find any entity of type "User" matching: { uid: "..." }
```

**Cause**: Entity not registered in DatabaseManagerFactory

**Solution**:

**File**: `src/inversify.config.ts`

```typescript
import { User, Post, Comment } from "./db/models";

serviceContainer
  .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
  .toConstantValue(
    new databasemanager.cockroach.CockRoachDBManagerFactory(
      { url: process.env.DATABASE_URL },
      [User, Post, Comment], // ← Add all entities here
    ),
  );
```

---

### Error: "Cannot read property 'inTransaction' of undefined"

**Symptom**:

```
TypeError: Cannot read property 'inTransaction' of undefined
```

**Cause**: PersistenceContext not injected properly

**Solutions**:

1. **Check injection**:

```typescript
@injectable()
export class UserService {
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: IPersistenceContext; // Must be injected

  constructor() {} // Don't initialize in constructor
}
```

2. **Check container binding**:

```typescript
// Must match database manager
CockRoachDBManagerFactory → CockroachPersistenceContext
PostgresDBManagerFactory  → PostgreSQLPersistenceContext
MongooseDBManagerFactory  → MongoosePersistenceContext
```

---

### Error: "Transaction already exists"

**Symptom**:

```
Error: Cannot start transaction - transaction already exists
```

**Cause**: Nested `inTransaction()` calls

**Solution**:

```typescript
// ❌ Wrong - nested transactions
public async createUserWithProfile(data) {
  return await this._persistenceContext.inTransaction(async (em) => {
    const user = await this.createUser(data); // This also calls inTransaction!
    return user;
  });
}

// ✅ Correct - single transaction
public async createUserWithProfile(data) {
  return await this._persistenceContext.inTransaction(async (em) => {
    // Do all operations here with 'em'
    const user = em.create(models.User, data);
    await em.save(user);
    return user;
  });
}
```

---

## Controller Errors

### Error: "Cannot resolve service from container"

**Symptom**:

```
Service resolution fails, controller methods not working
```

**Cause**: Service resolved inside controller class

**Solution**:

```typescript
// ✅ Correct - resolve OUTSIDE class
const userService = ServiceContainer.get<UserService>(UserService);

@Controller("/api/v1/users")
export class UserController {
  @Get("/")
  public async getUsers() {
    const users = await userService.getAllUsers(); // Works
  }
}

// ❌ Wrong - resolved inside class
@Controller("/api/v1/users")
export class UserController {
  private userService = ServiceContainer.get<UserService>(UserService); // Don't do this
}
```

---

### Error: "Headers already sent"

**Symptom**:

```
Error: Cannot set headers after they are sent to the client
```

**Cause**: Multiple `res.send()` calls or missing `return`

**Solution**:

```typescript
// ✅ Correct - return response
@Get("/:id")
public async getUser(req: Request, res: Response): Promise<Response> {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).send({ data: user }); // Return here
  } catch (error) {
    return errors.errorHandler(res, error as Error); // And here
  }
}

// ❌ Wrong - no return, multiple sends possible
@Get("/:id")
public async getUser(req: Request, res: Response): Promise<Response> {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).send({ data: user }); // Missing return
  } catch (error) {
    errors.errorHandler(res, error as Error); // Missing return
  }
}
```

---

### Error: "Route not found / 404 on valid endpoint"

**Symptom**: API returns 404 even though route exists

**Causes**:

1. Controller not registered in routes array
2. Wrong base path in `@Controller()`
3. Wrong HTTP method decorator

**Solutions**:

**Check registration** (`src/routes/v1/index.ts`):

```typescript
import { UserController } from "./users/users.controller";

export const routes = [
  UserController, // ← Must be here
];
```

**Check base path**:

```typescript
// If you want /api/v1/users
@Controller("/api/v1/users") // Not "/users"
export class UserController {}
```

**Check HTTP method**:

```typescript
@Get("/")  // GET /api/v1/users
@Post("/") // POST /api/v1/users
```

---

## Type Errors

### Error: "Property does not exist on type"

**Symptom**:

```typescript
Property 'email' does not exist on type 'RequestBody'
```

**Cause**: API types not defined or incorrectly structured

**Solution**:

**File**: `src/types/api/v1/users/POST/index.ts`

```typescript
export type RequestBody = {
  email: string; // Define all properties
  name: string;
  password: string;
};
```

**Usage**:

```typescript
@Post("/")
public async createUser(
  req: Request<{}, {}, types.api.v1.users.POST.RequestBody>,
  res: Response
) {
  const { email, name, password } = req.body; // Now typed correctly
}
```

---

### Error: "Type 'Promise<void>' is not assignable to type 'Promise<Response>'"

**Symptom**: TypeScript error in controller methods

**Cause**: Missing return statement or wrong return type

**Solution**:

```typescript
// ✅ Correct - returns Response
public async getUser(req: Request, res: Response): Promise<Response> {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).send({ data: user }); // Return response
  } catch (error) {
    return errors.errorHandler(res, error as Error); // Return in catch too
  }
}

// ❌ Wrong - missing return
public async getUser(req: Request, res: Response): Promise<Response> {
  const user = await userService.getUserById(req.params.id);
  res.status(200).send({ data: user }); // Missing return
}
```

---

## Transaction Rollback Issues

### Error: "Changes persisted despite error"

**Symptom**: Database changes saved even when error thrown

**Cause**: Try-catch inside transaction blocks rollback

**Solution**:

```typescript
// ❌ Wrong - try-catch prevents rollback
public async createUser(data) {
  return await this._persistenceContext.inTransaction(async (em) => {
    try {
      const user = em.create(models.User, data);
      await em.save(user);
      return user;
    } catch (error) {
      console.log("Error:", error); // Catches and swallows error
      throw error;
    }
  });
}

// ✅ Correct - let errors propagate
public async createUser(data) {
  return await this._persistenceContext.inTransaction(async (em) => {
    // Validation
    if (!data.email) {
      throw new errors.APIError(400, "BAD_REQUEST", "Email required");
    }

    // Operations
    const user = em.create(models.User, data);
    await em.save(user);
    return user;

    // Let errors propagate naturally - no try-catch!
  });
}
```

---

## Import Errors

### Error: "Cannot find module '@theunionsquare/mangojs-core'"

**Symptom**:

```
Cannot find module '@theunionsquare/mangojs-core' or its corresponding type declarations
```

**Cause**: MangoJS core not installed

**Solution**:

```bash
npm install @theunionsquare/mangojs-core
```

---

### Error: "Cannot find name 'EntityManager'"

**Symptom**:

```
Cannot find name 'EntityManager'
```

**Cause**: Missing TypeORM import

**Solution**:

```typescript
import { EntityManager } from "typeorm"; // Add this import
```

---

## Decorator Errors

### Error: "Decorator is not valid here"

**Symptom**:

```
Decorator is not valid here
```

**Cause**: Decorator applied to wrong element (class vs method)

**Solution**:

```typescript
// Class decorators
@Controller("/api/v1/users")      // ✅ On class
@injectable()                     // ✅ On class

// Method decorators
@Get("/")                         // ✅ On method
@Post("/")                        // ✅ On method
@Decorators.auth.HasGroups([])    // ✅ On method
```

---

### Error: "Authorization decorator not working"

**Symptom**: Protected endpoint accessible without auth

**Causes**:

1. Auth middleware not configured
2. Wrong decorator syntax
3. AuthValidator not registered

**Solutions**:

**Check inversify.config.ts**:

```typescript
serviceContainer
  .bind<Auth.IAuthValidator>(INVERSITY_TYPES.AuthorizationContext)
  .toConstantValue(new Auth.RemoteAuthValidator("http://iam-service", 3031));
```

**Check decorator syntax**:

```typescript
// ✅ Correct
@Decorators.auth.HasGroups(["Admin"])
public async adminOnly() {}

// ❌ Wrong - missing Decorators prefix
@HasGroups(["Admin"])
public async adminOnly() {}
```

---

## Performance Issues

### Error: "Query timeout / slow responses"

**Symptoms**: API responses taking too long

**Common Causes & Solutions**:

1. **Missing indexes**:

```typescript
@Entity("users")
export class User {
  @Column()
  @Index() // ← Add index for frequently queried fields
  email: string;
}
```

2. **N+1 queries**:

```typescript
// ❌ Bad - N+1 problem
const users = await em.find(models.User);
for (const user of users) {
  user.posts = await em.find(models.Post, { where: { userId: user.id } });
}

// ✅ Good - single query with relations
const users = await em.find(models.User, {
  relations: ["posts"],
});
```

3. **Loading unnecessary relations**:

```typescript
// ❌ Bad - loads all relations always
const user = await em.findOne(models.User, {
  where: { id },
  relations: ["posts", "comments", "profile", "teams"], // Too much
});

// ✅ Good - only load what you need
const user = await em.findOne(models.User, {
  where: { id },
  relations: ["profile"], // Only what's needed
});
```

4. **No pagination**:

```typescript
// ❌ Bad - returns thousands of records
const users = await em.find(models.User);

// ✅ Good - paginated
const users = await em.find(models.User, {
  take: 20,
  skip: page * 20,
});
```

---

## Common Mistakes Checklist

**Before deploying, verify**:

- [ ] All services have `@injectable()` decorator
- [ ] PersistenceContext uses `LazyServiceIdentifier`
- [ ] All entities registered in DatabaseManagerFactory
- [ ] PersistenceContext matches database manager type
- [ ] Services resolved outside controller class
- [ ] All database operations in `inTransaction()`
- [ ] No try-catch inside transactions
- [ ] Return statements in all controller methods
- [ ] Error handling uses `errorHandler`
- [ ] Controllers registered in routes array
- [ ] Indexes added for frequently queried fields
- [ ] API types defined for all endpoints

---

## Still Stuck?

1. **Check the reference implementations**:
   - IAM Service: `src/services/iam_server/src/`
   - Sample Service: `src/services/sample/src/`

2. **Review the guides**:
   - [Database Layer](../database/overview.context.md)
   - [Service Layer](../service/overview.context.md)
   - [Controller Layer](../controller/overview.context.md)
   - [Best Practices](../common/best-practices.context.md)

3. **Check external documentation**:
   - [TypeORM Docs](https://typeorm.io/)
   - [Inversify Docs](https://inversify.io/)
   - [Express Docs](https://expressjs.com/)
