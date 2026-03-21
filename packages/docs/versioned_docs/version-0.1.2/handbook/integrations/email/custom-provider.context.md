---
sidebar_label: "Custom Provider"
---

# Creating a Custom Email Provider

## Overview

Implement `IEmailProvider` to create your own email provider. This allows integration with any email service not included in MangoJS.

---

## Interface

```typescript
interface IEmailProvider {
  readonly providerName: string;
  send(payload: EmailPayload): Promise<EmailSendResult>;
}
```

---

## Basic Implementation

```typescript
import {
  IEmailProvider,
  EmailPayload,
  EmailSendResult
} from "@theunionsquare/mangojs-core/integrations/emails";

interface MyProviderConfig {
  apiKey: string;
  fromEmail: string;
}

export class MyCustomProvider implements IEmailProvider {
  readonly providerName = "my-provider";

  private readonly apiKey: string;
  private readonly fromEmail: string;

  constructor(config: MyProviderConfig) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
  }

  async send(payload: EmailPayload): Promise<EmailSendResult> {
    try {
      // Your API call here
      const response = await this.callApi(payload);

      return {
        success: true,
        messageId: response.id,
        raw: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async callApi(payload: EmailPayload): Promise<any> {
    // Implementation
  }
}
```

---

## SendGrid Example

Complete implementation for SendGrid:

```typescript
import {
  IEmailProvider,
  EmailPayload,
  EmailSendResult
} from "@theunionsquare/mangojs-core/integrations/emails";

interface SendGridConfig {
  apiKey: string;
  fromEmail: string;
  fromName?: string;
}

export class SendGridProvider implements IEmailProvider {
  readonly providerName = "sendgrid";

  private readonly apiKey: string;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor(config: SendGridConfig) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
    this.fromName = config.fromName || "";
  }

  async send(payload: EmailPayload): Promise<EmailSendResult> {
    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(this.buildPayload(payload)),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.errors?.[0]?.message || `HTTP ${response.status}`,
          raw: error,
        };
      }

      return {
        success: true,
        messageId: response.headers.get("x-message-id") || undefined,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private buildPayload(payload: EmailPayload) {
    const sendgridPayload: any = {
      personalizations: [
        {
          to: [{ email: payload.receiver }],
        },
      ],
      from: {
        email: this.fromEmail,
        name: this.fromName,
      },
      subject: payload.subject,
      content: [
        {
          type: "text/html",
          value: payload.htmlContent,
        },
      ],
    };

    if (payload.attachments?.length) {
      sendgridPayload.attachments = payload.attachments.map(att => ({
        content: att.content,
        filename: att.name,
        type: "application/octet-stream",
        disposition: "attachment",
      }));
    }

    return sendgridPayload;
  }
}
```

---

## Mailgun Example

```typescript
import {
  IEmailProvider,
  EmailPayload,
  EmailSendResult
} from "@theunionsquare/mangojs-core/integrations/emails";

interface MailgunConfig {
  apiKey: string;
  domain: string;
  fromEmail: string;
  fromName?: string;
}

export class MailgunProvider implements IEmailProvider {
  readonly providerName = "mailgun";

  private readonly config: MailgunConfig;

  constructor(config: MailgunConfig) {
    this.config = config;
  }

  async send(payload: EmailPayload): Promise<EmailSendResult> {
    try {
      const formData = new FormData();
      formData.append("from", `${this.config.fromName} <${this.config.fromEmail}>`);
      formData.append("to", payload.receiver);
      formData.append("subject", payload.subject);
      formData.append("html", payload.htmlContent);

      const response = await fetch(
        `https://api.mailgun.net/v3/${this.config.domain}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`api:${this.config.apiKey}`)}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`,
          raw: data,
        };
      }

      return {
        success: true,
        messageId: data.id,
        raw: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
```

---

## Usage

```typescript
import { Container } from "inversify";
import { INVERSITY_TYPES, Integrations } from "@theunionsquare/mangojs-core";
import { SendGridProvider } from "./providers/sendgrid.provider";

// Create custom provider
const sendgridProvider = new SendGridProvider({
  apiKey: process.env.SENDGRID_API_KEY!,
  fromEmail: "noreply@example.com",
  fromName: "My App",
});

// Bind with custom provider
container
  .bind<Integrations.email.EmailServiceFactory>(INVERSITY_TYPES.EmailServiceFactory)
  .toConstantValue(new Integrations.email.EmailServiceFactory(sendgridProvider));

// Or set at runtime
const factory = container.get<Integrations.email.EmailServiceFactory>(
  INVERSITY_TYPES.EmailServiceFactory
);
factory.setProvider(sendgridProvider);

// Send email
await factory.send({
  receiver: "user@example.com",
  subject: "Hello",
  htmlContent: "<p>World</p>",
});
```

---

## Best Practices

1. **Return errors, don't throw**: Use `EmailSendResult.success = false` instead of throwing
2. **Include raw response**: Set `raw` property for debugging
3. **Validate config**: Check required fields in constructor
4. **Handle attachments**: Support the attachments array if your provider allows it
5. **Use meaningful providerName**: Helps with logging and debugging

## Related

- [Types Reference](./types.context.md) - Interface definitions
- [Providers](./providers.context.md) - Built-in provider examples
- [Overview](./index.context.md) - Email integration overview
