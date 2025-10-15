import {
  Auth,
  INVERSITY_TYPES,
  Loggers,
  persistanceContext,
  databasemanager,
} from "@mangojs/core";
import { IPersistenceContext } from "@mangojs/core";
import { IDatabaseManagerFactory } from "@mangojs/core";

import { AuthorizationService } from "./services/authorizationService";
import { Containers } from "@mangojs/core";

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
import { AdminUser, Group, PartnerUser } from "./db/models";

const POSTGRES_PASSWORD = process.env.DATABASE_PASSWORD || "";
const POSTGRES_USER = process.env.DATABASE_USER || "";
const POSTGRES_DB = process.env.DATABASE_DB || "";

IAMDefaultContainer.bind<IDatabaseManagerFactory>(
  INVERSITY_TYPES.DatabaseManagerFactory
).toConstantValue(
  new databasemanager.postgres.PostgresDBManagerFactory(
    {
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT) || 5432,
    },
    [AdminUser, PartnerUser, Group]
  )
);

/**
 * Bind Authorization Context
 */
IAMDefaultContainer.bind<Auth.IAuthProvider>(
  INVERSITY_TYPES.AuthorizationContext
).to(AuthorizationService);

export { IAMDefaultContainer };
