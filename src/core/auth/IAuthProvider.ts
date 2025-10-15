import { CredentialType } from '../types/auth/Credentials'
import { IAuthValidator } from './IAuthValidator'

export interface IAuthProvider extends IAuthValidator {
    // Admin credentials
    generateAdminCredentials(data: {}): { type: CredentialType; data: any }

    // Partner credentials
    generatePartnerCredentials(data: {}): { type: CredentialType; data: any }

    // User credentials
    generateUserCredentials(data: {}): { type: CredentialType; data: any }
}
