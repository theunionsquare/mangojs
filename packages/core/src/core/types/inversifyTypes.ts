const INVERSITY_TYPES = {
  PersistenceContext: Symbol.for("PersistenceContext"),
  DatabaseManagerFactory: Symbol.for("DatabaseManagerFactory"),
  LoggerFactory: Symbol.for("LoggerFactory"),
  ApplicationPreCheck: Symbol.for("ApplicationPreCheck"),
  SetUpDatabaseAction: Symbol.for("SetUpDatabaseAction"),
  EmailServiceFactory: Symbol.for("EmailServiceFactory"),
  ScheduleRegistry: Symbol.for("ScheduleRegistry"),

  // Queue
  QueueClient: Symbol.for("QueueClient"),
  QueueManager: Symbol.for("QueueManager"),

  // Authentication (Legacy - deprecated)
  /** @deprecated Use AuthStrategyRegistry instead */
  AuthorizationContext: Symbol.for("AuthorizationContext"),

  // Authentication (New Strategy-based system)
  /** Registry that collects all auth strategies via @multiInject */
  AuthStrategyRegistry: Symbol.for("AuthStrategyRegistry"),
};

export { INVERSITY_TYPES };
