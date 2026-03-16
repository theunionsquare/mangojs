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

### BrevoProvider

Defined in: [packages/core/src/core/integrations/emails/providers/BrevoProvider.ts:8](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/BrevoProvider.ts#L8)

Base interface that all email providers must implement.

#### Implements

- [`IEmailProvider`](#iemailprovider)

#### Constructors

##### Constructor

```ts
new BrevoProvider(config): BrevoProvider;
```

Defined in: [packages/core/src/core/integrations/emails/providers/BrevoProvider.ts:15](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/BrevoProvider.ts#L15)

###### Parameters

###### config

[`BrevoProviderConfig`](#brevoproviderconfig)

###### Returns

[`BrevoProvider`](#brevoprovider)

#### Properties

##### providerName

```ts
readonly providerName: "brevo" = "brevo";
```

Defined in: [packages/core/src/core/integrations/emails/providers/BrevoProvider.ts:9](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/BrevoProvider.ts#L9)

###### Implementation of

[`IEmailProvider`](#iemailprovider).[`providerName`](#providername-3)

#### Methods

##### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [packages/core/src/core/integrations/emails/providers/BrevoProvider.ts:21](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/BrevoProvider.ts#L21)

###### Parameters

###### payload

[`EmailPayload`](#emailpayload)

###### Returns

`Promise`\<[`EmailSendResult`](#emailsendresult)\>

###### Implementation of

[`IEmailProvider`](#iemailprovider).[`send`](#send-4)

***

### DummyProvider

Defined in: [packages/core/src/core/integrations/emails/providers/DummyProvider.ts:8](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/DummyProvider.ts#L8)

Base interface that all email providers must implement.

#### Implements

- [`IEmailProvider`](#iemailprovider)

#### Constructors

##### Constructor

```ts
new DummyProvider(config?): DummyProvider;
```

Defined in: [packages/core/src/core/integrations/emails/providers/DummyProvider.ts:12](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/DummyProvider.ts#L12)

###### Parameters

###### config?

[`DummyProviderConfig`](#dummyproviderconfig)

###### Returns

[`DummyProvider`](#dummyprovider)

#### Properties

##### providerName

```ts
readonly providerName: "dummy" = "dummy";
```

Defined in: [packages/core/src/core/integrations/emails/providers/DummyProvider.ts:9](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/DummyProvider.ts#L9)

###### Implementation of

[`IEmailProvider`](#iemailprovider).[`providerName`](#providername-3)

#### Methods

##### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [packages/core/src/core/integrations/emails/providers/DummyProvider.ts:16](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/DummyProvider.ts#L16)

###### Parameters

###### payload

[`EmailPayload`](#emailpayload)

###### Returns

`Promise`\<[`EmailSendResult`](#emailsendresult)\>

###### Implementation of

[`IEmailProvider`](#iemailprovider).[`send`](#send-4)

***

### ~~EmailServiceBrevo~~

Defined in: [packages/core/src/core/integrations/emails/EmailService.brevo.ts:10](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.brevo.ts#L10)

Legacy Brevo email service.

#### Deprecated

Use BrevoProvider with EmailServiceFactory instead.

#### Implements

- [`IEmailService`](#iemailservice)

#### Constructors

##### Constructor

```ts
new EmailServiceBrevo(
   senderEmail, 
   senderName, 
   brevoApiKey): EmailServiceBrevo;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.brevo.ts:17](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.brevo.ts#L17)

###### Parameters

###### senderEmail

`string`

###### senderName

`string`

###### brevoApiKey

`string`

###### Returns

[`EmailServiceBrevo`](#emailservicebrevo)

#### Properties

##### ~~brevoApiKey~~

```ts
brevoApiKey: string;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.brevo.ts:12](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.brevo.ts#L12)

##### ~~provider~~

```ts
provider: string;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.brevo.ts:11](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.brevo.ts#L11)

##### ~~senderEmail~~

```ts
senderEmail: string;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.brevo.ts:13](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.brevo.ts#L13)

##### ~~senderName~~

```ts
senderName: string;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.brevo.ts:14](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.brevo.ts#L14)

##### ~~url~~

```ts
url: string;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.brevo.ts:15](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.brevo.ts#L15)

#### Methods

##### ~~sendTransactionEmail()~~

```ts
sendTransactionEmail(
   receiver, 
   subject, 
   templateHtml, 
   attachments?): Promise<{
}>;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.brevo.ts:28](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.brevo.ts#L28)

###### Parameters

###### receiver

`string`

###### subject

`string`

###### templateHtml

`string`

###### attachments?

`object`[]

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IEmailService`](#iemailservice).[`sendTransactionEmail`](#sendtransactionemail-2)

***

### ~~EmailServiceDummy~~

Defined in: [packages/core/src/core/integrations/emails/EmailService.dummy.ts:10](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.dummy.ts#L10)

Legacy dummy email service for testing.

#### Deprecated

Use DummyProvider with EmailServiceFactory instead.

#### Implements

- [`IEmailService`](#iemailservice)

#### Constructors

##### Constructor

```ts
new EmailServiceDummy(): EmailServiceDummy;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.dummy.ts:13](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.dummy.ts#L13)

###### Returns

[`EmailServiceDummy`](#emailservicedummy)

#### Properties

##### ~~provider~~

```ts
provider: string;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.dummy.ts:11](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.dummy.ts#L11)

#### Methods

##### ~~sendTransactionEmail()~~

```ts
sendTransactionEmail(
   receiver, 
   subject, 
   templatePath, 
   attachments?): Promise<{
}>;
```

Defined in: [packages/core/src/core/integrations/emails/EmailService.dummy.ts:16](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailService.dummy.ts#L16)

###### Parameters

###### receiver

`string`

###### subject

`string`

###### templatePath

`string`

###### attachments?

`object`[]

###### Returns

`Promise`\<\{
\}\>

###### Implementation of

[`IEmailService`](#iemailservice).[`sendTransactionEmail`](#sendtransactionemail-2)

***

### EmailServiceFactory

Defined in: [packages/core/src/core/integrations/emails/EmailServiceFactory.ts:28](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailServiceFactory.ts#L28)

Factory for sending emails through configurable providers.

#### Examples

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

#### Constructors

##### Constructor

```ts
new EmailServiceFactory(provider?): EmailServiceFactory;
```

Defined in: [packages/core/src/core/integrations/emails/EmailServiceFactory.ts:31](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailServiceFactory.ts#L31)

###### Parameters

###### provider?

[`IEmailProvider`](#iemailprovider)

###### Returns

[`EmailServiceFactory`](#emailservicefactory)

#### Methods

##### getProvider()

```ts
getProvider(): IEmailProvider;
```

Defined in: [packages/core/src/core/integrations/emails/EmailServiceFactory.ts:51](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailServiceFactory.ts#L51)

Gets the current provider instance.

###### Returns

[`IEmailProvider`](#iemailprovider)

The current provider or null if not set

##### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [packages/core/src/core/integrations/emails/EmailServiceFactory.ts:61](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailServiceFactory.ts#L61)

Sends an email using the configured provider.

###### Parameters

###### payload

[`EmailPayload`](#emailpayload)

The email payload (receiver, subject, htmlContent, attachments)

###### Returns

`Promise`\<[`EmailSendResult`](#emailsendresult)\>

Promise with the send result

###### Throws

Error if no provider has been set

##### setProvider()

```ts
setProvider(provider): this;
```

Defined in: [packages/core/src/core/integrations/emails/EmailServiceFactory.ts:42](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/EmailServiceFactory.ts#L42)

Sets the email provider instance to use.

###### Parameters

###### provider

[`IEmailProvider`](#iemailprovider)

An initialized IEmailProvider instance

###### Returns

`this`

this - for method chaining

***

### ResendProvider

Defined in: [packages/core/src/core/integrations/emails/providers/ResendProvider.ts:8](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/ResendProvider.ts#L8)

Base interface that all email providers must implement.

#### Implements

- [`IEmailProvider`](#iemailprovider)

#### Constructors

##### Constructor

```ts
new ResendProvider(config): ResendProvider;
```

Defined in: [packages/core/src/core/integrations/emails/providers/ResendProvider.ts:15](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/ResendProvider.ts#L15)

###### Parameters

###### config

[`ResendProviderConfig`](#resendproviderconfig)

###### Returns

[`ResendProvider`](#resendprovider)

#### Properties

##### providerName

```ts
readonly providerName: "resend" = "resend";
```

Defined in: [packages/core/src/core/integrations/emails/providers/ResendProvider.ts:9](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/ResendProvider.ts#L9)

###### Implementation of

[`IEmailProvider`](#iemailprovider).[`providerName`](#providername-3)

#### Methods

##### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [packages/core/src/core/integrations/emails/providers/ResendProvider.ts:21](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/providers/ResendProvider.ts#L21)

###### Parameters

###### payload

[`EmailPayload`](#emailpayload)

###### Returns

`Promise`\<[`EmailSendResult`](#emailsendresult)\>

###### Implementation of

[`IEmailProvider`](#iemailprovider).[`send`](#send-4)

## Interfaces

### BrevoProviderConfig

Defined in: [packages/core/src/core/integrations/emails/types.ts:36](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L36)

Brevo provider configuration.

#### Properties

##### apiKey

```ts
apiKey: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:37](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L37)

##### senderEmail

```ts
senderEmail: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:38](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L38)

##### senderName

```ts
senderName: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:39](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L39)

***

### DummyProviderConfig

Defined in: [packages/core/src/core/integrations/emails/types.ts:54](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L54)

Dummy provider configuration for testing.

#### Properties

##### logToConsole?

```ts
optional logToConsole: boolean;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:55](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L55)

***

### EmailPayload

Defined in: [packages/core/src/core/integrations/emails/types.ts:8](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L8)

Email payload for sending transactional emails.

#### Properties

##### attachments?

```ts
optional attachments: object[];
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:12](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L12)

###### content

```ts
content: string;
```

###### name

```ts
name: string;
```

##### htmlContent

```ts
htmlContent: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:11](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L11)

##### receiver

```ts
receiver: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:9](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L9)

##### subject

```ts
subject: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:10](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L10)

***

### EmailSendResult

Defined in: [packages/core/src/core/integrations/emails/types.ts:18](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L18)

Result of sending an email.

#### Properties

##### error?

```ts
optional error: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:21](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L21)

##### messageId?

```ts
optional messageId: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:20](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L20)

##### raw?

```ts
optional raw: unknown;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:22](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L22)

##### success

```ts
success: boolean;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:19](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L19)

***

### IEmailProvider

Defined in: [packages/core/src/core/integrations/emails/types.ts:28](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L28)

Base interface that all email providers must implement.

#### Properties

##### providerName

```ts
readonly providerName: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:29](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L29)

#### Methods

##### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:30](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L30)

###### Parameters

###### payload

[`EmailPayload`](#emailpayload)

###### Returns

`Promise`\<[`EmailSendResult`](#emailsendresult)\>

***

### ~~IEmailService~~

Defined in: [packages/core/src/core/integrations/emails/IEmailService.ts:6](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/IEmailService.ts#L6)

Legacy email service interface.

#### Deprecated

Use IEmailProvider and EmailServiceFactory instead.

#### Methods

##### ~~sendTransactionEmail()~~

```ts
sendTransactionEmail(
   receiver, 
   subject, 
   templatePath, 
   attachments?): Promise<{
}>;
```

Defined in: [packages/core/src/core/integrations/emails/IEmailService.ts:8](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/IEmailService.ts#L8)

###### Parameters

###### receiver

`string`

###### subject

`string`

###### templatePath

`string`

###### attachments?

`object`[]

###### Returns

`Promise`\<\{
\}\>

***

### ResendProviderConfig

Defined in: [packages/core/src/core/integrations/emails/types.ts:45](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L45)

Resend provider configuration.

#### Properties

##### apiKey

```ts
apiKey: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:46](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L46)

##### fromEmail

```ts
fromEmail: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:47](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L47)

##### fromName?

```ts
optional fromName: string;
```

Defined in: [packages/core/src/core/integrations/emails/types.ts:48](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/integrations/emails/types.ts#L48)
