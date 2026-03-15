# Service Setup Guide

> **Purpose**: Step-by-step guide for initializing a new MangoJS service in a monorepo workspace.

This guide covers the foundational setup needed before implementing any business logic. Follow these steps to create the proper project structure, configuration files, and workspace integration.

---

## When to Use This Guide

Use this guide when:

- Creating a new microservice in the MangoJS monorepo
- Setting up the initial project structure
- Configuring workspace dependencies
- Preparing for database and service layer implementation

---

## Prerequisites

Before starting, ensure you have:

- A MangoJS monorepo workspace configured
- `pnpm` installed and configured
- Root `package.json` with workspace configuration
- Root `tsconfig.json` for TypeScript configuration
- `pnpm-workspace.yaml` configured to include service paths

---

## Service Structure

Every MangoJS service follows this standard directory structure:

```
src/services/{service-name}/
├── src/
│   ├── db/
│   │   └── models/
│   │       └── index.ts
│   ├── routes/
│   │   └── v1/
│   ├── services/
│   │   └── index.ts
│   ├── types/
│   │   ├── api/
│   │   │   └── v1/
│   │   └── entities/
│   │       └── index.ts
│   ├── inversify.config.ts
│   └── index.ts
├── docs/
│   └── (generated artifacts)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

### Directory Purpose

| Directory             | Purpose                                 |
| --------------------- | --------------------------------------- |
| `src/db/models/`      | TypeORM entity definitions              |
| `src/routes/v1/`      | API controllers and route handlers      |
| `src/services/`       | Business logic and service classes      |
| `src/types/entities/` | Entity types and DTOs                   |
| `src/types/api/v1/`   | API request/response types              |
| `docs/`               | Architecture diagrams and documentation |

---

## Step 1: Create Directory Structure

Create the base service directory and all required subdirectories:

```bash
# Create service root
mkdir -p src/services/{service-name}

# Create source directories
mkdir -p src/services/{service-name}/src/db/models
mkdir -p src/services/{service-name}/src/routes/v1
mkdir -p src/services/{service-name}/src/services
mkdir -p src/services/{service-name}/src/types/entities
mkdir -p src/services/{service-name}/src/types/api/v1

# Create docs directory
mkdir -p src/services/{service-name}/docs
```

---

## Step 2: Create package.json

Create `package.json` for the service as a workspace package.

**File**: `src/services/{service-name}/package.json`

```json
{
  "name": "@theunionsquare/mangojs-{service-name}",
  "version": "0.1.0",
  "description": "{Service description}",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "start:dev": "ts-node src/index.ts",
    "dev": "nodemon --watch src --exec ts-node src/index.ts"
  },
  "dependencies": {
    "@theunionsquare/mangojs-core": "", #search the latest version
    "express": "^4.18.2",
    "inversify": "^6.0.1",
    "reflect-metadata": "^0.1.13",
    "typeorm": "^0.3.17",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.4.2",
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.1.6"
  }
}
```

**Key Configuration:**

- **Name**: Use scoped package format `@theunionsquare/mangojs-{service-name}`
- **Version**: Start at `0.1.0` for new services
- **Main**: Points to compiled output in `dist/`
- **Dependencies**: Use `workspace:*` for monorepo packages
- **Scripts**: Include build, start, and development commands

---

## Step 3: Create tsconfig.json

Create TypeScript configuration that extends the root workspace config.

**File**: `src/services/{service-name}/tsconfig.json`

```json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

**Configuration Notes:**

- **extends**: Path relative to service root to workspace `tsconfig.json`
- **outDir**: Compiled JavaScript output directory
- **rootDir**: Source TypeScript files location
- **paths**: Optional path aliases for cleaner imports
- **include**: Only compile files in `src/`
- **exclude**: Ignore node_modules, build output, and test files

---

## Step 4: Create Environment Configuration

Create `.env.example` with all required environment variables.

**File**: `src/services/{service-name}/.env.example`

```env
# Service Configuration
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database Configuration
DATABASE_URL=
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME={service-name}_db
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_SSL=false
DATABASE_SYNC=true

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

**Important Notes:**

- ⚠️ **NEVER commit actual `.env` file with credentials**
- ✅ Only commit `.env.example` with placeholder values
- 📝 Document all environment variables your service needs
- 🔒 Use empty values for sensitive data (passwords, keys)

---

## Step 5: Install Dependencies

Run package installation from the monorepo root:

```bash
# Install all workspace dependencies
pnpm install
```

This command will:

- Install dependencies for all workspace packages
- Link local workspace packages (e.g., `@theunionsquare/mangojs-core`)
- Create `node_modules` in the service directory
- Update `pnpm-lock.yaml`

---

## Step 6: Validate Setup

### Validation Checklist

Verify the following before proceeding:

- ✅ **Directory structure matches template**
  - All required directories exist
  - Index files created in appropriate locations

- ✅ **package.json is valid**
  - Service name follows convention
  - Dependencies include `@theunionsquare/mangojs-core`
  - Scripts are defined (build, start, start:dev)

- ✅ **tsconfig.json extends root config**
  - Path to root tsconfig is correct (usually `../../../tsconfig.json`)
  - outDir and rootDir are set correctly

- ✅ **Environment configuration complete**
  - `.env.example` exists with all required variables
  - No `.env` file committed to git
  - All sensitive values are blank in example

- ✅ **Dependencies installed successfully**
  - `pnpm install` completed without errors
  - `node_modules` directory exists
  - Service appears in workspace package list

### Validation Commands

```bash
# Check if service appears in workspace
pnpm list --depth 0

# Verify TypeScript compilation
cd src/services/{service-name}
pnpm build

# Check for TypeScript errors
npx tsc --noEmit
```

---

## Common Issues & Solutions

### Issue: `pnpm install` fails with dependency resolution errors

**Solution:**

1. Check root `package.json` has workspace configuration
2. Verify `pnpm-workspace.yaml` includes service path pattern
3. Ensure service `package.json` uses `workspace:*` for local packages

### Issue: TypeScript can't find root `tsconfig.json`

**Solution:**

1. Verify path in `extends` field (count `../` correctly)
2. Ensure root `tsconfig.json` exists
3. Check for typos in path

### Issue: Module resolution errors in imports

**Solution:**

1. Add `"moduleResolution": "node"` to tsconfig
2. Verify `baseUrl` and `paths` configuration
3. Check that `reflect-metadata` is imported at entry point

### Issue: Service not appearing in workspace

**Solution:**

1. Check `pnpm-workspace.yaml` includes correct glob pattern
2. Run `pnpm install` from root directory
3. Verify service `package.json` has valid name field

---

## Next Steps

After completing setup, proceed to:

1. **[Database Layer](../database/overview.context.md)** - Define entities and database configuration
2. **[Service Layer](../service/overview.context.md)** - Implement business logic
3. **[Controller Layer](../controller/overview.context.md)** - Create API endpoints

---

## References

- **[Quick Start Tutorial](../quick-start-tutorial.context.md)** - Full walkthrough example
- **[Best Practices](../common/best-practices.context.md)** - Naming conventions and patterns
- **[Architecture Overview](../architecture/overview.context.md)** - Understanding the framework structure
- **[Troubleshooting Guide](./troubleshooting.context.md)** - Common problems and solutions

---

**Next**: Implement Database Layer with entities and persistence logic.
