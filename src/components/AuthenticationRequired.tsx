import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

interface AuthenticationRequiredProps {
  loginUrl: string;
  signupUrl: string;
}

const AuthenticationRequired: React.FC<AuthenticationRequiredProps> = ({
  loginUrl,
  signupUrl,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Lock className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authentication Required
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You need to be logged in to access this form.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Link
            href={loginUrl}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log In
          </Link>
          <div className="text-sm">
            <Link
              href={signupUrl}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationRequired;
