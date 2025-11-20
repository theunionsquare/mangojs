import {
  Containers,
  Auth,
  INVERSITY_TYPES,
  Providers,
  persistanceContext,
  databasemanager,
  IPersistenceContext,
  IDatabaseManagerFactory,
} from "@giusmento/mangojs-core";

import { AuthorizationService } from "./services/authorizationService";
import { IAMEntities } from "./db/models";

/**
 * Database configuration
 */
const POSTGRES_HOST = process.env.DATABASE_HOST || "localhost";
const POSTGRES_PORT = Number(process.env.DATABASE_PORT) || 5432;
const POSTGRES_DB = process.env.DATABASE_DB || "";
const POSTGRES_USER = process.env.DATABASE_USER || "";
const POSTGRES_PASSWORD = process.env.DATABASE_PASSWORD || "";

const syncronize = false;

/**
 * Create IAM child container with core dependencies from parent
 */
const containerManager = Containers.getContainer();
const container = containerManager.getContainer();
container
  .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
  .toConstantValue(
    new databasemanager.postgres.PostgresDBManagerFactory(
      {
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        database: POSTGRES_DB,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
      },
      IAMEntities,
      syncronize
    )
  );
container
  .bind<IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
  .to(persistanceContext.PostgresPersistenceContext);

container
  .bind<Auth.IAuthProvider>(INVERSITY_TYPES.AuthorizationContext)
  .toService(AuthorizationService);

container
  .bind<Providers.email.IEmailService>(INVERSITY_TYPES.EmailService)
  .toConstantValue(new Providers.email.EmailServiceDummy());

export { container as IAMDefaultContainer };
export { containerManager as IAMContainerManager };
