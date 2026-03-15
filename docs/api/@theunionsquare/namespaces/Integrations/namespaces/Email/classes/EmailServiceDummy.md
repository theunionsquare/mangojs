# ~~Class: EmailServiceDummy~~

Defined in: [src/core/integrations/emails/EmailService.dummy.ts:10](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/integrations/emails/EmailService.dummy.ts#L10)

Legacy dummy email service for testing.

## Deprecated

Use DummyProvider with EmailServiceFactory instead.

## Implements

- [`IEmailService`](../interfaces/IEmailService.md)

## Constructors

### Constructor

```ts
new EmailServiceDummy(): EmailServiceDummy;
```

Defined in: [src/core/integrations/emails/EmailService.dummy.ts:13](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/integrations/emails/EmailService.dummy.ts#L13)

#### Returns

`EmailServiceDummy`

## Properties

### ~~provider~~

```ts
provider: string;
```

Defined in: [src/core/integrations/emails/EmailService.dummy.ts:11](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/integrations/emails/EmailService.dummy.ts#L11)

## Methods

### ~~sendTransactionEmail()~~

```ts
sendTransactionEmail(
   receiver, 
   subject, 
   templatePath, 
   attachments?): Promise<{
}>;
```

Defined in: [src/core/integrations/emails/EmailService.dummy.ts:16](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/integrations/emails/EmailService.dummy.ts#L16)

#### Parameters

##### receiver

`string`

##### subject

`string`

##### templatePath

`string`

##### attachments?

`object`[]

#### Returns

`Promise`\<\{
\}\>

#### Implementation of

[`IEmailService`](../interfaces/IEmailService.md).[`sendTransactionEmail`](../interfaces/IEmailService.md#sendtransactionemail)
