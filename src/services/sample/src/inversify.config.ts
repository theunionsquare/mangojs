import {
  persistanceContext,
  Auth,
  INVERSITY_TYPES,
  Loggers,
  databasemanager,
  Containers,
} from "@giusmento/mangojs-core";
import { IPersistenceContext } from "@giusmento/mangojs-core";
import { IDatabaseManagerFactory } from "@giusmento/mangojs-core";

import dotenv from "dotenv";
import e from "express";
import { Photo } from "./db/models/Photo";

dotenv.config();

const serviceContainer = Containers.getContainer();

/**
 * Bind Logger Service
 */
serviceContainer
  .bind<Loggers.ILoggerFactory>(INVERSITY_TYPES.LoggerFactory)
  .toConstantValue(new Loggers.LoggerPino("server", "debug"));

/**
 * Bind Database connector
 */
serviceContainer
  .bind<IDatabaseManagerFactory>(INVERSITY_TYPES.DatabaseManagerFactory)
  .toConstantValue(
    new databasemanager.cockroach.CockRoachDBManagerFactory(
      {
        url: "postgresql://mangojs:0eb4zSRWa6oMfFrXHA2IRA@house-mongojs-13972.j77.aws-eu-central-1.cockroachlabs.cloud:26257/defaultdb",
      },
      [Photo]
    )
  );

/**
 * Bind Persistance Context
 */
serviceContainer
  .bind<IPersistenceContext>(INVERSITY_TYPES.PersistenceContext)
  .to(persistanceContext.CockroachPersistenceContext);

/**
 * Bind Authorization Context
 */
serviceContainer
  .bind<Auth.IAuthValidator>(INVERSITY_TYPES.AuthorizationContext)
  .toConstantValue(new Auth.RemoteAuthValidator("http://localhost", 3031));

/**
 * Bind Application Pre-checks
 */
//DefaultContainer.bind<IApplicationPreCheck>(
//    INVERSITY_TYPES.ApplicationPreCheck
//).to(ApplicationPreCheck)

export { serviceContainer };
