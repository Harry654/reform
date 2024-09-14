export type QuestionType =
  | "mcq"
  | "short_answer"
  | "long_answer"
  | "rating"
  | "checkboxes"
  | "dropdown"
  | "ranking"
  | "date_time"
  | "matrix"
  | "slider"
  | "file_upload"
  | "yes_no"
  | "image_choice";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  section_id: string;
}

export interface MCQQuestion extends BaseQuestion {
  type: "mcq";
  options: string[];
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: "short_answer";
}

export interface LongAnswerQuestion extends BaseQuestion {
  type: "long_answer";
}

export interface RatingQuestion extends BaseQuestion {
  type: "rating";
  maxRating: number;
}

export interface CheckboxesQuestion extends BaseQuestion {
  type: "checkboxes";
  options: string[];
}

export interface DropdownQuestion extends BaseQuestion {
  type: "dropdown";
  options: string[];
}

export interface RankingQuestion extends BaseQuestion {
  type: "ranking";
  options: string[];
}

export interface DateTimeQuestion extends BaseQuestion {
  type: "date_time";
  includeTime: boolean;
}

export interface MatrixQuestion extends BaseQuestion {
  type: "matrix";
  rows: string[];
  columns: string[];
}

export interface SliderQuestion extends BaseQuestion {
  type: "slider";
  min: number;
  max: number;
  step: number;
}

export interface FileUploadQuestion extends BaseQuestion {
  type: "file_upload";
  allowedFileTypes: string[];
}

export interface YesNoQuestion extends BaseQuestion {
  type: "yes_no";
}

export interface ImageChoiceQuestion extends BaseQuestion {
  type: "image_choice";
  options: { imageUrl: string; label: string }[];
}

export type Question =
  | MCQQuestion
  | ShortAnswerQuestion
  | LongAnswerQuestion
  | RatingQuestion
  | CheckboxesQuestion
  | DropdownQuestion
  | RankingQuestion
  | DateTimeQuestion
  | MatrixQuestion
  | SliderQuestion
  | FileUploadQuestion
  | YesNoQuestion
  | ImageChoiceQuestion;