"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  BarChart,
  PieChart,
  Activity,
  Users,
  FileText,
  Settings,
  LogOut,
  Home,
  ChevronDown,
} from "lucide-react";

// Assuming you have a type for Survey
interface Survey {
  id: string;
  title: string;
  createdAt: string;
  responsesCount: number;
}

// Mock function to fetch surveys (replace with actual API call)
const fetchSurveys = async (userId: string): Promise<Survey[]> => {
  console.log(userId);
  // This should be replaced with an actual API call
  return [
    {
      id: "1",
      title: "Customer Satisfaction Survey",
      createdAt: "2023-06-01",
      responsesCount: 150,
    },
    {
      id: "2",
      title: "Employee Engagement Survey",
      createdAt: "2023-06-15",
      responsesCount: 75,
    },
    {
      id: "3",
      title: "Product Feedback Survey",
      createdAt: "2023-06-30",
      responsesCount: 200,
    },
  ];
};

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const loadSurveys = async () => {
      // Replace 'user123' with actual user ID from authentication
      const userSurveys = await fetchSurveys("user123");
      setSurveys(userSurveys);
    };

    loadSurveys();
  }, []);

  const navItems = [
    { icon: <Home className="h-5 w-5 mr-2" />, label: "Dashboard" },
    { icon: <FileText className="h-5 w-5 mr-2" />, label: "Surveys" },
    { icon: <Users className="h-5 w-5 mr-2" />, label: "Audience" },
    { icon: <BarChart className="h-5 w-5 mr-2" />, label: "Analytics" },
    { icon: <Settings className="h-5 w-5 mr-2" />, label: "Settings" },
  ];

  const dashboardItems = [
    {
      title: "Active Surveys",
      value: surveys.length.toString(),
      buttonText: "View All",
    },
    {
      title: "Total Responses",
      value: surveys
        .reduce((sum, survey) => sum + survey.responsesCount, 0)
        .toString(),
      buttonText: "Analyze",
    },
    {
      title: "Real-Time Insights",
      icon: <Activity className="w-16 h-16 text-blue-500" />,
      buttonText: "View Insights",
    },
  ];

  const buttonsSectionItems = [
    { icon: <BarChart className="w-8 h-8 mb-2" />, label: "Data Analysis" },
    { icon: <PieChart className="w-8 h-8 mb-2" />, label: "Visualizations" },
    { icon: <Users className="w-8 h-8 mb-2" />, label: "User Segmentation" },
    { icon: <FileText className="w-8 h-8 mb-2" />, label: "Survey Templates" },
  ];

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } flex flex-col justify-between bg-gray-200 text-gray-900 transition-all duration-300 ease-in-out`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-4 flex flex-col items-center">
            <h2
              className={`text-2xl font-bold ${isSidebarOpen ? "" : "hidden"}`}
            >
              Reform
            </h2>
            <button
              className="mt-4 p-2 rounded-full hover:bg-gray-300"
              onClick={toggleSidebar}
            >
              <ChevronDown
                className={`h-6 w-6 transition-transform ${
                  isSidebarOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-300 hover:text-black transition-colors mb-2"
              >
                {item.icon}
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Account Button */}
        <div className="relative p-4">
          <button
            className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-300 hover:text-black transition-colors"
            onClick={toggleDropdown}
          >
            <img
              src="/avatars/01.png"
              alt="@username"
              className="h-8 w-8 rounded-full mr-2"
            />
            {isSidebarOpen && <span>John Doe</span>}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute bottom-12 left-0 w-56 bg-white border rounded-lg shadow-lg">
              <div className="p-4">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              <hr />
              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-300 hover:text-black">
                <Settings className="mr-2 h-4 w-4" />
                Account settings
              </button>
              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-300 hover:text-black">
                <Settings className="mr-2 h-4 w-4" />
                AI settings
              </button>
              <hr />
              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-300 hover:text-black">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        {/* Dashboard content */}
        <div className="p-8 overflow-auto h-[calc(100vh-5rem)]">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white"
              >
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                {item.value ? (
                  <div className="text-3xl font-bold">{item.value}</div>
                ) : (
                  item.icon
                )}
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-black">
                  {item.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Surveys Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Surveys</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => router.push(`/survey/${survey.id}`)}
                >
                  <h3 className="text-lg font-semibold mb-2">{survey.title}</h3>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(survey.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Responses: {survey.responsesCount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {buttonsSectionItems.map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center h-24 px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-black"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
