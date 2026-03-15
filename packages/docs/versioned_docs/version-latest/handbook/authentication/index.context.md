---
sidebar_label: "Overview"
---

# MangoJS Authentication & Authorization

## Purpose

Provide a flexible, strategy-based authentication system that allows developers to:

- Register custom authentication strategies via dependency injection
- Support multiple authentication methods simultaneously (JWT, API keys, sessions, OAuth)
- Use extensible user types (not limited to hardcoded enum values)
- Generate and validate tokens through a unified API

## Key Concepts

- **IAuthStrategy**: Interface for authentication mechanisms (JWT, API key, session, etc.)
- **AuthStrategyRegistry**: Collects all strategies via `@multiInject` and orchestrates authentication
- **AuthContext**: Immutable context attached to `req.authContext` with helper methods
- **IAuthUser**: Flexible user interface with extensible `userType` (any string)
- **AuthCredentials**: Standardized token generation response

## Documentation

| Document                                    | Description                                          |
| ------------------------------------------- | ---------------------------------------------------- |
| [Architecture](./architecture.context.md)   | System architecture, authentication flow             |
| [Strategies](./strategies.context.md)       | JWT, API Key, and custom strategy configuration      |
| [Types Reference](./types.context.md)       | All type definitions and interfaces                  |
| [Examples](./examples.context.md)           | Common patterns, controller usage, complete examples |
