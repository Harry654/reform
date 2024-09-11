import React from "react";

import { Question } from "@/types/question";
import {
  MCQQuestionComponent,
  ShortAnswerQuestionComponent,
  LongAnswerQuestionComponent,
  RatingQuestionComponent,
  CheckboxesQuestionComponent,
  DropdownQuestionComponent,
  RankingQuestionComponent,
  DateTimeQuestionComponent,
  MatrixQuestionComponent,
  SliderQuestionComponent,
  FileUploadQuestionComponent,
  YesNoQuestionComponent,
  ImageChoiceQuestionComponent,
} from "./QuestionComponents";
import { surveyQuestions } from "@/constants/question_types";
import { useQuestion } from "@/context/CreateSurveyContext";
import { ISegment } from "@/types/survey";
interface Props {
  segment: ISegment | null;
}

const CreateSurveyQuestionEditor: React.FC<Props> = ({ segment }) => {
  const { addQuestion, updateQuestion, removeQuestion } = useQuestion();

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "mcq":
        return (
          <MCQQuestionComponent question={question} onUpdate={updateQuestion} />
        );
      case "short_answer":
        return (
          <ShortAnswerQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "long_answer":
        return (
          <LongAnswerQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "rating":
        return (
          <RatingQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "checkboxes":
        return (
          <CheckboxesQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "dropdown":
        return (
          <DropdownQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "ranking":
        return (
          <RankingQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "date_time":
        return (
          <DateTimeQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "matrix":
        return (
          <MatrixQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "slider":
        return (
          <SliderQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "file_upload":
        return (
          <FileUploadQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "yes_no":
        return (
          <YesNoQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      case "image_choice":
        return (
          <ImageChoiceQuestionComponent
            question={question}
            onUpdate={updateQuestion}
          />
        );
      default:
        return null;
    }
  };
  if (!segment) return null;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        {segment.questions.map((question) => (
          <div key={question.id} className="border p-4 rounded-lg">
            {renderQuestion(question)}
            <button
              type="button"
              onClick={() => removeQuestion(question.id, question.segment_id)}
              className="mt-4 px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-100"
            >
              Remove Question
            </button>
          </div>
        ))}
      </div>
      <details>
        <summary>Add Question</summary>
        <div className="mt-6 space-x-4 space-y-4">
          {surveyQuestions.map(({ code, value }, index) => (
            <button
              key={code}
              type="button"
              onClick={() => addQuestion(code, segment.id)}
              className={`px-4 py-2 text-white rounded ${
                index % 2 === 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Add {value}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
};

export default CreateSurveyQuestionEditor;
