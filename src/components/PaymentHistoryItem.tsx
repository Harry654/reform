import React from "react";
import { CreditCard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { TPayment } from "@/types/payment";

interface PaymentHistoryItemProps {
  payment: TPayment;
  formatCurrency: (amount: number, currency: string) => string;
  formatDate: (date: Date) => string;
}

const PaymentHistoryItem: React.FC<PaymentHistoryItemProps> = ({
  payment,
  formatCurrency,
  formatDate,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleViewInvoice = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`${pathname}?action=show_invoice&paymentId=${payment.id}`);
  };

  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CreditCard className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {formatCurrency(payment.amount / 100, payment.currency)}
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(new Date(payment.created_at))}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {payment.authorization.last4 && (
            <div className="mr-4 text-sm text-gray-500">
              <span className="font-medium">Card:</span> ••••{" "}
              {payment.authorization.last4}
            </div>
          )}
          <button
            onClick={handleViewInvoice}
            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Invoice
          </button>
        </div>
      </div>
    </li>
  );
};

export default PaymentHistoryItem;
