import { Container } from "inversify";
import {
  INVERSITY_TYPES,
  Types,
  IPersistenceContext,
  databasemanager,
  ApplicationPreCheck,
  IDatabaseManagerFactory,
  Auth,
  persistanceContext,
} from "@giusmento/mangojs-core";

// Import your services
import { SubscriptionService } from "./services/subscription.service";
import { SubscriptionPlanService } from "./services/subscriptionPlan.service";
import { PaymentService } from "./services/payment.service";

// Create IoC container
const DefaultContainer = new Container({ defaultScope: "Singleton" });

/**
 * Bind Database connector
 */
DefaultContainer.bind<IDatabaseManagerFactory>(
  INVERSITY_TYPES.DatabaseManagerFactory
).toConstantValue(
  new databasemanager.cockroach.CockRoachDBManagerFactory({
    url: "postgresql://mangojs:0eb4zSRWa6oMfFrXHA2IRA@house-mongojs-13972.j77.aws-eu-central-1.cockroachlabs.cloud:26257/defaultdb",
  })
);

/**
 * Bind Persistance Context
 */
DefaultContainer.bind<IPersistenceContext>(
  INVERSITY_TYPES.PersistenceContext
).to(persistanceContext.CockroachPersistenceContext);

// Bind application pre-check
DefaultContainer.bind<Types.IApplicationPreCheck>(
  INVERSITY_TYPES.ApplicationPreCheck
)
  .to(ApplicationPreCheck)
  .inSingletonScope();

// Bind authentication validator
DefaultContainer.bind<Auth.IAuthValidator>(Auth.RemoteAuthValidator)
  .toDynamicValue(() => {
    return new Auth.RemoteAuthValidator(process.env.IAM_SERVICE_URL);
  })
  .inSingletonScope();

// Bind your services
DefaultContainer.bind<SubscriptionService>(SubscriptionService)
  .to(SubscriptionService)
  .inSingletonScope();

DefaultContainer.bind<SubscriptionPlanService>(SubscriptionPlanService)
  .to(SubscriptionPlanService)
  .inSingletonScope();

DefaultContainer.bind<PaymentService>(PaymentService)
  .to(PaymentService)
  .inSingletonScope();

export { DefaultContainer };
