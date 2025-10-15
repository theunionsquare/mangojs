import { Request, Response } from 'express'
import {
    Controller,
    Get,
    utils,
    AuthorizationDecorators,
    Post,
    Put,
    Delete,
    Decorators,
} from '@mangojs/core'
import dotenv from 'dotenv'
import { IAMDefautContainer } from '../../../inversify.config'
import { AdminUserService } from '../../../services/adminUser.service'
import { AuthorizationService } from '../../../services/authorizationService'
import { errors } from '@mangojs/core'
import type { Types } from '@mangojs/core'
import { AdminUser } from '../../../types/adminUser.type'
import { APITYPE } from '../../../types'

dotenv.config()

// import adminUserService
const adminUserService =
    IAMDefautContainer.resolve<AdminUserService>(AdminUserService)

// import authorization service
const authService =
    IAMDefautContainer.resolve<AuthorizationService>(AuthorizationService)

// import authorization decorators
const AuthDecorators = IAMDefautContainer.resolve<AuthorizationDecorators>(
    AuthorizationDecorators
)

@Controller('/api/iam/v1/admins')
export class AdminController {
    /**
     * @swagger
     * /api/iam/v1/admins/:
     *  get:
     *    summary: Get list of active admin users
     *    description: Return a list of active admin users
     *    tags:
     *      - Admins
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *    responses:
     *      200:
     *        description: An array containing admin users
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  id:
     *                    type: string
     *                    example: 12345
     *      401:
     *        description: Unauthorized
     *
     */
    @Get('/')
    @AuthDecorators.IsAuthorized()
    //@Decorators.HasGroups(["Admin"])
    public async getAdmins(
        req: Request,
        res: Response<Types.apiResponses.Success<Array<AdminUser>>>
    ): Promise<Response<Types.apiResponses.Success<Array<AdminUser>>>> {
        const logRequest = new utils.LogRequest(res)
        try {
            const adminUsers: Array<AdminUser> =
                (await adminUserService.getAdminUsers()) as Array<AdminUser>

            const apiResponse: Types.apiResponses.Success<Array<AdminUser>> = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: adminUsers,
            }
            return res.status(200).send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/iam/v1/admins/magiclinks/{magiclink}:
     *  get:
     *    summary: Get Admin user by his magic link
     *    description: Return a list of active admin users
     *    tags:
     *      - Admins
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *    responses:
     *      200:
     *        description: An array containing admin users
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  id:
     *                    type: string
     *                    example: 12345
     *      401:
     *        description: Unauthorized
     *
     */
    @Get('/magiclinks/:magiclink')
    public async getAdminBymagicLink(
        req: Types.v1.api.request.Request<
            APITYPE.V1.adminUser.magiclinks.GET.Params,
            APITYPE.V1.adminUser.magiclinks.GET.RequestBody
        >,
        res: Response<APITYPE.V1.adminUser.magiclinks.GET.ResponseBody>
    ): Promise<Response<APITYPE.V1.adminUser.magiclinks.GET.ResponseBody>> {
        const logRequest = new utils.LogRequest(res)
        try {
            const adminUser = (await adminUserService.getAdminUserByMagicLink(
                req.params
            )) as APITYPE.V1.adminUser.magiclinks.ResponseBodyData

            const apiResponse: APITYPE.V1.adminUser.magiclinks.GET.ResponseBody =
                {
                    ok: true,
                    timestamp: logRequest.timestamp,
                    requestId: logRequest.requestId,
                    data: adminUser,
                }

            return res.status(200).send(apiResponse)
        } catch (error) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/iam/v1/admins/activate/{magiclink}:
     *  get:
     *    summary: Activate Admin user
     *    description: Activate admin users
     *    tags:
     *      - Admins
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *    responses:
     *      200:
     *        description: An array containing admin users
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  id:
     *                    type: string
     *                    example: 12345
     *      401:
     *        description: Unauthorized
     *
     */
    @Post('/activate/:magiclink')
    public async activateAdminBymagicLink(
        req: Types.v1.api.request.Request<
            APITYPE.V1.adminUser.activate.POST.Params,
            APITYPE.V1.adminUser.activate.POST.RequestBody
        >,
        res: Response<APITYPE.V1.adminUser.activate.POST.ResponseBody>
    ): Promise<Response<APITYPE.V1.adminUser.activate.POST.ResponseBody>> {
        const logRequest = new utils.LogRequest(res)
        try {
            req.requestTime
            const adminUser = (await adminUserService.activateAdminUser(
                req.params,
                req.body
            )) as APITYPE.V1.adminUser.activate.ResponseBodyData

            const apiResponse: APITYPE.V1.adminUser.activate.POST.ResponseBody =
                {
                    ok: true,
                    timestamp: logRequest.timestamp,
                    requestId: logRequest.requestId,
                    data: adminUser,
                }

            return res.status(200).send(apiResponse)
        } catch (error) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/iam/v1/admins/:
     *  post:
     *    summary: Create new admin users
     *    description: Creates a new admin user
     *    tags:
     *      - Admins
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *    responses:
     *      200:
     *        description: The created admin user
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  uid:
     *                    type: string
     *                    example: 12345
     *                  firstName:
     *                    type
     *      401:
     *        description: Unauthorized
     *
     */
    @Post('/')
    public async addAdminUser(
        req: Types.v1.api.request.Request<
            any,
            APITYPE.V1.adminUser.POST.RequestBody
        >,
        res: Response<APITYPE.V1.adminUser.POST.ResponseBody>
    ): Promise<Response<APITYPE.V1.adminUser.POST.ResponseBody>> {
        console.log('add Admin User')
        const logRequest = new utils.LogRequest(res)
        try {
            const body = req.body
            console.log({ body }, 'body')
            const response = (await adminUserService.postAdminUser(
                body
            )) as APITYPE.V1.adminUser.ResponseBodyData
            // prepare response
            const apiResponse: APITYPE.V1.adminUser.POST.ResponseBody = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: response,
            }

            return res.status(200).send(apiResponse)
        } catch (error) {
            console.log(error, 'error')
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/iam/v1/admins/{uid}:
     *  post:
     *    summary: Update admin users
     *    description: Update  admin user
     *    tags:
     *      - Admins
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *    responses:
     *      200:
     *        description: The created admin user
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  uid:
     *                    type: string
     *                    example: 12345
     *                  firstName:
     *                    type
     *      401:
     *        description: Unauthorized
     *
     */
    @Put('/:uid')
    public async updateAdminUser(
        req: Types.v1.api.request.Request<
            APITYPE.V1.adminUser.PUT.Params,
            APITYPE.V1.adminUser.PUT.RequestBody
        >,
        res: Response<APITYPE.V1.adminUser.PUT.ResponseBody>
    ): Promise<Response<APITYPE.V1.adminUser.PUT.ResponseBody>> {
        console.log('add Admin User')
        const logRequest = new utils.LogRequest(res)
        try {
            const body = req.body
            const params = req.params
            console.log({ body }, 'body')
            const response = (await adminUserService.updateAdminUser(
                params,
                body
            )) as APITYPE.V1.adminUser.ResponseBodyData
            // prepare response
            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: { ok: true },
            }

            return res.status(200).send(apiResponse)
        } catch (error) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/iam/v1/admins/{uid}:
     *  post:
     *    summary: Add one or more group to a user
     *    description: Add one or more group to a user
     *    tags:
     *      - Admins
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *    responses:
     *      200:
     *        description: The created admin user
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  uid:
     *                    type: string
     *                    example: 12345
     *                  firstName:
     *                    type
     *      401:
     *        description: Unauthorized
     *
     */
    @Put('/:uid/groups')
    public async updateGroupsToAdminUser(
        req: Types.v1.api.request.Request<
            APITYPE.V1.adminUser.groups.POST.Params,
            APITYPE.V1.adminUser.groups.POST.RequestBody
        >,
        res: Response<APITYPE.V1.adminUser.groups.POST.ResponseBody>
    ): Promise<Response<APITYPE.V1.adminUser.groups.POST.ResponseBody>> {
        console.log('add Admin User')
        const logRequest = new utils.LogRequest(res)
        try {
            const body = req.body
            const params = req.params
            console.log({ body }, 'body')
            const response = (await adminUserService.updateGroupsToAdminUser(
                params,
                body
            )) as APITYPE.V1.adminUser.ResponseBodyData
            // prepare response
            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: { ok: true },
            }

            return res.status(200).send(apiResponse)
        } catch (error) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/iam/v1/admins/{uid}/disable:
     *  post:
     *    summary: Disable admin users
     *    description: Disable  admin user
     *    tags:
     *      - Admins
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *    responses:
     *      200:
     *        description: The created admin user
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  uid:
     *                    type: string
     *                    example: 12345
     *                  firstName:
     *                    type
     *      401:
     *        description: Unauthorized
     *
     */
    @Post('/:uid/disable')
    public async disableAdminUser(
        req: Types.v1.api.request.Request<APITYPE.V1.adminUser.PUT.Params, {}>,
        res: Response<APITYPE.V1.adminUser.PUT.ResponseBody>
    ): Promise<Response<APITYPE.V1.adminUser.PUT.ResponseBody>> {
        console.log('add Admin User')
        const logRequest = new utils.LogRequest(res)
        try {
            const params = req.params
            const response = (await adminUserService.disableAdminUser(
                params
            )) as APITYPE.V1.adminUser.ResponseBodyData
            // prepare response
            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: { ok: true },
            }

            return res.status(200).send(apiResponse)
        } catch (error) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/iam/v1/admins/{uid}/enable:
     *  post:
     *    summary: Enable admin users
     *    description: Disable  admin user
     *    tags:
     *      - Admins
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *    responses:
     *      200:
     *        description: The created admin user
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  uid:
     *                    type: string
     *                    example: 12345
     *                  firstName:
     *                    type
     *      401:
     *        description: Unauthorized
     *
     */
    @Post('/:uid/enable')
    public async enableAdminUser(
        req: Types.v1.api.request.Request<APITYPE.V1.adminUser.PUT.Params, {}>,
        res: Response<APITYPE.V1.adminUser.PUT.ResponseBody>
    ): Promise<Response<APITYPE.V1.adminUser.PUT.ResponseBody>> {
        console.log('add Admin User')
        const logRequest = new utils.LogRequest(res)
        try {
            const params = req.params
            const response = (await adminUserService.enableAdminUser(
                params
            )) as APITYPE.V1.adminUser.ResponseBodyData
            // prepare response
            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: { ok: true },
            }

            return res.status(200).send(apiResponse)
        } catch (error) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /api/iam/v1/admins/{uid}/enable:
     *  post:
     *    summary: Enable admin users
     *    description: Disable  admin user
     *    tags:
     *      - Admins
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *    responses:
     *      200:
     *        description: The created admin user
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  uid:
     *                    type: string
     *                    example: 12345
     *                  firstName:
     *                    type
     *      401:
     *        description: Unauthorized
     *
     */
    @Delete('/:uid/delete/hard')
    public async hardAdminUser(
        req: Types.v1.api.request.Request<APITYPE.V1.adminUser.PUT.Params, {}>,
        res: Response<APITYPE.V1.adminUser.PUT.ResponseBody>
    ): Promise<Response<APITYPE.V1.adminUser.PUT.ResponseBody>> {
        console.log('add Admin User')
        const logRequest = new utils.LogRequest(res)
        try {
            const params = req.params
            const response = (await adminUserService.hardDeleteAdminUser(
                params
            )) as APITYPE.V1.adminUser.ResponseBodyData
            // prepare response
            const apiResponse = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: { ok: true },
            }

            return res.status(200).send(apiResponse)
        } catch (error) {
            return errors.errorHandler(res, error as Error)
        }
    }
}
