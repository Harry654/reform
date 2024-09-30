import React from "react";
import Link from "next/link";
import { XCircle, Home } from "lucide-react";
// import { RefreshCw } from "lucide-react";

export default function PaymentCancelled() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Cancelled
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your payment was not completed. Don&apos;t worry, you haven&apos;t
            been charged.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          {/* <button
            onClick={onRetry}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry Payment
          </button> */}
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
