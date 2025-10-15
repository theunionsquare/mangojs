import { errors } from '..'
import type { Response } from 'express'
import { apiResponses } from '../types'
import { APIError } from './baseErrors'

/**
 * Handles the error and returns the error response
 * @param {unknown} error
 * @returns {APIGatewayBaseResponseBody}
 */
export const errorHandler = (res: Response, error: Error) => {
    const response = {
        ok: false,
        timestamp: (res.getHeader('x-request-timestamp') as string) || '',
        requestId: (res.getHeader('x-request-id') as string) || '',
    }
    if (error instanceof errors.APIError || error instanceof APIError) {
        const castError = error as APIError
        const responseApiError: apiResponses.Error = {
            ...response,
            errorMessage: castError.errorMessage,
            errorCode: castError.errorCode,
        }
        return res.status(401).json(responseApiError)
    }

    const errorResponse: apiResponses.Error = {
        ...response,
        errorMessage: error.message || '',
        errorCode: 'GENERIC-ERROR',
    }
    return res.status(400).json(errorResponse)
}
