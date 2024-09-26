import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/helpers/formatCurrency";
import { getIntervalAbbreviation } from "@/helpers/getIntervalAbbreviation";
import { getDateISO } from "@/helpers/getDateISO";
import { cancelSubscription } from "@/helpers/paystack/cancelSubscription";
import { createCustomer } from "@/helpers/paystack/createCustomer";
import { TPlan } from "@/types/plans";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

interface Props {
  plan: TPlan;
  plans: TPlan[];
  isMostPopularPlan: boolean;
}
const PricingPlan: React.FC<Props> = ({ plan, plans, isMostPopularPlan }) => {
  const { user, loginUrl } = useAuth();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const twoWeeksFreeApplicable = user?.subscription.subscriptionStatus === null;

  const subscribeToPlan = async (plan: TPlan) => {
    if (subscribing) return;
    if (plan.name === user?.subscription.plan.name) return;
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

        const subscriptionData = {
          uid: user.uid,
          email: user.email,
          amount: plan.amount,
          plan: plan.plan_code,
          start_date: getTwoWeeksFromNowUTC(),
        }

      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      const { data } = await response.json();
      setSubscribing(false);

      // console.log(getTwoWeeksFromNowUTC());
      if (response.ok) router.push(data.authorization_url);
    } catch (error) {
      setSubscribing(false);
      console.log(error);
    }
  };

  const isDowngrade = (plan: TPlan): boolean => {
    const plansInOrder: string[] = ["free", ...plans.map((plan) => plan.name)];

    const indexOfCurrentPlan = plansInOrder.indexOf(
      user?.subscription.plan.name || "free"
    );
    const indexOfNewPlan = plansInOrder.indexOf(plan.name);

    return indexOfNewPlan < indexOfCurrentPlan;
  };

  const handleConfirmDowngrade = async () => {
    if (!user) return;
    try {
      await cancelSubscription(user.subscription.subscriptionCode || "", "");
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          className={`w-full max-w-96 border border-gray-200 rounded-lg p-6 shadow-lg text-black`}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold mb-2 capitalize">{plan.name}</h4>
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
                if (isDowngrade(plan)) return setShowModal(true);
                subscribeToPlan(plan);
              }}
              disabled={subscribing}
            >
              {!subscribing ? (
                twoWeeksFreeApplicable ? (
                  `TRY FOR ${formatCurrency(0, "NGN")}`
                ) : (
                  "Select Plan"
                )
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
      </div>

      {showModal && (
        <div
          className="absolute z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <AlertTriangle
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Downgrade Plan
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to downgrade your plan? The features
                      of the {user?.subscription.plan.name} plan will still be
                      available until the end of your subscription date .
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleConfirmDowngrade()}
                >
                  Downgrade Plan
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Keep Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPlan;
