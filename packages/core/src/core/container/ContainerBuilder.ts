import { Container, Newable } from "inversify";
import { ServiceIdentifier } from "./types";
import { ContainerManager } from "./ContainerManager";
import { ContainerRegistry } from "./ContainerRegistry";
import { INVERSITY_TYPES } from "../types/inversifyTypes";

// Import types for presets
import { ILoggerFactory, LoggerPino } from "../loggers";
import { IDatabaseManagerFactory } from "../databasemanager/types";
import { IPersistenceContext } from "../persistence/types";

// Database managers and persistence contexts
import { PostgresDBManagerFactory } from "../databasemanager/postgres/PostgresDBManagerFactory";
import { PostgresPersistenceContext } from "../persistence/PersistenceContext.postgres";
import { CockRoachDBManagerFactory } from "../databasemanager/cockroachdb/CockroachDBManagerFactory";
import { CockroachPersistenceContext } from "../persistence/PersistenceContext.cockroach";
import { MongooseDBManagerFactory } from "../databasemanager/MongooseDBManagerFactory";
import { MongoosePersistenceContext } from "../persistence/PersistenceContext.mongoose";
import { DummyDBManagerFactory } from "../databasemanager/DummyDBManagerFactory";
import { DummyPersistenceContext } from "../persistence/PersistenceContext.dummy";

// CockroachDB connection types
import type { CockroachUrl, CockroachConnection } from "../types/database/cockroach";

// Auth
import { AUTH_STRATEGY_TAG, IAuthStrategy } from "../auth/strategies/IAuthStrategy";
import { AuthStrategyRegistry } from "../auth/AuthStrategyRegistry";

// Queue
import { IQueueClient, RedisConfig } from "../queue/types";
import { QueueClient } from "../queue/QueueClient";

// Database connection types
import type { PostgresUrl, PostgresConnection } from "../types/database/postgres";

/** Default container name when none is provided */
const DEFAULT_CONTAINER_NAME = "default";

/**
 * Binding scope options
 */
type BindingScope = "singleton" | "transient";

/**
 * Options for core module
 */
export interface CoreOptions {
  /** Logger name (default: 'server') */
  loggerName?: string;
  /** Log level (default: 'debug') */
  logLevel?: "debug" | "info" | "warn" | "error";
}

/**
 * Options for MongoDB connection
 */
export interface MongoDBOptions {
  uri: string;
  databaseName: string;
}

/**
 * Options for Postgres connection
 */
export interface PostgresOptions {
  connection: PostgresUrl | PostgresConnection;
  entities: any[];
  synchronize?: boolean;
  logging?: boolean;
}

/**
 * Options for CockroachDB connection
 */
export interface CockroachDBOptions {
  connection: CockroachUrl | CockroachConnection;
  entities: any[];
  synchronize?: boolean;
  logging?: boolean;
}

/**
 * Options for Queue/Redis connection
 */
export interface QueueOptions {
  /** Redis host (default: 'localhost') */
  host?: string;
  /** Redis port (default: 6379) */
  port?: number;
  /** Redis password */
  password?: string;
  /** Redis database number */
  db?: number;
}

/**
 * Container module function type
 */
export type ContainerModule = (builder: ContainerBuilder) => void;

/**
 * Binding builder for fluent scope configuration
 */
class BindingBuilder<T> {
  private _scope: BindingScope = "singleton";

  constructor(
    private builder: ContainerBuilder,
    private container: Container,
    private identifier: ServiceIdentifier<T>
  ) {}

  /**
   * Bind to a class constructor
   */
  to(constructor: Newable<T>): ContainerBuilder {
    const binding = this.container.bind<T>(this.identifier).to(constructor);
    if (this._scope === "singleton") {
      binding.inSingletonScope();
    } else {
      binding.inTransientScope();
    }
    return this.builder;
  }

  /**
   * Bind to a constant value
   */
  toValue(value: T): ContainerBuilder {
    this.container.bind<T>(this.identifier).toConstantValue(value);
    return this.builder;
  }

  /**
   * Bind to a factory function
   */
  toFactory(factory: () => T): ContainerBuilder {
    this.container.bind<T>(this.identifier).toDynamicValue(() => factory());
    if (this._scope === "singleton") {
      // For singleton factories, we need to cache the result
      // This is handled automatically by inversify's singleton scope
    }
    return this.builder;
  }

  /**
   * Bind class to itself (useful for @injectable classes)
   */
  toSelf(): ContainerBuilder {
    if (typeof this.identifier === "function") {
      const binding = this.container
        .bind<T>(this.identifier)
        .toSelf();
      if (this._scope === "singleton") {
        binding.inSingletonScope();
      } else {
        binding.inTransientScope();
      }
    }
    return this.builder;
  }

  /**
   * Set binding scope to singleton (default)
   */
  asSingleton(): this {
    this._scope = "singleton";
    return this;
  }

