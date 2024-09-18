import React from "react";

interface TabNavigationProps {
  activeTab: "survey" | "responses";
  setActiveTab: (tab: "survey" | "responses") => void;
  responseCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  responseCount,
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex" aria-label="Tabs">
        <button
          onClick={() => setActiveTab("survey")}
          className={`${
            activeTab === "survey"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Survey
        </button>
        <button
          onClick={() => setActiveTab("responses")}
          className={`${
            activeTab === "responses"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8 flex items-center`}
        >
          Responses
          <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
            {responseCount}
          </span>
        </button>
      </nav>
    </div>
  );
};

export default TabNavigation;
