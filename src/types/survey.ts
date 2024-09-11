import { Timestamp } from "firebase/firestore";
import { Question } from "./question";

export interface ISurveyFormMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  createdBy: string;
  type: "normal" | "interactive";
  allowMultipleSubmissions: boolean;
  allowAnonymousResponses: boolean;
  successMessage: string;
}

export interface ISegment {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  isMainSegment: boolean;
}

export interface ISurvey extends ISurveyFormMetadata {
  questionCount: number;
  expired: boolean;
  access_url: string;
  segments: ISegment[];
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
