"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleSignIn = () => router.push("/auth/login");

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800">Reform</span>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  {`${user.firstName} ${user.lastName}`}
                </span>
                <Image
                  className="h-8 w-8 rounded-full"
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://firebasestorage.googleapis.com/v0/b/reform-a80a2.appspot.com/o/empty_user.png?alt=media&token=5ad8397a-1e3f-44fd-8143-31972b02f3fd"
                  }
                  alt={`${user.firstName}'s profile`}
                  width={100}
                  height={100}
                />
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
