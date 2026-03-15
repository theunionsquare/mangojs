# MangoJS Quick Start Tutorial

> **Goal**: Build a complete "Blog Post" microservice from scratch in 15 minutes

This tutorial walks you through creating a simple blog post service with full CRUD operations, demonstrating all MangoJS patterns.

> **💡 Tip:** Use [Code Templates](./common/code-templates.context.md) for ready-to-use boilerplate during this tutorial.

---

## What We'll Build

A blog post API with these endpoints:

- `GET /api/v1/posts` - List all posts
- `GET /api/v1/posts/:id` - Get single post
- `POST /api/v1/posts` - Create post
- `PUT /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post

---

## Prerequisites

```bash
# Install MangoJS core
npm install @theunionsquare/mangojs-core

# Install dependencies
npm install inversify reflect-metadata typeorm express
npm install -D typescript @types/node @types/express
```

---

## Step 1: Database Layer (5 min)

### 1.1 Create Post Entity

**File**: `src/db/models/Post.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ type: "varchar", length: 255 })
  @Index()
  author_id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({
    type: "enum",
    enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
    default: "DRAFT",
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

### 1.2 Export Entity

**File**: `src/db/models/index.ts`

```typescript
export { Post } from "./Post";
```

### 1.3 Register Entity

Entities are registered in the Inversify configuration. See **Step 4** for the complete `inversify.config.ts` setup where entities are passed to the `DatabaseManagerFactory`.

✅ **Database layer complete!**

---

## Step 2: Service Layer (5 min)

### 2.1 Define Types

**File**: `src/types/entities/post.type.ts`

```typescript
import * as models from "../../db/models";

export type Post = models.Post;

export type PostPost = Pick<Post, "author_id" | "title" | "content">;

export type PostPut = Partial<Pick<Post, "title" | "content" | "status">>;
```

**File**: `src/types/entities/index.ts`

```typescript
export * as post from "./post.type";
```

### 2.2 Create Service

**File**: `src/services/post.service.ts`

```typescript
import { injectable, inject, LazyServiceIdentifier } from "inversify";
import { EntityManager } from "typeorm";
import {
  errors,
  INVERSITY_TYPES,
  IPersistenceContext,
} from "@theunionsquare/mangojs-core";
import * as models from "../db/models";
import { types } from "../types";

@injectable()
export class PostService {
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: IPersistenceContext;

  constructor() {}

  /**
   * Create Post - Create a new blog post
   */
  public async createPost(
    data: types.entities.post.PostPost,
  ): Promise<types.entities.post.Post> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // Validate
        if (!data.title || !data.content) {
          throw new errors.APIError(
            400,
            "BAD_REQUEST",
            "Title and content are required",
          );
        }

        // Create
        const post = em.create(models.Post, {
          ...data,
          status: "DRAFT",
        });
        await em.save(post);

        return post;
      },
    );
    return response as types.entities.post.Post;
  }

  /**
   * Get All Posts
   */
  public async getAllPosts(): Promise<types.entities.post.Post[]> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        return await em.find(models.Post, {
          order: { created_at: "DESC" },
        });
      },
    );
    return response as types.entities.post.Post[];
  }

  /**
   * Get Post By ID
   */
  public async getPostById(id: string): Promise<types.entities.post.Post> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const post = await em.findOne(models.Post, {
          where: { uid: id },
        });

        if (!post) {
          throw new errors.APIError(404, "NOT_FOUND", "Post not found");
        }

        return post;
      },
    );
    return response as types.entities.post.Post;
  }

  /**
   * Update Post
   */
  public async updatePost(
    id: string,
    data: types.entities.post.PostPut,
  ): Promise<types.entities.post.Post> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const post = await em.findOne(models.Post, {
          where: { uid: id },
        });

        if (!post) {
          throw new errors.APIError(404, "NOT_FOUND", "Post not found");
        }

        Object.assign(post, data);
        await em.save(post);

        return post;
      },
    );
    return response as types.entities.post.Post;
  }

  /**
   * Delete Post
   */
  public async deletePost(id: string): Promise<void> {
    await this._persistenceContext.inTransaction(async (em: EntityManager) => {
      const post = await em.findOne(models.Post, {
        where: { uid: id },
      });

      if (!post) {
        throw new errors.APIError(404, "NOT_FOUND", "Post not found");
      }

      await em.remove(post);
    });
  }
}
```

### 2.3 Export Service

**File**: `src/services/index.ts`

```typescript
export { PostService } from "./post.service";
```

✅ **Service layer complete!**

---

## Step 3: Controller Layer (5 min)

### 3.1 Define API Types

**File**: `src/types/api/v1/posts/index.ts`

```typescript
import { Types } from "@theunionsquare/mangojs-core";

export type ResponseBodyData = {
  uid: string;
  author_id: string;
  title: string;
  content: string;
  status: string;
  created_at: Date;
  updated_at: Date;
};

export * as GET from "./GET";
export * as POST from "./POST";
export * as PUT from "./PUT";
export * as DELETE from "./DELETE";
```

**File**: `src/types/api/v1/posts/GET/index.ts`

```typescript
import { Types } from "@theunionsquare/mangojs-core";
import { ResponseBodyData } from "..";

export type Params = { id?: string };
export type RequestBody = {};
export type ResponseBody = Types.v1.api.response.response<
  ResponseBodyData | ResponseBodyData[]
>;
```

**File**: `src/types/api/v1/posts/POST/index.ts`

```typescript
import { Types } from "@theunionsquare/mangojs-core";
import { ResponseBodyData } from "..";

export type Params = {};
export type RequestBody = {
  author_id: string;
  title: string;
  content: string;
};
export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
```

**File**: `src/types/api/v1/posts/PUT/index.ts`

```typescript
import { Types } from "@theunionsquare/mangojs-core";
import { ResponseBodyData } from "..";

export type Params = { id: string };
export type RequestBody = {
  title?: string;
  content?: string;
  status?: string;
};
export type ResponseBody = Types.v1.api.response.response<ResponseBodyData>;
```

**File**: `src/types/api/v1/posts/DELETE/index.ts`

```typescript
import { Types } from "@theunionsquare/mangojs-core";

export type Params = { id: string };
export type RequestBody = {};
export type ResponseBody = Types.v1.api.response.response<{
  message: string;
}>;
```

### 3.2 Create Controller

**File**: `src/routes/v1/posts/posts.controller.ts`

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Decorators,
} from "@theunionsquare/mangojs-core";
import { Request, Response } from "express";
import { ServiceContainer } from "../../../inversify.config";
import { PostService } from "../../../services";
import { types } from "../../../types";
import { errors, utils } from "@theunionsquare/mangojs-core";

const postService = ServiceContainer.get<PostService>(PostService);

@Controller("/api/v1/posts")
export class PostController {
  /**
   * @swagger
   * /api/v1/posts:
   *   get:
   *     summary: Get all posts
   *     tags: [Posts]
   */
  @Get("/")
  public async getPosts(
    req: Request,
    res: Response<types.api.v1.posts.GET.ResponseBody>,
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const posts = await postService.getAllPosts();

      return res.status(200).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: posts,
      });
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   get:
   *     summary: Get post by ID
   *     tags: [Posts]
   */
  @Get("/:id")
  public async getPost(
    req: Request<types.api.v1.posts.GET.Params>,
    res: Response<types.api.v1.posts.GET.ResponseBody>,
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const { id } = req.params;
      const post = await postService.getPostById(id!);

      return res.status(200).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: post,
      });
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/v1/posts:
   *   post:
   *     summary: Create a new post
   *     tags: [Posts]
   */
  @Post("/")
  public async createPost(
    req: Request<{}, {}, types.api.v1.posts.POST.RequestBody>,
    res: Response<types.api.v1.posts.POST.ResponseBody>,
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const post = await postService.createPost(req.body);

      return res.status(201).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: post,
      });
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   put:
   *     summary: Update post
   *     tags: [Posts]
   */
  @Put("/:id")
  public async updatePost(
    req: Request<
      types.api.v1.posts.PUT.Params,
      {},
      types.api.v1.posts.PUT.RequestBody
    >,
    res: Response<types.api.v1.posts.PUT.ResponseBody>,
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const { id } = req.params;
      const post = await postService.updatePost(id, req.body);

      return res.status(200).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: post,
      });
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }

  /**
   * @swagger
   * /api/v1/posts/{id}:
   *   delete:
   *     summary: Delete post
   *     tags: [Posts]
   */
  @Delete("/:id")
  @Decorators.auth.HasGroups(["Admin"])
  public async deletePost(
    req: Request<types.api.v1.posts.DELETE.Params>,
    res: Response<types.api.v1.posts.DELETE.ResponseBody>,
  ): Promise<Response> {
    const logRequest = new utils.LogRequest(res);
    try {
      const { id } = req.params;
      await postService.deletePost(id);

      return res.status(200).send({
        ok: true,
        timestamp: logRequest.timestamp,
        requestId: logRequest.requestId,
        data: { message: "Post deleted successfully" },
      });
    } catch (error: unknown) {
      return errors.errorHandler(res, error as Error);
    }
  }
}
```

### 3.3 Register Controller

**File**: `src/routes/v1/index.ts`

```typescript
import { PostController } from "./posts/posts.controller";

