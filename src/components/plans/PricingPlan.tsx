import React from "react";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/helpers/formatCurrency";
import { getIntervalAbbreviation } from "@/helpers/getIntervalAbbreviation";
import { TPlan } from "@/types/plans";
import { CheckCircle } from "lucide-react";
import { BeatLoader } from "react-spinners";

interface Props {
  plan: TPlan;
  isMostPopularPlan: boolean;
  subscribing: boolean;
  newPlan: TPlan | null;
  handleSelectPlan: (plan: TPlan) => void;
}
const PricingPlan: React.FC<Props> = ({
  plan,
  isMostPopularPlan,
  subscribing,
  newPlan,
  handleSelectPlan,
}) => {
  const { user } = useAuth();

  const twoWeeksFreeApplicable = user?.subscription.status === null;

  return (
    <>
      <div className="w-96 max-w-screen-sm">
        <div className="flex justify-center">
          <div
            className={`w-full border border-gray-200 rounded-lg p-6 shadow-lg text-black`}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-bold mb-2 capitalize">
                {plan.name}
              </h4>
              <p className="text-lg italic mb-4">{` ${formatCurrency(
                plan.amount / 100,
                plan.currency
              )}${getIntervalAbbreviation(plan.interval)}`}</p>
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
            {user?.subscription.plan.name !== plan.name ? (
              <button
                className={`w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
                  subscribing && "opacity-70"
                }`}
                onClick={() => {
                  handleSelectPlan(plan);
                }}
                disabled={subscribing}
              >
                {subscribing && newPlan?.name === plan.name ? (
                  <BeatLoader color="#ffffff" size={10} />
                ) : twoWeeksFreeApplicable ? (
                  `TRY FOR ${formatCurrency(0, "NGN")}`
                ) : (
                  "Select Plan"
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
        </div>
      </div>
    </>
  );
};

export default PricingPlan;
