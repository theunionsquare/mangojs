[**MangoJS**](../../../../../../README.md)

***

# Interface: IEmailProvider

Defined in: src/core/integrations/emails/types.ts:28

Base interface that all email providers must implement.

## Properties

### providerName

```ts
readonly providerName: string;
```

Defined in: src/core/integrations/emails/types.ts:29

## Methods

### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: src/core/integrations/emails/types.ts:30

#### Parameters

##### payload

[`EmailPayload`](EmailPayload.md)

#### Returns

`Promise`\<[`EmailSendResult`](EmailSendResult.md)\>
