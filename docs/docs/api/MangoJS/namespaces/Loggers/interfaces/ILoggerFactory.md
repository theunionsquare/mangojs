[**MangoJS**](../../../../README.md)

***

# Interface: ILoggerFactory

Defined in: src/core/loggers/types.ts:25

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

Defined in: src/core/loggers/types.ts:27

#### Returns

`any`
