[**MangoJS**](../../../../../../README.md)

***

# Class: ResendProvider

Defined in: [src/core/integrations/emails/providers/ResendProvider.ts:8](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/providers/ResendProvider.ts#L8)

Base interface that all email providers must implement.

## Implements

- [`IEmailProvider`](../interfaces/IEmailProvider.md)

## Constructors

### Constructor

```ts
new ResendProvider(config): ResendProvider;
```

Defined in: [src/core/integrations/emails/providers/ResendProvider.ts:15](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/providers/ResendProvider.ts#L15)

#### Parameters

##### config

[`ResendProviderConfig`](../interfaces/ResendProviderConfig.md)

#### Returns

`ResendProvider`

## Properties

### providerName

```ts
readonly providerName: "resend" = "resend";
```

Defined in: [src/core/integrations/emails/providers/ResendProvider.ts:9](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/providers/ResendProvider.ts#L9)

#### Implementation of

[`IEmailProvider`](../interfaces/IEmailProvider.md).[`providerName`](../interfaces/IEmailProvider.md#providername)

## Methods

### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [src/core/integrations/emails/providers/ResendProvider.ts:21](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/providers/ResendProvider.ts#L21)

#### Parameters

##### payload

[`EmailPayload`](../interfaces/EmailPayload.md)

#### Returns

`Promise`\<[`EmailSendResult`](../interfaces/EmailSendResult.md)\>

#### Implementation of

[`IEmailProvider`](../interfaces/IEmailProvider.md).[`send`](../interfaces/IEmailProvider.md#send)
