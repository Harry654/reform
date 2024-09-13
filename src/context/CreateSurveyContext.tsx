"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Question, QuestionType } from "@/types/question";
import { v4 as uuidv4 } from "uuid";
import { ISurveyFormMetadata, ISection, ISurveyCategory } from "@/types/survey";
import { useAuth } from "./AuthContext";
import { ITemplate } from "@/types/template";

// Define the shape of your context
interface CreateSurveyContextType {
  formMetadata: ISurveyFormMetadata;
  setFormMetadata: React.Dispatch<React.SetStateAction<ISurveyFormMetadata>>;
  setTemplate: React.Dispatch<React.SetStateAction<ITemplate | null>>;
  // questions: Question[];
  sections: ISection[];
  addSection: () => void;
  updateSection: (updatedSection: ISection) => void;
  removeSection: (id: string) => void;
  addQuestion: (type: QuestionType, section_id: string) => void;
  updateQuestion: (updatedQuestion: Question) => void;
  removeQuestion: (id: string, section_id: string) => void;
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
    category: "feedback",
    createdBy: user?.uid || "",
    type: "normal",
    allowAnonymousResponses: false,
    allowMultipleSubmissions: false,
    successMessage:
      "Thank You for your feedback. Your response has been saved.",
  };

  const mainSection: ISection = {
    id: "main_section",
    title: "Main Section",
    description: "main section",
    questions: [
      {
        id: uuidv4(),
        type: "short_answer",
        text: "",
        required: true,
        section_id: "main_section",
      },
    ],
    isMainSection: true,
  };

  const [formMetadata, setFormMetadata] =
    useState<ISurveyFormMetadata>(initialFormMetaData);
  const [sections, setSections] = useState<ISection[]>([mainSection]);
  const [template, setTemplate] = useState<ITemplate | null>(null);

  // const [questions, setQuestions] = useState<Question[]>([]);

  const addSection = () => {
    const section_id = uuidv4();
    const newSection: ISection = {
      id: section_id,
      title: "Section " + sections.length,
      description: "",
      questions: [
        {
          id: uuidv4(),
          type: "short_answer",
          text: "",
          required: true,
          section_id,
        },
      ],
      isMainSection: false,
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (updatedSection: ISection) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  };

  const removeSection = (id: string) =>
    setSections(sections.filter((section) => section.id !== id));

  const addQuestion = (
    type: QuestionType,
    section_id: string = "main_section"
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
          section_id,
        };
        break;
      case "short_answer":
        newQuestion = {
          id: uuidv4(),
          type: "short_answer",
          text: "",
          required: true,
          section_id,
        };
        break;
      case "long_answer":
        newQuestion = {
          id: uuidv4(),
          type: "long_answer",
          text: "",
          required: true,
          section_id,
        };
        break;
      case "rating":
        newQuestion = {
          id: uuidv4(),
          type: "rating",
          text: "",
          maxRating: 5,
          required: true,
          section_id,
        };
        break;
      case "checkboxes":
        newQuestion = {
          id: uuidv4(),
          type: "checkboxes",
          text: "",
          options: [""],
          required: true,
          section_id,
        };
        break;
      case "dropdown":
        newQuestion = {
          id: uuidv4(),
          type: "dropdown",
          text: "",
          options: [""],
          required: true,
          section_id,
        };
        break;
      case "ranking":
        newQuestion = {
          id: uuidv4(),
          type: "ranking",
          text: "",
          options: [""],
          required: true,
          section_id,
        };
        break;
      case "date_time":
        newQuestion = {
          id: uuidv4(),
          type: "date_time",
          text: "",
          includeTime: false,
          required: true,
          section_id,
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
          section_id,
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
          section_id,
        };
        break;
      case "file_upload":
        newQuestion = {
          id: uuidv4(),
          type: "file_upload",
          text: "",
          allowedFileTypes: [".pdf", ".jpg", ".png"],
          required: true,
          section_id,
        };
        break;
      case "yes_no":
        newQuestion = {
          id: uuidv4(),
          type: "yes_no",
          text: "",
          required: true,
          section_id,
        };
        break;
      case "image_choice":
        newQuestion = {
          id: uuidv4(),
          type: "image_choice",
          text: "",
          options: [{ imageUrl: "", label: "" }],
          required: true,
          section_id,
        };
        break;
      default:
        throw new Error(`Unsupported question type: ${type}`);
    }

    // setQuestions([...questions, newQuestion]);
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === section_id
          ? { ...section, questions: [...section.questions, newQuestion] }
          : section
      )
    );
  };

  const updateQuestion = (updatedQuestion: Question) => {
    // setQuestions(
    //   questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    // );

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === updatedQuestion.section_id
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === updatedQuestion.id ? updatedQuestion : q
              ),
            }
          : section
      )
    );
  };

  const removeQuestion = (id: string, section_id: string) => {
    // setQuestions(questions.filter((q) => q.id !== id));

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === section_id
          ? {
              ...section,
              questions: section.isMainSection
                ? section.questions.filter((q) => q.id !== id)
                : section.questions.length > 1
                ? section.questions.filter((q) => q.id !== id)
                : section.questions,
            }
          : section
      )
    );
  };

  const resetSurvey = () => {
    setFormMetadata(initialFormMetaData);
    // setQuestions([]);
    setSections([mainSection]);
  };

  useEffect(() => {
    if (!template) return;

    const { title, description, category, sections } = template.survey_data;
    setFormMetadata({ ...initialFormMetaData, title, description, category });
    setSections(sections);
  }, [template?.id]);

  return (
    <CreateSurveyContext.Provider
      value={{
        formMetadata,
        setFormMetadata,
        setTemplate,
        // questions,
        sections,
        addSection,
        updateSection,
        removeSection,
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
