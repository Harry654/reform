"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TFirestoreUser } from "@/types/user";
import { Timestamp } from "firebase/firestore";
import Sidebar from "@/components/layout/Sidebar";

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<TFirestoreUser>>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    photoURL: user?.photoURL,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      photoURL: user?.photoURL,
    });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (timestamp: Timestamp | null | undefined) => {
    if (!timestamp) return "N/A";
    return timestamp.toDate().toLocaleDateString();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white text-black">
      {/* Sidebar */}
      <Sidebar currentPage="/profile" />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-blue-600 text-white">
            <h1 className="text-2xl font-bold">User Profile</h1>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Image
                  src={
                    editedUser?.photoURL ||
                    "https://firebasestorage.googleapis.com/v0/b/reform-a80a2.appspot.com/o/empty_user.png?alt=media&token=5ad8397a-1e3f-44fd-8143-31972b02f3fd"
                  }
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full"
                  priority={true}
                />
                {isEditing && (
                  <div className="flex items-center">
                    <Camera className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      name="photoURL"
                      value={editedUser?.photoURL || ""}
                      onChange={handleChange}
                      placeholder="Enter photo URL"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={editedUser?.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {user?.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={editedUser?.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {user?.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={editedUser?.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Subscription Plan:
                  </span>
                  <span className="ml-2 text-sm text-gray-900 capitalize">
                    {user?.subscriptionPlan || "No active plan"}
                  </span>
                </div>
                <Link
                  href="/billing"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Manage Subscription
                </Link>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Subscription Status:
                </span>
                <span className="ml-2 text-sm text-gray-900 capitalize">
                  {user?.subscriptionStatus}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Member Since:
                </span>
                <span className="ml-2 text-sm text-gray-900">
                  {formatDate(user?.createdAt)}
                </span>
              </div>
            </div>
            <div className="mt-6">
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
