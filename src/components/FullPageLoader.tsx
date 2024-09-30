import { Loader } from "lucide-react";
import React from "react";

const FullPageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 z-50">
      <div className="text-center">
        <div className="animate-spin-alternate">
          <Loader color="#ffffff" size={80} />
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
