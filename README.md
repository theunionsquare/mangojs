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
pnpm add @giusmento/mangojs-core
```

Or with npm:

```bash
npm install @giusmento/mangojs-core
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

## Publishing to GitHub and npm

### 1. Prepare Your Repository

Ensure your code is committed:

```bash
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository named `mangojs`
2. **Do not** initialize with README (you already have one)

### 3. Push to GitHub

```bash
# Add GitHub as remote
git remote add origin https://github.com/yourusername/mangojs.git

# Push to GitHub
git push -u origin main
```

### 4. Update package.json

Update the repository URL in [package.json](package.json):

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/mangojs.git"
  }
}
```

### 5. Publishing to npm Registry

#### First-time Setup

1. Create an npm account at [npmjs.com](https://www.npmjs.com)

2. Login via CLI:

```bash
npm login
```

#### Publishing a Version

1. Ensure your code is built:

```bash
pnpm run build
```

2. Update version (choose one):

```bash
# Patch version (0.1.0 -> 0.1.1)
npm version patch

# Minor version (0.1.0 -> 0.2.0)
npm version minor

# Major version (0.1.0 -> 1.0.0)
npm version major
```

3. Publish to npm:

```bash
npm publish --access public
```

> **Note**: For scoped packages like `@giusmento/mangojs-core`, you need to use `--access public` flag for the first publish.

4. Push the version tag to GitHub:

```bash
git push --follow-tags
```

### 6. Automated Publishing with GitHub Actions (Optional)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          registry-url: "https://registry.npmjs.org"
      - run: pnpm install
      - run: pnpm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

Add your npm token to GitHub Secrets:

1. Generate token at npmjs.com → Access Tokens
2. Add to GitHub repo: Settings → Secrets → New repository secret
3. Name it `NPM_TOKEN`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/yourusername/mangojs/issues).
