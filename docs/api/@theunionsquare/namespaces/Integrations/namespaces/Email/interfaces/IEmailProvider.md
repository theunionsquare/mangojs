# Interface: IEmailProvider

Defined in: [src/core/integrations/emails/types.ts:28](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/integrations/emails/types.ts#L28)

Base interface that all email providers must implement.

## Properties

### providerName

```ts
readonly providerName: string;
```

Defined in: [src/core/integrations/emails/types.ts:29](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/integrations/emails/types.ts#L29)

## Methods

### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [src/core/integrations/emails/types.ts:30](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/integrations/emails/types.ts#L30)

#### Parameters

##### payload

[`EmailPayload`](EmailPayload.md)

#### Returns

`Promise`\<[`EmailSendResult`](EmailSendResult.md)\>
