[**MangoJS**](../../../../../../README.md)

***

# ~~Interface: IEmailService~~

Defined in: [src/core/integrations/emails/IEmailService.ts:6](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/IEmailService.ts#L6)

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

Defined in: [src/core/integrations/emails/IEmailService.ts:8](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/IEmailService.ts#L8)

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
