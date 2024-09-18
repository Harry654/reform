"use client";

import React, { useState, useEffect } from "react";
import TabNavigation from "./TabNavigation";
import SurveyEditView from "./SurveyEditView";
import ResponsesView from "./ResponsesView";
import { TSurveyResponse } from "@/types/response";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ISurvey } from "@/types/survey";
import { useParams } from "next/navigation";

export type TQuestionResponse = {
  questionId: string;
  answer: string;
};

// Mock function to fetch survey data
const fetchSurveyData = async (id: string): Promise<ISurvey> => {
  // Replace this with actual API call
  return {
    id,
    title: "Sample Survey",
    description: "This is a sample survey description.",
    category: "feedback",
    // ... other survey properties
  };
};



const fetchSurveyResponses = (
  surveyId: string,
  callback: (responses: TSurveyResponse[]) => void
) => {
  const q = query(
    collection(db, "responses"),
    where("surveyId", "==", surveyId)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const responses: TSurveyResponse[] = [];
    console.log(querySnapshot.docs[0].data());

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      responses.push({
        surveyId: data.surveyId,
        userId: data.userId,
        responseId: doc.id, // Use the document ID for responseId
        createdAt: data.createdAt.toDate(), // Firestore Timestamp to JS Date
        updatedAt: data.updatedAt.toDate(),
        answers: data.answers, // Assuming answers is an array of TQuestionResponse
      });
    });
    console.log("bnm", responses);
    callback(responses);
  });

  return unsubscribe; // Call this to stop listening
};

const SurveyManagement: React.FC = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState<"survey" | "responses">("survey");
  const [survey, setSurvey] = useState<ISurvey | null>(null);
  const [responses, setResponses] = useState<TSurveyResponse[]>([]);

  useEffect(() => {
    // Fetch survey data once
    fetchSurveyData(id).then(setSurvey);
    
    if (typeof id === "string") {
      // Set up real-time listener for survey responses
      const unsubscribe = fetchSurveyResponses(id, setResponses); // Updates state in real-time

      // Cleanup the real-time listener when the component unmounts or id changes
      return () => unsubscribe();
    }
  }, [id]);

  const handleSaveSurvey = async (updatedSurvey: ISurvey) => {
    // Implement API call to save updated survey
    console.log("Saving survey:", updatedSurvey);
    setSurvey(updatedSurvey);
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{survey.title}</h1>
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        responseCount={responses.length}
      />
      <div className="mt-6">
        {activeTab === "survey" ? (
          <SurveyEditView survey={survey} onSave={handleSaveSurvey} />
        ) : (
          <ResponsesView responses={responses} />
        )}
      </div>
    </div>
  );
};

export default SurveyManagement;
