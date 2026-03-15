---
sidebar_label: Auth
---

# Auth

## Description

Authorization decorators for Express route protection.

## Classes

- [AuthConfig](classes/AuthConfig.md)
- [AuthErrorFactory](classes/AuthErrorFactory.md)
- [AuthorizationError](classes/AuthorizationError.md)

## Interfaces

- [AuthConfigOptions](interfaces/AuthConfigOptions.md)
- [AuthErrorDetails](interfaces/AuthErrorDetails.md)
- [DecoratorOptions](interfaces/DecoratorOptions.md)
- [OwnershipOptions](interfaces/OwnershipOptions.md)
- [UserCacheContext](interfaces/UserCacheContext.md)

## Type Aliases

- [AuthErrorHandler](type-aliases/AuthErrorHandler.md)
- [OwnershipValidator](type-aliases/OwnershipValidator.md)
- [ParameterSource](type-aliases/ParameterSource.md)
- [UserContextExtractor](type-aliases/UserContextExtractor.md)

## Variables

- [authCache](variables/authCache.md)
- [defaultUserContextExtractor](variables/defaultUserContextExtractor.md)

## Functions

- [ClassHasUserType](functions/ClassHasUserType.md)
- [clearUserCache](functions/clearUserCache.md)
- [generateCacheKey](functions/generateCacheKey.md)
- [HasGroups](functions/HasGroups.md)
- [HasUserType](functions/HasUserType.md)
- [NoAuth](functions/NoAuth.md)
- [OrAuth](functions/OrAuth.md)
- [RequiresAccess](functions/RequiresAccess.md)
- [RequiresOwnership](functions/RequiresOwnership.md)

## References

### CacheEntry

Re-exports [CacheEntry](../../../Cache/interfaces/CacheEntry.md)

***

### CacheOptions

Re-exports [CacheOptions](../../../Cache/interfaces/CacheOptions.md)

***

### CacheStats

Re-exports [CacheStats](../../../Cache/interfaces/CacheStats.md)
