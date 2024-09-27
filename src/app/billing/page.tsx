"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import Frame from "@/components/layout/Frame";
import { FadeLoader } from "react-spinners";
import PaymentHistoryItem from "@/components/PaymentHistoryItem";
import { TPayment, TSubscription } from "@/types/payment";
import { useSearchParams } from "next/navigation";
import InvoiceModal from "@/components/modals/InvoiceModal";
import CancelSubscriptionButton from "@/components/CancelSubscriptionButton";
import { fetchSubscription } from "@/helpers/paystack/fetchSubscription";

export default function Billing() {
  const { user } = useAuth();
  const [currentSubscription, setCurrentSubscription] = useState<
    (TSubscription & { next_payment_date: string }) | null
  >(null);
  const [subscriptionLoading, setSubscriptionLoading] =
    useState<boolean>(false);
  const [paymentHistory, setPaymentHistory] = useState<TPayment[]>([]);
  const [paymentHistoryLoading, setPaymentHistoryLoading] =
    useState<boolean>(false);

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<TPayment | null>(null);
  const [error, setError] = useState<string>("");

  const searchParams = useSearchParams(); // Get the current query parameters
  // Construct query parameters string
  const params = new URLSearchParams(searchParams);

  // Fetch current subscription plan
  const fetchCurrentSubscription = async () => {
    setSubscriptionLoading(true);
    try {
      if (user?.subscription.code === "free") return;

      const response = await fetchSubscription(user?.subscription.code || "");
      const data = response?.data;
      if (!data) return;

      setCurrentSubscription({
        code: data.subscription_code,
        token: data.email_token,
        status: data.status,
        startDate: new Date(data.createdAt),
        paymentMethod: data.authorization.channel,
        plan: {
          code: data.plan.plan_code,
          name: data.plan.name,
        },
        next_payment_date: data.next_payment_date,
      });

      setSubscriptionLoading(false);
    } catch (error) {
      // setError("Error fetching current subscription");
      setSubscriptionLoading(false);
    }
  };

  // Fetch payment history
  const fetchPaymentHistory = async () => {
    setPaymentHistoryLoading(true);
    try {
      const response = await fetch("/api/paystack/fetch-payment-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: user?.paystack_id,
        }),
      });

      const { data } = await response.json();
      const paymentHistory = data as TPayment[];

      // console.log(paymentHistory);
      setPaymentHistory(paymentHistory);
      setPaymentHistoryLoading(false);
    } catch (error) {
      setError("Error fetching payment history");
      setPaymentHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentSubscription();
  }, []);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  useEffect(() => {
    const action = searchParams.get("action");
    const paymentId = searchParams.get("paymentId");
    if (action === "show_invoice" && paymentId) {
      const payment = paymentHistory.find((p) => p.id.toString() === paymentId);
      // console.log(payment, action, paymentId, paymentHistory);
      if (payment) {
        setSelectedPayment(payment);
        setShowInvoiceModal(true);
      }
    } else {
      setShowInvoiceModal(false);
      setSelectedPayment(null);
    }
  }, [params.toString(), paymentHistory]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Frame>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Manage Subscription
          </h1>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Current Subscription
                {subscriptionLoading && <FadeLoader color="#000000" />}
              </h2>
            </div>
            {!subscriptionLoading &&
              (currentSubscription ? (
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Plan
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                        {currentSubscription.plan.name || "No active plan"}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                        {currentSubscription.status || "N/A"}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Next billing date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {currentSubscription.next_payment_date
                          ? formatDate(
                              new Date(currentSubscription.next_payment_date)
                            )
                          : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Plan
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                        {user?.subscription.plan.name || "No active plan"}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                        {user?.subscription.status || "N/A"}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Next billing date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        N/A
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
          </div>

          <div className="flex space-x-4 mb-8">
            <Link
              href="/plans"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Change Plan
            </Link>
            <CancelSubscriptionButton
              currentSubscription={currentSubscription}
              onCancel={() => fetchCurrentSubscription()}
            />
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Payment History
              </h2>
            </div>

            {!paymentHistoryLoading ? (
              <div className="border-t border-gray-200">
                {!error ? (
                  paymentHistory.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {paymentHistory.map((payment) => (
                        <PaymentHistoryItem
                          key={payment.id}
                          payment={payment}
                          formatDate={formatDate}
                        />
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
                  )
                ) : (
                  <p className="text-center">{error}</p>
                )}
              </div>
            ) : (
              <div className="border-t border-gray-200 text-center">
                <FadeLoader color="#000000" />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Invoice Modal */}
      {showInvoiceModal && selectedPayment && (
        <InvoiceModal
          selectedPayment={selectedPayment}
          formatDate={formatDate}
        />
      )}
    </Frame>
  );
}
