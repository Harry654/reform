"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Question, QuestionType } from "@/types/question";
import { v4 as uuidv4 } from "uuid";
import { ISurveyFormMetadata } from "@/types/survey";
import { useAuth } from "./AuthContext";

// Define the shape of your context
interface CreateSurveyContextType {
  formMetadata: ISurveyFormMetadata;
  setFormMetadata: React.Dispatch<React.SetStateAction<ISurveyFormMetadata>>;
  questions: Question[];
  addQuestion: (type: QuestionType) => void;
  updateQuestion: (updatedQuestion: Question) => void;
  removeQuestion: (id: string) => void;
  resetSurvey: () => void;
}

// Create the context
const CreateSurveyContext = createContext<CreateSurveyContextType | undefined>(
  undefined
);

// CreateSurveyProvider component
export const CreateSurveyProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const initialFormMetaData: ISurveyFormMetadata = {
    id: uuidv4(),
    title: "",
    description: "",
    category: "",
    createdBy: user?.uid || "",
    type: "normal",
  };

  const [formMetadata, setFormMetadata] =
    useState<ISurveyFormMetadata>(initialFormMetaData);
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
          required: true,
        };
        break;
      case "short_answer":
        newQuestion = {
          id: uuidv4(),
          type: "short_answer",
          text: "",
          required: true,
        };
        break;
      case "long_answer":
        newQuestion = {
          id: uuidv4(),
          type: "long_answer",
          text: "",
          required: true,
        };
        break;
      case "rating":
        newQuestion = {
          id: uuidv4(),
          type: "rating",
          text: "",
          maxRating: 5,
          required: true,
        };
        break;
      case "checkboxes":
        newQuestion = {
          id: uuidv4(),
          type: "checkboxes",
          text: "",
          options: [""],
          required: true,
        };
        break;
      case "dropdown":
        newQuestion = {
          id: uuidv4(),
          type: "dropdown",
          text: "",
          options: [""],
          required: true,
        };
        break;
      case "ranking":
        newQuestion = {
          id: uuidv4(),
          type: "ranking",
          text: "",
          options: [""],
          required: true,
        };
        break;
      case "date_time":
        newQuestion = {
          id: uuidv4(),
          type: "date_time",
          text: "",
          includeTime: false,
          required: true,
        };
        break;
      case "matrix":
        newQuestion = {
          id: uuidv4(),
          type: "matrix",
          text: "",
          rows: [""],
          columns: [""],
          required: true,
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
          required: true,
        };
        break;
      case "file_upload":
        newQuestion = {
          id: uuidv4(),
          type: "file_upload",
          text: "",
          allowedFileTypes: [".pdf", ".jpg", ".png"],
          required: true,
        };
        break;
      case "yes_no":
        newQuestion = {
          id: uuidv4(),
          type: "yes_no",
          text: "",
          required: true,
        };
        break;
      case "image_choice":
        newQuestion = {
          id: uuidv4(),
          type: "image_choice",
          text: "",
          options: [{ imageUrl: "", label: "" }],
          required: true,
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

  const resetSurvey = () => {
    setFormMetadata(initialFormMetaData);
    setQuestions([]);
  };

  return (
    <CreateSurveyContext.Provider
      value={{
        formMetadata,
        setFormMetadata,
        questions,
        addQuestion,
        updateQuestion,
        removeQuestion,
        resetSurvey,
      }}
    >
      {children}
    </CreateSurveyContext.Provider>
  );
};

// Custom hook to use the CreateSurveyContext
export const useQuestion = (): CreateSurveyContextType => {
  const context = useContext(CreateSurveyContext);
  if (context === undefined) {
    throw new Error("useQuestion must be used within an CreateSurveyProvider");
  }
  return context;
};
