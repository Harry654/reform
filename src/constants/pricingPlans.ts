import { TPricingPlan } from "@/types/pricing";

export const pricingPlans: TPricingPlan[] = [
  {
    title: "basic",
    priceLabel: "₦2000/mo",
    price: 2000,
    features: ["100 survey responses/mo", "Basic AI features", "Email support"],
  },
  {
    title: "pro",
    priceLabel: "₦3500/mo",
    price: 3500,
    features: [
      "1000 survey responses/mo",
      "Advanced AI analysis",
      "Priority support",
    ],
  },
  {
    title: "enterprise",
    priceLabel: "₦5000/mo",
    price: 5000,
    features: [
      "Unlimited responses",
      "Custom AI model",
      "Dedicated account manager",
    ],
  },
];
