import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CirclePlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getDateISO } from "@/helpers/getDateISO";
import { formatDate } from "@/helpers/formatDate";

interface Props {
  isOpen: boolean;
  // newPlan: TPlan;
  handleUpgrade: () => void;
  handleCloseModal: () => void;
}

const UpgradeModal: React.FC<Props> = ({
  isOpen,
  // newPlan,
  handleUpgrade,
  handleCloseModal,
}) => {
  const { user } = useAuth();
  const twoWeeksFreeApplicable = user?.subscription.status === null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleCloseModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CirclePlus
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Upgrade Plan
                      </Dialog.Title>
                      <div className="mt-2">
                        {twoWeeksFreeApplicable ? (
                          <>
                            <p className="text-sm text-gray-500">
                              {/* You are about to upgrade to the {newPlan.name}{" "} */}
                              You are about to upgrade to a higher plan
                            </p>
                            <p className="text-sm text-gray-500">
                              You will be charged{" "}
                              {/* {formatCurrency(newPlan.amount, "NGN")} monthly */}
                              starting from {formatDate(getDateISO(14))}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500">
                            {/* You are about to upgrade to the {newPlan.name} plan */}
                            You are about to upgrade to a higher plan
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleUpgrade}
                  >
                    {twoWeeksFreeApplicable
                      ? "Stary My 14 Days Free Trial"
                      : "Proceed"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpgradeModal;
