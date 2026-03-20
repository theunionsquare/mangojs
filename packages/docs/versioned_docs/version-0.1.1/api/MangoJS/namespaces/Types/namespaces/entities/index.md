---
sidebar_label: entities
---

# entities

## Interfaces

### AuthUser

Defined in: [packages/core/src/core/types/entities/authUser.ts:11](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L11)

#### Extends

- [`AuthUserBase`](#authuserbase)

#### Properties

##### email

```ts
email: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:7](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L7)

###### Inherited from

[`AuthUserBase`](#authuserbase).[`email`](#email-1)

##### firstName

```ts
firstName: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:5](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L5)

###### Inherited from

[`AuthUserBase`](#authuserbase).[`firstName`](#firstname-1)

##### lastName

```ts
lastName: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:6](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L6)

###### Inherited from

[`AuthUserBase`](#authuserbase).[`lastName`](#lastname-1)

##### partnerUid?

```ts
optional partnerUid: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:8](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L8)

###### Inherited from

[`AuthUserBase`](#authuserbase).[`partnerUid`](#partneruid-1)

##### status

```ts
status: 
  | UserStatus
  | AdminUserStatus
  | PartnerUserStatus;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:13](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L13)

##### uid

```ts
uid: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:4](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L4)

###### Inherited from

[`AuthUserBase`](#authuserbase).[`uid`](#uid-1)

##### userType

```ts
userType: AuthUserType;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:12](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L12)

***

### AuthUserBase

Defined in: [packages/core/src/core/types/entities/authUser.ts:3](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L3)

#### Extended by

- [`AuthUser`](#authuser)

#### Properties

##### email

```ts
email: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:7](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L7)

##### firstName

```ts
firstName: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:5](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L5)

##### lastName

```ts
lastName: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:6](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L6)

##### partnerUid?

```ts
optional partnerUid: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:8](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L8)

##### uid

```ts
uid: string;
```

Defined in: [packages/core/src/core/types/entities/authUser.ts:4](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/types/entities/authUser.ts#L4)
