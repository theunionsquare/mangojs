import { Request, Response } from 'express'
import { AuthUser } from '../types/entities/authUser'

export interface IAuthValidator {
    // Admin Validation
    validateAdminCredentials(req: Request, res: Response): Promise<AuthUser>

    // Partner Validation
    validatePartnerCredentials(req: Request, res: Response): Promise<AuthUser>

    // User Validation
    validateUserCredentials(req: Request, res: Response): Promise<AuthUser>
}
