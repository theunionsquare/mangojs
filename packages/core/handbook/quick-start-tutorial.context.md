# MangoJS Quick Start Tutorial

> **Goal**: Set up a MangoJS application with a single endpoint in 10 minutes

---

## Prerequisites

```bash
npm install @theunionsquare/mangojs-core
npm install inversify reflect-metadata typeorm express dotenv
npm install -D typescript @types/node @types/express
```

---

## Step 1: Create Entity

**File**: `src/db/models/Post.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text" })
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
```

**File**: `src/db/models/index.ts`

```typescript
export { Post } from "./Post";
```

---

## Step 2: Create Service

**File**: `src/services/post.service.ts`

```typescript
import { injectable, inject, LazyServiceIdentifier } from "inversify";
import { EntityManager } from "typeorm";
import { INVERSITY_TYPES, Persistence } from "@theunionsquare/mangojs-core";
import { Post } from "../db/models";

@injectable()
export class PostService {
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: Persistence.IPersistenceContext;

  public async getAllPosts(): Promise<Post[]> {
    return await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        return await em.find(Post, { order: { created_at: "DESC" } });
      },
    );
  }
}
```

**File**: `src/services/index.ts`

```typescript
export { PostService } from "./post.service";
```

---

## Step 3: Create Controller

**File**: `src/routes/v1/posts/posts.controller.ts`

```typescript
import {
  Controller,
  Get,
  Errors,
  Utils,
  Container,
} from "@theunionsquare/mangojs-core";
import { Request, Response } from "express";
import { PostService } from "../../../services";

@Controller("/api/v1/posts")
export class PostController {
  @Get("/")
  public async getPosts(req: Request, res: Response): Promise<Response> {
    const logRequest = new Utils.LogRequest(res);
    try {
      const postService = Container.ContainerRegistry.getDefault().get<PostService>(PostService);
      const posts = await postService.getAllPosts();

      return res.status(200).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: posts,
      });
    } catch (error: unknown) {
      return Errors.errorHandler(res, error as Error);
    }
  }
}
```

**File**: `src/routes/v1/index.ts`

```typescript
import { PostController } from "./posts/posts.controller";

export const routes = [PostController];
```

**File**: `src/routes/index.ts`

```typescript
export { routes } from "./v1";
```

---

## Step 4: Configure Container

**File**: `src/inversify.config.ts`

```typescript
import { Container } from "@theunionsquare/mangojs-core";
import { Post } from "./db/models";
import { PostService } from "./services";
import dotenv from "dotenv";

dotenv.config();

// Build and register the default container
Container.ContainerBuilder.create()
  // Core: Logger
  .withCore({ loggerName: "blog-api", logLevel: "debug" })

  // Database: PostgreSQL with entities
  .withPostgres({
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    entities: [Post],
  })

  // App services
  .bind(PostService).toSelf()

  .build();
```

**Key points:**

- `ContainerBuilder.create()` creates and registers a default container
- `.withCore()` binds the logger factory
- `.withPostgres()` binds database manager and persistence context
- `.bind(Service).toSelf()` registers your application services
- `.build()` finalizes and registers the container in `ContainerRegistry`

---

## Step 5: Create Entry Point

**File**: `src/index.ts`

```typescript
import "reflect-metadata";
import "./inversify.config"; // Initialize container first
import { ServerBuilder, Container } from "@theunionsquare/mangojs-core";
import { routes } from "./routes";

async function bootstrap() {
  const server = new ServerBuilder()
    .setContainer(Container.ContainerRegistry.getDefault())
    .setPort(3000)
    .registerControllers(routes)
    .build();

  await server.start();
  console.log("Server running on http://localhost:3000");
}

bootstrap();
```

---

## Step 6: Test

```bash
# Start server
npm run dev

# Test endpoint
curl http://localhost:3000/api/v1/posts
```

---

## Project Structure

```
src/
├── db/models/
│   ├── Post.ts
│   └── index.ts
├── services/
│   ├── post.service.ts
│   └── index.ts
├── routes/
│   ├── v1/
│   │   ├── posts/
│   │   │   └── posts.controller.ts
│   │   └── index.ts
│   └── index.ts
├── inversify.config.ts
└── index.ts
```

---

## Next Steps

- **[Database Layer](./database/index.context.md)** - Add relationships, migrations
- **[Service Layer](./service/index.context.md)** - Transactions, error handling
- **[Controller Layer](./controller/index.context.md)** - More endpoints, authorization
- **[Dependency Injection](./injection/index.context.md)** - Advanced container patterns
- **[Decorators](./decorators/index.context.md)** - Auth, middleware decorators
