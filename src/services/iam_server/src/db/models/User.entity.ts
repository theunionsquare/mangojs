import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Group } from "./Group.entity";
import { Types } from "@theunionsquare/mangojs-core";

@Entity({ name: "users", schema: "iam" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ type: "varchar", length: 255 })
  firstName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phoneNumber: string;

  @Column({
    type: "enum",
    enum: Types.enums.UserStatus,
  })
  status: Types.enums.UserStatus;

  @Column({ type: "varchar", length: 255, nullable: true })
  password: string;

  @Column({ type: "int", default: 0 })
  age: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "varchar", length: 500, nullable: true })
  magicLink: string;

  @Column({ type: "timestamptz", nullable: true })
  magicLinkExpireDate: Date;

  @Column({ type: "timestamptz", nullable: true })
  verifiedAt: Date;

  @Column({ type: "timestamptz", nullable: true })
  disabledAt: Date;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @UpdateDateColumn({ type: "boolean", default: false })
  resetPasswordAtLogin: boolean;

  @ManyToMany(() => Group, { cascade: true })
  @JoinTable({
    name: "user_groups",
  })
  groups: Group[];
}

export interface IUser {
  uid: string;
  firstName: string;
  lastName?: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  status: Types.enums.UserStatus;
  password?: string;
  age?: number;
  isActive: boolean;
  isVerified: boolean;
  magicLink?: string;
  magicLinkExpireDate?: Date;
  verifiedAt?: Date;
  disabledAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  resetPasswordAtLogin: boolean;
  groups?: Group[];
}
