// components/Sidebar.tsx

import React, { useState } from "react";
import { Home, FileText, Users, BarChart, Settings, LogOut, ChevronDown } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-64' : 'w-20'
      } flex flex-col justify-between bg-gray-200 text-gray-900 transition-all duration-300 ease-in-out overflow-y-auto h-screen`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="p-4 flex flex-col items-center">
          <h2 className={`text-2xl font-bold ${isSidebarOpen ? '' : 'hidden'}`}>Reform</h2>
          <button
            className="mt-4 p-2 rounded-full hover:bg-gray-300"
            onClick={toggleSidebar}
          >
            <ChevronDown
              className={`h-6 w-6 transition-transform ${
                isSidebarOpen ? 'rotate-0' : '-rotate-90'
              }`}
            />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-8">
          {[
            { icon: <Home className="h-5 w-5 mr-2" />, label: 'Dashboard' },
            { icon: <FileText className="h-5 w-5 mr-2" />, label: 'Surveys' },
            { icon: <Users className="h-5 w-5 mr-2" />, label: 'Audience' },
            { icon: <BarChart className="h-5 w-5 mr-2" />, label: 'Analytics' },
            { icon: <Settings className="h-5 w-5 mr-2" />, label: 'Settings' },
          ].map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-300 hover:text-black transition-colors mb-2 ${
                item.label === 'Surveys' ? 'bg-gray-300 text-black' : ''
              }`}
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
  );
};

export default Sidebar;
