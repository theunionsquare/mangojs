import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export enum PlanType {
    FREE = 'FREE',
    BASIC = 'BASIC',
    PREMIUM = 'PREMIUM',
    ENTERPRISE = 'ENTERPRISE'
}

export enum BillingInterval {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
    ONE_TIME = 'ONE_TIME'
}

@Entity('subscription_plans')
export class SubscriptionPlan {
    @PrimaryColumn('uuid')
    uid: string = uuidv4()

    @Column({ type: 'varchar', length: 100 })
    name: string

    @Column({ type: 'text', nullable: true })
    description?: string

    @Column({ type: 'enum', enum: PlanType })
    planType: PlanType

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number

    @Column({ type: 'varchar', length: 3, default: 'USD' })
    currency: string

    @Column({ type: 'enum', enum: BillingInterval })
    billingInterval: BillingInterval

    @Column({ type: 'int', nullable: true })
    trialDays?: number

    @Column({ type: 'jsonb', nullable: true })
    features?: Record<string, any>

    @Column({ type: 'jsonb', nullable: true })
    limits?: Record<string, any>

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @Column({ type: 'varchar', length: 100, nullable: true })
    stripeProductId?: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    stripePriceId?: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    paypalPlanId?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}