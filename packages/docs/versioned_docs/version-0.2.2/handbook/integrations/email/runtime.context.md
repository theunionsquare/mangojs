---
sidebar_label: "Runtime"
---

# Runtime Provider Configuration

## Overview

Runtime configuration allows you to set the email provider dynamically at service execution time. This is useful when:

- Provider is selected based on user preferences
- Different tenants use different providers
- Provider configuration comes from database or API
- Testing with different providers

---

## Container Binding

Bind the factory without a provider:

```typescript
import { Container } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .toConstantValue(new Integrations.email.EmailServiceFactory());
```

---

## Usage

Set the provider before sending:

```typescript
import { injectable, inject } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

@injectable()
export class NotificationService {
  @inject(INVERSITY_TYPES.EmailServiceFactory)
  private emailFactory: Integrations.email.EmailServiceFactory;

  async sendWelcomeEmail(userEmail: string, providerConfig: any) {
    // Create provider based on configuration
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

---

## Multi-Tenant Example

Select provider based on tenant configuration:

```typescript
@injectable()
export class TenantEmailService {
  @inject(INVERSITY_TYPES.EmailServiceFactory)
  private emailFactory: Integrations.email.EmailServiceFactory;

  @inject(INVERSITY_TYPES.TenantRepository)
  private tenantRepo: ITenantRepository;

  async sendEmail(tenantId: string, payload: EmailPayload) {
    // Get tenant's email configuration
    const tenant = await this.tenantRepo.findById(tenantId);
    const config = tenant.emailConfig;

    // Create appropriate provider
    const provider = this.createProvider(config);
    this.emailFactory.setProvider(provider);

    return this.emailFactory.send(payload);
  }

  private createProvider(config: TenantEmailConfig): IEmailProvider {
    switch (config.provider) {
      case 'brevo':
        return new Integrations.email.BrevoProvider({
          apiKey: config.apiKey,
          senderEmail: config.senderEmail,
          senderName: config.senderName,
        });
      case 'resend':
        return new Integrations.email.ResendProvider({
          apiKey: config.apiKey,
          fromEmail: config.senderEmail,
          fromName: config.senderName,
        });
      default:
        throw new Error(`Unknown provider: ${config.provider}`);
    }
  }
}
```

---

## User-Selected Provider Example

Allow users to configure their email provider:

```typescript
@injectable()
export class UserEmailService {
  @inject(INVERSITY_TYPES.EmailServiceFactory)
  private emailFactory: Integrations.email.EmailServiceFactory;

  async sendWithUserConfig(
    userConfig: UserEmailConfig,
    payload: EmailPayload
  ) {
    // User provides their own API key and provider choice
    const provider = this.buildProviderFromUserConfig(userConfig);
    this.emailFactory.setProvider(provider);

    const result = await this.emailFactory.send(payload);

    // Clear provider after use (security)
    this.emailFactory.setProvider(null);

    return result;
  }

  private buildProviderFromUserConfig(config: UserEmailConfig): IEmailProvider {
    if (config.providerType === 'brevo') {
      return new Integrations.email.BrevoProvider({
        apiKey: config.apiKey,
        senderEmail: config.fromEmail,
        senderName: config.fromName,
      });
    }
    // ... other providers
  }
}
```

---

## Singleton Considerations

When using singleton binding with runtime provider changes:

```typescript
// Request-scoped binding (safer for runtime changes)
container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .toDynamicValue(() => new Integrations.email.EmailServiceFactory())
  .inRequestScope();
```

This ensures each request gets its own factory instance, preventing provider conflicts.

## Related

- [Binding Options](./binding-options.context.md) - Overview of binding strategies
- [Bind Time](./bind-time.context.md) - Static provider configuration
- [Providers](./providers.context.md) - Provider configurations
