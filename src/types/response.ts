import { Timestamp } from "firebase/firestore";
import { QuestionType } from "./question";

export type TAnswer =
  | string
  | string[]
  | number
  | boolean
  | File
  | { [x: string]: string };

export type TQuestionResponse = {
  questionId: string;
  questionType: QuestionType;
  questionText: string;
  answer: TAnswer;
};

export type TSurveyResponse = {
  surveyId: string; // Reference to the survey
  userId: string | null; // Optional, if the user is authenticated
  responseId: string; // Unique ID for this response
  createdAt: Timestamp; // Timestamp when the response was submitted
  updatedAt: Timestamp; // Timestamp for any updates
  // allowAnonymousResponses: boolean; // Whether the user chose to respond anonymously
  answers: TQuestionResponse[];
};

export type TChart =
  | "bar-chart"
  | "pie-chart"
  | "donut-chart"
  | "stacked-bar-chart"
  | "line-graph"
  | "heat-map"
  | "radar-chart"
  | "word-cloud"
  | "bubble-chart"
  | "histogram"
  | "gauge-chart"
  | "likert-scale-chart";
