---
sidebar_label: enums
---

# enums

## Enumerations

### AdminUserStatus

Defined in: packages/core/src/core/types/enums/index.ts:43

#### Enumeration Members

##### ACTIVE

```ts
ACTIVE: "ACTIVE";
```

Defined in: packages/core/src/core/types/enums/index.ts:45

##### DISABLED

```ts
DISABLED: "DISABLED";
```

Defined in: packages/core/src/core/types/enums/index.ts:46

##### PENDING

```ts
PENDING: "PENDING";
```

Defined in: packages/core/src/core/types/enums/index.ts:44

***

### ~~AuthUserType~~

Defined in: packages/core/src/core/types/enums/index.ts:18

#### Deprecated

Use string user types instead for flexibility.
The new auth system accepts any string as userType, allowing
custom roles like 'MODERATOR', 'SUPPORT', 'API_CLIENT', etc.

This enum is maintained for backwards compatibility with existing code.

#### Example

```typescript
// Old way (deprecated)
if (user.userType === AuthUserType.ADMIN) { ... }

// New way - use string literals or your own constants
if (authContext.hasUserType('ADMIN')) { ... }
if (authContext.hasAnyUserType(['ADMIN', 'MODERATOR'])) { ... }
```

#### Enumeration Members

##### ~~ADMIN~~

```ts
ADMIN: "ADMIN";
```

Defined in: packages/core/src/core/types/enums/index.ts:19

##### ~~PARTNER~~

```ts
PARTNER: "PARTNER";
```

Defined in: packages/core/src/core/types/enums/index.ts:20

##### ~~USER~~

```ts
USER: "USER";
```

Defined in: packages/core/src/core/types/enums/index.ts:21

***

### PartnerStatus

Defined in: packages/core/src/core/types/enums/index.ts:30

#### Enumeration Members

##### ACTIVE

```ts
ACTIVE: "ACTIVE";
```

Defined in: packages/core/src/core/types/enums/index.ts:33

##### DISABLED

```ts
DISABLED: "DISABLED";
```

Defined in: packages/core/src/core/types/enums/index.ts:34

##### PENDING

```ts
PENDING: "PENDING";
```

Defined in: packages/core/src/core/types/enums/index.ts:31

##### UNDER\_REVIEW

```ts
UNDER_REVIEW: "UNDER_REVIEW";
```

Defined in: packages/core/src/core/types/enums/index.ts:32

***

### PartnerUserStatus

Defined in: packages/core/src/core/types/enums/index.ts:24

#### Enumeration Members

##### ACTIVE

```ts
ACTIVE: "ACTIVE";
```

Defined in: packages/core/src/core/types/enums/index.ts:26

##### DISABLED

```ts
DISABLED: "DISABLED";
```

Defined in: packages/core/src/core/types/enums/index.ts:27

##### PENDING

```ts
PENDING: "PENDING";
```

Defined in: packages/core/src/core/types/enums/index.ts:25

***

### UserStatus

Defined in: packages/core/src/core/types/enums/index.ts:37

#### Enumeration Members

##### ACTIVE

```ts
ACTIVE: "ACTIVE";
```

Defined in: packages/core/src/core/types/enums/index.ts:39

##### DISABLED

```ts
DISABLED: "DISABLED";
```

Defined in: packages/core/src/core/types/enums/index.ts:40

##### PENDING

```ts
PENDING: "PENDING";
```

Defined in: packages/core/src/core/types/enums/index.ts:38
