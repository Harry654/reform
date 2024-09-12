"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="container mx-auto px-4 py-8 text-black border">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Reform</h1>
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
          <div>
            <Link
              href="/auth/login"
              className="mr-2 px-4 py-2 bg-transparent border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
