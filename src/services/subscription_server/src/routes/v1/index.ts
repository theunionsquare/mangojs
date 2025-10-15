// Import your v1 controllers
import { SubscriptionController } from './subscriptions/subscriptions.controller'
import { SubscriptionPlanController } from './plans/plans.controller'

export const v1Routes = [
    SubscriptionController,
    SubscriptionPlanController,
]