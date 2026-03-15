# AI Prompt: Create New Service with MangoJS Framework

You are tasked with creating a new microservice from scratch or updating an already created service using the MangoJS framework.

**Your Guide**: Use [`handbook/`](../handbook/index.context.md) as your primary reference for implementation patterns and best practices.

**Reference Sample**: Use `@theunionsquare/mangojs-core/services/sample` as the base template for structure and configuration.

## ⚠️ CRITICAL RULES (HIGH PRIORITY)

**You MUST strictly follow these rules at all times:**

### 🎯 Workflow Discipline

#### PHASE RULES:

- ✋ **COMPLETE ONE PHASE ENTIRTELY** - before moving to the next
- ✋ **DO NOT SKIP PHASE** - Every phase must be completed in sequence
- ✋ **VALIDATE EACH PHASE** after implementation before moving forward

#### TASKS RULES

- ✋ **DO NOT SKIP STEPS** - Every step must be completed in sequence
- 📋 **DO NOT MAKE ASSUMPTIONS** - If information is missing, ASK the user
- ⏸️ **DO NOT PROCEED WITHOUT CONFIRMATION** - Wait for user approval at each phase
- 🚫 **DO NOT RUSH** - Take time to understand requirements before implementing
- 📖 **ALWAYS USE THE HANDBOOK** - Reference handbook guides for implementation patterns
- ✋ **STOP ON CHECKPOINTS** - Wait for user confirmation on all checkpoints

### 💬 User Interaction

- **Provide options** in numbered/lettered lists for easy selection
- **Ask clarifying questions** when requirements are ambiguous
- **Show what you're going to do** before doing it

---

## 🎯 Implementation Strategy

**Incremental phase-by-phase Approach:**

0. **Gather info → Validate → Initialize Package** → Move to next layer
1. **Gather info → Validate → artifacts → Build Database Layer** → Move to next layer
2. **Gather info → Validate → Build Service Layer** → Move to next layer
3. **Gather info → Validate → API artifacts → Build API Layer (Controllers)** → complete

Each phase is implemented after the gathering requirements step is completed, using the handbook as your implementation guide.

---

## PHASE 0: Service Setup & Initialization

---

### TASK 0.1: GATHER INFO: Service Setup Information

First, analyze the user's initial request. Extract any service name or configuration information already provided.

**A. Service Identity:**

- What should the service name be? (e.g., `user-service`, `auth-service`, `subscription-service`)
- What is the service path in the monorepo? (default: `src/services/{service-name}`)

**B. Basic Configuration:**

- What port should the service run on? (default: 3000, 3001, etc.)
- What should the API version be? (default: v1)

Ask questions for missing information and make sure to provide options in letter/number lists so I can respond easily with my selections.

**Before moving to the next step collect all the missing information**

---

### TASK 0.2: VALIDATE: Confirm Service Setup

Present a summary:

- **Service Name**: `{service-name}`
- **Service Path**: `src/services/{service-name}`
- **Port**: `{port}`
- **API Version**: `v{version}`

**CHECKPOINT**:
Ask: "Does this service setup look correct? Should I proceed with initializing the package?"
**Wait for user confirmation.**

---

### TASK 0.3: IMPLEMENT: Initialize Package

**📖 Reference**: **Follow ALL steps (1-8) in [`handbook/guides/service-setup.context.md`](../handbook/guides/service-setup.context.md)**

**USE ONLY THE HANDBOOK** - Reference handbook guides for implementation

Once confirmed, **implement the complete Service Setup Guide**, which includes:

- Creating directory structure
- Configuring package.json and tsconfig.json
- Setting up environment variables and .env.example
- Writing README.md
- Installing dependencies
- Validating the setup

**The handbook guide contains complete templates, code examples, and troubleshooting for each step.**

---

## PHASE 1: Database Layer

---

Start this phase only when the PHASE 0 has been completed and validated.

**Ask user confirmation before starting PHASE 1**

### TASK 1.1: GATHER INFO: Database Information

First, analyze the user's initial request. Extract any database, entity, or endpoint information already provided. Only ask questions for missing information. If user provides complete requirements upfront, skip to confirmation or ask the user the following questions:

**A. Database Connection:**

- Which database will this service use? (PostgreSQL, CockroachDB, MySQL, MongoDB, etc.)
- What is the database connection URL or host/port/credentials?
- What should the database name be?
- Should the service create tables automatically or use migrations?

**B. Entity/Data Model Design:**

- What entities/tables does this service need?
- For each entity, what are the fields/columns?
  - Field names
  - Data types (string, number, boolean, date, etc.)
  - Constraints (required, unique, length limits, etc.)
  - Default values
  - Relationships to other entities (one-to-one, one-to-many, many-to-many)
