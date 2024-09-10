"use client";

import { Question } from "@/types/question";
import { TQuestionResponse } from "@/types/response";
import { ISurvey } from "@/types/survey";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SurveyContextType {
  survey: ISurvey | null;
  responses: TQuestionResponse[];
  setSurvey: (survey: ISurvey) => void;
  updateResponse: (
    question: Question,
    answer: string | string[] | number | boolean
  ) => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [survey, setSurvey] = useState<ISurvey | null>(null);
  const [responses, setSurveyResponses] = useState<TQuestionResponse[]>([]);

  const updateResponse = (
    question: Question,
    answer: string | string[] | number | boolean
  ) => {
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
    <SurveyContext.Provider
      value={{ survey, responses, setSurvey, updateResponse }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};
