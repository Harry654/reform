import { useAuth } from "@/context/AuthContext";
import { getIntervalAbbreviation } from "@/helpers/getIntervalAbbreviation";
import { createCustomer } from "@/helpers/paystack/createCustomer";
import { TPlan } from "@/types/pricing";
import { CheckCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

interface Props {
  plan: TPlan;
  isMostPopularPlan: boolean;
}
const PricingPlan: React.FC<Props> = ({ plan, isMostPopularPlan }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [subscribing, setSubscribing] = useState<boolean>(false);

  const pathname = usePathname(); // Get the current path, e.g., "/dashboard"
  const searchParams = useSearchParams(); // Get the current query parameters

  // Construct query parameters string
  const params = new URLSearchParams(searchParams);

  // Build the redirect URL: path + query params
  const redirect_url = `${pathname}?${params.toString()}`;

  // Construct the login URL with the redirect_url
  const loginUrl = `/auth/login?redirect_url=${encodeURIComponent(
    redirect_url
  )}&${params.toString()}`;

  const initializeTransaction = async (plan: TPlan) => {
    if (subscribing) return;
    if (!user) return router.push(loginUrl);

    try {
      setSubscribing(true);

      if (!user.paystack_id)
        await createCustomer(
          user.uid,
          user.email,
          user.firstName,
          user.lastName
        );

      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          amount: plan.amount,
          plan: plan.plan_code,
        }),
      });

      const { data } = await response.json();
      setSubscribing(false);
      if (response.ok) router.push(data.authorization_url);
    } catch (error) {
      setSubscribing(false);
      console.log(error);
    }
  };

  return (
    <div
      className={`border border-gray-200 rounded-lg p-6 shadow-lg text-black`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-bold mb-2 capitalize">{plan.name}</h4>
        <p className="text-xl italic mb-4">{`${plan.currency} ${
          plan.amount / 100
        }${getIntervalAbbreviation(plan.interval)}`}</p>
      </div>
      {isMostPopularPlan && (
        <p className="text-blue-500 font-semibold">Most Popular</p>
      )}
      {plan.description && (
        <ul className="space-y-2 my-4 text-left">
          {JSON.parse(plan.description).map(
            (feature: string, index: number) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                {feature}
              </li>
            )
          )}
        </ul>
      )}
      {user?.subscriptionPlan !== plan.name ? (
        <button
          className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            subscribing && "opacity-70"
          }`}
          onClick={() => initializeTransaction(plan)}
          disabled={subscribing}
        >
          {!subscribing ? (
            "Select Plan"
          ) : (
            <BeatLoader color="#ffffff" size={10} />
          )}
        </button>
      ) : (
        <button
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-md opacity-70 italic"
          disabled={true}
        >
          Current Plan
        </button>
      )}
    </div>
  );
};

export default PricingPlan;