export const routes = [PostController];
```

**File**: `src/routes/index.ts`

```typescript
export { routes } from "./v1";
```

✅ **Controller layer complete!**

---

## Step 4: Inversify Configuration

### 4.1 Configure Database + PersistenceContext

**File**: `src/inversify.config.ts`

```typescript
import {
  persistanceContext,
  Auth,
  INVERSITY_TYPES,
  Loggers,
  databasemanager,
  Containers,
} from "@theunionsquare/mangojs-core";
import { IPersistenceContext } from "@theunionsquare/mangojs-core";
import { IDatabaseManagerFactory } from "@theunionsquare/mangojs-core";

import dotenv from "dotenv";
import { Post } from "./db/models";

dotenv.config();

const containerManager = Containers.getContainer();
const serviceContainer = containerManager.getContainer();

/**
 * Bind Logger Service
 */
serviceContainer
  .bind<Loggers.ILoggerFactory>(INVERSITY_TYPES.LoggerFactory)
  .toConstantValue(new Loggers.LoggerPino("server", "debug"));

/**
 * Bind Database connector
 */
serviceContainer
  .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
  .toConstantValue(
    new databasemanager.cockroach.CockRoachDBManagerFactory(
      { url: process.env.DATABASE_URL },
      [Post], // Register all your entities here
    ),
  );

