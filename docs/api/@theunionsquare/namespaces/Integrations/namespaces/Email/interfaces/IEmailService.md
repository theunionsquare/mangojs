# ~~Interface: IEmailService~~

Defined in: [src/core/integrations/emails/IEmailService.ts:6](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/integrations/emails/IEmailService.ts#L6)

Legacy email service interface.

## Deprecated

Use IEmailProvider and EmailServiceFactory instead.

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

Defined in: [src/core/integrations/emails/IEmailService.ts:8](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/integrations/emails/IEmailService.ts#L8)

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
