import { HealthController } from './health/health.controller'
import { v1 } from './v1'

export const routes = [HealthController, ...v1]