- Are there any indexes needed for performance?
- Are there any special fields needed (timestamps, soft deletes, versioning)?

Ask questions for missing information and make sure to provide options in letter/number lists so I can respond easily with my selections.

**Before moving to the next step collect all the missing information**

---

### TASK 1.2: VALIDATE: Confirm Database Design

Present a summary:

- **Database**: Type and connection summary
- **Entities**: List all entities with their main fields and relationships

**CHECKPOINT**:
Ask: "Does this summary look correct? Should I proceed with the database documentation?"

Wait for user confirmation.

---

### TASK 1.3: ARTIFACTS: Create Database artifacts

**📖 Reference**: Follow the artifact templates and guidelines from [`handbook/common/artifacts.context.md`](../handbook/common/artifacts.context.md)

Create all required artifacts in the `docs/` directory following the handbook templates:

- **Database Artifacts**: Conceptual model (Mermaid), Physical model (Mermaid)

Refer to the artifact handbook for exact templates, formats, and constraints for each artifact type.

**CHECKPOINT**:
Ask: "Does artifacts look correct? Should I proceed with the database implementation?"

Wait for user confirmation.

---

### TASK 1.4: IMPLEMENT: Implement Database Layer

**📖 Reference**: [`handbook/database/index.context.md`](../handbook/database/index.context.md)

**USE ONLY THE HANDBOOK** - Reference handbook guides for implementation

Once confirmed, implement:

#### 1.4.1 Create Entity Models

**📖 Reference**: See [`handbook/database/entities.context.md`](../handbook/database/entities.context.md) for entity creation patterns.

For each entity in `src/db/models/{entity}.ts`, follow the handbook guidelines for TypeORM entities.

#### 1.4.2 Create Entity Types

**📖 Reference**: See [`handbook/project-structure/types.context.md`](../handbook/project-structure/types.context.md) for type organization patterns.

In `src/types/entities/{entity}.type.ts`, follow the handbook guidelines for entity types and DTOs.

#### 1.4.3 Configure Database Connection

**📖 Reference**: See [`handbook/architecture/injection.context.md`](../handbook/architecture/injection.context.md).

- Read the reference book
- Select the rigth Persistence Contexts and Database Manager Factories

In `src/inversify.config.ts`:

- Inject the correct Persistence Contexts
- Inject the correct Database Manager Factories and Configure database connection using environment variables
- **NEVER hardcode credentials**

In `.env.example`:

```env
DATABASE_URL=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_SSL=false
DATABASE_SYNC=true
```

#### 1.4.4 Checklist

**📖 Reference**: Use validation checklist from handbook/database/index.context.md

✅ Successful Database Layer

**Observable signs:**

- Terminal shows: `✓ Build completed successfully`
- No red errors in TypeScript
- File `src/db/models/index.ts` exports all entities
- `.env.example` contains all DATABASE\_\* variables
- Running `pnpm build` succeeds without warnings

**If validation fails**:

1. Check error messages carefully
2. Review handbook troubleshooting guide
3. For build errors: Verify TypeScript configuration
4. For connection errors: Check .env configuration
5. Ask user for clarification if configuration issues persist

---

## PHASE 2: Service Layer

Start this phase only when the PHASE 1 has been completed and validated.

**Ask user confirmation before starting PHASE 1**

---

### TASK 2.1: GATHER INFO: Service Requirements

Ask the user:

**A. Business Logic:**

- For each entity, what business operations are needed?
  - Create new records (with what validations?)
  - Read/retrieve records (single, list, with filters?)
  - Update records (full or partial?)
  - Delete records (hard or soft delete?)
- What validation rules should be enforced?
- Are there any complex business rules or workflows?
- What errors should be thrown for invalid operations?

Ask questions for missing information and make sure to provide options in letter/number lists so I can respond easily with my selections.

**Before moving to the next step collect all the missing information**

---

### TASK 2.2: VALIDATE: Confirm Service Design

Present a summary:

- **Services**: List each service with its methods
- **Validations**: Key business rules
- **Errors**: Expected error scenarios

**CHECKPOINT**:
Ask: "Does this service design look correct? Should I proceed with building the service layer?"

**Wait for user confirmation.**

---

### TASK 2.3: IMPLEMENT: Implement Service Layer

**📖 Reference**: [`handbook/service/index.context.md`](../handbook/service/index.context.md)

**USE ONLY THE HANDBOOK** - Reference handbook guides for implementation

Once confirmed, implement:

#### 2.3.1 Create Service Structure

```
src/services/{service-name}/
└── src/
    └── services/
        ├── {entity}.service.ts
        └── index.ts
```

#### 2.3.2 Create Service Classes

