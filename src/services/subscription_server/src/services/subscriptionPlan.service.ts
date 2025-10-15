import { inject, injectable } from 'inversify'
import { INVERSITY_TYPES, IPersistenceContext } from '@mangojs/core'
import { Connection } from 'typeorm'
import { errors, utils } from '@mangojs/core'
import { SubscriptionPlan } from '../db/models/SubscriptionPlan.model'
import { APITYPE } from '../types/api/v1'

@injectable()
export class SubscriptionPlanService {
    @inject(INVERSITY_TYPES.PersistenceContext)
    private _persistenceContext: IPersistenceContext

    /**
     * Get all active subscription plans
     */
    public async getActivePlans(): Promise<SubscriptionPlan[]> {
        const response = await this._persistenceContext.inTransaction(
            async (em: Connection) => {
                const plans = await em.getRepository(SubscriptionPlan)
                    .find({ 
                        where: { isActive: true },
                        order: { price: 'ASC' }
                    })
                return plans
            }
        )
        return response as SubscriptionPlan[]
    }

    /**
     * Get all subscription plans (admin)
     */
    public async getAllPlans(): Promise<SubscriptionPlan[]> {
        const response = await this._persistenceContext.inTransaction(
            async (em: Connection) => {
                const plans = await em.getRepository(SubscriptionPlan)
                    .find({ order: { createdAt: 'DESC' } })
                return plans
            }
        )
        return response as SubscriptionPlan[]
    }

    /**
     * Get subscription plan by ID
     */
    public async getPlanById(planId: string): Promise<SubscriptionPlan> {
        const response = await this._persistenceContext.inTransaction(
            async (em: Connection) => {
                const plan = await em.getRepository(SubscriptionPlan)
                    .findOne({ where: { uid: planId } })
                
                if (!plan) {
                    throw new errors.APIError(
                        404,
                        'NOT_FOUND',
                        'Subscription plan not found'
                    )
                }
                return plan
            }
        )
        return response as SubscriptionPlan
    }

    /**
     * Create new subscription plan
     */
    public async createPlan(
        data: APITYPE.V1.plans.POST.RequestBody
    ): Promise<SubscriptionPlan> {
        const response = await this._persistenceContext.inTransaction(
            async (em: Connection) => {
                const plan = em.getRepository(SubscriptionPlan).create({
                    uid: utils.generateUUID(),
                    name: data.name,
                    description: data.description,
                    planType: data.planType,
                    price: data.price,
                    currency: data.currency || 'USD',
                    billingInterval: data.billingInterval,
                    trialDays: data.trialDays,
                    features: data.features,
                    limits: data.limits,
                    isActive: data.isActive !== undefined ? data.isActive : true,
                })

                const savedPlan = await em.getRepository(SubscriptionPlan).save(plan)
                return savedPlan
            }
        )
        return response as SubscriptionPlan
    }

    /**
     * Update subscription plan
     */
    public async updatePlan(
        planId: string,
        data: APITYPE.V1.plans.PUT.RequestBody
    ): Promise<SubscriptionPlan> {
        const response = await this._persistenceContext.inTransaction(
            async (em: Connection) => {
                const plan = await em.getRepository(SubscriptionPlan)
                    .findOne({ where: { uid: planId } })
                
                if (!plan) {
                    throw new errors.APIError(
                        404,
                        'NOT_FOUND',
                        'Subscription plan not found'
                    )
                }

                // Update fields
                if (data.name !== undefined) plan.name = data.name
                if (data.description !== undefined) plan.description = data.description
                if (data.planType !== undefined) plan.planType = data.planType
                if (data.price !== undefined) plan.price = data.price
                if (data.currency !== undefined) plan.currency = data.currency
                if (data.billingInterval !== undefined) plan.billingInterval = data.billingInterval
                if (data.trialDays !== undefined) plan.trialDays = data.trialDays
                if (data.features !== undefined) plan.features = data.features
                if (data.limits !== undefined) plan.limits = data.limits
                if (data.isActive !== undefined) plan.isActive = data.isActive

                const updatedPlan = await em.getRepository(SubscriptionPlan).save(plan)
                return updatedPlan
            }
        )
        return response as SubscriptionPlan
    }

    /**
     * Delete subscription plan
     */
    public async deletePlan(planId: string): Promise<void> {
        await this._persistenceContext.inTransaction(
            async (em: Connection) => {
                const plan = await em.getRepository(SubscriptionPlan)
                    .findOne({ where: { uid: planId } })
                
                if (!plan) {
                    throw new errors.APIError(
                        404,
                        'NOT_FOUND',
                        'Subscription plan not found'
                    )
                }

                // Instead of hard delete, deactivate the plan
                plan.isActive = false
                await em.getRepository(SubscriptionPlan).save(plan)
            }
        )
    }
}