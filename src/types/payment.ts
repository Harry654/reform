export type TPayment = {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  reference: string;
  authorization: {
    last4: string;
  };
  // periodStart: Date;
  // periodEnd: Date;
};
