"use client";

import React, { useState, useEffect } from "react";
import TabNavigation from "./TabNavigation";
import SurveyEditView from "./SurveyEditView";
import ResponsesView, { ChartQuestion } from "./ResponsesView";
import { TSurveyResponse } from "@/types/response";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ISurvey } from "@/types/survey";
import { useParams } from "next/navigation";
import { Question, QuestionType } from "@/types/question";

const SurveyManagement: React.FC = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState<"survey" | "responses">("survey");
  const [survey, setSurvey] = useState<ISurvey | null>(null);
  const [responses, setResponses] = useState<TSurveyResponse[]>([]);
  const [chartQuestions, setChartQuestions] = useState<ChartQuestion[]>([]);

  const fetchSurveyData = async (id: string): Promise<ISurvey | null> => {
    const docRef = doc(db, "surveys", id); // Reference to the survey document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      const survey: ISurvey = {
        id: docSnap.id,
        title: data.title,
        description: data.description,
        category: data.category,
        createdBy: data.createdBy,
        type: data.type,
        allowMultipleSubmissions: data.allowMultipleSubmissions,
        allowAnonymousResponses: data.allowAnonymousResponses,
        successMessage: data.successMessage,
        questionCount: data.questionCount,
        expired: data.expired,
        access_url: data.access_url,
        sections: data.sections, // Assuming sections is an array of ISection
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
        visibility: data.visibility,
        responsesCount: data.responsesCount,
        maxResponses: data.maxResponses ?? null, // Handle null values
        tags: data.tags,
      };

      return survey;
    } else {
      // Document doesn't exist
      return null;
    }
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
      callback(responses);

      if (!survey) return;

      //   extract questions from each section
      const all_questions: Question[] = survey.sections.flatMap(
        (section) => section.questions
      );

      const chart_questions: ChartQuestion[] = all_questions.map(
        ({ id, type, text, required, section_id }) => ({
          id,
          type,
          text,
          required,
          section_id,
          responses: responses
            .map(
              (response) =>
                response.answers.filter((answer) => answer.questionId === id) // Filter to get the answers for this question
              //   .map((filteredAnswer) => filteredAnswer.answer) // Map the answer values
            )
            .flat(), // Flatten the array to remove nested arrays
        })
      );

      setChartQuestions(chart_questions);
    });

    return unsubscribe; // Call this to stop listening
  };

  useEffect(() => {
    if (typeof id === "string") {
      // Fetch survey data once
      fetchSurveyData(id).then(setSurvey);
    }
  }, [id]);

  useEffect(() => {
    if (!survey) return;
    // Set up real-time listener for survey responses
    const unsubscribe = fetchSurveyResponses(survey.id, setResponses); // Updates state in real-time

    // Cleanup the real-time listener when the component unmounts or id changes
    return () => unsubscribe();
  }, [id, survey]);

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
          <ResponsesView questions={chartQuestions} />
        )}
      </div>
    </div>
  );
};

export default SurveyManagement;
