---
sidebar_label: "Folders"
---

# Folder Structure Conventions

## Monorepo Structure

```
monorepo-root/
├── packages/
│   ├── types/                     # Shared type definitions
│   │   ├── partner/
│   │   │   ├── entities/
│   │   │   ├── requests/
│   │   │   ├── api/v1/
│   │   │   ├── index.ts
│   │   │   └── package.json
│   │   ├── iam/
│   │   │   └── (same structure)
│   │   └── package.json
│   │
│   └── shared/                    # Shared utilities
│       ├── utils/
│       └── package.json
│
├── services/
│   ├── partner-service/
│   │   ├── src/
│   │   │   ├── routes/v1/
│   │   │   ├── services/
│   │   │   ├── db/
│   │   │   └── config/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── iam-service/
│       └── (same structure)
│
├── package.json                   # Root package.json
├── pnpm-workspace.yaml            # Workspace config
└── turbo.json                     # Turborepo config (optional)
```

---

## Folder Descriptions

### `src/routes/v1/`

Controllers handling HTTP requests. Each controller maps to a resource.

```typescript
// user.controller.ts
@Controller("/api/v1/users")
export class UserController {
  @Get("/:id")
  async getUser(req: Request, res: Response) {}
}
```

### `src/services/`

Business logic layer. Services are injectable and handle core operations.

```typescript
// user.service.ts
@injectable()
export class UserService {
  async findById(id: string): Promise<User | null> {}
}
```

### `src/db/models/`

TypeORM entity definitions. One file per entity.

```typescript
// user.entity.ts
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
```

### `src/config/`

Application configuration including DI container setup.

```typescript
// inversify.config.ts
const container = new Container();
container.bind(TYPES.UserService).to(UserService);
```

### `src/types/`

Type definitions organized by layer (API, entities, requests).

---

## Naming Conventions

| Type       | Convention              | Example                    |
| ---------- | ----------------------- | -------------------------- |
| Controller | `{resource}.controller.ts` | `user.controller.ts`    |
| Service    | `{resource}.service.ts`    | `user.service.ts`       |
| Entity     | `{resource}.entity.ts`     | `user.entity.ts`        |
| Type file  | `{resource}.type.ts`       | `user.type.ts`          |
| API types  | `{METHOD}/index.ts`        | `POST/index.ts`         |

---

## File Organization Tips

1. **One export per file**: Each file should export one main class/type
2. **Index files**: Use `index.ts` for clean re-exports
3. **Colocation**: Keep related files together (e.g., types near their usage)
4. **Flat over nested**: Avoid deep nesting when possible

## Related

- [Types](./types.context.md) - Type organization patterns
- [Layers](../architecture/layers.context.md) - Layer responsibilities
