"use client";

import React, { useEffect, useState } from "react";
import {
  MCQQuestionFill,
  LongAnswerQuestionFill,
  ShortAnswerQuestionFill,
  RatingQuestionFill,
  CheckboxesQuestionFill,
  DropdownQuestionFill,
  RankingQuestionFill,
  DateTimeQuestionFill,
  MatrixQuestionFill,
  SliderQuestionFill,
  FileUploadQuestionFill,
  YesNoQuestionFill,
  ImageChoiceQuestionFill,
} from "./QuestionFillComponents";
import { useSurvey } from "@/context/SurveyResponseContext";
import { ISurvey } from "@/types/survey";
import { TSurveyResponse } from "@/types/response";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/AuthContext";
import { Timestamp } from "firebase/firestore";
import { Question } from "@/types/question";
import { isTruthy } from "@/helpers/isTruthy";

interface SurveyResponseEditorProps {
  surveyData: ISurvey;
}

export const SurveyResponseEditor: React.FC<SurveyResponseEditorProps> = ({
  surveyData,
}) => {
  const { survey, setSurvey, responses, skippedQuestion, setSkippedQuestion } =
    useSurvey();
  const { user } = useAuth();

  useEffect(() => {
    setSurvey(surveyData);
  }, [surveyData, setSurvey]);

  const confirmQuestionsAnswered = () => {
    const requiredQuestions = survey?.questions.filter(
      (question) => question.required === true
    );

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

          return;
        }
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Survey responses:", responses);

    confirmQuestionsAnswered();

    // Here you would typically send the responses to your backend
    const response: TSurveyResponse = {
      surveyId: survey?.id || "",
      userId: user?.uid,
      responseId: uuidv4(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isAnonymous: false,
      answers: responses,
    };

    console.log(response);
  };

  if (!survey) return <div>Loading survey...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{survey.title}</h1>
      <p className="mb-6 text-gray-600">{survey.description}</p>
      <form onSubmit={handleSubmit}>
        {survey.questions.map((question, index) => {
          switch (question.type) {
            case "mcq":
              return <MCQQuestionFill key={index} question={question} />;
            case "long_answer":
              return <LongAnswerQuestionFill key={index} question={question} />;
            case "short_answer":
              return (
                <ShortAnswerQuestionFill key={index} question={question} />
              );
            case "rating":
              return <RatingQuestionFill key={index} question={question} />;
            case "checkboxes":
              return <CheckboxesQuestionFill key={index} question={question} />;
            case "dropdown":
              return <DropdownQuestionFill key={index} question={question} />;
            case "ranking":
              return <RankingQuestionFill key={index} question={question} />;
            case "date_time":
              return <DateTimeQuestionFill key={index} question={question} />;
            case "matrix":
              return <MatrixQuestionFill key={index} question={question} />;
            case "slider":
              return <SliderQuestionFill key={index} question={question} />;
            case "file_upload":
              return <FileUploadQuestionFill key={index} question={question} />;
            case "yes_no":
              return <YesNoQuestionFill key={index} question={question} />;
            case "image_choice":
              return (
                <ImageChoiceQuestionFill key={index} question={question} />
              );
            default:
              return null;
          }
        })}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
