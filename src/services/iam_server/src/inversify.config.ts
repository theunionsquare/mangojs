import {
    Auth,
    INVERSITY_TYPES,
    Loggers,
    CockroachPersistenceContext,
    databasemanager,
} from '@mangojs/core'
import { IPersistenceContext } from '@mangojs/core'
import { IDatabaseManagerFactory } from '@mangojs/core'

import { AuthorizationService } from './services/authorizationService'
import { Containers } from '@mangojs/core'
import { AdminUser } from './db/models/AdminUser.entity'
import { PartnerUser } from './db/models/PartnerUser.entity'
import { Group } from './db/models/Group.entity'

//const DefaultContainer = Containers.getContainer();
const DefaultContainer = Containers.getContainer()

/**
 * Bind Logger Service
 */
DefaultContainer.bind<Loggers.ILoggerFactory>(
    INVERSITY_TYPES.LoggerFactory
).toConstantValue(new Loggers.LoggerPino('server', 'debug'))

/**
 * Bind Database connector - CockroachDB
 */
DefaultContainer.bind<IDatabaseManagerFactory>(
    INVERSITY_TYPES.DatabaseManagerFactory
).toConstantValue(
    new databasemanager.cockroach.CockRoachDBManagerFactory(
        {
            url: 'postgresql://mangojs:0eb4zSRWa6oMfFrXHA2IRA@house-mongojs-13972.j77.aws-eu-central-1.cockroachlabs.cloud:26257/defaultdb',
        },
        [AdminUser, PartnerUser, Group]
    )
)

/**
 * Bind Persistance Context - CockroachDB
 */
DefaultContainer.bind<IPersistenceContext>(
    INVERSITY_TYPES.PersistenceContext
).to(CockroachPersistenceContext)

/**
 * Bind Authorization Context
 */
DefaultContainer.bind<Auth.IAuthProvider>(
    INVERSITY_TYPES.AuthorizationContext
).to(AuthorizationService)

/**
 * Bind Application Pre-checks
 */
//DefaultContainer.bind<IApplicationPreCheck>(
//    INVERSITY_TYPES.ApplicationPreCheck
//).to(ApplicationPreCheck)

export { DefaultContainer as IAMDefautContainer }
