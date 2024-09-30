"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { CreditCard, AlertCircle } from "lucide-react";
import Link from "next/link";
import Frame from "@/components/layout/Frame";

interface PaymentHistory {
  id: string;
  date: Date;
  amount: number;
  cardLastFour: string;
  periodStart: Date;
  periodEnd: Date;
}

export default function Billing() {
  const { user } = useAuth();
  const [paymentHistory, setPaymentHistory] = React.useState<PaymentHistory[]>(
    []
  );

  // Fetch payment history
  React.useEffect(() => {
    // Replace this with your actual API call
    const fetchPaymentHistory = async () => {
      // Simulated API call
      const history = [
        {
          id: "1",
          date: new Date("2023-05-01"),
          amount: 29.99,
          cardLastFour: "4242",
          periodStart: new Date("2023-05-01"),
          periodEnd: new Date("2023-06-01"),
        },
        {
          id: "2",
          date: new Date("2023-04-01"),
          amount: 29.99,
          cardLastFour: "4242",
          periodStart: new Date("2023-04-01"),
          periodEnd: new Date("2023-05-01"),
        },
      ];
      setPaymentHistory(history);
    };

    fetchPaymentHistory();
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Frame>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Manage Subscription
          </h1>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Current Subscription
              </h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Plan</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.subscriptionPlan || "No active plan"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.subscriptionStatus}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Next billing date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.subscriptionStartDate
                      ? formatDate(
                          new Date(
                            user?.subscriptionStartDate.toDate().getTime() +
                              30 * 24 * 60 * 60 * 1000
                          )
                        )
                      : "N/A"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <Link
              href="/plans"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Change Plan
            </Link>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Cancel Membership
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Payment History
              </h2>
            </div>
            <div className="border-t border-gray-200">
              {paymentHistory.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {paymentHistory.map((payment) => (
                    <li key={payment.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <CreditCard className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(payment.amount)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(payment.date)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 text-sm text-gray-500">
                            <span className="font-medium">Card:</span> ••••{" "}
                            {payment.cardLastFour}
                          </div>
                          <Link
                            href={`/invoice/${payment.id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            View Invoice
                          </Link>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Period: {formatDate(payment.periodStart)} -{" "}
                        {formatDate(payment.periodEnd)}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-5 sm:px-6 text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No payment history
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven&apos;t made any payments yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
