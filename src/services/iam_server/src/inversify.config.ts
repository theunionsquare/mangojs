import {
  Auth,
  INVERSITY_TYPES,
  Loggers,
  persistanceContext,
  databasemanager,
} from "@giusmento/mangojs-core";
import { IPersistenceContext } from "@giusmento/mangojs-core";
import { IDatabaseManagerFactory } from "@giusmento/mangojs-core";

import { AuthorizationService } from "./services/authorizationService";
import { Containers } from "@giusmento/mangojs-core";

const IAMDefaultContainer = Containers.getContainer();

/**
 * Bind Persistance Context - Postgres Implementation
 */
IAMDefaultContainer.bind<IPersistenceContext>(
  INVERSITY_TYPES.PersistenceContext
).to(persistanceContext.PostgresPersistenceContext);

/**
 * Bind Database connector - Postgres Implementation
 */
import { IAMEntities } from "./db/models";

const POSTGRES_HOST = process.env.DATABASE_HOST || "localhost";
const POSTGRES_PORT = Number(process.env.DATABASE_PORT) || 5432;
const POSTGRES_DB = process.env.DATABASE_DB || "";
const POSTGRES_USER = process.env.DATABASE_USER || "";
const POSTGRES_PASSWORD = process.env.DATABASE_PASSWORD || "";

IAMDefaultContainer.bind<IDatabaseManagerFactory>(
  INVERSITY_TYPES.DatabaseManagerFactory
).toConstantValue(
  new databasemanager.postgres.PostgresDBManagerFactory(
    {
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      database: POSTGRES_DB,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    },
    IAMEntities
  )
);

/**
 * Bind Authorization Context
 */
IAMDefaultContainer.bind<Auth.IAuthProvider>(
  INVERSITY_TYPES.AuthorizationContext
).to(AuthorizationService);

export { IAMDefaultContainer };
