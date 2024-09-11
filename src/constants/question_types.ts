import { QuestionType } from "@/types/question";

export const surveyQuestions: {
  type: QuestionType;
  label: string;
  description: string;
}[] = [
  {
    type: "mcq",
    label: "Multiple Choice",
    description: "Choose one option from a list of predefined answers.",
  },
  {
    type: "short_answer",
    label: "Short Answer",
    description: "Provide a brief, open-ended response in a single line.",
  },
  {
    type: "long_answer",
    label: "Long Answer",
    description: "Provide a detailed, open-ended response in multiple lines.",
  },
  {
    type: "rating",
    label: "Rating",
    description:
      "Rate something on a numerical or star-based scale (e.g., 1-5 stars).",
  },
  {
    type: "checkboxes",
    label: "Checkboxes",
    description: "Select multiple options from a list of predefined answers.",
  },
  {
    type: "dropdown",
    label: "Dropdown",
    description: "Select one option from a dropdown menu.",
  },
  {
    type: "ranking",
    label: "Ranking",
    description: "Rank items in order of preference or importance.",
  },
  {
    type: "date_time",
    label: "Date/Time",
    description: "Pick a date or time from a calendar or time selector.",
  },
  {
    type: "matrix",
    label: "Matrix/Grid",
    description:
      "Answer multiple questions with the same set of options in a grid format.",
  },
  {
    type: "slider",
    label: "Slider",
    description: "Select a label by moving a slider along a range.",
  },
  {
    type: "file_upload",
    label: "File Upload",
    description: "Upload a file as a response.",
  },
  {
    type: "yes_no",
    label: "Yes/No",
    description: "Choose between 'Yes' or 'No' as an answer.",
  },
  {
    type: "image_choice",
    label: "Image Choice",
    description: "Select an option by clicking on an image.",
  },
];
