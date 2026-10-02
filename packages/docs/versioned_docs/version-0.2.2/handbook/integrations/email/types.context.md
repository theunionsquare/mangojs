---
sidebar_label: "Types Reference"
---

# Email Types Reference

## IEmailProvider

Interface that all email providers must implement.

```typescript
interface IEmailProvider {
  readonly providerName: string;
  send(payload: EmailPayload): Promise<EmailSendResult>;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `providerName` | `string` | Unique identifier for the provider (e.g., "brevo", "resend") |
| `send` | `function` | Sends an email and returns the result |

---

## EmailPayload

Payload for sending an email.

```typescript
interface EmailPayload {
  receiver: string;
  subject: string;
  htmlContent: string;
  attachments?: Array<{
    name: string;
    content: string;
  }>;
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `receiver` | `string` | Yes | Recipient email address |
| `subject` | `string` | Yes | Email subject line |
| `htmlContent` | `string` | Yes | HTML body content |
| `attachments` | `Array` | No | File attachments (base64 encoded) |

### Example

```typescript
const payload: EmailPayload = {
  receiver: "user@example.com",
  subject: "Welcome to Our Platform",
  htmlContent: "<h1>Welcome!</h1><p>Thanks for signing up.</p>",
  attachments: [
    {
      name: "welcome.pdf",
      content: "JVBERi0xLjQK...", // base64 encoded
    },
  ],
};
```

---

## EmailSendResult

Result returned from sending an email.

```typescript
interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  raw?: unknown;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `success` | `boolean` | Whether the email was sent successfully |
| `messageId` | `string` | Provider's message ID (if successful) |
| `error` | `string` | Error message (if failed) |
| `raw` | `unknown` | Raw response from provider API |

### Example Usage

```typescript
const result = await emailFactory.send(payload);

if (result.success) {
  console.log(`Email sent: ${result.messageId}`);
} else {
  console.error(`Email failed: ${result.error}`);
  // Optionally inspect raw response
  console.debug(result.raw);
}
```

---

## EmailServiceFactory

Factory class for managing email providers.

```typescript
class EmailServiceFactory {
  constructor(provider?: IEmailProvider);
  setProvider(provider: IEmailProvider | null): this;
  getProvider(): IEmailProvider | null;
  send(payload: EmailPayload): Promise<EmailSendResult>;
}
```

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `constructor` | `provider?: IEmailProvider` | `EmailServiceFactory` | Creates factory with optional provider |
| `setProvider` | `provider: IEmailProvider \| null` | `this` | Sets the current provider |
| `getProvider` | - | `IEmailProvider \| null` | Returns current provider |
| `send` | `payload: EmailPayload` | `Promise<EmailSendResult>` | Sends email via current provider |

### Example

```typescript
import { Integrations } from "@theunionsquare/mangojs-core";

// Create factory
const factory = new Integrations.email.EmailServiceFactory();

// Set provider
factory.setProvider(new Integrations.email.BrevoProvider({
  apiKey: "xxx",
  senderEmail: "noreply@example.com",
  senderName: "My App",
}));

// Check provider
const provider = factory.getProvider();
console.log(provider?.providerName); // "brevo"

// Send email
const result = await factory.send({
  receiver: "user@example.com",
  subject: "Hello",
  htmlContent: "<p>World</p>",
});
```

---

## Provider Config Types

### BrevoProviderConfig

```typescript
interface BrevoProviderConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
}
```

### ResendProviderConfig

```typescript
interface ResendProviderConfig {
  apiKey: string;
  fromEmail: string;
  fromName?: string;
}
```

### DummyProviderConfig

```typescript
interface DummyProviderConfig {
  logToConsole?: boolean;
}
```

---

## Container Types

```typescript
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";

// Binding
container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .toConstantValue(new Integrations.email.EmailServiceFactory());

// Injection
@inject(INVERSITY_TYPES.EmailServiceFactory)
private emailFactory: Integrations.email.EmailServiceFactory;
```

## Related

- [Providers](./providers.context.md) - Provider configurations
- [Custom Provider](./custom-provider.context.md) - Implementing IEmailProvider
- [Overview](./index.context.md) - Email integration overview
