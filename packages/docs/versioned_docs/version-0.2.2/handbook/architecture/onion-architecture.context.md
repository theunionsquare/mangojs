---
sidebar_label: "Onion Architecture"
---

# Onion Architecture

## Overview

MangoJS follows the **Onion Architecture** pattern with three main layers. Dependencies flow **inward only**.

```
┌─────────────────────────────────────┐
│   Controller Layer (Outer)          │  ← HTTP/API requests
│   • @Controller(), @Get(), @Post()  │
│   • Request/Response handling       │
│   • Call services                   │
└──────────────┬──────────────────────┘
               │ depends on
┌──────────────▼──────────────────────┐
│   Service Layer (Middle)            │  ← Business Logic
│   • @injectable() classes           │
│   • Validation & business rules     │
│   • Transaction orchestration       │
└──────────────┬──────────────────────┘
               │ depends on
┌──────────────▼──────────────────────┐
│   Database Layer (Core)             │  ← Data Models
│   • @Entity() declarations          │
│   • TypeORM relationships           │
│   • Pure domain objects             │
└─────────────────────────────────────┘
```

## Dependency Rule

**Outer layers depend on inner layers, never the reverse.**

This ensures:

- **Testability**: Inner layers can be tested without outer layers
- **Flexibility**: Outer layers can be replaced without affecting core logic
- **Maintainability**: Changes in outer layers don't break inner layers

## Layer Summary

| Layer      | Location         | Purpose                    |
| ---------- | ---------------- | -------------------------- |
| Controller | `src/routes/v1/` | HTTP/API request handling  |
| Service    | `src/services/`  | Business logic             |
| Database   | `src/db/models/` | Data models and schema     |

## Related

- [Layers](./layers.context.md) - Detailed layer responsibilities
- [Dependency Injection](./injection.context.md) - DI configuration
