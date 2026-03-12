import { Request, Response } from 'express'
import { AuthUser } from '../types/entities/authUser'

/**
 * @deprecated Use `IAuthStrategy` interface instead.
 * The new strategy-based system uses a single `authenticate()` method
 * that returns `IAuthUser | null` for any user type.
 *
 * Will be removed in v2.0.0
 */
export interface IAuthValidator {
    // Admin Validation
    validateAdminCredentials(req: Request, res: Response): Promise<AuthUser>

    // Partner Validation
    validatePartnerCredentials(req: Request, res: Response): Promise<AuthUser>

    // User Validation
    validateUserCredentials(req: Request, res: Response): Promise<AuthUser>
}