/**
 * Bind Persistence Context
 */
serviceContainer
  .bind<IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
  .to(persistanceContext.CockroachPersistenceContext);

export { serviceContainer };
```

**Key bindings explained:**

| Binding                  | Purpose                                               |
| ------------------------ | ----------------------------------------------------- |
| `LoggerFactory`          | Provides logging throughout the application           |
| `DatabaseManagerFactory` | Configures database connection and registers entities |
| `PersistenceContext`     | Manages transactions via `inTransaction()` method     |
| `AuthorizationContext`   | Validates authentication tokens (optional)            |

✅ **Inversify configuration complete!**

---

## Step 5: Test Your API

### Start the server:

```bash
npm run dev
```

### Test endpoints:

```bash
# Create a post
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{
    "author_id": "user123",
    "title": "My First Post",
    "content": "Hello, MangoJS!"
  }'

# Get all posts
curl http://localhost:3000/api/v1/posts

# Get single post
curl http://localhost:3000/api/v1/posts/{post-id}

# Update post
curl -X PUT http://localhost:3000/api/v1/posts/{post-id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "status": "PUBLISHED"
  }'

# Delete post
curl -X DELETE http://localhost:3000/api/v1/posts/{post-id}
```

---

## 🎉 Congratulations!

You've built a complete CRUD microservice with MangoJS! You now understand:

✅ **Database Layer** - TypeORM entities and relationships  
✅ **Service Layer** - Business logic with transactions  
✅ **Controller Layer** - HTTP endpoints with type safety  
✅ **Dependency Injection** - Inversify container patterns  
✅ **Error Handling** - APIError and errorHandler  
✅ **Type Safety** - End-to-end TypeScript types

---

## Next Steps

1. **Add Relationships**: Link posts to users or comments
2. **Add Validation**: Complex business rules in services
3. **Add Authentication**: Use `@HasGroups()` and other auth decorators
4. **Add Pagination**: Implement `take` and `skip` in queries
5. **Add Search**: Implement filtering and search in service layer
6. **Generate Migration**: Run `typeorm migration:generate`

---

## Common Patterns Reference

- **Database Layer**: [database/overview.context.md](./database/overview.context.md)
- **Service Layer**: [service/overview.context.md](./service/overview.context.md)
- **Controller Layer**: [controller/overview.context.md](./controller/overview.context.md)
- **Best Practices**: [common/best-practices.context.md](./common/best-practices.context.md)
- **Error Handling**: [common/error-handling.context.md](./common/error-handling.context.md)