  /**
   * Set binding scope to transient (new instance per request)
   */
  asTransient(): this {
    this._scope = "transient";
    return this;
  }
}

/**
 * Fluent builder for creating and configuring dependency injection containers.
 *
 * Provides both framework presets (for common setups like databases, auth)
 * and generic binding methods (for application-specific classes).
 *
 * @example
 * ```typescript
 * // Default container (automatically set as default)
 * ContainerBuilder.create()
 *   .withCore()
 *   .withPostgres({ connection: { url: DATABASE_URL }, entities: [User, Order] })
 *   .withAuth([JWTStrategy, ApiKeyStrategy])
 *   .build();
 *
 * // Named container (not default)
 * ContainerBuilder.create("test")
 *   .withCore()
 *   .withDummyDB()
 *   .build();
 *
 * // Named container, explicitly set as default
 * ContainerBuilder.create("other")
 *   .withCore()
 *   .setAsDefault()
 *   .build();
 * ```
 */
export class ContainerBuilder {
  private container: Container;
  private name: string;
  private shouldBeDefault: boolean;

  private constructor(name?: string, parent?: Container) {
    this.name = name ?? DEFAULT_CONTAINER_NAME;
    this.shouldBeDefault = name === undefined; // unnamed = default
    this.container = parent ? new Container({ parent }) : new Container();
  }

  /**
   * Create a new ContainerBuilder
   * @param name - Optional container name. If not provided, container becomes default.
   * @param parent - Optional parent container for hierarchical DI
   */
  static create(name?: string, parent?: ContainerManager): ContainerBuilder {
    return new ContainerBuilder(name, parent?.getRawContainer());
  }

  /**
   * Mark this container to be set as the default when built
   */
  setAsDefault(): this {
    this.shouldBeDefault = true;
    return this;
  }

  // ============================================
  // Generic Binding Methods
  // ============================================

  /**
   * Start a binding for a service identifier
   *
   * @example
   * ```typescript
   * builder.bind(TYPES.UserService).to(UserService)
   * builder.bind(TYPES.Config).toValue(config)
   * builder.bind(TYPES.Factory).toFactory(() => new MyClass())
   * ```
   */
  bind<T>(identifier: ServiceIdentifier<T>): BindingBuilder<T> {
    return new BindingBuilder<T>(this, this.container, identifier);
  }

  /**
   * Bind multiple classes at once
   *
   * @example
   * ```typescript
   * builder.bindAll({
   *   [TYPES.UserService]: UserService,
   *   [TYPES.OrderService]: OrderService,
   * })
   * ```
   */
  bindAll(bindings: Record<string | symbol, Newable<any>>): this {
    for (const [identifier, implementation] of Object.entries(bindings)) {
      this.container
        .bind(identifier)
        .to(implementation)
        .inSingletonScope();
    }
    // Handle symbol keys
    for (const sym of Object.getOwnPropertySymbols(bindings)) {
      this.container
        .bind(sym)
        .to(bindings[sym as any])
        .inSingletonScope();
    }
    return this;
  }

  /**
   * Bind a tagged implementation (for multi-inject patterns)
   *
   * @example
   * ```typescript
   * builder
   *   .bindTagged(AUTH_STRATEGY_TAG, JWTStrategy)
   *   .bindTagged(AUTH_STRATEGY_TAG, ApiKeyStrategy)
   * ```
   */
  bindTagged<T>(tag: symbol, implementation: Newable<T>): this {
    this.container.bind<T>(tag).to(implementation).inSingletonScope();
    return this;
  }

  /**
   * Bind multiple tagged implementations at once
   *
   * @example
   * ```typescript
   * builder.bindAllTagged(AUTH_STRATEGY_TAG, [
   *   JWTStrategy,
   *   ApiKeyStrategy,
   *   SessionStrategy
   * ])
   * ```
   */
  bindAllTagged<T>(tag: symbol, implementations: Newable<T>[]): this {
    for (const impl of implementations) {
      this.container.bind<T>(tag).to(impl).inSingletonScope();
    }
    return this;
  }

  /**
   * Use a custom module to configure bindings
   *
   * @example
   * ```typescript
   * const PaymentModule: ContainerModule = (builder) => {
   *   builder
   *     .bind(TYPES.PaymentGateway).to(StripeGateway)
   *     .bind(TYPES.PaymentService).to(PaymentService);
   * };
   *
   * builder.useModule(PaymentModule)
   * ```
   */
  useModule(module: ContainerModule): this {
    module(this);
    return this;
  }

  // ============================================
  // Framework Presets
  // ============================================

  /**
   * Add core framework bindings (logger)
   *
   * @example
   * ```typescript
   * builder.withCore({ loggerName: 'my-app', logLevel: 'info' })
   * ```
   */
  withCore(options: CoreOptions = {}): this {
    const { loggerName = "server", logLevel = "debug" } = options;

    if (!this.container.isBound(INVERSITY_TYPES.LoggerFactory)) {
      this.container
        .bind<ILoggerFactory>(INVERSITY_TYPES.LoggerFactory)
        .toConstantValue(new LoggerPino(loggerName, logLevel));
    }

    return this;
  }

