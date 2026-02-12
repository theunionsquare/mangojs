# AI Prompt: Configure pnpm Monorepo for MangoJS Microservices

Configure a pnpm workspace monorepo project for building backend microservices using the MangoJS framework. The monorepo will contain multiple microservice projects, each representing an independent backend service.

## Prerequisites

Before running this template, ensure you have:

1. Created a new project directory
2. Run `pnpm init` to initialize the project
3. Installed MangoJS: `pnpm add github:theunionsquare/mangojs`

## Project Requirements

- **Package Manager**: pnpm with workspace support
- **Framework**: MangoJS (`@theunionsquare/mangojs-core`) as the core dependency
- **Architecture**: Microservices - each workspace package is an independent microservice
- **Structure**: Monorepo with shared configurations and independent service packages
- **Workflow**: Automated build, test, and deployment workflows

## Tasks to Complete

### 1. Initialize pnpm Workspace Structure

Create the following monorepo structure:

```
project-root/
├── services/                 # Microservices directory (empty initially)
├── packages/
│   └── shared/               # Shared utilities and types
│       ├── src/
│       │   ├── index.ts
│       │   ├── types/
│       │   │   └── index.ts
│       │   └── utils/
│       │       └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── pnpm-workspace.yaml       # Workspace configuration
├── package.json              # Root package.json (update existing)
├── tsconfig.json             # Base TypeScript config
├── .gitignore
├── .env.example
└── README.md
```

### 2. Configure Root-Level Files

#### pnpm-workspace.yaml

```yaml
packages:
  - "packages/*"
  - "services/*"
```

#### Root package.json

Update the existing package.json with:

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Microservices monorepo built with MangoJS framework",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm -r --parallel dev",
    "test": "pnpm -r test",
    "clean": "pnpm -r clean && rm -rf node_modules",
    "lint": "eslint . --ext .ts",
    "typecheck": "pnpm -r typecheck"
  },
  "keywords": ["microservices", "monorepo", "mangojs", "nodejs", "typescript"],
  "engines": {
    "node": ">=23.0.0",
    "pnpm": ">=10.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^24.0.0"
  }
}
```

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "exclude": ["node_modules", "dist"]
}
```

#### .gitignore

```
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
*.tsbuildinfo

# Environment files
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
pnpm-debug.log*

# Testing
coverage/
.nyc_output/

# Temporary files
tmp/
temp/
```

#### .env.example

```env
# Application
NODE_ENV=development

# Service Ports
# Each microservice runs on its own port
# IAM_SERVICE_PORT=3001
# USER_SERVICE_PORT=3002
# API_GATEWAY_PORT=3000

# Database
# DATABASE_URL=mongodb://localhost:27017/myapp
# DATABASE_NAME=myapp

# Redis (for queues)
# REDIS_HOST=localhost
# REDIS_PORT=6379

# JWT Configuration
# JWT_SECRET=your-secret-key-here
# JWT_EXPIRES_IN=7d

# Logging
LOG_LEVEL=info
```

### 3. Create Shared Package

#### packages/shared/package.json

```json
{
  "name": "@project/shared",
  "version": "0.0.1",
  "description": "Shared utilities and types for microservices",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist"
  },
  "keywords": [],
  "license": "ISC"
}
```

#### packages/shared/tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### packages/shared/src/index.ts

```typescript
// Shared utilities and types
// Add common code that can be shared across all microservices

export const VERSION = '0.0.1';

// Export shared types
export * from './types';

// Export shared utilities
export * from './utils';
```

#### packages/shared/src/types/index.ts

```typescript
// Shared type definitions

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ServiceHealth {
  status: 'healthy' | 'unhealthy';
  service: string;
  timestamp: Date;
  uptime: number;
}
```

#### packages/shared/src/utils/index.ts

```typescript
// Shared utility functions

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
```

### 4. Create Project README

Create a comprehensive README.md documenting:

- Project overview and architecture
- Prerequisites (Node.js >= 23.0.0, pnpm >= 10.0.0)
- Installation and setup instructions
- Available scripts
- How to create new services
- How to use MangoJS AI instructions
- Service port conventions

### 5. Final Steps

After creating all files, run:

```bash
pnpm install
```

This will install all dependencies and set up the workspace.

## Expected Outcome

After completing these tasks, the monorepo should:

1. Have a working pnpm workspace with the shared package
2. MangoJS (`@theunionsquare/mangojs-core`) installed as a dependency
3. Base TypeScript configuration with decorators enabled
4. Ready to add microservices using the `create-service.md` template
5. Clear documentation for developers to get started

## Next Steps

After setting up the monorepo, use these AI prompts:

1. **Create a service**:
   ```prompt
   Create a new microservice using the template at:
   ./node_modules/@theunionsquare/mangojs-core/instructions/create-service.md
   ```

2. **Enable IAM**:
   ```prompt
   Enable the IAM service using the template at:
   ./node_modules/@theunionsquare/mangojs-core/instructions/enable-iam-service.md
   ```

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
pnpm --filter @project/your-service dev

# Build all services
pnpm build

# Test all services
pnpm test

# Add dependency to specific service
pnpm --filter @project/your-service add express

# Add shared dependency to root
pnpm add -w -D typescript
```

## Notes

- Use `@project/` namespace for all internal packages
- Each service should have its own database (microservices principle)
- Services communicate via REST APIs or message queues
- Configure appropriate ports for each service (e.g., 3001, 3002, 3003)
- Use environment variables for configuration
- MangoJS handles dependency injection, routing, and middleware

---

Follow this prompt to create a production-ready pnpm monorepo structure for building scalable microservices with MangoJS.
