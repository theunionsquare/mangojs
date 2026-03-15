---
sidebar_label: BrevoProvider
---

# Class: BrevoProvider

Defined in: [src/core/integrations/emails/providers/BrevoProvider.ts:8](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/integrations/emails/providers/BrevoProvider.ts#L8)

Base interface that all email providers must implement.

## Implements

- [`IEmailProvider`](../interfaces/IEmailProvider.md)

## Constructors

### Constructor

```ts
new BrevoProvider(config): BrevoProvider;
```

Defined in: [src/core/integrations/emails/providers/BrevoProvider.ts:15](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/integrations/emails/providers/BrevoProvider.ts#L15)

#### Parameters

##### config

[`BrevoProviderConfig`](../interfaces/BrevoProviderConfig.md)

#### Returns

`BrevoProvider`

## Properties

### providerName

```ts
readonly providerName: "brevo" = "brevo";
```

Defined in: [src/core/integrations/emails/providers/BrevoProvider.ts:9](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/integrations/emails/providers/BrevoProvider.ts#L9)

#### Implementation of

[`IEmailProvider`](../interfaces/IEmailProvider.md).[`providerName`](../interfaces/IEmailProvider.md#providername)

## Methods

### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [src/core/integrations/emails/providers/BrevoProvider.ts:21](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/integrations/emails/providers/BrevoProvider.ts#L21)

#### Parameters

##### payload

[`EmailPayload`](../interfaces/EmailPayload.md)

#### Returns

`Promise`\<[`EmailSendResult`](../interfaces/EmailSendResult.md)\>

#### Implementation of

[`IEmailProvider`](../interfaces/IEmailProvider.md).[`send`](../interfaces/IEmailProvider.md#send)
