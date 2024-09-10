import React, { useEffect } from "react";
import { MCQQuestionFill, LongAnswerQuestionFill } from "./QuestionComponents";
import { useSurvey } from "@/context/SurveyContext";
import { ISurvey } from "@/types/survey";
import { TSurveyResponse } from "@/types/response";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/AuthContext";
import { Timestamp } from "firebase/firestore";

interface SurveyFormProps {
  surveyData: ISurvey;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ surveyData }) => {
  const { survey, setSurvey, responses } = useSurvey();
  const { user } = useAuth();

  useEffect(() => {
    setSurvey(surveyData);
  }, [surveyData, setSurvey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Survey responses:", responses);
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
        {survey.questions.map((question) => {
          switch (question.type) {
            case "mcq":
              return <MCQQuestionFill question={question} />;
            case "long_answer":
              return <LongAnswerQuestionFill question={question} />;
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
