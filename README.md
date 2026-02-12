# MangoJS

A lightweight Node.js backend framework for building microservices with simplicity and speed. MangoJS leverages code injection and Express API integration to enable rapid backend development in a microservice architecture. The framework is database-agnostic and built with AI-driven development in mind.

## Features

- **Code Injection**: Clean dependency management through dependency injection
- **Express Integration**: Built on top of Express for familiar API patterns
- **Microservice Architecture**: Designed for distributed systems from the ground up
- **Fast Response Times**: Optimized for performance and quick response times
- **Database Agnostic**: Use any database or ORM of your choice
- **AI Development Ready**: Dedicated prompts and patterns for AI-assisted development

## 🚀 Quick Start: Start Developing with MangoJS

MangoJS is an AI-responsive backend framework. It allows you to build complex microservice architectures with the simplicity of generative AI.

### Step 1: Create a New Project

From an empty directory, initialize a new Node.js project:

```bash
mkdir my-project
cd my-project
pnpm init
```

### Step 2: Install MangoJS

Install MangoJS directly from GitHub:

```bash
pnpm add github:theunionsquare/mangojs
```

Or from npm (when published):

```bash
pnpm add @theunionsquare/mangojs-core
```

### Step 3: Set Up the Monorepo Structure

Ask your AI assistant to configure the monorepo:

```prompt
Start a MangoJS application using the template at:
./node_modules/@theunionsquare/mangojs-core/instructions/start-monorepo-project.md
```

This will create:
- `services/` - Directory for your microservices
- `packages/shared/` - Shared utilities and types
- `pnpm-workspace.yaml` - Workspace configuration
- `tsconfig.json` - Base TypeScript configuration
- `.gitignore`, `.env.example`, `README.md`

### Step 4: Create Your First Service

Use the AI prompt to create a microservice:

```prompt
Create a new microservice using the template at:
./node_modules/@theunionsquare/mangojs-core/instructions/create-service.md
```

### Step 5: Enable IAM Service (Optional)

Add identity and access management:

```prompt
Enable the IAM service using the template at:
./node_modules/@theunionsquare/mangojs-core/instructions/enable-iam-service.md
```

## 📖 AI Instructions

MangoJS comes with pre-built AI prompts located in `instructions/`:

| Instruction | Description |
|-------------|-------------|
| `start-monorepo-project.md` | Set up pnpm workspace monorepo structure |
| `create-service.md` | Create a new microservice |
| `enable-iam-service.md` | Add identity & access management |
| `review-artifacts.md` | Review and document code |

## 📚 Handbook

Detailed documentation is available in `handbook/`:

- **Quick Start**: `handbook/quick-start-tutorial.context.md`
- **Controllers**: `handbook/controller/overview.context.md`
- **Services**: `handbook/service/overview.context.md`
- **Database**: `handbook/database/overview.context.md`
- **Architecture**: `handbook/architecture/overview.context.md`
- **Dependency Injection**: `handbook/architecture/injection.context.md`
- **Decorators**: `handbook/architecture/decorators.context.md`
- **Scheduler**: `handbook/scheduler/overview.context.md`
- **Queue System**: `handbook/queue/overview.context.md`

## Project Structure

```
mangojs/
├── src/
│   ├── core/          # Core framework functionality
│   ├── decorators/    # Decorators for dependency injection and routing
│   ├── middleware/    # Built-in middleware
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── instructions/      # AI prompts for scaffolding
├── handbook/          # Detailed documentation
└── dist/              # Compiled output (generated)
```

## Development

### Prerequisites

- Node.js >= 23.0.0
- pnpm >= 10.0.0

### Setup

1. Clone the repository:

```bash
git clone https://github.com/theunionsquare/mangojs.git
cd mangojs
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm run build
```

4. Watch mode for development:

```bash
pnpm run dev
```

## Release Process

### Creating a New Release

1. Ensure your code is committed and pushed to the repository.

2. Create a new release (bumps version, creates git tag, and creates GitHub release):

```bash
pnpm release
```

This uses [release-it](https://github.com/release-it/release-it) to:
- Bump the version in `package.json`
- Create a git commit and tag
- Push to GitHub
- Create a GitHub release

3. Publish to GitHub Package Registry:

```bash
pnpm publish
```

> **Note**: You need to be authenticated with GitHub Package Registry. Ensure your `.npmrc` is configured and you have a valid `GITHUB_TOKEN`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/theunionsquare/mangojs/issues).
