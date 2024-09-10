import { Timestamp } from "firebase/firestore";
import { Question } from "./question";

export interface ISurveyFormMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  createdBy: string;
  type: "normal" | "interactive";
  allowMultipleResponses: boolean;
  successMessage: string | null;
  isAnonymous: boolean;
}

export interface ISurvey extends ISurveyFormMetadata {
  questionCount: number;
  expired: boolean;
  access_url: string;
  questions: Question[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  startDate: Timestamp;
  endDate: Timestamp;
  status: "draft" | "active" | "closed";
  visibility: "public" | "private";
  responsesCount: number;
  maxResponses: number | null;
  category: string;
  tags: string[];
}
