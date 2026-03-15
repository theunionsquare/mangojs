# Function: Middleware()

```ts
function Middleware(middleware): MethodDecorator;
```

Defined in: [src/core/decorators/http/middleware.decorator.ts:11](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/http/middleware.decorator.ts#L11)

Generic Middleware decoratoor

## Parameters

### middleware

`RequestHandler`

function in the form (req: Request, res: Response, next: NextFunction) =\> \{
       next();
   \})

## Returns

`MethodDecorator`
