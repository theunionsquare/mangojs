import { Request, Response } from 'express'
import { IAuthValidator } from './IAuthValidator'
import { AuthUser } from '../types/entities/authUser'

export class RemoteAuthValidator implements IAuthValidator {
    private readonly baseUrl: string

    public constructor(
        host: string = process.env.AUTH_HOST || 'http://localhost',
        port: number = Number(process.env.AUTH_PORT) || 3000
    ) {
        this.baseUrl = `${host}:${port}`
    }

    async validateAdminCredentials(
        req: Request,
        res: Response
    ): Promise<AuthUser> {
        console.log('Validating admin credentials...')
        return this.validateCredentials('admins', req, res)
    }

    async validatePartnerCredentials(
        req: Request,
        res: Response
    ): Promise<AuthUser> {
        console.log('Validating partner credentials...')
        return this.validateCredentials('partners', req, res)
    }

    async validateUserCredentials(
        req: Request,
        res: Response
    ): Promise<AuthUser> {
        console.log('Validating user credentials...')
        return this.validateCredentials('users', req, res)
    }

    private async validateCredentials(
        type: 'admins' | 'partners' | 'users',
        req: Request,
        res: Response
    ): Promise<AuthUser> {
        try {
            const buildEndpoint = `${this.baseUrl}/api/v1/auth/${type}/verify`
            const response = await fetch(buildEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: req.headers.authorization || '',
                    Cookie: req.headers.cookie || '',
                    ...this.extractRelevantHeaders(req),
                },
                body: JSON.stringify(this.extractCredentialsFromRequest(req)),
                credentials: 'include',
            })
            console.log(
                `Response from ${type} validation:`,
                buildEndpoint,
                response.status,
                response.statusText
            )
            if (!response.ok) {
                throw new Error(`Authentication failed: ${response.statusText}`)
            }
            const responseJson = (await response.json()) as {
                data: { user: AuthUser }
            }
            const authUser: AuthUser = responseJson.data.user
            console.log(`Authenticated ${type}:`, authUser)
            return authUser
        } catch (error) {
            throw new Error(
                `Failed to validate ${type} credentials: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        }
    }

    private extractCredentialsFromRequest(req: Request): any {
        return {
            token: req.headers.authorization?.replace('Bearer ', ''),
            sessionId: req.headers['x-session-id'],
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip || req.connection.remoteAddress,
        }
    }

    private extractRelevantHeaders(req: Request): Record<string, string> {
        const relevantHeaders: Record<string, string> = {}

        const headersToForward = [
            'x-forwarded-for',
            'x-real-ip',
            'user-agent',
            'x-session-id',
            'x-request-id',
        ]

        headersToForward.forEach((header) => {
            const value = req.headers[header]
            if (value && typeof value === 'string') {
                relevantHeaders[header] = value
            }
        })

        return relevantHeaders
    }
}
