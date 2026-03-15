[**MangoJS**](../../../../../../README.md)

***

# ~~Class: EmailServiceBrevo~~

Defined in: [src/core/integrations/emails/EmailService.brevo.ts:10](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/EmailService.brevo.ts#L10)

Legacy Brevo email service.

## Deprecated

Use BrevoProvider with EmailServiceFactory instead.

## Implements

- [`IEmailService`](../interfaces/IEmailService.md)

## Constructors

### Constructor

```ts
new EmailServiceBrevo(
   senderEmail, 
   senderName, 
   brevoApiKey): EmailServiceBrevo;
```

Defined in: [src/core/integrations/emails/EmailService.brevo.ts:17](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/EmailService.brevo.ts#L17)

#### Parameters

##### senderEmail

`string`

##### senderName

`string`

##### brevoApiKey

`string`

#### Returns

`EmailServiceBrevo`

## Properties

### ~~brevoApiKey~~

```ts
brevoApiKey: string;
```

Defined in: [src/core/integrations/emails/EmailService.brevo.ts:12](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/EmailService.brevo.ts#L12)

***

### ~~provider~~

```ts
provider: string;
```

Defined in: [src/core/integrations/emails/EmailService.brevo.ts:11](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/EmailService.brevo.ts#L11)

***

### ~~senderEmail~~

```ts
senderEmail: string;
```

Defined in: [src/core/integrations/emails/EmailService.brevo.ts:13](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/EmailService.brevo.ts#L13)

***

### ~~senderName~~

```ts
senderName: string;
```

Defined in: [src/core/integrations/emails/EmailService.brevo.ts:14](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/EmailService.brevo.ts#L14)

***

### ~~url~~

```ts
url: string;
```

Defined in: [src/core/integrations/emails/EmailService.brevo.ts:15](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/EmailService.brevo.ts#L15)

## Methods

### ~~sendTransactionEmail()~~

```ts
sendTransactionEmail(
   receiver, 
   subject, 
   templateHtml, 
   attachments?): Promise<{
}>;
```

Defined in: [src/core/integrations/emails/EmailService.brevo.ts:28](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/EmailService.brevo.ts#L28)

#### Parameters

##### receiver

`string`

##### subject

`string`

##### templateHtml

`string`

##### attachments?

`object`[]

#### Returns

`Promise`\<\{
\}\>

#### Implementation of

[`IEmailService`](../interfaces/IEmailService.md).[`sendTransactionEmail`](../interfaces/IEmailService.md#sendtransactionemail)
