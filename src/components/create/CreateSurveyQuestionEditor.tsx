import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { useQuestion } from "@/context/CreateSurveyContext";
import { ISection } from "@/types/survey";
import DeleteIcon from "../icons/DeleteIcon";

interface Props {
  section: ISection | null;
}

const CreateSurveyQuestionEditor: React.FC<Props> = ({ section }) => {
  const { updateQuestion, removeQuestion } = useQuestion();

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

  if (!section) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AnimatePresence>
        {section.questions.map((question) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border p-4 rounded-lg flex mb-4"
          >
            {renderQuestion(question)}
            <DeleteIcon
              color="red"
              onClick={() => removeQuestion(question.id, question.section_id)}
              className="ms-auto hover:scale-110 duration-200 cursor-pointer"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CreateSurveyQuestionEditor;
