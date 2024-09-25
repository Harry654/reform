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
