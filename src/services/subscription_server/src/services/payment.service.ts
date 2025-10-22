import { injectable } from "inversify";
import Stripe from "stripe";
import paypal from "paypal-rest-sdk";
import { Subscription } from "../db/models/Subscription.model";
import { SubscriptionPlan } from "../db/models/SubscriptionPlan.model";
import { errors } from "@giusmento/mangojs-core";

@injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    // Initialize Stripe
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });

    // Initialize PayPal
    paypal.configure({
      mode: process.env.PAYPAL_MODE || "sandbox",
      client_id: process.env.PAYPAL_CLIENT_ID!,
      client_secret: process.env.PAYPAL_CLIENT_SECRET!,
    });
  }

  /**
   * Create subscription with payment provider
   */
  public async createSubscription(
    subscription: Subscription,
    paymentMethodId?: string
  ): Promise<{ id: string; customerId: string }> {
    if (subscription.paymentProvider === "STRIPE") {
      return await this.createStripeSubscription(subscription, paymentMethodId);
    } else if (subscription.paymentProvider === "PAYPAL") {
      return await this.createPayPalSubscription(subscription);
    }

    throw new errors.APIError(
      400,
      "INVALID_PAYMENT_PROVIDER",
      "Unsupported payment provider"
    );
  }

  /**
   * Update subscription with payment provider
   */
  public async updateSubscription(
    externalSubscriptionId: string,
    newPlan: SubscriptionPlan
  ): Promise<void> {
    // Implementation depends on payment provider
    // This is a simplified version
    try {
      if (newPlan.stripeProductId) {
        await this.stripe.subscriptions.update(externalSubscriptionId, {
          items: [
            {
              id: externalSubscriptionId,
              price: newPlan.stripePriceId,
            },
          ],
        });
      }
    } catch (error) {
      throw new errors.APIError(
        500,
        "PAYMENT_UPDATE_FAILED",
        "Failed to update subscription with payment provider"
      );
    }
  }

  /**
   * Cancel subscription with payment provider
   */
  public async cancelSubscription(
    externalSubscriptionId: string
  ): Promise<void> {
    try {
      // Try Stripe first
      await this.stripe.subscriptions.cancel(externalSubscriptionId);
    } catch (stripeError) {
      // Try PayPal if Stripe fails
      try {
        await this.cancelPayPalSubscription(externalSubscriptionId);
      } catch (paypalError) {
        throw new errors.APIError(
          500,
          "PAYMENT_CANCEL_FAILED",
          "Failed to cancel subscription with payment provider"
        );
      }
    }
  }

  /**
   * Create Stripe subscription
   */
  private async createStripeSubscription(
    subscription: Subscription,
    paymentMethodId?: string
  ): Promise<{ id: string; customerId: string }> {
    try {
      // Create or retrieve customer
      const customer = await this.stripe.customers.create({
        metadata: {
          userId: subscription.userId,
          subscriptionId: subscription.uid,
        },
      });

      // Attach payment method if provided
      if (paymentMethodId) {
        await this.stripe.paymentMethods.attach(paymentMethodId, {
          customer: customer.id,
        });
      }

      // Create subscription
      const stripeSubscription = await this.stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: subscription.plan.stripePriceId!,
          },
        ],
        trial_period_days: subscription.plan.trialDays || undefined,
        expand: ["latest_invoice.payment_intent"],
      });

      return {
        id: stripeSubscription.id,
        customerId: customer.id,
      };
    } catch (error) {
      throw new errors.APIError(
        500,
        "STRIPE_SUBSCRIPTION_FAILED",
        "Failed to create Stripe subscription"
      );
    }
  }

  /**
   * Create PayPal subscription
   */
  private async createPayPalSubscription(
    subscription: Subscription
  ): Promise<{ id: string; customerId: string }> {
    return new Promise((resolve, reject) => {
      const subscriptionData = {
        plan_id: subscription.plan.paypalPlanId!,
        start_time: subscription.currentPeriodStart.toISOString(),
        subscriber: {
          name: {
            given_name: "Customer",
            surname: "Name",
          },
          email_address: "customer@example.com",
        },
        application_context: {
          brand_name: "Your Service",
          locale: "en-US",
          shipping_preference: "NO_SHIPPING",
          user_action: "SUBSCRIBE_NOW",
          payment_method: {
            payer_selected: "PAYPAL",
            payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
          },
          return_url: process.env.PAYPAL_RETURN_URL,
          cancel_url: process.env.PAYPAL_CANCEL_URL,
        },
      };

      paypal.billingPlan.create(subscriptionData, (error, subscription) => {
        if (error) {
          reject(
            new errors.APIError(
              500,
              "PAYPAL_SUBSCRIPTION_FAILED",
              "Failed to create PayPal subscription"
            )
          );
        } else {
          resolve({
            id: subscription.id,
            customerId:
              subscription.subscriber?.subscriber_id || subscription.id,
          });
        }
      });
    });
  }

  /**
   * Cancel PayPal subscription
   */
  private async cancelPayPalSubscription(
    subscriptionId: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      paypal.billingAgreement.cancel(
        subscriptionId,
        { note: "Subscription canceled by user" },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }
}
