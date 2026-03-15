[**MangoJS**](../../../../../../README.md)

***

# Class: DummyProvider

Defined in: [src/core/integrations/emails/providers/DummyProvider.ts:8](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/providers/DummyProvider.ts#L8)

Base interface that all email providers must implement.

## Implements

- [`IEmailProvider`](../interfaces/IEmailProvider.md)

## Constructors

### Constructor

```ts
new DummyProvider(config?): DummyProvider;
```

Defined in: [src/core/integrations/emails/providers/DummyProvider.ts:12](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/providers/DummyProvider.ts#L12)

#### Parameters

##### config?

[`DummyProviderConfig`](../interfaces/DummyProviderConfig.md)

#### Returns

`DummyProvider`

## Properties

### providerName

```ts
readonly providerName: "dummy" = "dummy";
```

Defined in: [src/core/integrations/emails/providers/DummyProvider.ts:9](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/providers/DummyProvider.ts#L9)

#### Implementation of

[`IEmailProvider`](../interfaces/IEmailProvider.md).[`providerName`](../interfaces/IEmailProvider.md#providername)

## Methods

### send()

```ts
send(payload): Promise<EmailSendResult>;
```

Defined in: [src/core/integrations/emails/providers/DummyProvider.ts:16](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/integrations/emails/providers/DummyProvider.ts#L16)

#### Parameters

##### payload

[`EmailPayload`](../interfaces/EmailPayload.md)

#### Returns

`Promise`\<[`EmailSendResult`](../interfaces/EmailSendResult.md)\>

#### Implementation of

[`IEmailProvider`](../interfaces/IEmailProvider.md).[`send`](../interfaces/IEmailProvider.md#send)
