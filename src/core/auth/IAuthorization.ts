import { Request, Response } from 'express'
import { AuthUser } from '../types/entities/authUser'
import { CredentialType } from '../types/auth/Credentials'

/**
 * @deprecated This interface uses hardcoded user types (Admin, Partner, User).
 * Use `IAuthStrategy` and `AuthStrategyRegistry` for flexible, strategy-based authentication.
 *
 * Migration guide:
 * 1. Create a class implementing `IAuthStrategy`
 * 2. Bind it to `AUTH_STRATEGY_TAG` in your container
 * 3. Use `AuthStrategyRegistry` to authenticate requests
 *
 * @example
 * ```typescript
 * // Old way (deprecated)
 * class MyAuth implements IAuthorization {
 *   validateAdminCredentials(req, res) { ... }
 *   validatePartnerCredentials(req, res) { ... }
 *   validateUserCredentials(req, res) { ... }
 * }
 *
 * // New way
 * class MyJWTStrategy implements IAuthStrategy {
 *   readonly name = 'jwt';
 *   readonly priority = 10;
 *   async authenticate(req) {
 *     // Return IAuthUser or null
 *   }
 * }
 * container.bind(AUTH_STRATEGY_TAG).to(MyJWTStrategy);
 * ```
 *
 * Will be removed in v2.0.0
 */
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
