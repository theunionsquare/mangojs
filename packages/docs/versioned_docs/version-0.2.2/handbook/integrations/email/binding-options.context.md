---
sidebar_label: "Binding Options"
---

# Email Binding Options

## Overview

The `EmailServiceFactory` supports two binding strategies for configuring the email provider:

| Option | When to Use | Provider Set |
|--------|-------------|--------------|
| **Bind Time** | Single provider for entire app | At container binding |
| **Runtime** | Dynamic provider selection | At service runtime |

---

## Option 1: Bind Time

Set the provider when binding the factory to the container. Best for applications using a single email provider.

```typescript
import { Container } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

const brevoProvider = new Integrations.email.BrevoProvider({
  apiKey: process.env.BREVO_API_KEY,
  senderEmail: "noreply@example.com",
  senderName: "My App",
});

container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .toConstantValue(new Integrations.email.EmailServiceFactory(brevoProvider));
```

**Pros:**
- Provider configured once
- No setup needed in services
- Simpler service code

**Cons:**
- Cannot change provider at runtime
- Single provider per container

See [Bind Time](./bind-time.context.md) for detailed usage.

---

## Option 2: Runtime

Bind the factory without a provider, then set it dynamically in your services. Best for multi-tenant applications or user-configured providers.

```typescript
import { Container } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .toConstantValue(new Integrations.email.EmailServiceFactory());
```

**Pros:**
- Dynamic provider selection
- Per-request configuration
- Multi-tenant support

**Cons:**
- Must set provider before sending
- More complex service code

See [Runtime](./runtime.context.md) for detailed usage.

---

## Comparison

```
┌─────────────────────────────────────────────────────────┐
│                    BIND TIME                            │
│                                                         │
│   Container Binding    →    Service Usage               │
│   ┌─────────────────┐      ┌─────────────────┐         │
│   │ new Factory(    │      │ factory.send()  │         │
│   │   brevoProvider │  →   │ // Just send    │         │
│   │ )               │      │                 │         │
│   └─────────────────┘      └─────────────────┘         │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    RUNTIME                              │
│                                                         │
│   Container Binding    →    Service Usage               │
│   ┌─────────────────┐      ┌─────────────────┐         │
│   │ new Factory()   │      │ factory         │         │
│   │ // No provider  │  →   │   .setProvider()│         │
│   │                 │      │   .send()       │         │
│   └─────────────────┘      └─────────────────┘         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Related

- [Runtime](./runtime.context.md) - Dynamic provider configuration
- [Bind Time](./bind-time.context.md) - Static provider configuration
- [Providers](./providers.context.md) - Provider configurations
