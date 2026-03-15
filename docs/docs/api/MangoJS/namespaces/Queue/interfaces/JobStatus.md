[**MangoJS**](../../../../README.md)

***

# Interface: JobStatus

Defined in: [src/core/queue/types.ts:53](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L53)

Job status information

## Properties

### attemptsMade

```ts
attemptsMade: number;
```

Defined in: [src/core/queue/types.ts:61](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L61)

***

### data

```ts
data: any;
```

Defined in: [src/core/queue/types.ts:58](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L58)

***

### failedReason?

```ts
optional failedReason: string;
```

Defined in: [src/core/queue/types.ts:60](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L60)

***

### id

```ts
id: string;
```

Defined in: [src/core/queue/types.ts:54](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L54)

***

### name

```ts
name: string;
```

Defined in: [src/core/queue/types.ts:55](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L55)

***

### progress

```ts
progress: number;
```

Defined in: [src/core/queue/types.ts:57](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L57)

***

### returnValue?

```ts
optional returnValue: any;
```

Defined in: [src/core/queue/types.ts:59](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L59)

***

### status

```ts
status: "waiting" | "active" | "completed" | "failed" | "delayed";
```

Defined in: [src/core/queue/types.ts:56](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L56)

***

### timestamp

```ts
timestamp: number;
```

Defined in: [src/core/queue/types.ts:62](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L62)
