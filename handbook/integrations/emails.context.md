# MangoJS Email Integration

## Purpose

The Email Integration provides a factory pattern for sending transactional emails through multiple providers (Brevo, Resend, etc.). Users set an initialized provider instance, allowing runtime selection and custom provider implementations.

## Key Concepts

- **Factory Pattern**: `EmailServiceFactory` holds a provider instance and delegates `send()` to it
- **Provider Interface**: All providers implement `IEmailProvider` with a unified `send()` method
- **Extensible**: Users can create custom providers by implementing `IEmailProvider`
- **Two Binding Options**: Set provider at bind time or at runtime

---

## Architecture

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

## Container Binding

### Option 1: Set Provider Later (Runtime)

```typescript
import { Container } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .to(Integrations.email.EmailServiceFactory);
```

### Option 2: Set Provider at Bind Time

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

---

## Usage

### With Provider Set at Runtime

```typescript
import { injectable, inject } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

@injectable()
export class NotificationService {
  @inject(INVERSITY_TYPES.EmailServiceFactory)
  private emailFactory: Integrations.email.EmailServiceFactory;

  async sendWelcomeEmail(userEmail: string, providerConfig: any) {
    // Create provider based on FE selection
    const provider = new Integrations.email.BrevoProvider(providerConfig);
    this.emailFactory.setProvider(provider);

    const result = await this.emailFactory.send({
      receiver: userEmail,
      subject: "Welcome!",
      htmlContent: "<h1>Welcome to our platform</h1>",
    });

    if (!result.success) {
      throw new Error(`Email failed: ${result.error}`);
    }

    return result.messageId;
  }
}
```

### With Provider Set at Bind Time

```typescript
@injectable()
export class NotificationService {
  @inject(INVERSITY_TYPES.EmailServiceFactory)
  private emailFactory: Integrations.email.EmailServiceFactory;

  async sendWelcomeEmail(userEmail: string) {
    // Provider already configured at bind time
    const result = await this.emailFactory.send({
      receiver: userEmail,
      subject: "Welcome!",
      htmlContent: "<h1>Welcome to our platform</h1>",
    });

    return result.messageId;
  }
}
```

---

## Provider Configuration

### BrevoProvider

```typescript
const provider = new BrevoProvider({
  apiKey: "xkeysib-xxx",
  senderEmail: "noreply@example.com",
  senderName: "My App",
});
```

### ResendProvider

```typescript
const provider = new ResendProvider({
  apiKey: "re_xxx",
  fromEmail: "noreply@example.com",
  fromName: "My App", // optional
});
```

### DummyProvider (Testing)

```typescript
const provider = new DummyProvider({ logToConsole: true });
```

---

## Interfaces

### IEmailProvider

```typescript
interface IEmailProvider {
  readonly providerName: string;
  send(payload: EmailPayload): Promise<EmailSendResult>;
}
```

### EmailPayload

```typescript
interface EmailPayload {
  receiver: string;
  subject: string;
  htmlContent: string;
  attachments?: Array<{ name: string; content: string }>;
}
```

### EmailSendResult

```typescript
interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  raw?: unknown;
}
```

---

## EmailServiceFactory Methods

| Method | Description |
|--------|-------------|
| `constructor(provider?)` | Optional provider at construction |
| `setProvider(provider)` | Sets the provider instance, returns `this` |
| `getProvider()` | Returns current provider or null |
| `send(payload)` | Sends email via configured provider |

---

## Creating a Custom Provider

Implement `IEmailProvider` to create your own provider:

```typescript
import {
  IEmailProvider,
  EmailPayload,
  EmailSendResult
} from "@theunionsquare/mangojs-core/integrations/emails";

interface SendGridConfig {
  apiKey: string;
  fromEmail: string;
}

export class SendGridProvider implements IEmailProvider {
  readonly providerName = "sendgrid";
  private readonly apiKey: string;
  private readonly fromEmail: string;

  constructor(config: SendGridConfig) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
  }

  async send(payload: EmailPayload): Promise<EmailSendResult> {
    // Implement SendGrid API call
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: payload.receiver }] }],
        from: { email: this.fromEmail },
        subject: payload.subject,
        content: [{ type: "text/html", value: payload.htmlContent }],
      }),
    });

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` };
    }

    return { success: true, messageId: response.headers.get("x-message-id") };
  }
}

// Usage
const factory = container.get<EmailServiceFactory>(TYPES.EmailServiceFactory);
factory.setProvider(new SendGridProvider({ apiKey: "...", fromEmail: "..." }));
await factory.send({ receiver: "...", subject: "...", htmlContent: "..." });
```

---

## Gotchas

- **Provider Required**: `send()` throws if no provider is set
- **Singleton Caution**: If factory is bound as singleton and you call `setProvider()` per-request, ensure thread safety or use request-scoped binding
- **Error Handling**: Always check `result.success` - providers return errors instead of throwing
- **Attachments**: Content must be base64 encoded for most providers

---

## Related

- [Dependency Injection](../architecture/injection.context.md) - DI configuration
- [Service Layer](../service/overview.context.md) - Using factory in services
