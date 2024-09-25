export type TPayment = {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  reference: string;
  channel: string;
  authorization: {
    last4: string;
  };
};

export type TSubscription = {
  subscriptionCode: string | null; // code for the subscription plan
  subscriptionStatus:
    | "active"
    | "non-renewing"
    | "attention"
    | "completed"
    | "cancelled"
    | null; // Status of the subscription
  subscriptionStartDate: Date | null; // Start date of the subscription
  paymentMethod: string | null; // Payment method used
  plan: {
    code: string | null;
    name: "free" | "basic" | "pro" | "enterprise" | null; // name of the subscription plan
  };
};
