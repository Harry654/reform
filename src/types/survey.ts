import { Timestamp } from "firebase/firestore";
import { Question } from "./question";

export type ISurveyCategory =
  | "product_rating"
  | "feedback"
  | "complaints"
  | "human_resources"
  | "events"
  | "other";

export interface ISurveyFormMetadata {
  id: string; // Unique identifier for the survey.
  title: string; // Title of the survey.
  description: string; // Detailed description of the survey's purpose.
  category: ISurveyCategory; // Survey category (e.g., product rating, feedback).
  createdBy: string; // User ID of the creator.
  type: "normal" | "interactive"; // Type of survey (normal or interactive).
  allowMultipleSubmissions: boolean; // Whether multiple submissions are allowed from a single user.
  allowAnonymousResponses: boolean; // Whether the survey allows anonymous responses.
  successMessage: string; // Message displayed after a response is successfully submitted.
}

export interface ISection {
  id: string; // Unique identifier for the section.
  title: string; // Title of the section.
  description?: string; // Optional description of the section.
  questions: Question[]; // List of questions within the section.
  isMainSection: boolean; // Indicates if this section is the main section of the survey.
}

export interface ISurvey extends ISurveyFormMetadata {
  questionCount: number; // Total number of questions in the survey.
  expired: boolean; // Flag indicating if the survey has expired.
  access_url: string; // URL to access the survey.
  sections: ISection[]; // List of sections containing survey questions.
  createdAt: Timestamp; // Timestamp when the survey was created.
  updatedAt: Timestamp; // Timestamp when the survey was last updated.
  startDate: Timestamp; // Start date and time of the survey.
  endDate: Timestamp; // End date and time of the survey.
  status: "draft" | "active" | "closed"; // Status of the survey.
  visibility: "public" | "private"; // Determines if the survey is public or private.
  responsesCount: number; // Count of how many responses the survey has received.
  maxResponses: number | null; // Maximum number of responses allowed (or null if unlimited).
  tags: string[]; // Array of tags for categorizing the survey.
}
