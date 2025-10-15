const INVERSITY_TYPES = {
    PersistenceContext: Symbol.for('PersistenceContext'),
    DatabaseManagerFactory: Symbol.for('DatabaseManagerFactory'),
    AuthorizationContext: Symbol.for('AuthorizationContext'),
    LoggerFactory: Symbol.for('LoggerFactory'),
    ApplicationPreCheck: Symbol.for('ApplicationPreCheck'),
    SetUpDatabaseAction: Symbol.for('SetUpDatabaseAction'),
}

export { INVERSITY_TYPES }
