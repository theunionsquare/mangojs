---
sidebar_label: Container
---

# Container

## Description

Dependency injection container management using Inversify.
Provides utilities for creating and managing IoC containers.

## Classes

### ContainerManager

Defined in: packages/core/src/core/container/ContainerManager.ts:16

Wrapper class to manage Inversify containers with a cleaner API.

Provides a simplified interface for dependency injection using Inversify,
with support for parent-child container hierarchies.

#### Example

```typescript
const manager = new ContainerManager();
const service = manager.get<MyService>(TYPES.MyService);
```

#### Constructors

##### Constructor

```ts
new ContainerManager(parent?): ContainerManager;
```

Defined in: packages/core/src/core/container/ContainerManager.ts:19

###### Parameters

###### parent?

`Container`

###### Returns

[`ContainerManager`](#containermanager)

#### Methods

##### get()

```ts
get<T>(serviceIdentifier, options?): T;
```

Defined in: packages/core/src/core/container/ContainerManager.ts:26

Get a service from the container

###### Type Parameters

###### T

`T`

###### Parameters

###### serviceIdentifier

[`ServiceIdentifier`](#serviceidentifier)\<`T`\>

###### options?

###### Returns

`T`

##### getContainer()

```ts
getContainer(): Container;
```

Defined in: packages/core/src/core/container/ContainerManager.ts:48

Get the underlying Inversify container (for advanced use)

###### Returns

`Container`

##### isBound()

```ts
isBound(serviceIdentifier): boolean;
```

Defined in: packages/core/src/core/container/ContainerManager.ts:34

Check if a service is bound

###### Parameters

###### serviceIdentifier

[`ServiceIdentifier`](#serviceidentifier)

###### Returns

`boolean`

##### reset()

```ts
reset(): void;
```

Defined in: packages/core/src/core/container/ContainerManager.ts:55

Reset the container (useful for testing)

###### Returns

`void`

##### unbind()

```ts
unbind(serviceIdentifier): void;
```

Defined in: packages/core/src/core/container/ContainerManager.ts:41

Unbind a service from the container

###### Parameters

###### serviceIdentifier

[`ServiceIdentifier`](#serviceidentifier)

###### Returns

`void`

## Type Aliases

### ServiceIdentifier

```ts
type ServiceIdentifier<TInstance> = string | symbol | Newable<TInstance> | Function;
```

Defined in: packages/core/src/core/container/types.ts:8

Service identifier for dependency injection.
Can be a string, symbol, constructor, or function.

#### Type Parameters

##### TInstance

`TInstance` = `unknown`

The type of the service instance

## Functions

### addCoreModule()

```ts
function addCoreModule(container): Container;
```

Defined in: packages/core/src/core/container/modules.ts:8

Core module providing default logger binding

#### Parameters

##### container

`Container`

#### Returns

`Container`

***

### createChild()

```ts
function createChild(parent?): ContainerManager;
```

Defined in: packages/core/src/core/container/index.ts:34

Create a child container for a microservice
Child containers inherit parent bindings and can override them

#### Parameters

##### parent?

[`ContainerManager`](#containermanager)

#### Returns

[`ContainerManager`](#containermanager)

***

### getContainer()

```ts
function getContainer(): ContainerManager;
```

Defined in: packages/core/src/core/container/index.ts:18

Get the parent container manager (contains shared dependencies like logger)

#### Returns

[`ContainerManager`](#containermanager)

***

### getContainerManager()

```ts
function getContainerManager(): ContainerManager;
```

Defined in: packages/core/src/core/container/index.ts:24

#### Returns

[`ContainerManager`](#containermanager)
