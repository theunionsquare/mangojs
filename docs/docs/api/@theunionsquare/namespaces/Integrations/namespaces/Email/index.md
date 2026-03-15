---
sidebar_label: Email
---

# Email

## Description

Email integration with pluggable providers (Brevo, Resend, Dummy).

## Example

```ts
import { EmailServiceFactory, BrevoProvider } from '@anthropic/mangojs';

const provider = new BrevoProvider({ apiKey: '...', senderEmail: '...', senderName: '...' });
const emailService = new EmailServiceFactory(provider);
await emailService.send({ receiver: 'user@example.com', subject: 'Hello', htmlContent: '<p>Hi!</p>' });
```

## Classes

- [BrevoProvider](classes/BrevoProvider.md)
- [DummyProvider](classes/DummyProvider.md)
- [~~EmailServiceBrevo~~](classes/EmailServiceBrevo.md)
- [~~EmailServiceDummy~~](classes/EmailServiceDummy.md)
- [EmailServiceFactory](classes/EmailServiceFactory.md)
- [ResendProvider](classes/ResendProvider.md)

## Interfaces

- [BrevoProviderConfig](interfaces/BrevoProviderConfig.md)
- [DummyProviderConfig](interfaces/DummyProviderConfig.md)
- [EmailPayload](interfaces/EmailPayload.md)
- [EmailSendResult](interfaces/EmailSendResult.md)
- [IEmailProvider](interfaces/IEmailProvider.md)
- [~~IEmailService~~](interfaces/IEmailService.md)
- [ResendProviderConfig](interfaces/ResendProviderConfig.md)
