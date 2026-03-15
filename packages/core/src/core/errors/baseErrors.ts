/**
 * Base API error class for HTTP error responses.
 *
 * @example
 * ```typescript
 * throw new APIError(404, 'NOT_FOUND', 'Resource not found');
 * ```
 */
export class APIError extends Error {
    public readonly statusCode: number
    public readonly errorCode: string
    public readonly errorMessage: string
    public readonly errorName: string = 'APIError'

    public constructor(
        statusCode: number,
        errorCode: string,
        errorMessage: string
    ) {
        super(errorMessage)
        this.statusCode = statusCode
        this.errorCode = errorCode
        this.errorMessage = errorMessage
    }
}
