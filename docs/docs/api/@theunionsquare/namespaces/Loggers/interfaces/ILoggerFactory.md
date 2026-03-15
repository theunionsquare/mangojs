---
sidebar_label: ILoggerFactory
---

# Interface: ILoggerFactory

Defined in: [src/core/loggers/types.ts:25](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/types.ts#L25)

Factory interface for creating logger instances.

## Example

```ts
class MyLogger implements ILoggerFactory {
  getLogger() {
    return console;
  }
}
```

## Methods

### getLogger()

```ts
getLogger(): any;
```

Defined in: [src/core/loggers/types.ts:27](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/loggers/types.ts#L27)

#### Returns

`any`
