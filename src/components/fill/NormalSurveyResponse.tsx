"use client";

import React, { useEffect, useState } from "react";

import { useSurvey } from "@/context/SurveyResponseContext";
import { ISurvey } from "@/types/survey";
import { TSurveyResponse } from "@/types/response";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/AuthContext";
import { isTruthy } from "@/helpers/isTruthy";
import { doc, writeBatch, increment, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BeatLoader } from "react-spinners";
import SegmentFill from "./SegmentFill";
import { Question } from "@/types/question";
interface NormalSurveyResponseProps {
  surveyData: ISurvey;
}

export const NormalSurveyResponse: React.FC<NormalSurveyResponseProps> = ({
  surveyData,
}) => {
  const { survey, setSurvey, responses, setSkippedQuestion } = useSurvey();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setSurvey(surveyData);
  }, [surveyData, setSurvey]);

  const handleAllQuestionsAnswered = (): boolean => {
    const requiredQuestions: Question[] = [];
    survey?.segments.map((segment) => {
      segment.questions.map((question) => {
        if (question.required) requiredQuestions.push(question);
      });
    });

    if (requiredQuestions)
      for (const requiredQuestion of requiredQuestions) {
        if (
          !isTruthy(
            responses.find(
              (response) => response.questionId === requiredQuestion.id
            )?.answer
          )
        ) {
          setSkippedQuestion(requiredQuestion);
          const element = document.getElementById(requiredQuestion.id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 50,
              behavior: "smooth",
            });
          }

          return false;
        }
      }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!handleAllQuestionsAnswered() || loading) return;

    const response: TSurveyResponse = {
      surveyId: survey?.id || "",
      userId: user?.uid || "",
      responseId: uuidv4(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      allowAnonymousResponses: false,
      answers: responses,
    };

    try {
      setLoading(true);
      const batch = writeBatch(db);

      // Reference to the survey document
      const surveyDocRef = doc(db, "surveys", survey?.id || "");

      // Reference to the new response document
      const responseDocRef = doc(db, "responses", response.responseId);

      // Add the response to the "responses" collection
      batch.set(responseDocRef, response);

      // Increment the responseCount in the survey document
      batch.update(surveyDocRef, {
        responsesCount: increment(1),
        updatedAt: Timestamp.now(),
      });

      // Commit the batch
      await batch.commit();

      alert(survey?.successMessage);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error saving response and updating survey" + error);
    }
  };

  if (!survey) return <div>Loading survey...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{survey.title}</h1>
      <p className="mb-6 text-gray-600">{survey.description}</p>
      <form onSubmit={handleSubmit}>
        {survey.segments.map((segment) => (
          <SegmentFill key={segment.id} segment={segment} />
        ))}
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            loading && "opacity-20"
          }`}
          disabled={loading}
        >
          {!loading ? "Submit" : <BeatLoader size={10} color="#fff" />}
        </button>
      </form>
    </div>
  );
};
