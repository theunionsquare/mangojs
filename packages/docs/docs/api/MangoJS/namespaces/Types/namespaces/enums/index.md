---
sidebar_label: enums
---

# enums

## Enumerations

### AdminUserStatus

Defined in: [packages/core/src/core/types/enums/index.ts:43](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L43)

#### Enumeration Members

##### ACTIVE

```ts
ACTIVE: "ACTIVE";
```

Defined in: [packages/core/src/core/types/enums/index.ts:45](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L45)

##### DISABLED

```ts
DISABLED: "DISABLED";
```

Defined in: [packages/core/src/core/types/enums/index.ts:46](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L46)

##### PENDING

```ts
PENDING: "PENDING";
```

Defined in: [packages/core/src/core/types/enums/index.ts:44](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L44)

***

### ~~AuthUserType~~

Defined in: [packages/core/src/core/types/enums/index.ts:18](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L18)

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

Defined in: [packages/core/src/core/types/enums/index.ts:19](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L19)

##### ~~PARTNER~~

```ts
PARTNER: "PARTNER";
```

Defined in: [packages/core/src/core/types/enums/index.ts:20](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L20)

##### ~~USER~~

```ts
USER: "USER";
```

Defined in: [packages/core/src/core/types/enums/index.ts:21](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L21)

***

### PartnerStatus

Defined in: [packages/core/src/core/types/enums/index.ts:30](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L30)

#### Enumeration Members

##### ACTIVE

```ts
ACTIVE: "ACTIVE";
```

Defined in: [packages/core/src/core/types/enums/index.ts:33](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L33)

##### DISABLED

```ts
DISABLED: "DISABLED";
```

Defined in: [packages/core/src/core/types/enums/index.ts:34](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L34)

##### PENDING

```ts
PENDING: "PENDING";
```

Defined in: [packages/core/src/core/types/enums/index.ts:31](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L31)

##### UNDER\_REVIEW

```ts
UNDER_REVIEW: "UNDER_REVIEW";
```

Defined in: [packages/core/src/core/types/enums/index.ts:32](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L32)

***

### PartnerUserStatus

Defined in: [packages/core/src/core/types/enums/index.ts:24](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L24)

#### Enumeration Members

##### ACTIVE

```ts
ACTIVE: "ACTIVE";
```

Defined in: [packages/core/src/core/types/enums/index.ts:26](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L26)

##### DISABLED

```ts
DISABLED: "DISABLED";
```

Defined in: [packages/core/src/core/types/enums/index.ts:27](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L27)

##### PENDING

```ts
PENDING: "PENDING";
```

Defined in: [packages/core/src/core/types/enums/index.ts:25](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L25)

***

### UserStatus

Defined in: [packages/core/src/core/types/enums/index.ts:37](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L37)

#### Enumeration Members

##### ACTIVE

```ts
ACTIVE: "ACTIVE";
```

Defined in: [packages/core/src/core/types/enums/index.ts:39](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L39)

##### DISABLED

```ts
DISABLED: "DISABLED";
```

Defined in: [packages/core/src/core/types/enums/index.ts:40](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L40)

##### PENDING

```ts
PENDING: "PENDING";
```

Defined in: [packages/core/src/core/types/enums/index.ts:38](https://github.com/theunionsquare/mangojs/blob/5953766ae05865ac55ff08e96492a28735d6ba92/packages/core/src/core/types/enums/index.ts#L38)
