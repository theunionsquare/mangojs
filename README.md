<h1 align="center">
  <img src="https://mangojs.tech/logo.png" alt="MangoJS Logo" width="32" style="vertical-align: middle;" />
  MangoJS
</h1>

<p align="center">
  <strong>The AI-First Backend Framework</strong><br/>
  Build backends with natural language. From idea to API in minutes.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@theunionsquare/mangojs-core"><img src="https://img.shields.io/npm/v/@theunionsquare/mangojs-core.svg" alt="npm version" /></a>
  <a href="https://github.com/theunionsquare/mangojs/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <a href="https://mangojs.tech"><img src="https://img.shields.io/badge/docs-mangojs.tech-orange.svg" alt="Documentation" /></a>
</p>

<p align="center">
  <code>~3kb</code> core size &nbsp;•&nbsp; <code><1ms</code> routing &nbsp;•&nbsp; <code>100%</code> TypeScript
</p>

---

## Why MangoJS?

MangoJS is designed for the AI era. Describe your services in plain English, and let AI generate production-ready code following battle-tested patterns.

```
"Create a user authentication service with JWT tokens and role-based permissions"
```

MangoJS + AI = Complete service architecture with controllers, services, and database models.

---

## Features

| Feature | Description |
|---------|-------------|
| **AI-First Development** | Built-in handbook and patterns optimized for AI code generation |
| **Onion Architecture** | Clean separation: Controllers → Services → Database |
| **Dependency Injection** | Powered by Inversify for testable, maintainable code |
| **Type Safety** | 100% TypeScript with strict typing throughout |
| **Database Agnostic** | Use any database with TypeORM integration |
| **Production Ready** | Auto-generated Swagger docs, error handling, logging |
| **Microservice Patterns** | Distributed systems support out of the box |
| **Built-in Auth** | Decorators for authentication and permissions |
| **Background Jobs** | BullMQ queues and cron scheduling included |
| **Worker Threads** | CPU-intensive task support |

---

## Architecture

MangoJS follows **Onion Architecture** with dependencies flowing inward:

<table align="center">
  <tr>
    <td align="center" style="padding: 16px;">
      <h3>🌐 Controllers</h3>
      <code>HTTP Layer</code><br/>
      <sub>Routes, validation, responses</sub>
    </td>
  </tr>
  <tr>
    <td align="center"><b>⬇️</b></td>
  </tr>
  <tr>
    <td align="center" style="padding: 16px;">
      <h3>⚙️ Services</h3>
      <code>Business Logic</code><br/>
      <sub>Transactions, rules, orchestration</sub>
    </td>
  </tr>
  <tr>
    <td align="center"><b>⬇️</b></td>
  </tr>
  <tr>
    <td align="center" style="padding: 16px;">
      <h3>🗃️ Database Models</h3>
      <code>Data Layer</code><br/>
      <sub>Entities, repositories, queries</sub>
    </td>
  </tr>
</table>

<p align="center"><sub><i>Dependencies flow inward → Inner layers never depend on outer layers</i></sub></p>

---

## AI-Powered Development

MangoJS includes a comprehensive handbook optimized for AI assistants:

```prompt
Start a mangojs application using the handbook at ./node_modules/@theunionsquare/mangojs-core/handbook
```

The handbook provides:
- Code templates for common patterns
- Best practices and conventions
- Step-by-step tutorials
- Architecture guidelines

---

## Project Structure

```
your-app/
├── src/
│   ├── db/
│   │   └── models/          # TypeORM entities
│   ├── routes/
│   │   └── v1/              # Versioned controllers
│   ├── services/            # Business logic
│   ├── types/               # TypeScript definitions
│   └── inversify.config.ts  # DI container setup
├── package.json
└── tsconfig.json
```

---

## Documentation

- [Quick Start Tutorial](https://mangojs.tech/docs/quick-start)
- [API Reference](https://mangojs.tech/docs/api)
- [Architecture Guide](https://mangojs.tech/docs/architecture)
- [Best Practices](https://mangojs.tech/docs/best-practices)

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

MIT

---

<p align="center">
  <a href="https://mangojs.tech">mangojs.tech</a> &nbsp;•&nbsp;
  <a href="https://github.com/theunionsquare/mangojs">GitHub</a>
</p>
