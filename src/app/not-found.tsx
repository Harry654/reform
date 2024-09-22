import React, { Suspense } from "react";
import Link from "next/link";
import FullPageLoader from "@/components/FullPageLoader";

const NotFoundPage: React.FC = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Oops! Page not found.</p>
        <Link
          href="/"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </Suspense>
  );
};

export default NotFoundPage;
