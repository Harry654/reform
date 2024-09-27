import { TSubscription } from "@/types/payment";
import { TPlan } from "@/types/plans";

export const freeSubscriptionPlan: TSubscription = {
  code: null,
  token: null,
  status: null,
  startDate: new Date(),
  paymentMethod: null,
  plan: {
    code: "free",
    name: "free",
  },
};

export const cancelledSubscriptionPlan: TSubscription = {
  code: null,
  token: null,
  status: "cancelled",
  startDate: new Date(),
  paymentMethod: null,
  plan: {
    code: "free",
    name: "free",
  },
};

export const freePlan: TPlan = {
  name: "free",
  plan_code: "free",
  amount: 0,
  interval: "monthly",
  currency: "NGN",
  description: JSON.stringify([
    "Up to 15 survey responses per survey",
    "Access to basic survey templates",
    "Simple question types",
    "Basic survey analytics",
    "Email support",
    "Custom branding (limited)",
  ]),
  active_subscriptions: 0,
};
