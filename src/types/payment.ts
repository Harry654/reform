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
  code: string | null; // code for the subscription plan
  token: string | null; // email token for the subscription plan
  status:
    | "active"
    | "non-renewing"
    | "attention"
    | "completed"
    | "cancelled"
    | null; // Status of the subscription
  startDate: Date | null; // Start date of the subscription
  paymentMethod: string | null; // Payment method used
  plan: {
    code: string;
    name: "free" | "basic" | "pro" | "enterprise"; // name of the subscription plan
  };
};
