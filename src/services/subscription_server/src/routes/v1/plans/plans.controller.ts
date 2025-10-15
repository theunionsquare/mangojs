import { Request, Response } from 'express'
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    utils,
    AuthorizationDecorators,
    errors,
    Types,
    Decorators,
} from '@mangojs/core'
import { DefaultContainer } from '../../../inversify.config'
import { SubscriptionPlanService } from '../../../services/subscriptionPlan.service'
import { APITYPE } from '../../../types/api/v1'

// Inject service
const subscriptionPlanService = DefaultContainer.resolve<SubscriptionPlanService>(SubscriptionPlanService)

// Inject auth decorators
const AuthDecorators = DefaultContainer.resolve<AuthorizationDecorators>(
    AuthorizationDecorators
)

@Controller('/api/subscription/v1/plans')
export class SubscriptionPlanController {
    /**
     * @swagger
     * /api/subscription/v1/plans:
     *  get:
     *    summary: Get available subscription plans
     *    description: Return a list of active subscription plans
     *    tags:
     *      - Subscription Plans
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        description: An array of subscription plans
     */
    @Get('/')
    public async getActivePlans(
        req: Request,
        res: Response
    ): Promise<Response<APITYPE.V1.subscriptions.GET.ResponseBody>> {
        const logRequest = new utils.LogRequest(res)
        try {
            const plans = await subscriptionPlanService.getActivePlans()

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: plans,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/plans/admin:
     *  get:
     *    summary: Get all subscription plans (Admin)
     *    description: Return all subscription plans including inactive ones
     *    tags:
     *      - Subscription Plans
     *    security:
     *      - adminAuth: []
     *    responses:
     *      200:
     *        description: An array of all subscription plans
     */
    @Get('/admin')
    @Decorators.auth.HasGroups(['admin'])
    public async getAllPlans(
        req: Request,
        res: Response
    ): Promise<Response<APITYPE.V1.subscriptions.GET.ResponseBody>> {
        const logRequest = new utils.LogRequest(res)
        try {
            const plans = await subscriptionPlanService.getAllPlans()

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: plans,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/plans/{uid}:
     *  get:
     *    summary: Get subscription plan by ID
     *    description: Return a specific subscription plan
     *    tags:
     *      - Subscription Plans
     *    parameters:
     *      - name: uid
     *        in: path
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: Subscription plan details
     */
    @Get('/:uid')
    public async getPlan(
        req: Request<{ uid: string }>,
        res: Response
    ): Promise<Response> {
        const logRequest = new utils.LogRequest(res)
        try {
            const plan = await subscriptionPlanService.getPlanById(req.params.uid)

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: plan,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/plans:
     *  post:
     *    summary: Create subscription plan
     *    description: Create a new subscription plan (Admin only)
     *    tags:
     *      - Subscription Plans
     *    security:
     *      - adminAuth: []
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *    responses:
     *      201:
     *        description: Created subscription plan
     */
    @Post('/')
    @Decorators.auth.HasGroups(['admin'])
    public async createPlan(
        req: Request,
        res: Response
    ): Promise<Response<APITYPE.V1.subscriptions.GET.ResponseBody>>{
        const logRequest = new utils.LogRequest(res)
        try {
            const plan = await subscriptionPlanService.createPlan(req.body)

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: plan,
            }
            return res.status(201).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/plans/{uid}:
     *  put:
     *    summary: Update subscription plan
     *    description: Update an existing subscription plan (Admin only)
     *    tags:
     *      - Subscription Plans
     *    security:
     *      - adminAuth: []
     *    parameters:
     *      - name: uid
     *        in: path
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: Updated subscription plan
     */
    @Put('/:uid')
    @Decorators.auth.HasGroups(['admin'])
    public async updatePlan(
        req: Request,
        res: Response
    ): Promise<Response<APITYPE.V1.subscriptions.GET.ResponseBody>> {
        const logRequest = new utils.LogRequest(res)
        try {
            const plan = await subscriptionPlanService.updatePlan(
                req.params.uid,
                req.body
            )

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: plan,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/plans/{uid}:
     *  delete:
     *    summary: Delete subscription plan
     *    description: Deactivate a subscription plan (Admin only)
     *    tags:
     *      - Subscription Plans
     *    security:
     *      - adminAuth: []
     *    parameters:
     *      - name: uid
     *        in: path
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: Plan deactivated
     */
    @Delete('/:uid')
    @Decorators.auth.HasGroups(['admin'])
    public async deletePlan(
        req: Request<{ uid: string }>,
        res: Response
    ): Promise<Response> {
        const logRequest = new utils.LogRequest(res)
        try {
            await subscriptionPlanService.deletePlan(req.params.uid)

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: { success: true },
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }
}