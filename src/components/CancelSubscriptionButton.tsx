import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { AlertTriangle, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { TSubscription } from "@/types/payment";
import { cancelSubscription } from "@/helpers/paystack/cancelSubscription";

interface handleCancelSubscriptionButtonProps {
  currentSubscription:
    | (TSubscription & { nextPaymentDate: Date; email_token: string })
    | null;
  onCancel: () => void;
}

export default function handleCancelSubscriptionButton({
  currentSubscription,
  onCancel,
}: handleCancelSubscriptionButtonProps) {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [subscriptionCancelling, setSubscriptionCancelling] =
    useState<boolean>(false);

  const isUserOnFreePlan = user?.subscription.plan.name === "free";
  const canhandleCancelSubscription =
    !isUserOnFreePlan && user?.subscription.subscriptionStatus === "active";

  const handleCancelClick = () => {
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    if (currentSubscription) {
      handleCancelSubscription(
        currentSubscription.subscriptionCode || "",
        currentSubscription.email_token
      );
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Cancel subscription
  const handleCancelSubscription = async (code: string, token: string) => {
    if (!code || !token) return;

    setSubscriptionCancelling(true);
    try {
      cancelSubscription(code, token);

      // run cancel callback
      onCancel();

      setSubscriptionCancelling(false);
    } catch (error) {
      setSubscriptionCancelling(false);
    }
  };

  if (user?.subscription.plan.name === "free" || !currentSubscription) {
    return null;
  }

  return (
    <>
      <button
        className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
          (!canhandleCancelSubscription || subscriptionCancelling) &&
          "opacity-50"
        }`}
        disabled={!canhandleCancelSubscription || subscriptionCancelling}
        onClick={handleCancelClick}
      >
        {!subscriptionCancelling ? (
          "Cancel Subscription"
        ) : (
          <BeatLoader color="gray" size={10} />
        )}
      </button>

      {showModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
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
                    Cancel Subscription
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to cancel your subscription? The
                      features of the {user?.subscription.plan.name} plan will
                      still be available until{" "}
                      {new Date(
                        currentSubscription.nextPaymentDate
                      ).toLocaleDateString()}
                      .
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleConfirmCancel}
                >
                  Confirm Cancellation
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
    </>
  );
}
