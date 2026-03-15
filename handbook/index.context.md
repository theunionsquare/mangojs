---
sidebar_position: 1
sidebar_label: Introduction
---

# MangoJS Service Development Guide

> **Purpose**: This guide teaches AI agents how to build microservices following MangoJS framework patterns.

---

## What is MangoJS?

MangoJS is a lightweight Node.js backend framework for building microservices with simplicity and speed. It leverages dependency injection and Express API integration to enable rapid backend development in a microservice architecture.

### Key Features

- **Dependency Injection**: Clean dependency management using Inversify
- **Express Integration**: Built on Express for familiar API patterns
- **Microservice Architecture**: Designed for distributed systems
- **Database Agnostic**: Use any database or ORM of your choice
- **Type-Safe**: Full TypeScript support with strict typing
- **Scheduled Tasks**: Cron-based task scheduling with lifecycle hooks
- **AI Development Ready**: Optimized patterns for AI-assisted development

---

## 🚀 Quick Start Paths

Choose your learning path based on your goal:

### Path 1: Complete Beginner

**Goal**: Build your first service from scratch

1. **[Quick Start Tutorial](./quick-start-tutorial.context.md)** ⭐ START HERE
   - 15-minute hands-on tutorial
   - Build a complete blog post service
   - Learn all core patterns

2. **[Architecture Overview](./architecture/index.context.md)**
   - Understand onion architecture
   - Learn layer responsibilities

3. **Practice**: Modify the tutorial service with new features

---

### Path 2: Building a New Service

**Goal**: Create a production-ready microservice

**Step-by-step workflow:**

1. **[Service Setup](./guides/service-setup.context.md)** ⭐ START HERE
   - Initialize package structure
   - Configure TypeScript and dependencies
   - Set up environment variables
   - Create basic entry points

2. **[Database Layer](./database/index.context.md)**
   - Define TypeORM entities
   - Set up relationships
   - Create migrations

3. **[Service Layer](./service/index.context.md)**
   - Implement business logic
   - Use transactions properly
   - Handle errors with APIError

4. **[Controller Layer](./controller/index.context.md)**
   - Create HTTP endpoints
   - Apply authorization
   - Define API types

5. **[Best Practices](./common/best-practices.context.md)**
   - Review naming conventions
   - Optimize performance
   - Follow security guidelines

---

### Path 3: Understanding Specific Concepts

**Dependency Injection & Container**

- [Dependency Injection Guide](./architecture/injection.context.md)
- [Architecture Overview](./architecture/index.context.md)

**Decorators (Routing, Auth, Middleware)**

- [Decorators Reference](./architecture/decorators.context.md)

**Type System & API Types**

- [Type Organization Guide](./project-structure/types.context.md)

**Error Handling**

- [Error Handling Guide](./common/error-handling.context.md)

**Scheduled Tasks**

- [Scheduler Guide](./scheduler/index.context.md)

**Troubleshooting**

- [Troubleshooting Guide](./guides/troubleshooting.context.md) ⚠️ When stuck

---

## 📚 Layer-by-Layer Documentation

### Database Layer (Core)

**Purpose**: Define domain models with TypeORM

- **[Overview](./database/index.context.md)** - Database layer introduction
- **[Entities](./database/entities.context.md)** - Entity creation patterns
- **[Relationships](./database/relationships.context.md)** - Entity relationships
- **[Migrations](./database/migrations.context.md)** - Database migrations
- **[Examples](./database/examples.context.md)** - Complete examples

### Service Layer (Business Logic)

**Purpose**: Implement business logic and orchestration

- **[Overview](./service/index.context.md)** - Service layer introduction
- **[Setup](./service/setup.context.md)** - Service setup patterns
- **[Transactions](./service/transactions.context.md)** - Transaction handling
- **[Error Handling](./service/error-handling.context.md)** - Error patterns
- **[Examples](./service/examples.context.md)** - Complete examples

### Controller Layer (HTTP/API)

**Purpose**: Handle HTTP requests and responses

- **[Overview](./controller/index.context.md)** - Controller layer introduction
- **[Setup](./controller/setup.context.md)** - Controller setup patterns
- **[Type Safety](./controller/type-safety.context.md)** - Type-safe controllers
- **[Authorization](./controller/authorization.context.md)** - Auth decorators
- **[Examples](./controller/examples.context.md)** - Complete examples

### Scheduler (Background Tasks)

**Purpose**: Execute time-based tasks using cron expressions

- **[Overview](./scheduler/index.context.md)** - Scheduler introduction
- **[Architecture](./scheduler/architecture.context.md)** - Scheduler architecture
- **[Examples](./scheduler/examples.context.md)** - Complete examples

---

## 🏗️ Architecture & Patterns

- **[Architecture Overview](./architecture/index.context.md)** - Onion architecture explained
- **[Onion Architecture](./architecture/onion-architecture.context.md)** - Detailed onion architecture
- **[Layers](./architecture/layers.context.md)** - Layer responsibilities
- **[Dependency Injection](./architecture/injection.context.md)** - Inversify configuration
- **[Decorators Reference](./architecture/decorators.context.md)** - All decorators explained
- **[Type Organization](./project-structure/types.context.md)** - TypeScript type patterns
- **[Scheduler](./scheduler/index.context.md)** - Background task scheduling

---

## 📖 Guides & Best Practices

- **[Service Setup Guide](./guides/service-setup.context.md)** ⭐ Initialize new services
- **[Code Templates](./common/code-templates.context.md)** ⭐ Copy-paste boilerplate
- **[Best Practices](./common/best-practices.context.md)** - Naming, organization, security
- **[Error Handling](./common/error-handling.context.md)** - APIError patterns
- **[Troubleshooting](./guides/troubleshooting.context.md)** - Common errors and solutions

---

## 💡 Decision Tree for AI Agents

```
Need to build a service?
│
├─ New to MangoJS?
│  └─> Start: Quick Start Tutorial → Architecture Overview
│
├─ Building database models?
│  └─> Read: Database Layer Overview → Create entities → Generate migration
│
├─ Implementing business logic?
│  └─> Read: Service Layer Overview → Use transactions → Throw APIError
│
├─ Creating API endpoints?
│  └─> Read: Controller Layer Overview → Define types → Add decorators
│
├─ Getting errors?
│  └─> Check: Troubleshooting Guide → Review checklists
│
├─ Adding scheduled tasks?
│  └─> Read: Scheduler Guide → Create task class → Configure ServerBuilder
│
└─ Need specific patterns?
   ├─ Decorators? → Decorators Reference
   ├─ Types? → Type Organization Guide
   ├─ DI? → Dependency Injection Guide
   ├─ Scheduler? → Scheduler Guide
   └─ Errors? → Error Handling Guide
```

---

## 📋 Development Workflow

**For each new feature:**

1. ✅ Define entity in database layer
2. ✅ Create/update migration
3. ✅ Define entity types
4. ✅ Implement service methods with transactions
5. ✅ Define API types
6. ✅ Create controller endpoints
7. ✅ Add authorization decorators
8. ✅ Add Swagger documentation
9. ✅ Review checklist for each layer
10. ✅ Test endpoints

---

## 🔗 External Resources

- **[TypeORM Documentation](https://typeorm.io/)** - Database ORM
- **[Inversify Documentation](https://inversify.io/)** - Dependency injection
- **[Express Documentation](https://expressjs.com/)** - Web framework
- **[Complete Resource List](./resources.context.md)** - All external docs

---

**Ready to build?** Start with the [Quick Start Tutorial](./quick-start-tutorial.context.md)!
