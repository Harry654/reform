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
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ISurvey } from "@/types/survey";
import { useParams, useRouter } from "next/navigation";
import { Question } from "@/types/question";
import FullPageLoader from "./FullPageLoader";
import { useAuth } from "@/context/AuthContext";

const SurveyManagement: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"survey" | "responses">("survey");
  const [survey, setSurvey] = useState<ISurvey | null>(null);
  const [responses, setResponses] = useState<TSurveyResponse[]>([]);
  const [chartQuestions, setChartQuestions] = useState<ChartQuestion[]>([]);

  const fetchSurveyData = async (id: string): Promise<ISurvey[]> => {
    console.log(id);
    if (!user) return [];
    const surveysRef = collection(db, "surveys");
    const q = query(
      surveysRef,
      where("id", "==", id),
      where("createdBy", "==", user.uid)
    ); // Query for the survey created by the user

    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) router.push("/not-found");

    const surveys: ISurvey[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const survey: ISurvey = {
        id: doc.id,
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

      surveys.push(survey);
    });

    return surveys;
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

      //   merge each question with its responses
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
      fetchSurveyData(id).then((surveys) => {
        const survey = surveys[0];

        // if the current user didn't create the survey
        if (survey.createdBy !== user?.uid) return router.push("/not-found");
        setSurvey(survey);
      });
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
    return <FullPageLoader />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
