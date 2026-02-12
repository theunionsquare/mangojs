import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Types } from "@theunionsquare/mangojs-core";

@Entity({ name: "groups", schema: "iam" })
export class Group {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({
    type: "enum",
    enum: Types.enums.AuthUserType,
  })
  userType: Types.enums.AuthUserType;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "boolean" })
  default: boolean;

  @Column({ type: "varchar", length: 255 })
  permissions: string;

  @Column({ type: "boolean", default: true })
  isVisible: boolean;
}

export interface IGroup {
  uid: string;
  userType: Types.enums.AuthUserType;
  name: string;
  description: string;
  default: boolean;
  permissions: string;
  isVisible: boolean;
}