  /**
   * Configure PostgreSQL database and persistence
   *
   * @example
   * ```typescript
   * builder.withPostgres({
   *   connection: { url: 'postgresql://user:pass@host:5432/db' },
   *   entities: [User, Order],
   *   synchronize: true
   * })
   * ```
   */
  withPostgres(options: PostgresOptions): this {
    const { connection, entities, synchronize = true, logging = false } = options;

    // Ensure core is loaded for logger
    this.withCore();

    // Bind database manager
    this.container
      .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
      .toConstantValue(
        new PostgresDBManagerFactory(connection, entities, synchronize, logging)
      );

    // Bind persistence context
    this.container
      .bind<IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
      .to(PostgresPersistenceContext)
      .inSingletonScope();

    return this;
  }

  /**
   * Configure CockroachDB database and persistence
   *
   * @example
   * ```typescript
   * builder.withCockroachDB({
   *   connection: { url: 'postgresql://user:pass@host:26257/db' },
   *   entities: [User, Order]
   * })
   * ```
   */
  withCockroachDB(options: CockroachDBOptions): this {
    const { connection, entities, synchronize = true, logging = false } = options;

    // Ensure core is loaded for logger
    this.withCore();

    // Bind database manager
    this.container
      .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
      .toConstantValue(
        new CockRoachDBManagerFactory(connection, entities, synchronize, logging)
      );

    // Bind persistence context
    this.container
      .bind<IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
      .to(CockroachPersistenceContext)
      .inSingletonScope();

    return this;
  }

  /**
   * Configure MongoDB database and persistence
   *
   * @deprecated MongoDB support is deprecated. Use PostgreSQL or CockroachDB instead.
   *
   * @example
   * ```typescript
   * builder.withMongoDB({
   *   uri: 'mongodb://localhost:27017',
   *   databaseName: 'mydb'
   * })
   * ```
   */
  withMongoDB(options: MongoDBOptions): this {
    const { uri, databaseName } = options;

    // Ensure core is loaded for logger
    this.withCore();

    // Get logger factory for MongooseDBManagerFactory constructor
    const loggerFactory = this.container.get<ILoggerFactory>(
      INVERSITY_TYPES.LoggerFactory
    );

    // Bind database manager
    this.container
      .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
      .toConstantValue(
        new MongooseDBManagerFactory(uri, databaseName, loggerFactory)
      );

    // Bind persistence context
    this.container
      .bind<IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
      .to(MongoosePersistenceContext)
      .inSingletonScope();

    return this;
  }

  /**
   * Configure a dummy/in-memory database (useful for testing)
   *
   * @example
   * ```typescript
   * builder.withDummyDB()
   * ```
   */
  withDummyDB(): this {
    this.withCore();

    this.container
      .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
      .to(DummyDBManagerFactory)
      .inSingletonScope();

    this.container
      .bind<IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
      .to(DummyPersistenceContext)
      .inSingletonScope();

    return this;
  }

  /**
   * Configure authentication with strategies
   *
   * Binds all provided strategies to the AUTH_STRATEGY_TAG for multi-inject,
   * then binds the AuthStrategyRegistry that collects them.
   *
   * @example
   * ```typescript
   * builder.withAuth([JWTStrategy, ApiKeyStrategy])
   * ```
   */
  withAuth(strategies: Newable<IAuthStrategy>[]): this {
    // Bind each strategy to the multi-inject tag
    for (const strategy of strategies) {
      this.container
        .bind<IAuthStrategy>(AUTH_STRATEGY_TAG)
        .to(strategy)
        .inSingletonScope();
    }

    // Bind the registry that collects them
    this.container
      .bind(INVERSITY_TYPES.AuthStrategyRegistry)
      .to(AuthStrategyRegistry)
      .inSingletonScope();

    return this;
  }

  /**
   * Configure QueueClient with Redis connection
   *
   * @example
   * ```typescript
   * builder.withQueueClient({
   *   host: 'localhost',
   *   port: 6379,
   *   password: 'secret',
   *   db: 0
   * })
   * ```
   */
  withQueueClient(options: QueueOptions): this {
    const redisConfig: RedisConfig = {
      host: options.host || "localhost",
      port: options.port || 6379,
      password: options.password,
      db: options.db,
    };

    this.container
      .bind<IQueueClient>(INVERSITY_TYPES.QueueClient)
      .toConstantValue(new QueueClient(redisConfig));

    return this;
  }

  // ============================================
  // Build
  // ============================================

  /**
   * Build and register the configured ContainerManager
   */
  build(): ContainerManager {
    const manager = new ContainerManager(this.container, this.name);
    ContainerRegistry.register(manager, this.shouldBeDefault);
    return manager;
  }
}
