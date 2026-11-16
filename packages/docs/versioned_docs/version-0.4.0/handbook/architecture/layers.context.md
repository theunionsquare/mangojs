---
sidebar_label: "Layers"
---

# Layer Responsibilities

## Controller Layer (HTTP/API)

**Purpose**: Handle HTTP requests and route to services

**Location**: `src/routes/v1/`

**Key Pattern**: MangoJS decorators for routing

```typescript
@Controller("/api/users")
class UserController {
  constructor(
    @inject(INVERSITY_TYPES.UserService)
    private userService: IUserService
  ) {}

  @Get("/:id")
  async getUser(req: Request, res: Response) {
    const user = await this.userService.findById(req.params.id);
    return res.json(user);
  }
}
```

**Full Documentation**: [Controller](../controller/)

---

## Service Layer (Business Logic)

**Purpose**: Implement business logic and orchestrate data operations

**Location**: `src/services/`

**Key Pattern**:
- Dependency injection with database transactions
- Automatic rollback on exceptions
- Focus on business logic

```typescript
@injectable()
class UserService implements IUserService {
  constructor(
    @inject(INVERSITY_TYPES.UserRepository)
    private userRepo: IUserRepository
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }
}
```

**Full Documentation**: [Service](../service/)

---

## Database Layer (Data Models)

**Purpose**: Define database schema using TypeORM

**Location**: `src/db/models/`

**Key Pattern**:
- TypeORM entity decorators
- Database migrations

```typescript
@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;
}
```

**Full Documentation**: [Database](../database/overview.context.md)

## Related

- [Onion Architecture](./onion-architecture.context.md) - Architecture overview
- [Decorators](./decorators.context.md) - Decorator reference
