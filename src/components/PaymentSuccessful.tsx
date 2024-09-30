import React from "react";
import Link from "next/link";
import { CheckCircle, FileText, Home } from "lucide-react";

interface PaymentSuccessfulProps {
  amount: string;
  orderId: string;
}

export default function PaymentSuccessful({
  amount,
  orderId,
}: PaymentSuccessfulProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Successful
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your payment of {amount}. Your order ID is {orderId}.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            href="/order-details"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FileText className="mr-2 h-4 w-4" />
            View Order Details
          </Link>
          <Link
            href="/"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
