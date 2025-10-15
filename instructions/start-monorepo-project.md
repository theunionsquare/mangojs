# AI Prompt: Configure pnpm Monorepo for MangoJS Microservices

Configure a pnpm workspace monorepo project for building backend microservices using the MangoJS framework. The monorepo will contain multiple microservice projects, each representing an independent backend service.

## Project Requirements

- **Package Manager**: pnpm with workspace support
- **Framework**: MangoJS (`@mangojs/core`) as the core dependency
- **Architecture**: Microservices - each workspace package is an independent microservice
- **Structure**: Monorepo with shared configurations and independent service packages
- **Workflow**: Automated build, test, and deployment workflows

## Tasks to Complete

### 1. Initialize pnpm Workspace Structure

Create the following monorepo structure:

```
project-root/
    services/
        iam-service            # The Identity and access management service
    packages/
        shared/               # Shared utilities and types
    pnpm-workspace.yaml       # Workspace configuration
    package.json              # Root package.json
    tsconfig.json             # Base TypeScript config
    .gitignore
    README.md
```

### 2. Configure Root-Level Files

#### pnpm-workspace.yaml

Define workspace packages pattern to include all services in the `packages/` and `services/` directory.

#### Root package.json

Configure:

- Project name and description
- Workspace scripts for building, testing, and running all services
- Shared devDependencies (TypeScript, testing tools, linting)
- pnpm version requirement
- Scripts:
  - `build`: Build all packages
  - `dev`: Run all services in development mode
  - `test`: Run tests across all packages
  - `clean`: Clean all build artifacts
  - `lint`: Lint all packages

#### tsconfig.json

Create a base TypeScript configuration that:

- Enables decorators and metadata
- Targets ES2020+
- Enables strict mode
- Supports path aliases for workspace packages

### 3. Create Microservice Packages

Do not create microservice. They will be created later on.

### 4. Create Shared Package

Create folder `packages/shared/`

Configure it as an internal workspace dependency that other services can import.

### 5. Setup Workflow Scripts

Create workflow scripts for:

#### Development Workflow

- Run all services concurrently in development mode
- Hot reload on file changes
- Each service on different port

#### Build Workflow

- Build all packages in correct dependency order
- Generate type definitions
- Output to dist/ directories

#### Testing Workflow

- Run tests across all packages
- Generate coverage reports
- Run in CI/CD pipeline

### 6. Create Comprehensive README

The README.md should include:

#### Project Overview

- Description of the monorepo architecture
- List of microservices and their purposes
- Technology stack (MangoJS, Node.js, TypeScript, pnpm)

#### Getting Started

- Prerequisites (Node.js version, pnpm installation)
- Clone and installation steps
- Environment setup

#### Development Guide

- How to add a new microservice
- How to run services locally
- How to run specific services
- How to add shared code

#### Architecture

- Monorepo structure explanation
- Service communication patterns
- Dependency management
- Port allocation for services

#### Scripts Reference

Table of all available scripts with descriptions:

- Root-level scripts
- Service-specific scripts

#### Deployment

- Building for production
- Running services in production
- Docker support (if applicable)

#### Best Practices

- When to create a new service
- How to structure service code
- Using MangoJS features (dependency injection, routing)
- Database strategy (each service owns its data)

### 7. Additional Configuration Files

#### .gitignore

Ignore:

- node_modules/
- dist/
- .env files
- Build artifacts
- IDE-specific files

#### .env.example (root and services)

Document required environment variables:

- Service ports
- Database connections
- API keys
- MangoJS configuration

### 8. Development Tools Setup

Configure:

- **ESLint**: Shared linting configuration
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit linting
- **Docker**: Containerization for services (optional)

## Expected Outcome

After completing these tasks, the monorepo should:

1.  Have a working pnpm workspace with multiple microservice packages
2.  All services depend on `@mangojs/core` framework
3.  Services can be developed, built, and tested independently or together
4.  Shared code is properly organized and reusable
5.  Clear documentation for developers to get started
6.  Automated workflows for common tasks
7.  Ready for CI/CD integration

## Key Principles

- **Independence**: Each microservice can be developed and deployed independently
- **Reusability**: Shared code is in a common package
- **Consistency**: Unified configuration and coding standards
- **Scalability**: Easy to add new microservices
- **Developer Experience**: Simple commands to build, test, and run everything

## Example Commands After Setup

```bash
# Install all dependencies
pnpm install

# Run all services in development
pnpm dev

# Run specific service
pnpm --filter @project/auth-service dev

# Build all services
pnpm build

# Test all services
pnpm test

# Add dependency to specific service
pnpm --filter @project/user-service add express

# Add shared dependency to all services
pnpm add -w @mangojs/core
```

## Notes

- Use `@project/` namespace for all internal packages
- Each service should have its own database (microservices principle)
- Services communicate via REST APIs or message queues
- The gateway service acts as the entry point (reverse proxy)
- Configure appropriate ports for each service (e.g., 3001, 3002, 3003)
- Use environment variables for configuration
- MangoJS should handle dependency injection, routing, and middleware

---

Follow this prompt to create a production-ready pnpm monorepo structure for building scalable microservices with MangoJS.
