# MangoJS

A lightweight Node.js backend framework for building microservices with simplicity and speed. MangoJS leverages code injection and Express API integration to enable rapid backend development in a microservice architecture. The framework is database-agnostic and built with AI-driven development in mind.

## Features

- **Code Injection**: Clean dependency management through dependency injection
- **Express Integration**: Built on top of Express for familiar API patterns
- **Microservice Architecture**: Designed for distributed systems from the ground up
- **Fast Response Times**: Optimized for performance and quick response times
- **Database Agnostic**: Use any database or ORM of your choice
- **AI Development Ready**: Dedicated prompts and patterns for AI-assisted development

## Start Developing with Mango

Mango is an AI responsive backend framework. It allows to build complex microservice architecture with the simplicity of generative AI.

From an empty repository ask your AI to start creating a nodejs project

```prompt
Create a nodejs project with typescript
```

Add mangojs

```
pnpm link ../mangojs/
```

use the pre-defined prompts to builf your application

```prompt
Start a mangojs application usign the template ./node_modules/@mango/core/instructions/start-monorepo-project.md
```

Enable IAM service

```prompt
Enable the iam-service by running the template ./node_modules/@mango/core/instructions/enable-iam-service.md
```

## Installation

```bash
pnpm add @theunionsquare/mangojs-core
```

Or with npm:

```bash
npm install @theunionsquare/mangojs-core
```

## Quick Start

```typescript
// Coming soon - framework implementation in progress
```

## Project Structure

```
mangojs/
├── src/
│   ├── core/          # Core framework functionality
│   ├── decorators/    # Decorators for dependency injection and routing
│   ├── middleware/    # Built-in middleware
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── examples/          # Example applications
└── dist/             # Compiled output (generated)
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mangojs.git
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

For issues and questions, please open an issue on [GitHub](https://github.com/yourusername/mangojs/issues).
