---
sidebar_label: "Bind Time"
---

# Bind Time Provider Configuration

## Overview

Bind time configuration sets the email provider when binding the factory to the container. This is the simplest approach when your application uses a single email provider.

---

## Container Binding

Pass the provider to the factory constructor:

```typescript
import { Container } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

// Create provider with configuration
const brevoProvider = new Integrations.email.BrevoProvider({
  apiKey: process.env.BREVO_API_KEY,
  senderEmail: "noreply@example.com",
  senderName: "My App",
});

// Bind factory with provider
container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .toConstantValue(new Integrations.email.EmailServiceFactory(brevoProvider));
```

---

## Usage

Services can send emails directly without configuration:

```typescript
import { injectable, inject } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

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

    if (!result.success) {
      throw new Error(`Email failed: ${result.error}`);
    }

    return result.messageId;
  }

  async sendPasswordReset(userEmail: string, resetLink: string) {
    const result = await this.emailFactory.send({
      receiver: userEmail,
      subject: "Password Reset",
      htmlContent: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    return result.success;
  }
}
```

---

## Environment-Based Provider

Select provider based on environment:

```typescript
import { Container } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

function createEmailProvider(): Integrations.email.IEmailProvider {
  const env = process.env.NODE_ENV;

  if (env === 'production') {
    return new Integrations.email.BrevoProvider({
      apiKey: process.env.BREVO_API_KEY!,
      senderEmail: process.env.SENDER_EMAIL!,
      senderName: process.env.SENDER_NAME!,
    });
  }

  if (env === 'staging') {
    return new Integrations.email.ResendProvider({
      apiKey: process.env.RESEND_API_KEY!,
      fromEmail: process.env.SENDER_EMAIL!,
    });
  }

  // Development/test: use dummy provider
  return new Integrations.email.DummyProvider({
    logToConsole: true,
  });
}

container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .toConstantValue(new Integrations.email.EmailServiceFactory(createEmailProvider()));
```

---

## Complete Setup Example

```typescript
// src/inversify.config.ts
import { Container } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

const container = new Container();

// Email provider configuration
const emailProvider = new Integrations.email.BrevoProvider({
  apiKey: process.env.BREVO_API_KEY!,
  senderEmail: process.env.SENDER_EMAIL!,
  senderName: process.env.SENDER_NAME || "My App",
});

container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .toConstantValue(new Integrations.email.EmailServiceFactory(emailProvider));

export { container };
```

```typescript
// src/services/notification.service.ts
@injectable()
export class NotificationService {
  @inject(INVERSITY_TYPES.EmailServiceFactory)
  private emailFactory: Integrations.email.EmailServiceFactory;

  async notifyUser(email: string, message: string) {
    return this.emailFactory.send({
      receiver: email,
      subject: "Notification",
      htmlContent: `<p>${message}</p>`,
    });
  }
}
```

---

## When to Use Bind Time

| Scenario | Recommendation |
|----------|----------------|
| Single email provider | Bind Time |
| Provider from env vars | Bind Time |
| Static configuration | Bind Time |
| Multi-tenant | Runtime |
| User-provided credentials | Runtime |
| Dynamic provider selection | Runtime |

## Related

- [Binding Options](./binding-options.context.md) - Overview of binding strategies
- [Runtime](./runtime.context.md) - Dynamic provider configuration
- [Providers](./providers.context.md) - Provider configurations
