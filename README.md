# MangoJS Monorepo

AI-Powered Backend Framework for Node.js

## Packages

| Package | Description |
|---------|-------------|
| [@mangojs/core](./packages/core) | The framework - published to npm |
| [@mangojs/docs](./packages/docs) | Docusaurus documentation |
| [@mangojs/website](./packages/website) | Landing page (mangojs.tech) |

## Quick Start

```bash
# Install dependencies
pnpm install

# Build the framework
pnpm build

# Start docs dev server
pnpm dev:docs
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build @mangojs/core |
| `pnpm build:docs` | Build Docusaurus docs |
| `pnpm build:all` | Build core + docs |
| `pnpm dev` | Watch mode for core |
| `pnpm dev:docs` | Start Docusaurus dev server |
| `pnpm release <version>` | Release new version |

## Local Development

### Docs only

```bash
pnpm dev:docs
```

Open `http://localhost:3000/docs/`

### Website + Docs

```bash
# Terminal 1: Serve the static website
npx serve packages/website -p 8010

# Terminal 2: Build docs and copy to website
pnpm build:docs && cp -r packages/docs/build packages/website/docs
```

Open `http://localhost:8010/`

## Docker

```bash
# Build image (website + docs)
docker build -t mangojs-web .

# Run locally
docker-compose up -d
```

- `http://localhost:8010/` - Landing page
- `http://localhost:8010/docs/` - Documentation

## License

MIT
