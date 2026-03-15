---
sidebar_label: Middleware
---

# Function: Middleware()

```ts
function Middleware(middleware): MethodDecorator;
```

Defined in: [src/core/decorators/http/middleware.decorator.ts:11](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/http/middleware.decorator.ts#L11)

Generic Middleware decoratoor

## Parameters

### middleware

`RequestHandler`

function in the form (req: Request, res: Response, next: NextFunction) =\> \{
       next();
   \})

## Returns

`MethodDecorator`
