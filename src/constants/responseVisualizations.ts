import { TChart } from "@/types/response";

export const responseVisualizations: {
  [key: string]: TChart[];
} = {
  mcq: ["bar-chart", "pie-chart", "donut-chart", "stacked-bar-chart"], // Multiple Choice
  short_answer: ["word-cloud", "bar-chart"], // Short Answer (Text)
  long_answer: ["word-cloud", "bar-chart"], // Long Answer (Text)
  rating: ["bar-chart", "pie-chart", "gauge-chart", "histogram"], // Rating (e.g., stars)
  checkboxes: ["bar-chart", "stacked-bar-chart", "pie-chart", "donut-chart"], // Multiple Selections
  dropdown: ["bar-chart", "pie-chart", "donut-chart"], // Dropdown-based options
  ranking: ["bar-chart", "radar-chart", "stacked-bar-chart"], // Ranking (e.g., order preferences)
  date_time: ["line-graph", "bar-chart", "histogram"], // Date and Time inputs
  matrix: ["bar-chart", "heat-map", "stacked-bar-chart", "radar-chart"], // Matrix (Grid of questions)
  slider: ["bar-chart", "gauge-chart", "line-graph"], // Slider inputs (e.g., range-based questions)
  file_upload: ["bar-chart", "pie-chart"], // File Upload (e.g., count of file types)
  yes_no: ["pie-chart", "donut-chart", "bar-chart"], // Yes/No (Boolean questions)
  image_choice: ["bar-chart", "pie-chart", "stacked-bar-chart"], // Image-based choices
};
