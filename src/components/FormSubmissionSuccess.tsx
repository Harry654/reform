import React from "react";
import Link from "next/link";
import { CheckCircle, RefreshCw } from "lucide-react";

interface FormSubmissionSuccessProps {
  allowMultipleSubmissions: boolean;
  successMessage: string;
}

export default function FormSubmissionSuccess({
  allowMultipleSubmissions = false,
  successMessage,
}: FormSubmissionSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Submission Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {successMessage || "Thank you for completing the form"}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          {allowMultipleSubmissions && (
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Submit Another Response
            </button>
          )}
          <Link
            href="/"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
