import { HealthController } from './health/health.controller'
import { v1Routes } from './v1'

export const routes = [
    HealthController,
    ...v1Routes
]