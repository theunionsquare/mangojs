---
sidebar_label: "Relationships"
---

# Entity Relationships

## @OneToMany / @ManyToOne

One-to-many relationship (e.g., User has many Posts).

```typescript
// User.ts
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}

// Post.ts
@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "author_id" })
  authorId: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
```

---

## @ManyToMany

Many-to-many relationship (e.g., Posts have many Tags).

```typescript
// Post.ts
@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];
}

// Tag.ts
@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
```

---

## @OneToOne

One-to-one relationship (e.g., User has one Profile).

```typescript
// User.ts
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}

// Profile.ts
@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: "user_id" })
  user: User;
}
```

---

## Loading Relationships

Load relationships in service layer using `relations` option.

```typescript
// Load single relationship
const shop = await em.findOne(models.Shop, {
  where: { uid: shopUid },
  relations: ["workingHours"],
});

// Load multiple relationships
const shop = await em.findOne(models.Shop, {
  where: { uid: shopUid },
  relations: ["workingHours", "specialHours", "partner"],
});

// Load nested relationships
const shop = await em.findOne(models.Shop, {
  where: { uid: shopUid },
  relations: ["partner", "partner.user"],
});
```

---

## Development Checklist

- [ ] One-to-many uses `@OneToMany()` and `@ManyToOne()`
- [ ] Many-to-many uses `@ManyToMany()`
- [ ] Foreign key columns defined where needed
- [ ] Relationship directions are correct (parent → child)
- [ ] `@JoinColumn()` used on owning side of OneToOne

## Related

- [Entities](./entities.context.md) - Entity decorators
- [Examples](./examples.context.md) - Complete entity examples
