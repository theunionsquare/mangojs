export interface Base {
    ok: boolean
    timestamp: string
    requestId: string
}

export interface Error extends Base {
    errorMessage?: string
    errorCode?: string
}

export interface Success<D> extends Base {
    data: D
}
