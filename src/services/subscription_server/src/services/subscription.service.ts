import { inject, injectable } from 'inversify'
import { INVERSITY_TYPES, IPersistenceContext } from '@mangojs/core'
import { EntityManager } from 'typeorm'
import { errors, utils } from '@mangojs/core'
import { Subscription, SubscriptionStatus } from '../db/models/Subscription.model'
import { SubscriptionPlan } from '../db/models/SubscriptionPlan.model'
import { PaymentService } from './payment.service'
import { APITYPE } from '../types/api/v1'

@injectable()
export class SubscriptionService {
    @inject(INVERSITY_TYPES.PersistenceContext)
    private _persistenceContext!: IPersistenceContext 

    private paymentService: PaymentService

    constructor() {
        this.paymentService = new PaymentService()
    }

    /**
     * Get all subscriptions for a user
     */
    public async getUserSubscriptions(userId: string): Promise<Subscription[]> {
        const response = await this._persistenceContext.inTransaction(
            async (em: EntityManager) => {
                const subscriptions = await em.getRepository(Subscription)
                    .find({ 
                        where: { userId },
                        relations: ['plan']
                    })
                return subscriptions
            }
        )
        return response as Subscription[]
    }

    /**
     * Get subscription by ID
     */
    public async getSubscriptionById(subscriptionId: string): Promise<Subscription> {
        const response = await this._persistenceContext.inTransaction(
            async (em: EntityManager) => {
                const subscription = await em.getRepository(Subscription)
                    .findOne({
                        where: { uid: subscriptionId },
                        relations: ['plan']
                    })
                
                if (!subscription) {
                    throw new errors.APIError(
                        404,
                        'NOT_FOUND',
                        'Subscription not found'
                    )
                }
                return subscription
            }
        )
        return response as Subscription
    }

