[**MangoJS**](../../../../README.md)

***

# Class: ContainerManager

Defined in: [src/core/container/ContainerManager.ts:16](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/container/ContainerManager.ts#L16)

Wrapper class to manage Inversify containers with a cleaner API.

Provides a simplified interface for dependency injection using Inversify,
with support for parent-child container hierarchies.

## Example

```typescript
const manager = new ContainerManager();
const service = manager.get<MyService>(TYPES.MyService);
```

## Constructors

### Constructor

```ts
new ContainerManager(parent?): ContainerManager;
```

Defined in: [src/core/container/ContainerManager.ts:19](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/container/ContainerManager.ts#L19)

#### Parameters

##### parent?

`Container`

#### Returns

`ContainerManager`

## Methods

### get()

```ts
get<T>(serviceIdentifier, options?): T;
```

Defined in: [src/core/container/ContainerManager.ts:26](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/container/ContainerManager.ts#L26)

Get a service from the container

#### Type Parameters

##### T

`T`

#### Parameters

##### serviceIdentifier

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### options?

#### Returns

`T`

***

### getContainer()

```ts
getContainer(): Container;
```

Defined in: [src/core/container/ContainerManager.ts:48](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/container/ContainerManager.ts#L48)

Get the underlying Inversify container (for advanced use)

#### Returns

`Container`

***

### isBound()

```ts
isBound(serviceIdentifier): boolean;
```

Defined in: [src/core/container/ContainerManager.ts:34](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/container/ContainerManager.ts#L34)

Check if a service is bound

#### Parameters

##### serviceIdentifier

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)

#### Returns

`boolean`

***

### reset()

```ts
reset(): void;
```

Defined in: [src/core/container/ContainerManager.ts:55](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/container/ContainerManager.ts#L55)

Reset the container (useful for testing)

#### Returns

`void`

***

### unbind()

```ts
unbind(serviceIdentifier): void;
```

Defined in: [src/core/container/ContainerManager.ts:41](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/container/ContainerManager.ts#L41)

Unbind a service from the container

#### Parameters

##### serviceIdentifier

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)

#### Returns

`void`
