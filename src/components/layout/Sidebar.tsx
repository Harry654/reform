import React, { useState } from "react";
import { Settings, ChevronDown, Leaf } from "lucide-react";
import Link from "next/link";
import sideNavs from "@/constants/sideNavs";
import { useAuth } from "@/context/AuthContext";

interface Props {
  currentPage: string;
}

const Sidebar: React.FC<Props> = ({ currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? "w-52" : "w-12"
        } h-[calc(100dvh-3.5rem)] flex flex-col justify-between bg-[#121211] text-gray-900 transition-all duration-300 ease-in-out overflow-y-auto divide-y-2 space-y-5 divide-gray-800 px-2`}
      />
      <aside
        className={`${
          isSidebarOpen ? "w-52" : "w-12"
        } h-[calc(100dvh-3.5rem)] flex flex-col justify-between bg-[#121211] text-gray-900 transition-all duration-300 ease-in-out overflow-y-auto fixed divide-y-2 space-y-5 divide-gray-800 px-2`}
      >
        <div
          className={`w-full flex ${
            isSidebarOpen ? "justify-end" : "justify-center"
          }`}
        >
          <div className="w-full flex justify-between items-center">
            {user?.subscription.plan.name && (
              <p
                className={`w-full flex items-center rounded-full text-left text-sm capitalize text-green-500 ${
                  !isSidebarOpen && "hidden"
                }  mx-auto  ps-4`}
              >
                <Leaf className="h-5 w-5 mr-2" />
                {user?.subscription.plan.name} Plan
              </p>
            )}

            {/* Sidebar Toggle */}
            <button className="rounded-full" onClick={toggleSidebar}>
              <ChevronDown
                className={`h-6 w-6 transition-transform ${
                  isSidebarOpen ? "rotate-90" : "-rotate-90"
                }`}
                color="#ffffff"
              />
            </button>
          </div>
        </div>
        <div className="overflow-y-scroll border-t-2 border-gray-800 flex-grow custom-scrollbar">
          {/* Sidebar Navigation */}
          <nav className="space-y-2 py-2">
            {sideNavs.map((item, index) => (
              <Link
                key={index}
                href={item.active ? item.route : "#"}
                className={`w-full flex items-center gap-2 py-2 text-left text-sm hover:bg-gray-800 duration-500 capitalize ${
                  item.route === currentPage
                    ? "font-bold text-white bg-gray-800"
                    : "text-slate-400"
                } ${
                  isSidebarOpen
                    ? "justify-start ps-4 rounded-full"
                    : "justify-center rounded-lg"
                } ${!item.active && "opacity-30"} mx-auto`}
              >
                {item.icon}
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Settings Button */}
        <Link
          href={"/settings"}
          className={`w-full flex items-center gap-2 py-2 text-left text-sm hover:bg-gray-800 duration-500 capitalize ${
            "/settings" === currentPage
              ? "font-bold text-white bg-gray-800"
              : "text-slate-400"
          } ${
            isSidebarOpen
              ? "justify-start ps-4 rounded-full"
              : "justify-center rounded-lg"
          } mx-auto`}
        >
          <Settings className="h-5 w-5" />
          {isSidebarOpen && <span>Settings</span>}
        </Link>
      </aside>
    </>
  );
};

export default Sidebar;
