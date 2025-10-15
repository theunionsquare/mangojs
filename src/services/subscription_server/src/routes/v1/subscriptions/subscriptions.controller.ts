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
} from '@mangojs/core'
import { DefaultContainer } from '../../../inversify.config'
import { SubscriptionService } from '../../../services/subscription.service'
import { APITYPE } from '../../../types/api/v1'

// Inject service
const subscriptionService = DefaultContainer.resolve<SubscriptionService>(SubscriptionService)

// Inject auth decorators
const AuthDecorators = DefaultContainer.resolve<AuthorizationDecorators>(
    AuthorizationDecorators
)

@Controller('/api/subscription/v1/subscriptions')
export class SubscriptionController {
    /**
     * @swagger
     * /api/subscription/v1/subscriptions:
     *  get:
     *    summary: Get user subscriptions
     *    description: Return a list of subscriptions for the authenticated user
     *    tags:
     *      - Subscriptions
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        description: An array of subscriptions
     *      401:
     *        description: Unauthorized
     */
    @Get('/')
    @AuthDecorators.IsAuthorized()
    public async getUserSubscriptions(
        req: Request,
        res: Response
    ): Promise<Response<APITYPE.V1.subscriptions.GET.ResponseBody>> {
        const logRequest = new utils.LogRequest(res)
        try {
            // Get user ID from auth context (injected by IAM service)
            //const userId = req.user?.uid || req.query.userId as string

            //if (!userId) {
            //    throw new errors.APIError(
            //        400,
            //        'MISSING_USER_ID',
            //        'User ID is required'
            //    )
            //}

            const subscriptions = {}//await subscriptionService.getUserSubscriptions(userId)

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: subscriptions,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/subscriptions/{uid}:
     *  get:
     *    summary: Get subscription by ID
     *    description: Return a specific subscription
     *    tags:
     *      - Subscriptions
     *    parameters:
     *      - name: uid
     *        in: path
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: Subscription details
     *      404:
     *        description: Subscription not found
     */
    @Get('/:uid')
    @AuthDecorators.IsAuthorized()
    public async getSubscription(
        req: Request<{ uid: string }>,
        res: Response
    ): Promise<Response> {
        const logRequest = new utils.LogRequest(res)
        try {
            const subscription = await subscriptionService.getSubscriptionById(req.params.uid)

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: subscription,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/subscriptions:
     *  post:
     *    summary: Create new subscription
     *    description: Create a new subscription for a user
     *    tags:
     *      - Subscriptions
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              userId:
     *                type: string
     *              planId:
     *                type: string
     *              paymentProvider:
     *                type: string
     *                enum: [STRIPE, PAYPAL, MANUAL]
     *              paymentMethodId:
     *                type: string
     *    responses:
     *      201:
     *        description: Created subscription
     */
    @Post('/')
    @AuthDecorators.IsAuthorized()
    public async createSubscription(
        req: Request<undefined, APITYPE.V1.subscriptions.POST.RequestBody>,
        res: Response
    ): Promise<Response<APITYPE.V1.subscriptions.POST.ResponseBody>> {
        const logRequest = new utils.LogRequest(res)
        try {
            const subscription = await subscriptionService.createSubscription(req.body)

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: subscription,
            }
            return res.status(201).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/subscriptions/{uid}:
     *  put:
     *    summary: Update subscription
     *    description: Update an existing subscription (upgrade/downgrade)
     *    tags:
     *      - Subscriptions
     *    parameters:
     *      - name: uid
     *        in: path
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: Updated subscription
     */
    @Put('/:uid')
    @AuthDecorators.IsAuthorized()
    public async updateSubscription(
        req: Request<APITYPE.V1.subscriptions.PUT.Params, APITYPE.V1.subscriptions.PUT.RequestBody>,
        res: Response
    ): Promise<Response<APITYPE.V1.subscriptions.PUT.ResponseBody>> {
        const logRequest = new utils.LogRequest(res)
        try {
            const subscription = await subscriptionService.updateSubscription(
                req.params.uid,
                req.body
            )

            const apiResponse= {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: subscription,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/subscriptions/{uid}/cancel:
     *  delete:
     *    summary: Cancel subscription
     *    description: Cancel an existing subscription
     *    tags:
     *      - Subscriptions
     *    parameters:
     *      - name: uid
     *        in: path
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: Subscription canceled
     */
    @Delete('/:uid/cancel')
    @AuthDecorators.IsAuthorized()
    public async cancelSubscription(
        req: Request<{ uid: string }>,
        res: Response
    ): Promise<Response> {
        const logRequest = new utils.LogRequest(res)
        try {
            await subscriptionService.cancelSubscription(req.params.uid)

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

    /**
     * @swagger
     * /api/subscription/v1/subscriptions/{uid}/pause:
     *  post:
     *    summary: Pause subscription
     *    description: Pause an existing subscription
     *    tags:
     *      - Subscriptions
     *    parameters:
     *      - name: uid
     *        in: path
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: Subscription paused
     */
    @Post('/:uid/pause')
    @AuthDecorators.IsAuthorized()
    public async pauseSubscription(
        req: Request<{ uid: string }>,
        res: Response
    ): Promise<Response> {
        const logRequest = new utils.LogRequest(res)
        try {
            const subscription = await subscriptionService.pauseSubscription(req.params.uid)

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: subscription,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/subscription/v1/subscriptions/{uid}/resume:
     *  post:
     *    summary: Resume subscription
     *    description: Resume a paused subscription
     *    tags:
     *      - Subscriptions
     *    parameters:
     *      - name: uid
     *        in: path
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: Subscription resumed
     */
    @Post('/:uid/resume')
    @AuthDecorators.IsAuthorized()
    public async resumeSubscription(
        req: Request<{ uid: string }>,
        res: Response
    ): Promise<Response> {
        const logRequest = new utils.LogRequest(res)
        try {
            const subscription = await subscriptionService.resumeSubscription(req.params.uid)

            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: subscription,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }
}