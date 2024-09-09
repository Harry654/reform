"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Question, QuestionType } from "@/types/question";
import { v4 as uuidv4 } from "uuid";

// Define the shape of your context
interface QuestionContextType {
  questions: Question[];
  addQuestion: (type: QuestionType) => void;
  updateQuestion: (updatedQuestion: Question) => void;
  removeQuestion: (id: string) => void;
}

// Create the context
const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined
);

// QuestionProvider component
export const QuestionProvider = ({ children }: { children: ReactNode }) => {
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
      case "checkboxes":
        newQuestion = {
          id: uuidv4(),
          type: "checkboxes",
          text: "",
          options: [""],
        };
        break;
      case "dropdown":
        newQuestion = {
          id: uuidv4(),
          type: "dropdown",
          text: "",
          options: [""],
        };
        break;
      case "ranking":
        newQuestion = {
          id: uuidv4(),
          type: "ranking",
          text: "",
          options: [""],
        };
        break;
      case "date_time":
        newQuestion = {
          id: uuidv4(),
          type: "date_time",
          text: "",
          includeTime: false,
        };
        break;
      case "matrix":
        newQuestion = {
          id: uuidv4(),
          type: "matrix",
          text: "",
          rows: [""],
          columns: [""],
        };
        break;
      case "slider":
        newQuestion = {
          id: uuidv4(),
          type: "slider",
          text: "",
          min: 0,
          max: 100,
          step: 1,
        };
        break;
      case "file_upload":
        newQuestion = {
          id: uuidv4(),
          type: "file_upload",
          text: "",
          allowedFileTypes: [".pdf", ".jpg", ".png"],
        };
        break;
      case "yes_no":
        newQuestion = {
          id: uuidv4(),
          type: "yes_no",
          text: "",
        };
        break;
      case "image_choice":
        newQuestion = {
          id: uuidv4(),
          type: "image_choice",
          text: "",
          options: [{ imageUrl: "", label: "" }],
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

  return (
    <QuestionContext.Provider
      value={{ questions, addQuestion, updateQuestion, removeQuestion }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

// Custom hook to use the QuestionContext
export const useQuestion = (): QuestionContextType => {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("useQuestion must be used within an QuestionProvider");
  }
  return context;
};
