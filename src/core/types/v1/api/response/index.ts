import { Response as ExResponse } from 'express'
import { Base } from '..'

export interface Error extends Base {
    erroMessage?: string
    errorCode?: string
}

export interface response<D> extends Base {
    data: D
}

export type Success<D> = ExResponse<response<D>>
