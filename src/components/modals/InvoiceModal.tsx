import React from "react";
import { TPayment } from "@/types/payment";
import { usePathname, useRouter } from "next/navigation";
import { formatCurrency } from "@/helpers/formatCurrency";

interface InvoiceModalProps {
  selectedPayment: TPayment;
  formatDate: (date: Date) => string;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  selectedPayment,
  formatDate,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleCloseModal = () => {
    router.push(pathname);
  };

  return (
    <div
      className="fixed z-50 inset-0 overflow-y-auto"
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Invoice Details
                </h3>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">
                        Payment Reference
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {selectedPayment.reference}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">
                        Date
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {formatDate(new Date(selectedPayment.created_at))}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">
                        Subtotal
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {formatCurrency(
                          selectedPayment.amount / 100,
                          selectedPayment.currency
                        )}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Tax</dt>
                      <dd className="text-sm text-gray-900">
                        {formatCurrency(0, selectedPayment.currency)}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-bold text-gray-900">Total</dt>
                      <dd className="text-sm font-bold text-gray-900">
                        {formatCurrency(
                          selectedPayment.amount / 100,
                          selectedPayment.currency
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