    /**
     * Create new subscription
     */
    public async createSubscription(
        data: APITYPE.V1.subscriptions.POST.RequestBody
    ): Promise<Subscription> {
        const response = await this._persistenceContext.inTransaction(
            async (em: EntityManager) => {
                // Get the subscription plan
                const plan = await em.getRepository(SubscriptionPlan)
                    .findOne({ where: { uid: data.planId } })
                
                if (!plan) {
                    throw new errors.APIError(
                        404,
                        'NOT_FOUND',
                        'Subscription plan not found'
                    )
                }

                // Calculate subscription dates
                const now = new Date()
                let trialEndDate: Date | undefined
                let currentPeriodStart = now
                let currentPeriodEnd = new Date()

                if (plan.trialDays && plan.trialDays > 0) {
                    trialEndDate = new Date(now.getTime() + (plan.trialDays * 24 * 60 * 60 * 1000))
                    currentPeriodEnd = trialEndDate
                } else {
                    // Calculate based on billing interval
                    if (plan.billingInterval === 'MONTHLY') {
                        currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)
                    } else if (plan.billingInterval === 'YEARLY') {
                        currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1)
                    }
                }

                // Create subscription
                const subscription = em.getRepository(Subscription).create({
                    uid: utils.generateUUID(),
                    userId: data.userId,
                    planId: data.planId,
                    plan: plan,
                    status: plan.trialDays ? SubscriptionStatus.TRIAL : SubscriptionStatus.ACTIVE,
                    paymentProvider: data.paymentProvider,
                    trialEndDate: trialEndDate,
                    currentPeriodStart: currentPeriodStart,
                    currentPeriodEnd: currentPeriodEnd,
                    autoRenew: true,
                    metadata: data.metadata
                })

                // Create external subscription (Stripe/PayPal)
                if (data.paymentProvider !== 'MANUAL') {
                    const externalSub = await this.paymentService.createSubscription(
                        subscription, 
                        data.paymentMethodId
                    )
                    subscription.externalSubscriptionId = externalSub.id
                    subscription.externalCustomerId = externalSub.customerId
                }

                const savedSubscription = await em.getRepository(Subscription).save(subscription)
                return savedSubscription
            }
        )
        return response as Subscription
    }

    /**
     * Update subscription (upgrade/downgrade)
     */
    public async updateSubscription(
        subscriptionId: string,
        data: APITYPE.V1.subscriptions.PUT.RequestBody
    ): Promise<Subscription> {
        const response = await this._persistenceContext.inTransaction(
            async (em: EntityManager) => {
                const subscription = await em.getRepository(Subscription)
                    .findOne({ 
                        where: { uid: subscriptionId },
                        relations: ['plan']
                    })
                
                if (!subscription) {
                    throw new errors.APIError(
                        404,
                        'NOT_FOUND',
                        'Subscription not found'
                    )
                }

                // If changing plan
                if (data.planId && data.planId !== subscription.planId) {
                    const newPlan = await em.getRepository(SubscriptionPlan)
                        .findOne({ where: { uid: data.planId } })
                    
                    if (!newPlan) {
                        throw new errors.APIError(
                            404,
                            'NOT_FOUND',
                            'New subscription plan not found'
                        )
                    }

                    // Update external subscription
                    if (subscription.externalSubscriptionId) {
                        await this.paymentService.updateSubscription(
                            subscription.externalSubscriptionId,
                            newPlan
                        )
                    }

                    subscription.planId = data.planId
                    subscription.plan = newPlan
                }

                // Update other fields
                if (data.autoRenew !== undefined) {
                    subscription.autoRenew = data.autoRenew
                }

                if (data.metadata) {
                    subscription.metadata = { ...subscription.metadata, ...data.metadata }
                }

                const updatedSubscription = await em.getRepository(Subscription).save(subscription)
                return updatedSubscription
            }
        )
        return response as Subscription
    }

    /**
     * Cancel subscription
     */
    public async cancelSubscription(subscriptionId: string): Promise<Subscription> {
        const response = await this._persistenceContext.inTransaction(
            async (em: EntityManager) => {
                const subscription = await em.getRepository(Subscription)
                    .findOne({ 
                        where: { uid: subscriptionId },
                        relations: ['plan']
                    })
                
                if (!subscription) {
                    throw new errors.APIError(
                        404,
                        'NOT_FOUND',
                        'Subscription not found'
                    )
                }

                // Cancel external subscription
                if (subscription.externalSubscriptionId) {
                    await this.paymentService.cancelSubscription(
                        subscription.externalSubscriptionId
                    )
                }

                subscription.status = SubscriptionStatus.CANCELED
                subscription.canceledAt = new Date()
                subscription.autoRenew = false

                const canceledSubscription = await em.getRepository(Subscription).save(subscription)
                return canceledSubscription
            }
        )
        return response as Subscription
    }

    /**
     * Pause subscription
     */
    public async pauseSubscription(subscriptionId: string): Promise<Subscription> {
        const response = await this._persistenceContext.inTransaction(
            async (em: EntityManager) => {
                const subscription = await em.getRepository(Subscription)
                    .findOne({ 
                        where: { uid: subscriptionId },
                        relations: ['plan']
                    })
                
                if (!subscription) {
                    throw new errors.APIError(
                        404,
                        'NOT_FOUND',
                        'Subscription not found'
                    )
                }

                subscription.status = SubscriptionStatus.PAUSED
                subscription.pausedAt = new Date()

                const pausedSubscription = await em.getRepository(Subscription).save(subscription)
                return pausedSubscription
            }
        )
        return response as Subscription
    }

    /**
     * Resume subscription
     */
    public async resumeSubscription(subscriptionId: string): Promise<Subscription> {
        const response = await this._persistenceContext.inTransaction(
            async (em: EntityManager) => {
                const subscription = await em.getRepository(Subscription)
                    .findOne({ 
                        where: { uid: subscriptionId },
                        relations: ['plan']
                    })
                
                if (!subscription) {
                    throw new errors.APIError(
                        404,
                        'NOT_FOUND',
                        'Subscription not found'
                    )
                }

                subscription.status = SubscriptionStatus.ACTIVE

                // Extend the current period by the paused duration
                if (subscription.pausedAt && subscription.pausedAt !== undefined) {
                    const pausedDuration = new Date().getTime() - subscription.pausedAt.getTime()
                    subscription.currentPeriodEnd = new Date(subscription.currentPeriodEnd.getTime() + pausedDuration)
                }

                const resumedSubscription = await em.getRepository(Subscription).save(subscription)
                return resumedSubscription
            }
        )
        return response as Subscription
    }
}