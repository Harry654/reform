import { useSurvey } from "@/context/SurveyContext";
import { LongAnswerQuestion, MCQQuestion, Question } from "@/types/question";
import React from "react";

interface QuestionProps {
  //   id: string;
  //   text: string;
  //   required?: boolean;
  question: Question;
}

export const MCQQuestionFill: React.FC<QuestionProps> = ({ question }) => {
  const { responses, updateResponse } = useSurvey();

  const { id, text, required, options } = question as MCQQuestion;

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text} {required && <span className="text-red-500">*</span>}
      </label>
      {options.map((option, index) => (
        <div key={index} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name={id}
              value={option}
              checked={
                (responses.find(
                  (response) => response.questionId === question.id
                )?.answer as string) === option
              }
              onChange={(e) => updateResponse(question, e.target.value)}
              required={required}
            />
            <span className="ml-2">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export const LongAnswerQuestionFill: React.FC<QuestionProps> = ({
  question,
}) => {
  const { responses, updateResponse } = useSurvey();

  const { id, text, required } = question as LongAnswerQuestion;

  return (
    <div className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {text} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={
          (responses.find((response) => response.questionId === question.id)
            ?.answer as string) || ""
        }
        onChange={(e) => updateResponse(question, e.target.value)}
        required={required}
        rows={4}
      />
    </div>
  );
};
