import { CredentialType } from '../types/auth/Credentials'
import { IAuthValidator } from './IAuthValidator'

/**
 * @deprecated Use `IAuthStrategy` with the `generateToken()` method instead.
 * The new strategy-based system provides a unified `AuthCredentials` response
 * format for all authentication types.
 *
 * Will be removed in v2.0.0
 */
export interface IAuthProvider extends IAuthValidator {
    // Admin credentials
    generateAdminCredentials(data: {}): { type: CredentialType; data: any }

    // Partner credentials
    generatePartnerCredentials(data: {}): { type: CredentialType; data: any }

    // User credentials
    generateUserCredentials(data: {}): { type: CredentialType; data: any }
}
