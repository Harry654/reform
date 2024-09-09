import { QuestionType } from "@/types/question";

export const surveyQuestions: { code: QuestionType; value: string }[] = [
  { code: "mcq", value: "Multiple Choice" },
  { code: "short_answer", value: "Short Answer" },
  { code: "long_answer", value: "Long Answer" },
  { code: "rating", value: "Rating" },
  { code: "checkboxes", value: "Checkboxes" },
  { code: "dropdown", value: "Dropdown" },
  { code: "ranking", value: "Ranking" },
  { code: "date_time", value: "Date/Time" },
  { code: "matrix", value: "Matrix/Grid" },
  { code: "slider", value: "Slider" },
  { code: "file_upload", value: "File Upload" },
  { code: "yes_no", value: "Yes/No" },
  { code: "image_choice", value: "Image Choice" },
];
