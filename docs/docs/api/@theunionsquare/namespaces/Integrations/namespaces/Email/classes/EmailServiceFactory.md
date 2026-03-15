---
sidebar_label: EmailServiceFactory
---

# Class: EmailServiceFactory

Defined in: [src/core/integrations/emails/EmailServiceFactory.ts:28](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/integrations/emails/EmailServiceFactory.ts#L28)

Factory for sending emails through configurable providers.

## Examples

```ts
// Binding Option 1: Set provider later
container.bind<EmailServiceFactory>(TYPES.EmailServiceFactory).to(EmailServiceFactory);

// Usage
const factory = container.get<EmailServiceFactory>(TYPES.EmailServiceFactory);
const brevoProvider = new BrevoProvider({ apiKey: '...', senderEmail: '...', senderName: '...' });
factory.setProvider(brevoProvider);
await factory.send({ receiver: '...', subject: '...', htmlContent: '...' });
```

```ts
// Binding Option 2: Set provider at bind time
const brevoProvider = new BrevoProvider({ apiKey: '...', senderEmail: '...', senderName: '...' });
container.bind<EmailServiceFactory>(TYPES.EmailServiceFactory)
  .toConstantValue(new EmailServiceFactory(brevoProvider));

// Usage
const factory = container.get<EmailServiceFactory>(TYPES.EmailServiceFactory);
await factory.send({ receiver: '...', subject: '...', htmlContent: '...' });
```

## Constructors

### Constructor

```ts
new EmailServiceFactory(provider?): EmailServiceFactory;
```

Defined in: [src/core/integrations/emails/EmailServiceFactory.ts:31](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/integrations/emails/EmailServiceFactory.ts#L31)

#### Parameters

##### provider?

[`IEmailProvider`](../interfaces/IEmailProvider.md)

#### Returns

`EmailServiceFactory`

## Methods

### getProvider()

```ts
getProvider(): IEmailProvider;
```

Defined in: [src/core/integrations/emails/EmailServiceFactory.ts:51](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/integrations/emails/EmailServiceFactory.ts#L51)

Gets the current provider instance.

#### Returns

[`IEmailProvider`](../interfaces/IEmailProvider.md)

The current provider or null if not set

***

### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [src/core/integrations/emails/EmailServiceFactory.ts:61](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/integrations/emails/EmailServiceFactory.ts#L61)

Sends an email using the configured provider.

#### Parameters

##### payload

[`EmailPayload`](../interfaces/EmailPayload.md)

The email payload (receiver, subject, htmlContent, attachments)

#### Returns

`Promise`\<[`EmailSendResult`](../interfaces/EmailSendResult.md)\>

Promise with the send result

#### Throws

Error if no provider has been set

***

### setProvider()

```ts
setProvider(provider): this;
```

Defined in: [src/core/integrations/emails/EmailServiceFactory.ts:42](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/integrations/emails/EmailServiceFactory.ts#L42)

Sets the email provider instance to use.

#### Parameters

##### provider

[`IEmailProvider`](../interfaces/IEmailProvider.md)

An initialized IEmailProvider instance

#### Returns

`this`

this - for method chaining
