---
sidebar_label: Middlewares
---

# Middlewares

## Description

Express middlewares for authentication and request processing.

## Example

```ts
import { userInfo, requestTime } from '@mangojs/core';

app.use(requestTime.middlewareRequestTime);
app.use(userInfo.middlewareAuthContext);
```

## Namespaces

- [requestTime](namespaces/requestTime/index.md)
- [userInfo](namespaces/userInfo/index.md)

## Interfaces

- [AuthenticatedRequest](interfaces/AuthenticatedRequest.md)
