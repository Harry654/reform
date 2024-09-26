"use client";

import React from "react";
import Navbar from "./NavBar";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

interface FrameProps {
  children: React.ReactNode;
}

const Frame: React.FC<FrameProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Navbar />
      <div className="flex h-screen bg-white text-black">
        {/* Sidebar */}
        <Sidebar currentPage={pathname} />

        {/* Main content */}
        <main className="flex-1 overflow-hidden relative">
          {/* Dashboard content */}
          <div className="p-8 overflow-auto h-[calc(100dvh-3.5rem)] no-scrollbar">
            {children}
          </div>

          {/* Support button */}
          <Link href="/support" passHref>
            <button
              className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex gap-2"
              aria-label="Get Support"
            >
              <HelpCircle size={24} />
              Support
            </button>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Frame;
