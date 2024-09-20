import React from "react";

const FullPageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        {/* <h2 className="mt-4 text-2xl font-semibold text-white">Loading...</h2>
        <div className="mt-2 text-white text-opacity-80 animate-pulse">
          Please wait while we prepare your experience
        </div> */}
      </div>
    </div>
  );
};

export default FullPageLoader;
