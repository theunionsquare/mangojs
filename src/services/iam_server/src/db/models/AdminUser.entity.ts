import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from "typeorm";
import { utils } from "@giusmento/mangojs-core";
import { Group } from "./Group.entity";

@Entity({ name: "admin_users", schema: "iam" })
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", unique: true })
  uid: string;

  @Column({ type: "varchar", length: 255 })
  firstName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  username: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 50, default: "PENDING" })
  status: string;

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

  @ManyToMany(() => Group, { cascade: true })
  @JoinTable({
    name: "adminuser_groups",
  })
  groups: Group[];

  @BeforeInsert()
  generateUid() {
    this.uid = utils.generateUUID();
  }
}

export interface IAdminUser {
  id?: number;
  uid: string;
  firstName: string;
  lastName?: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  status: string;
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
  groups?: any[];
}
