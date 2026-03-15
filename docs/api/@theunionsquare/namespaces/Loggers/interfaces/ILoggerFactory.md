# Interface: ILoggerFactory

Defined in: [src/core/loggers/types.ts:25](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/loggers/types.ts#L25)

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

Defined in: [src/core/loggers/types.ts:27](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/loggers/types.ts#L27)

#### Returns

`any`
