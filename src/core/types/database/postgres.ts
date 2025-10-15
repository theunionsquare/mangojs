export interface PostgresUrl {
    url: string
}

export interface PostgresConnection {
    host: string
    database: string
    username: string
    password: string
    port: number
}
