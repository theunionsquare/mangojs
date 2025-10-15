import { Request, Response } from 'express'
import { AuthUser } from '../types/entities/authUser'
import { CredentialType } from '../types/auth/Credentials'

export interface IAuthorization {
    // Admin credentials
    generateAdminCredentials(data: {}): { type: CredentialType; data: any }
    validateAdminCredentials(req: Request, res: Response): Promise<AuthUser>

    // Partner credentials
    generatePartnerCredentials(data: {}): { type: CredentialType; data: any }
    validatePartnerCredentials(req: Request, res: Response): Promise<AuthUser>

    // User credentials
    generateUserCredentials(data: {}): { type: CredentialType; data: any }
    validateUserCredentials(req: Request, res: Response): Promise<AuthUser>
}
