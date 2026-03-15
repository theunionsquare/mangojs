---
sidebar_label: Loggers
---

# Loggers

## Description

Logging utilities with Pino integration.

## Example

```ts
import { LoggerPino } from '@anthropic/mangojs';

const logger = new LoggerPino('my-service', 'info');
const pino = logger.getLogger();
pino.info('Server started');
```

## Classes

- [LoggerPino](classes/LoggerPino.md)

## Interfaces

- [ILogger](interfaces/ILogger.md)
- [ILoggerFactory](interfaces/ILoggerFactory.md)
