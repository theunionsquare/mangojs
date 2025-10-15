import { NextFunction, Request, Response } from 'express'
import { Controller, Middleware, Post, loggedMethod, utils } from '@mangojs/core'
import dotenv from 'dotenv'
import { IAMDefautContainer } from '../../../inversify.config'
import { PartnerUserService } from '../../../services/partnerUser.service'
import jwt from 'jsonwebtoken'
import { Decorators } from '@mangojs/core'
import { AuthorizationService } from '../../../services/authorizationService'
import { errors } from '@mangojs/core'
import { Types } from '@mangojs/core'

const { sign, verify } = jwt

dotenv.config()

// envs
const COOKIE_NAME = process.env.COOKIE_NAME

// import adminUserService
const partnerUserService =
    IAMDefautContainer.resolve<PartnerUserService>(PartnerUserService)

// import authorization service
const authService =
    IAMDefautContainer.resolve<AuthorizationService>(AuthorizationService)

// import authorization decorators
const AuthDecorators = IAMDefautContainer.resolve<Decorators.AuthorizationDecorators>(
    Decorators.AuthorizationDecorators
)

@Controller('/api/iam/v1/auth/partners')
export class AuthPartnerController {
    /**
     * @swagger
     * /auth/partners/login:
     *  post:
     *    summary: Login Partner users
     *    description: Return cookies for partner users
     *    tags:
     *      - Auth Partner
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              email:
     *                type: string
     *                example: myemail@email.com
     *              password:
     *                type: password
     *                example: hash256('mypassword')
     *    responses:
     *      200:
     *        description: An array containing admin groups
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
    @Post('/login')
    public async getCredentials(
        req: Request,
        res: Response<Types.apiResponses.Success<{}>>
    ): Promise<Response<Types.apiResponses.Success<{}>>> {
        console.log('Log-in admin local')
        const logRequest = new utils.LogRequest(res)
        try {
            // throw new errors.APIError(401, "");

            const body = req.body
            const email = body.email || ''
            // validate request

            // check if user exists
            const adminUser = await partnerUserService.partnerUserLogIn(
                body.email,
                body.password
            )
            //Creating jwt token
            const cookie = authService.generatePartnerCredentials({
                uid: adminUser.uid,
                firstName: adminUser.uid,
                lastName: adminUser.lastName,
                email: adminUser.email,
            })

            const authUser: Types.entities.AuthUserBase = {
                uid: adminUser.uid,
                firstName: adminUser.firstName,
                lastName: adminUser.lastName,
                email: adminUser.email,
            }

            const apiResponse: Types.apiResponses.Success<{}> = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: {
                    authenticated: true,
                    message: 'Authentication Successful.',
                    user: authUser,
                },
            }
            return res
                .status(200)
                .cookie(
                    cookie.cookieName,
                    cookie.data.token,
                    cookie.data.tokenOptions
                )
                .send(apiResponse)
        } catch (error: unknown) {
            return errors.errorHandler(res, error as Error)
        }
    }

    /**
     * @swagger
     * /auth/partner/logout:
     *  post:
     *    summary: Logout Admin users
     *    description: Delete cookies and reset user connections
     *    tags:
     *      - Auth Partner
     *    security:
     *      - adminCookieAuth: []
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        description: An array containing admin groups
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  id:
     *                    type: string
     *                    example: 12345
     *
     */
    @Post('/logout')
    public async logout(
        req: Request,
        res: Response<Types.apiResponses.Success<{}>>
    ): Promise<Response<Types.apiResponses.Success<{}>>> {
        console.log('Log-in admin local')
        const logRequest = new utils.LogRequest(res)
        try {
            let exists = true
            const body = req.body
            // TO DO: Add BE log out process
            //const response = await adminUserService.getAdminUser(body.username);

            // prepare response
            const apiResponse: Types.apiResponses.Success<{}> = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: {
                    authenticated: false,
                    message: 'Logout Successful',
                },
            }
            const cookieName = authService.partnerCookie.name
            // response 200 with null token
            return res.status(200).cookie(cookieName, null).send(apiResponse)
        } catch (error) {
            return errors.errorHandler(res, error as Error)
        }
    }

    @Post('/register')
    public async registerAdminUser(
        req: Request,
        res: Response<Types.apiResponses.Success<{}>>
    ): Promise<Response<Types.apiResponses.Success<{}>>> {
        console.log('register user')
        const logRequest = new utils.LogRequest(res)
        try {
            const body = req.body
            const response = await partnerUserService.postPartnerUser(body)

            // prepare response
            const apiResponse: Types.apiResponses.Success<{}> = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: { response },
            }

            return res.json(apiResponse)
        } catch (error) {
            return errors.errorHandler(res, error as Error)
        }
    }
    /**
     * @swagger
     * /auth/partner/verify:
     *  post:
     *    summary: Verify an Admin cookie
     *    description: Verify if an Admin cookie is valid
     *    tags:
     *      - Auth Partner
     *    security:
     *      - adminCookieAuth: []
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        description: An array containing admin groups
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  id:
     *                    type: string
     *                    example: 12345
     *
     */
    @Post('/verify')
    //@AuthDecorators.IsAuthorized()
    public async verifyToken(req: Request, res: Response): Promise<Response> {
        console.log('verify token')
        const logRequest = new utils.LogRequest(res)
        try {
            const body = req.body
            const authUser = await authService.validatePartnerCredentials(
                req,
                res
            )

            // prepare response
            const apiResponse: Types.apiResponses.Success<{}> = {
                ok: true,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: {
                    isAuthenticated: true,
                    user: authUser,
                },
            }

            return res.status(200).json(apiResponse)
        } catch (err) {
            return res.status(400).json({
                ok: false,
                timestamp: logRequest.timestamp,
                requestId: logRequest.requestId,
                data: {
                    err: err.errMessage,
                    isAuthenticated: false,
                },
            })
        }
    }
}
