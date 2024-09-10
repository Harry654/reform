import { Timestamp } from "firebase/firestore";
import { Question } from "./question";

export interface ISurveyFormMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  createdBy: string; // User ID or email of the survey creator
}

export interface ISurvey extends ISurveyFormMetadata {
  questionCount: number; // Total number of questions
  expired: boolean; // Whether the survey is expired
  access_url: string; // URL to access the survey
  questions: Question[]; // List of questions in the survey

  // Additional fields
  createdAt: Timestamp; // Timestamp when the survey was created
  updatedAt: Timestamp; // Timestamp for the last update
  startDate: Timestamp; // Survey start date
  endDate: Timestamp; // Survey end date or expiration date
  status: "draft" | "active" | "closed"; // Survey status
  visibility: "public" | "private"; // Visibility level of the survey
  responsesCount: number; // Number of responses submitted
  maxResponses: number | null; // Maximum number of responses allowed, if any
  isAnonymous: boolean; // Whether responses are anonymous
  category: string; // Category or type of survey (e.g., feedback, research)
  tags: string[]; // Tags or keywords associated with the survey
}
