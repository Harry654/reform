"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, LogOutIcon, MenuIcon, XIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const pathname = usePathname(); // Get the current path, e.g., "/dashboard"
  const searchParams = useSearchParams(); // Get the current query parameters

  // Construct query parameters string
  const params = new URLSearchParams(searchParams);

  // Build the redirect URL: path + query params
  const redirect_url = `${pathname}?${params.toString()}`;

  // Construct the login URL with the redirect_url
  const loginUrl = `/auth/login?redirect_url=${encodeURIComponent(
    redirect_url
  )}&${params.toString()}`;

  // Construct the signup URL with the redirect_url
  const signupUrl = `/auth/signup?redirect_url=${encodeURIComponent(
    redirect_url
  )}&${params.toString()}`;

  return (
    <header className="h-20 text-black bg-[#121211] z-50 sticky top-0">
      <nav className="container px-4 mx-auto h-full w-full flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-white">
          Reform
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <span className="text-sm font-medium text-white">
                  {`${user.firstName} ${user.lastName}`}
                </span>
                <Image
                  className="h-8 w-8 rounded-full"
                  src={
                    user.photoURL ||
                    "https://firebasestorage.googleapis.com/v0/b/reform-a80a2.appspot.com/o/empty_user.png?alt=media&token=5ad8397a-1e3f-44fd-8143-31972b02f3fd"
                  }
                  alt={`${user.firstName}'s profile`}
                  width={32}
                  height={32}
                />
              </button>
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div>
              <Link
                href={loginUrl}
                className="mr-2 px-4 py-2 border text-blue-600 rounded-full bg-blue-100"
              >
                Log In
              </Link>
              <Link
                href={signupUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        {!isOpen && (
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-white focus:outline-none focus:text-white z-50 relative"
              aria-label="toggle menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 md:hidden flex flex-col"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="close menu"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center space-y-8">
              {user ? (
                <>
                  <div className="flex flex-col items-center space-y-4">
                    <Image
                      className="h-20 w-20 rounded-full"
                      src={
                        user.photoURL ||
                        "https://firebasestorage.googleapis.com/v0/b/reform-a80a2.appspot.com/o/empty_user.png?alt=media&token=5ad8397a-1e3f-44fd-8143-31972b02f3fd"
                      }
                      alt={`${user.firstName}'s profile`}
                      width={80}
                      height={80}
                    />
                    <span className="text-xl font-medium text-gray-700">
                      {`${user.firstName} ${user.lastName}`}
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    <UserIcon className="mr-2 h-5 w-5" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center px-4 py-2 rounded-md text-lg font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                  >
                    <LogOutIcon className="mr-2 h-5 w-5" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={loginUrl}
                    className="px-6 py-3 bg-transparent border-2  text-blue-600 rounded-full text-lg font-medium hover:bg-blue-100"
                    onClick={toggleMenu}
                  >
                    Log In
                  </Link>
                  <Link
                    href={signupUrl}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700"
                    onClick={toggleMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
