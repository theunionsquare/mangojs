export interface IDatabaseManagerFactory {
    dbConnection(): any
    getConnection(): any
    getStatus(): any
}
