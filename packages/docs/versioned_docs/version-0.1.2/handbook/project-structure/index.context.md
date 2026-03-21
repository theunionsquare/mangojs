---
sidebar_label: "Overview"
---

# MangoJS Project Structure Guide

## Purpose

This guide provides recommended project structure patterns for MangoJS applications. Following these conventions enables AI-assisted development and ensures consistency across services.

## Key Principles

1. **Predictable Structure**: AI agents can navigate and generate code efficiently
2. **Layer Separation**: Clear boundaries between controller, service, and database layers
3. **Type Safety**: Single source of truth for types with derived types for each layer
4. **Scalability**: Monorepo patterns for multi-service architectures

## Documentation

| Document                              | Description                                        |
| ------------------------------------- | -------------------------------------------------- |
| [Folders](./folders.context.md)       | Recommended folder structure and conventions       |
| [Types](./types.context.md)           | Type organization and derivation patterns          |

## Quick Reference

### Monorepo Structure

```
monorepo-root/
├── packages/
│   ├── types/                     # Shared type definitions
│   │   ├── partner/
│   │   │   ├── entities/
│   │   │   ├── requests/
│   │   │   └── api/v1/
│   │   └── iam/
│   └── shared/                    # Shared utilities
│
└── services/
    ├── partner-service/
    │   └── src/
    │       ├── routes/v1/         # Controllers
    │       ├── services/          # Business logic
    │       ├── db/models/         # TypeORM entities
    │       └── config/            # Configuration
    └── iam-service/
```

## Related

- [Architecture Overview](../architecture/index.context.md) - Framework architecture
- [Onion Architecture](../architecture/onion-architecture.context.md) - Layer dependencies
