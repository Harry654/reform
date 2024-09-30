"use client";

import { useState, useEffect, Suspense } from "react";
import { Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ISurvey } from "@/types/survey";
import { formatTimestampDate } from "@/helpers/formatTimestampDate";
import FullPageLoader from "@/components/FullPageLoader";
import Frame from "@/components/layout/Frame";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

// Assuming you have a type for Survey

// Mock function to fetch surveys (replace with actual API call)
const fetchSurveys = async (userId: string): Promise<ISurvey[]> => {
  try {
    // Reference to the surveys collection in Firestore
    const surveysRef = collection(db, "surveys");

    // Query to fetch surveys created by the specific user
    const q = query(surveysRef, where("createdBy", "==", userId));

    // Execute the query and fetch the documents
    const querySnapshot = await getDocs(q);

    // Map Firestore documents to the ISurvey type
    const surveys: ISurvey[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        category: data.category,
        createdBy: data.createdBy,
        type: data.type,
        allowMultipleSubmissions: data.allowMultipleSubmissions,
        allowAnonymousResponses: data.allowAnonymousResponses,
        successMessage: data.successMessage,
        questionCount: data.sections?.length || 0,
        expired: data.endDate.toMillis() < Date.now(),
        access_url: data.access_url,
        sections: data.sections,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
        visibility: data.visibility,
        responsesCount: data.responsesCount,
        maxResponses: data.maxResponses,
        tags: data.tags || [],
      };
    });

    return surveys;
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return [];
  }
};

export default function Dashboard() {
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const loadSurveys = async () => {
      // Replace 'user123' with actual user ID from authentication
      const userSurveys = await fetchSurveys(user.uid);
      setSurveys(userSurveys);
    };

    loadSurveys();
  }, [user]);

  const dashboardItems = [
    {
      title: "Active Surveys",
      value: surveys.length.toString(),
      buttonText: "View All",
    },
    {
      title: "Total Responses",
      value: surveys
        .reduce((sum, survey) => sum + survey.responsesCount, 0)
        .toString(),
      buttonText: "Analyze",
    },
    {
      title: "Real-Time Insights",
      icon: <Activity className="w-16 h-16 text-blue-500" />,
      buttonText: "View Insights",
    },
  ];

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Frame>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white"
            >
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              {item.value ? (
                <div className="text-3xl font-bold">{item.value}</div>
              ) : (
                item.icon
              )}
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-black">
                {item.buttonText}
              </button>
            </div>
          ))}
        </div>
        {/* Surveys Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Surveys</h2>
          {!!surveys.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {surveys.map((survey) => (
                <Link
                  key={survey.id}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                  href={`/my-survey/${survey.id}`}
                >
                  <h3 className="text-lg font-semibold mb-2">{survey.title}</h3>
                  <p className="text-sm text-gray-600">
                    Created: {formatTimestampDate(survey.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Responses: {survey.responsesCount}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-50 rounded-lg shadow-sm p-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  No surveys yet
                </h2>
                <p className="text-gray-600 max-w-md">
                  You haven&apos;t created any surveys. Start by creating your
                  first survey to gather valuable insights.
                </p>
                <Link href="/create" passHref>
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create one now
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Frame>
    </Suspense>
  );
}
