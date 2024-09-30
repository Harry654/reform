"use client";

import Navbar from "./NavBar";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

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
        <main className="flex-1 overflow-hidden">
          {/* Dashboard content */}
          <div className="p-8 overflow-auto h-[calc(100vh-3.5rem)] no-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Frame;
