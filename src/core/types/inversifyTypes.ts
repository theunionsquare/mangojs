const INVERSITY_TYPES = {
  PersistenceContext: Symbol.for("PersistenceContext"),
  DatabaseManagerFactory: Symbol.for("DatabaseManagerFactory"),
  AuthorizationContext: Symbol.for("AuthorizationContext"),
  LoggerFactory: Symbol.for("LoggerFactory"),
  ApplicationPreCheck: Symbol.for("ApplicationPreCheck"),
  SetUpDatabaseAction: Symbol.for("SetUpDatabaseAction"),
  EmailService: Symbol.for("EmailService"),
  ScheduleRegistry: Symbol.for("ScheduleRegistry"),
  // Queue
  QueueClient: Symbol.for("QueueClient"),
  QueueManager: Symbol.for("QueueManager"),
};

export { INVERSITY_TYPES };
