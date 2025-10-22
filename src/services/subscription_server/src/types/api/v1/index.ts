import { Types } from "@giusmento/mangojs-core";
import {
  SubscriptionStatus,
  PaymentProvider,
} from "../../../db/models/Subscription.model";
import {
  PlanType,
  BillingInterval,
} from "../../../db/models/SubscriptionPlan.model";

export namespace api {
  export namespace v1 {
    // Subscription Types
    export namespace subscriptions {
      // GET Types
      export namespace GET {
        export interface RequestBody {}
        export interface ResponseBodyData {
          uid: string;
          userId: string;
          plan: {
            uid: string;
            name: string;
            description?: string;
            planType: PlanType;
            price: number;
            currency: string;
            billingInterval: BillingInterval;
            features?: Record<string, any>;
            limits?: Record<string, any>;
          };
          status: SubscriptionStatus;
          paymentProvider: PaymentProvider;
          trialStartDate?: Date;
          trialEndDate?: Date;
          currentPeriodStart: Date;
          currentPeriodEnd: Date;
          canceledAt?: Date;
          pausedAt?: Date;
          autoRenew: boolean;
          metadata?: Record<string, any>;
          createdAt: Date;
          updatedAt: Date;
        }
        export type ResponseBody = Types.v1.api.response.response<
          ResponseBodyData[]
        >;
      }

      // POST Types
      export namespace POST {
        export interface RequestBody {
          userId: string;
          planId: string;
          paymentProvider: PaymentProvider;
          paymentMethodId?: string;
          metadata?: Record<string, any>;
        }
        export type ResponseBodyData = GET.ResponseBodyData;
        export type ResponseBody =
          Types.v1.api.response.Success<ResponseBodyData>;
      }

      // PUT Types
      export namespace PUT {
        export interface Params {
          uid: string;
        }
        export interface RequestBody {
          planId?: string;
          autoRenew?: boolean;
          metadata?: Record<string, any>;
        }
        export type ResponseBodyData = GET.ResponseBodyData;
        export type ResponseBody =
          Types.v1.api.response.Success<ResponseBodyData>;
      }

      // DELETE Types (Cancel)
      export namespace DELETE {
        export interface Params {
          uid: string;
        }
        export interface RequestBody {}
        export type ResponseBodyData = { success: boolean };
        export type ResponseBody =
          Types.v1.api.response.Success<ResponseBodyData>;
      }

      // Pause subscription
      export namespace PAUSE {
        export interface Params {
          uid: string;
        }
        export interface RequestBody {}
        export type ResponseBodyData = GET.ResponseBodyData;
        export type ResponseBody =
          Types.v1.api.response.Success<ResponseBodyData>;
      }

      // Resume subscription
      export namespace RESUME {
        export interface Params {
          uid: string;
        }
        export interface RequestBody {}
        export type ResponseBodyData = GET.ResponseBodyData;
        export type ResponseBody =
          Types.v1.api.response.Success<ResponseBodyData>;
      }
    }

    // Subscription Plan Types
    export namespace plans {
      // GET Types
      export namespace GET {
        export interface RequestBody {}
        export interface ResponseBodyData {
          uid: string;
          name: string;
          description?: string;
          planType: PlanType;
          price: number;
          currency: string;
          billingInterval: BillingInterval;
          trialDays?: number;
          features?: Record<string, any>;
          limits?: Record<string, any>;
          isActive: boolean;
          createdAt: Date;
          updatedAt: Date;
        }
        export type ResponseBody = Types.v1.api.response.Success<
          ResponseBodyData[]
        >;
      }

      // POST Types
      export namespace POST {
        export interface RequestBody {
          name: string;
          description?: string;
          planType: PlanType;
          price: number;
          currency?: string;
          billingInterval: BillingInterval;
          trialDays?: number;
          features?: Record<string, any>;
          limits?: Record<string, any>;
          isActive?: boolean;
        }
        export type ResponseBodyData = GET.ResponseBodyData;
        export type ResponseBody =
          Types.v1.api.response.Success<ResponseBodyData>;
      }

      // PUT Types
      export namespace PUT {
        export interface Params {
          uid: string;
        }
        export interface RequestBody {
          name?: string;
          description?: string;
          planType?: PlanType;
          price?: number;
          currency?: string;
          billingInterval?: BillingInterval;
          trialDays?: number;
          features?: Record<string, any>;
          limits?: Record<string, any>;
          isActive?: boolean;
        }
        export type ResponseBodyData = GET.ResponseBodyData;
        export type ResponseBody =
          Types.v1.api.response.Success<ResponseBodyData>;
      }

      // DELETE Types
      export namespace DELETE {
        export interface Params {
          uid: string;
        }
        export interface RequestBody {}
        export type ResponseBodyData = { success: boolean };
        export type ResponseBody =
          Types.v1.api.response.Success<ResponseBodyData>;
      }
    }
  }
}
