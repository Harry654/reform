import { freePlan, freeSubscriptionPlan } from "@/constants/plan_types";
import { getDateISO } from "../getDateISO";
import { updateUserSubscription } from "../firebase/updateUserSubscription";

export const createSubscription = async (
  uid: string,
  customer_code: string,
  plan_code: string,
  authorization: string,
  start_date: string = getDateISO(0)
) => {
  try {
    if (plan_code === freePlan.plan_code)
      return updateUserSubscription(uid, freeSubscriptionPlan);

    if (!uid || !customer_code || !plan_code || !authorization) return;

    const subscriptionData = {
      uid,
      customer: customer_code,
      plan: plan_code,
      authorization,
      start_date,
    };

    const response = await fetch("/api/paystack/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
