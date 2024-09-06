import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Question, QuestionType } from "@/types/question";
import {
  MCQQuestionComponent,
  ShortAnswerQuestionComponent,
  LongAnswerQuestionComponent,
  RatingQuestionComponent,
} from "./QuestionComponents";

export default function SurveyQuestionEditor() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (type: QuestionType) => {
    let newQuestion: Question;

    switch (type) {
      case "mcq":
        newQuestion = {
          id: uuidv4(),
          type: "mcq",
          text: "",
          options: [""],
        };
        break;
      case "short_answer":
        newQuestion = {
          id: uuidv4(),
          type: "short_answer",
          text: "",
        };
        break;
      case "long_answer":
        newQuestion = {
          id: uuidv4(),
          type: "long_answer",
          text: "",
        };
        break;
      case "rating":
        newQuestion = {
          id: uuidv4(),
          type: "rating",
          text: "",
          maxRating: 5,
        };
        break;
      default:
        throw new Error(`Unsupported question type: ${type}`);
    }

    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "mcq":
        return (
          <MCQQuestionComponent question={question} onUpdate={updateQuestion} />
        );
      case "short_answer":
        return (
          <ShortAnswerQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "long_answer":
        return (
          <LongAnswerQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "rating":
        return (
          <RatingQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      default:
        return null;
    }
  };
  return null;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Survey Question Editor</h1>
      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="border p-4 rounded-lg">
            {renderQuestion(question)}
            <button
              onClick={() => removeQuestion(question.id)}
              className="mt-4 px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-100"
            >
              Remove Question
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 space-x-4">
        <button
          type="button"
          onClick={() => addQuestion("mcq")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add MCQ
        </button>
        <button
          type="button"
          onClick={() => addQuestion("short_answer")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Short Answer
        </button>
        <button
          type="button"
          onClick={() => addQuestion("long_answer")}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Add Long Answer
        </button>
        <button
          type="button"
          onClick={() => addQuestion("rating")}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Add Rating
        </button>
      </div>
    </div>
  );
}
