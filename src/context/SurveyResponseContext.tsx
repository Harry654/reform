"use client";

import { Question } from "@/types/question";
import { TAnswer, TQuestionResponse } from "@/types/response";
import { ISurvey } from "@/types/survey";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SurveyResponseContextType {
  survey: ISurvey | null;
  responses: TQuestionResponse[];
  setSurvey: (survey: ISurvey) => void;
  updateResponse: (question: Question, answer: TAnswer) => void;
  skippedQuestion: Question | null;
  setSkippedQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
}

const SurveyResponseContext = createContext<
  SurveyResponseContextType | undefined
>(undefined);

export const SurveyResponseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [survey, setSurvey] = useState<ISurvey | null>(null);
  const [responses, setSurveyResponses] = useState<TQuestionResponse[]>([]);
  const [skippedQuestion, setSkippedQuestion] = useState<Question | null>(null);

  const updateResponse = (question: Question, answer: TAnswer) => {
    setSkippedQuestion(null);
    setSurveyResponses((prevResponses) => {
      const filteredResponses = prevResponses.filter(
        (response) => response.questionId !== question.id
      );

      return [
        ...filteredResponses,
        {
          questionId: question.id,
          questionType: question.type,
          answer,
        },
      ];
    });
  };

  return (
    <SurveyResponseContext.Provider
      value={{
        survey,
        responses,
        setSurvey,
        updateResponse,
        skippedQuestion,
        setSkippedQuestion,
      }}
    >
      {children}
    </SurveyResponseContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyResponseContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyResponseProvider");
  }
  return context;
};
