"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { FileText, Eye, Edit, Trash2, BarChart2 } from "lucide-react";
import Link from "next/link";

interface Survey {
  id: string;
  title: string;
  createdAt: Date;
  responseCount: number;
  status: "draft" | "active" | "closed";
}

export default function UserSurveys() {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/surveys?userId=${user.uid}`);
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.error("Failed to fetch surveys:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveys();
  }, [user]);

  const handleDeleteSurvey = async (surveyId: string) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      try {
        // Replace this with your actual API call
        await fetch(`/api/surveys/${surveyId}`, { method: "DELETE" });
        setSurveys(surveys.filter((survey) => survey.id !== surveyId));
      } catch (error) {
        console.error("Failed to delete survey:", error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Surveys</h1>
          <Link
            href="/create-survey"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FileText className="h-5 w-5 mr-2" />
            Create New Survey
          </Link>
        </div>

        {surveys.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No surveys
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new survey.
            </p>
            <div className="mt-6">
              <Link
                href="/create-survey"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FileText className="h-5 w-5 mr-2" />
                Create New Survey
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {surveys.map((survey) => (
                <li key={survey.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {survey.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            survey.status === "active"
                              ? "bg-green-100 text-green-800"
                              : survey.status === "draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {survey.status.charAt(0).toUpperCase() +
                            survey.status.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <BarChart2 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {survey.responseCount} responses
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Created on{" "}
                          {new Date(survey.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <Link
                        href={`/survey/${survey.id}/responses`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Responses
                      </Link>
                      <Link
                        href={`/survey/${survey.id}/edit`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteSurvey(survey.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
