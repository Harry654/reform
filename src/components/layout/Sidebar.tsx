// components/Sidebar.tsx

import React, { useState } from "react";
import {
  Home,
  FileText,
  Users,
  BarChart,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface Props {
  currentPage:
    | "/dashboard"
    | "/create"
    | "/templates"
    | "/audience"
    | "/analytics"
    | "/settings";
}

const Sidebar: React.FC<Props> = ({ currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } flex flex-col justify-between bg-gray-200 text-gray-900 transition-all duration-300 ease-in-out overflow-y-auto h-screen`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="p-4 flex flex-col items-center">
          <h2 className={`text-2xl font-bold ${isSidebarOpen ? "" : "hidden"}`}>
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
          {[
            {
              icon: <Home className="h-5 w-5 mr-2" />,
              label: "dashboard",
              route: "/dashboard",
            },
            {
              icon: <FileText className="h-5 w-5 mr-2" />,
              label: "new survey",
              route: "/create",
            },
            {
              icon: <FileText className="h-5 w-5 mr-2" />,
              label: "templates",
              route: "/templates",
            },
            {
              icon: <Users className="h-5 w-5 mr-2" />,
              label: "audience",
              route: "/audience",
            },
            {
              icon: <BarChart className="h-5 w-5 mr-2" />,
              label: "analytics",
              route: "/analytics",
            },
            {
              icon: <Settings className="h-5 w-5 mr-2" />,
              label: "settings",
              route: "/settings",
            },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-300 hover:text-black transition-colors mb-2 capitalize ${
                item.route === currentPage ? "bg-gray-300 text-black" : ""
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Account Button */}
      <div className="relative p-4">
        <button
          className="space-x-2 w-full flex items-center px-4 py-2 text-left hover:bg-gray-300 hover:text-black transition-colors"
          onClick={toggleDropdown}
        >
          <Image
            className="h-8 w-8 rounded-full"
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://firebasestorage.googleapis.com/v0/b/reform-a80a2.appspot.com/o/empty_user?.png?alt=media&token=5ad8397a-1e3f-44fd-8143-31972b02f3fd"
            }
            alt={`${user?.firstName}'s profile`}
            width={100}
            height={100}
          />
          {isSidebarOpen && (
            <span className="text-sm font-medium text-gray-700">
              {`${user?.firstName} ${user?.lastName}`}
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute bottom-12 left-0 w-56 bg-white border rounded-lg shadow-lg">
            <div className="p-4">
              <p className="text-sm font-medium">
                {" "}
                {`${user?.firstName} ${user?.lastName}`}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
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
            <button
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-300 hover:text-black"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
