export interface SignedCookie {
    token: string
    tokenOptions: Record<string, any>
}

export interface DecodedCookie<D> {
    cookieData: D
    iat: number
}

export interface Cookie {
    id: string
}
