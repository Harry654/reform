"use client";

import { useAuth } from "@/context/AuthContext";
import React from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const handleSignIn = () => alert("Sign in");

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
                  {user.displayName}
                </span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.photoURL ? user.photoURL : undefined}
                  alt={`${user.displayName}'s profile`}
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
