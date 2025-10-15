import { APIError } from './baseErrors'

export class Unauthorized extends APIError {
    public constructor(errorCode: string, errorMessage: string) {
        super(401, errorCode, errorMessage)
    }
}
