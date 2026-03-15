import { APIError } from './baseErrors'

/**
 * Unauthorized error for decorator-based authorization.
 *
 * @deprecated Use AuthorizationError from decorators/auth instead.
 */
export class Unauthorized extends APIError {
    public constructor(errorCode: string, errorMessage: string) {
        super(401, errorCode, errorMessage)
    }
}
