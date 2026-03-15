[**MangoJS**](../../../../README.md)

***

# Function: Middleware()

```ts
function Middleware(middleware): MethodDecorator;
```

Defined in: src/core/decorators/http/middleware.decorator.ts:11

Generic Middleware decoratoor

## Parameters

### middleware

`RequestHandler`

function in the form (req: Request, res: Response, next: NextFunction) =\> \{
       next();
   \})

## Returns

`MethodDecorator`
