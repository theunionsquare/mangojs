import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { SubscriptionPlan } from './SubscriptionPlan.model'

export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    CANCELED = 'CANCELED',
    PAUSED = 'PAUSED',
    EXPIRED = 'EXPIRED',
    TRIAL = 'TRIAL',
    PAST_DUE = 'PAST_DUE'
}

export enum PaymentProvider {
    STRIPE = 'STRIPE',
    PAYPAL = 'PAYPAL',
    MANUAL = 'MANUAL'
}

@Entity('subscriptions')
export class Subscription {
    @PrimaryColumn('uuid')
    uid: string = uuidv4()

    @Column({ type: 'varchar', length: 100 })
    userId: string // Reference to user in IAM service

    @ManyToOne(() => SubscriptionPlan, { eager: true })
    @JoinColumn({ name: 'planId' })
    plan: SubscriptionPlan

    @Column({ type: 'uuid' })
    planId: string

    @Column({ type: 'enum', enum: SubscriptionStatus })
    status: SubscriptionStatus

    @Column({ type: 'enum', enum: PaymentProvider })
    paymentProvider: PaymentProvider

    @Column({ type: 'varchar', length: 100, nullable: true })
    externalSubscriptionId?: string // Stripe/PayPal subscription ID

    @Column({ type: 'varchar', length: 100, nullable: true })
    externalCustomerId?: string // Stripe customer ID / PayPal payer ID

    @Column({ type: 'timestamp', nullable: true })
    trialStartDate?: Date

    @Column({ type: 'timestamp', nullable: true })
    trialEndDate?: Date

    @Column({ type: 'timestamp' })
    currentPeriodStart: Date

    @Column({ type: 'timestamp' })
    currentPeriodEnd: Date

    @Column({ type: 'timestamp', nullable: true })
    canceledAt?: Date

    @Column({ type: 'timestamp', nullable: true })
    pausedAt?: Date

    @Column({ type: 'boolean', default: true })
    autoRenew: boolean

    @Column({ type: 'jsonb', nullable: true })
    metadata?: Record<string, any>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}