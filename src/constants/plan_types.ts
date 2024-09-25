import { TSubscription } from "@/types/payment";

export const freeSubscriptionPlan: TSubscription = {
  subscriptionCode: null,
  subscriptionStatus: null,
  subscriptionStartDate: new Date(),
  paymentMethod: null,
  plan: {
    code: null,
    name: "free",
  },
};

export const cancelledSubscriptionPlan: TSubscription = {
  subscriptionCode: null,
  subscriptionStatus: "cancelled",
  subscriptionStartDate: new Date(),
  paymentMethod: null,
  plan: {
    code: null,
    name: "free",
  },
};