**📖 Reference**: See [`handbook/service/setup.context.md`](../handbook/service/setup.context.md) for service implementation patterns.

For each entity in `src/services/{entity}.service.ts`, follow the handbook guidelines for service classes, transactions, error handling, and business logic.

#### 2.3.3 Checklist Service Layer

**📖 Reference**: Use the validation checklist from [`handbook/service/index.context.md`](../handbook/service/index.context.md)

**CHECKPOINT**:
Verify all service layer requirements are met before proceeding to the next phase.

---

## PHASE 3: API Layer (Controllers)

Start this phase only when the PHASE 2 has been completed and validated.

**Ask user confirmation before starting PHASE 3**

---

### TASK 3.1: GATHER INFO: API Requirements

Ask the user:

**A. Endpoints:**

- For each entity, which HTTP endpoints are needed?
  - `GET /api/v1/{entity}` - List all
  - `GET /api/v1/{entity}/:id` - Get by ID
  - `POST /api/v1/{entity}` - Create new
  - `PUT /api/v1/{entity}/:id` - Update
  - `DELETE /api/v1/{entity}/:id` - Delete
- Any custom endpoints beyond basic CRUD?

**B. Security:**

- What authentication/authorization is required per endpoint?
  - Public (no auth)
  - Authenticated (any logged-in user)
  - Role-based (admin, user, specific roles)

**C. API Features:**

- Query/filter requirements?
- Pagination, sorting, search?
- CORS origins to allow?

Ask questions for missing information and make sure to provide options in letter/number lists so I can respond easily with my selections.

**Before moving to the next step collect all the missing information**

---

### TASK 3.2: VALIDATE: Confirm API Design

Present a summary:

- **Endpoints**: Table showing Method, Path, Description, Auth
- **Security**: Authentication requirements
- **CORS**: Allowed origins

**CHECKPOINT**:
Ask: "Does this API design look correct? Should I proceed with building the controllers?"

Wait for user confirmation.

---

### TASK 3.3: IMPLEMENT: Implement API Layer

**📖 Reference**: [`handbook/controller/index.context.md`](../handbook/controller/index.context.md)

**USE ONLY THE HANDBOOK** - Reference handbook guides for implementation

Once confirmed, implement:

#### 3.3.1 Create API Types

**📖 Reference**: See [`handbook/project-structure/types.context.md`](../handbook/project-structure/types.context.md) for API type patterns.

In `src/types/api/v1/{resource}/`, follow the handbook guidelines for request/response types.

#### 3.3.2 Create Controllers

**📖 Reference**: See [`handbook/controller/setup.context.md`](../handbook/controller/setup.context.md) for controller implementation patterns.

** IMPORTANT **
For each entity in `src/routes/v1/{entity}/{entity}.controller.ts` follow the handbook guidelines:

- **decorators**: user decorators defined in the handbook
- **error handling**: user errors defined in the handbook
- **types in request and reponse**: user types defined in the handbook

#### 3.3.3 Configure Service Entry Point

**📖 Reference**: See sample service for ServerBuilder configuration patterns.

Update `src/index.ts` and `.env.example` following the handbook and sample service patterns.

#### 3.3.4 Validate API Layer

**📖 Reference**: Use the validation checklist from [`handbook/controller/index.context.md`](../handbook/controller/index.context.md)

Verify all API layer requirements are met before proceeding to artifacts generation.

---

## Final Validation Checklist

### Package Setup

- [ ] package.json created with correct configuration
- [ ] tsconfig.json extends root config
- [ ] Dependencies installed successfully
- [ ] Service appears in workspace

### Code Implementation

- [ ] Database layer complete and tested
- [ ] Service layer complete with transactions
- [ ] API layer complete with Swagger docs
- [ ] Service builds successfully (`pnpm build`)
- [ ] Service starts successfully (`pnpm start:dev`)
- [ ] Swagger UI loads at `/api-docs`
- [ ] No hardcoded credentials (all in .env.example)

### Artifacts

- [ ] All required artifacts created per handbook
- [ ] Artifacts match current implementation
- [ ] Documentation is clear and concise

### Integration

- [ ] Service integrated in monorepo
- [ ] Dependencies resolve correctly
- [ ] Can build from root workspace

---

## Important Reminders

- **Use handbook as implementation guide** for each layer
- **Build incrementally** - complete one layer before moving to next
- **Validate each layer** before proceeding
- **Never hardcode credentials** - always use environment variables
- **Follow artifact templates** exactly as defined in handbook
- **Use Mermaid diagrams** with ELK layout for all visuals
- **Keep documentation in sync** with implementation
- **Ask for confirmation** after each major phase

---

**Start with Phase 0 (Service Setup & Initialization) and proceed incrementally through each phase.**
**Ask confirmation before starting a new PHASE**
