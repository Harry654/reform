import { TPricingPlan } from "@/types/pricing";
import { CheckCircle } from "lucide-react";
import React from "react";

interface Props {
  plan: TPricingPlan;
}
const PricingPlan: React.FC<Props> = ({ plan }) => {
  return (
    <div
      className={`border border-gray-200 rounded-lg p-6 shadow-lg text-black`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-bold mb-2">{plan.title}</h4>
        <p className="text-xl  mb-4">{plan.priceLabel}</p>
      </div>
      {/* {index === 1 && (
        <p className="text-blue-500 font-semibold">Most Popular</p>
      )} */}
      <ul className="space-y-2 my-4 text-left">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Select Plan
      </button>
    </div>
  );
};

export default PricingPlan;
