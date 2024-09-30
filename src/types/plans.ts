export type TPlan = {
  name: string;
  plan_code: string;
  amount: number;
  interval: string;
  currency: string;
  description?: string | null;
  active_subscriptions: number;
};
