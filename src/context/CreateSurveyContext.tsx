"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Question, QuestionType } from "@/types/question";
import { v4 as uuidv4 } from "uuid";
import { ISurveyFormMetadata, ISegment } from "@/types/survey";
import { useAuth } from "./AuthContext";

// Define the shape of your context
interface CreateSurveyContextType {
  formMetadata: ISurveyFormMetadata;
  setFormMetadata: React.Dispatch<React.SetStateAction<ISurveyFormMetadata>>;
  // questions: Question[];
  segments: ISegment[];
  addSegment: () => void;
  updateSegment: (updatedSegment: ISegment) => void;
  removeSegment: (id: string) => void;
  addQuestion: (type: QuestionType, segment_id: string) => void;
  updateQuestion: (updatedQuestion: Question) => void;
  removeQuestion: (id: string, segment_id: string) => void;
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
    allowAnonymousResponses: false,
    allowMultipleSubmissions: false,
    successMessage:
      "Thank You for your feedback. Your response has been saved.",
  };

  const mainSegment: ISegment = {
    id: "main_segment",
    title: "Main Segment",
    description: "main segment",
    questions: [
      {
        id: uuidv4(),
        type: "short_answer",
        text: "",
        required: true,
        segment_id: "main_segment",
      },
    ],
    isMainSegment: true,
  };

  const [formMetadata, setFormMetadata] =
    useState<ISurveyFormMetadata>(initialFormMetaData);
  const [segments, setSegments] = useState<ISegment[]>([mainSegment]);
  // const [questions, setQuestions] = useState<Question[]>([]);

  const addSegment = () => {
    const segment_id = uuidv4();
    const newSegment: ISegment = {
      id: segment_id,
      title: "Segment " + segments.length,
      description: "",
      questions: [
        {
          id: uuidv4(),
          type: "short_answer",
          text: "",
          required: true,
          segment_id,
        },
      ],
      isMainSegment: false,
    };
    setSegments([...segments, newSegment]);
  };

  const updateSegment = (updatedSegment: ISegment) => {
    setSegments((prevSegments) =>
      prevSegments.map((segment) =>
        segment.id === updatedSegment.id ? updatedSegment : segment
      )
    );
  };

  const removeSegment = (id: string) =>
    setSegments(segments.filter((segment) => segment.id !== id));

  const addQuestion = (
    type: QuestionType,
    segment_id: string = "main_segment"
  ) => {
    let newQuestion: Question;

    switch (type) {
      case "mcq":
        newQuestion = {
          id: uuidv4(),
          type: "mcq",
          text: "",
          options: [""],
          required: true,
          segment_id,
        };
        break;
      case "short_answer":
        newQuestion = {
          id: uuidv4(),
          type: "short_answer",
          text: "",
          required: true,
          segment_id,
        };
        break;
      case "long_answer":
        newQuestion = {
          id: uuidv4(),
          type: "long_answer",
          text: "",
          required: true,
          segment_id,
        };
        break;
      case "rating":
        newQuestion = {
          id: uuidv4(),
          type: "rating",
          text: "",
          maxRating: 5,
          required: true,
          segment_id,
        };
        break;
      case "checkboxes":
        newQuestion = {
          id: uuidv4(),
          type: "checkboxes",
          text: "",
          options: [""],
          required: true,
          segment_id,
        };
        break;
      case "dropdown":
        newQuestion = {
          id: uuidv4(),
          type: "dropdown",
          text: "",
          options: [""],
          required: true,
          segment_id,
        };
        break;
      case "ranking":
        newQuestion = {
          id: uuidv4(),
          type: "ranking",
          text: "",
          options: [""],
          required: true,
          segment_id,
        };
        break;
      case "date_time":
        newQuestion = {
          id: uuidv4(),
          type: "date_time",
          text: "",
          includeTime: false,
          required: true,
          segment_id,
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
          segment_id,
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
          segment_id,
        };
        break;
      case "file_upload":
        newQuestion = {
          id: uuidv4(),
          type: "file_upload",
          text: "",
          allowedFileTypes: [".pdf", ".jpg", ".png"],
          required: true,
          segment_id,
        };
        break;
      case "yes_no":
        newQuestion = {
          id: uuidv4(),
          type: "yes_no",
          text: "",
          required: true,
          segment_id,
        };
        break;
      case "image_choice":
        newQuestion = {
          id: uuidv4(),
          type: "image_choice",
          text: "",
          options: [{ imageUrl: "", label: "" }],
          required: true,
          segment_id,
        };
        break;
      default:
        throw new Error(`Unsupported question type: ${type}`);
    }

    // setQuestions([...questions, newQuestion]);
    setSegments((prevSegments) =>
      prevSegments.map((segment) =>
        segment.id === segment_id
          ? { ...segment, questions: [...segment.questions, newQuestion] }
          : segment
      )
    );
  };

  const updateQuestion = (updatedQuestion: Question) => {
    // setQuestions(
    //   questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    // );

    setSegments((prevSegments) =>
      prevSegments.map((segment) =>
        segment.id === updatedQuestion.segment_id
          ? {
              ...segment,
              questions: segment.questions.map((q) =>
                q.id === updatedQuestion.id ? updatedQuestion : q
              ),
            }
          : segment
      )
    );
  };

  const removeQuestion = (id: string, segment_id: string) => {
    // setQuestions(questions.filter((q) => q.id !== id));

    setSegments((prevSegments) =>
      prevSegments.map((segment) =>
        segment.id === segment_id
          ? {
              ...segment,
              questions: segment.isMainSegment
                ? segment.questions.filter((q) => q.id !== id)
                : segment.questions.length > 1
                ? segment.questions.filter((q) => q.id !== id)
                : segment.questions,
            }
          : segment
      )
    );
  };

  const resetSurvey = () => {
    setFormMetadata(initialFormMetaData);
    // setQuestions([]);
    setSegments([mainSegment]);
  };

  return (
    <CreateSurveyContext.Provider
      value={{
        formMetadata,
        setFormMetadata,
        // questions,
        segments,
        addSegment,
        updateSegment,
        removeSegment,
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
