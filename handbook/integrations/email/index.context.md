---
sidebar_label: "Overview"
---

# MangoJS Email Integration

## Purpose

The Email Integration provides a factory pattern for sending transactional emails through multiple providers (Brevo, Resend, etc.). Users set an initialized provider instance, allowing runtime selection and custom provider implementations.

## Key Concepts

- **Factory Pattern**: `EmailServiceFactory` holds a provider instance and delegates `send()` to it
- **Provider Interface**: All providers implement `IEmailProvider` with a unified `send()` method
- **Extensible**: Users can create custom providers by implementing `IEmailProvider`
- **Two Binding Options**: Set provider at bind time or at runtime

---

## Internal Architecture

```
src/core/integrations/
└── emails/
    ├── providers/
    │   ├── BrevoProvider.ts      # Brevo (Sendinblue) implementation
    │   ├── ResendProvider.ts     # Resend implementation
    │   ├── DummyProvider.ts      # Testing/development mock
    │   └── index.ts
    ├── IEmailProvider.ts         # Interface + config types
    ├── EmailServiceFactory.ts    # Injectable factory
    └── index.ts
```

---

## Operative Model

```
┌─────────────────────────────────────────────────────────┐
│                    Your Service                         │
│                                                         │
│   @inject(EmailServiceFactory)                          │
│   private emailFactory: EmailServiceFactory             │
│                                                         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ send(payload)
                       ▼
┌─────────────────────────────────────────────────────────┐
│               EmailServiceFactory                       │
│                                                         │
│   • setProvider(provider)                               │
│   • getProvider()                                       │
│   • send(payload) → delegates to provider               │
│                                                         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ provider.send(payload)
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  IEmailProvider                         │
│                                                         │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│   │   Brevo     │  │   Resend    │  │   Custom    │    │
│   │  Provider   │  │  Provider   │  │  Provider   │    │
│   └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Documentation

| Document                                              | Description                                    |
| ----------------------------------------------------- | ---------------------------------------------- |
| [Binding Options](./binding-options.context.md)       | Overview of bind-time vs runtime configuration |
| [Runtime](./runtime.context.md)                       | Setting provider at runtime                    |
| [Bind Time](./bind-time.context.md)                   | Setting provider at container bind time        |
| [Providers](./providers.context.md)                   | Built-in provider configurations               |
| [Types Reference](./types.context.md)                 | Interfaces and EmailServiceFactory API         |
| [Custom Provider](./custom-provider.context.md)       | Creating your own provider                     |

---

## Gotchas

- **Provider Required**: `send()` throws if no provider is set
- **Singleton Caution**: If factory is bound as singleton and you call `setProvider()` per-request, ensure thread safety or use request-scoped binding
- **Error Handling**: Always check `result.success` - providers return errors instead of throwing
- **Attachments**: Content must be base64 encoded for most providers
