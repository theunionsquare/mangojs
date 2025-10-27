import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { PartnerUser } from "./PartnerUser.entity";

import { Types } from "@giusmento/mangojs-core";

@Entity({ name: "partners", schema: "iam" })
export class Partner {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ type: "varchar", length: 255 })
  companyName: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  businessType: string;

  @Column({ type: "varchar", length: 100, unique: true, nullable: true })
  taxId: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  addressStreet: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  addressCity: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  addressState: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  addressCountry: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  addressPostalCode: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  websiteUrl: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  logoUrl: string;

  @Column({
    type: "enum",
    enum: Types.enums.PartnerStatus,
  })
  status: Types.enums.PartnerStatus;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  subscriptionTier: string;

  @Column({ type: "timestamptz", nullable: true })
  contractStartDate: Date;

  @Column({ type: "timestamptz", nullable: true })
  contractEndDate: Date;

  @Column({ type: "timestamptz", nullable: true })
  verifiedAt: Date;

  @Column({ type: "timestamptz", nullable: true })
  disabledAt: Date;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @OneToMany(() => PartnerUser, (partnerUser) => partnerUser.partner)
  partnerUsers: PartnerUser[];
}

export interface IPartner {
  uid: string;
  companyName: string;
  businessType?: string;
  taxId?: string;
  email: string;
  phoneNumber?: string;
  addressStreet?: string;
  addressCity?: string;
  addressState?: string;
  addressCountry?: string;
  addressPostalCode?: string;
  websiteUrl?: string;
  logoUrl?: string;
  status: Types.enums.PartnerStatus;
  isVerified: boolean;
  subscriptionTier?: string;
  contractStartDate?: Date;
  contractEndDate?: Date;
  verifiedAt?: Date;
  disabledAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  partnerUsers?: PartnerUser[];
}
