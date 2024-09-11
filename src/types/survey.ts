import { Timestamp } from "firebase/firestore";
import { Question } from "./question";

export interface ISurveyFormMetadata {
  id: string; // Unique identifier for the survey.
  title: string; // Title of the survey.
  description: string; // Detailed description of the survey's purpose.
  category: string; // Survey category (e.g., product rating, feedback).
  createdBy: string; // User ID of the creator.
  type: "normal" | "interactive"; // Type of survey (normal or interactive).
  allowMultipleSubmissions: boolean; // Whether multiple submissions are allowed from a single user.
  allowAnonymousResponses: boolean; // Whether the survey allows anonymous responses.
  successMessage: string; // Message displayed after a response is successfully submitted.
}

export interface ISegment {
  id: string; // Unique identifier for the segment.
  title: string; // Title of the segment.
  description?: string; // Optional description of the segment.
  questions: Question[]; // List of questions within the segment.
  isMainSegment: boolean; // Indicates if this segment is the main segment of the survey.
}

export interface ISurvey extends ISurveyFormMetadata {
  questionCount: number; // Total number of questions in the survey.
  expired: boolean; // Flag indicating if the survey has expired.
  access_url: string; // URL to access the survey.
  segments: ISegment[]; // List of segments containing survey questions.
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
