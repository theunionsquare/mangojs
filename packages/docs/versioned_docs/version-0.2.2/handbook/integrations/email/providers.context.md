---
sidebar_label: "Providers"
---

# Email Providers Configuration

## Built-in Providers

MangoJS includes three built-in email providers:

| Provider | Use Case | API |
|----------|----------|-----|
| `BrevoProvider` | Production emails | Brevo (Sendinblue) API |
| `ResendProvider` | Production emails | Resend API |
| `DummyProvider` | Testing/development | Logs to console |

---

## BrevoProvider

Brevo (formerly Sendinblue) integration for transactional emails.

### Configuration

```typescript
interface BrevoProviderConfig {
  apiKey: string;       // Brevo API key (xkeysib-xxx)
  senderEmail: string;  // From email address
  senderName: string;   // From display name
}
```

### Usage

```typescript
import { Integrations } from "@theunionsquare/mangojs-core";

const provider = new Integrations.email.BrevoProvider({
  apiKey: "xkeysib-xxxxxxxxxxxxxxxxxxxxx",
  senderEmail: "noreply@example.com",
  senderName: "My App",
});
```

### Environment Variables

```bash
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxx
SENDER_EMAIL=noreply@example.com
SENDER_NAME=My App
```

```typescript
const provider = new Integrations.email.BrevoProvider({
  apiKey: process.env.BREVO_API_KEY!,
  senderEmail: process.env.SENDER_EMAIL!,
  senderName: process.env.SENDER_NAME!,
});
```

---

## ResendProvider

Resend integration for transactional emails.

### Configuration

```typescript
interface ResendProviderConfig {
  apiKey: string;     // Resend API key (re_xxx)
  fromEmail: string;  // From email address
  fromName?: string;  // From display name (optional)
}
```

### Usage

```typescript
import { Integrations } from "@theunionsquare/mangojs-core";

const provider = new Integrations.email.ResendProvider({
  apiKey: "re_xxxxxxxxxxxxxxxxxxxxx",
  fromEmail: "noreply@example.com",
  fromName: "My App",
});
```

### Environment Variables

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
SENDER_EMAIL=noreply@example.com
SENDER_NAME=My App
```

```typescript
const provider = new Integrations.email.ResendProvider({
  apiKey: process.env.RESEND_API_KEY!,
  fromEmail: process.env.SENDER_EMAIL!,
  fromName: process.env.SENDER_NAME,
});
```

---

## DummyProvider

Mock provider for testing and development. Does not send real emails.

### Configuration

```typescript
interface DummyProviderConfig {
  logToConsole?: boolean;  // Log email details to console (default: false)
}
```

### Usage

```typescript
import { Integrations } from "@theunionsquare/mangojs-core";

// With console logging
const provider = new Integrations.email.DummyProvider({
  logToConsole: true,
});

// Silent (no logging)
const provider = new Integrations.email.DummyProvider({
  logToConsole: false,
});
```

### Output Example

When `logToConsole: true`:

```
[DummyProvider] Email sent:
  To: user@example.com
  Subject: Welcome!
  Content: <h1>Welcome to our platform</h1>
```

## Related

- [Binding Options](./binding-options.context.md) - How to bind providers
- [Custom Provider](./custom-provider.context.md) - Create your own provider
- [Types Reference](./types.context.md) - Interface definitions
