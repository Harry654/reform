import { ISection } from "@/types/survey";
import React from "react";
import {
  MCQQuestionFill,
  LongAnswerQuestionFill,
  ShortAnswerQuestionFill,
  RatingQuestionFill,
  CheckboxesQuestionFill,
  DropdownQuestionFill,
  RankingQuestionFill,
  DateTimeQuestionFill,
  MatrixQuestionFill,
  SliderQuestionFill,
  FileUploadQuestionFill,
  YesNoQuestionFill,
  ImageChoiceQuestionFill,
} from "./QuestionFillComponents";
interface Props {
  section: ISection | null;
}

const SectionFill: React.FC<Props> = ({ section }) => {
  if (!section) return;
  return (
    <section>
      {!section.isMainSection && (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border mt-5">
          <h1 className="font-bold text-2xl py-2 border-gray-400">
            {section.title}
          </h1>
          <p className="text-md py-2 border-gray-400 italic">{section.description}</p>
        </div>
      )}

      <div>
        {section.questions.map((question, index) => {
          switch (question.type) {
            case "mcq":
              return <MCQQuestionFill key={index} question={question} />;
            case "long_answer":
              return <LongAnswerQuestionFill key={index} question={question} />;
            case "short_answer":
              return (
                <ShortAnswerQuestionFill key={index} question={question} />
              );
            case "rating":
              return <RatingQuestionFill key={index} question={question} />;
            case "checkboxes":
              return <CheckboxesQuestionFill key={index} question={question} />;
            case "dropdown":
              return <DropdownQuestionFill key={index} question={question} />;
            case "ranking":
              return <RankingQuestionFill key={index} question={question} />;
            case "date_time":
              return <DateTimeQuestionFill key={index} question={question} />;
            case "matrix":
              return <MatrixQuestionFill key={index} question={question} />;
            case "slider":
              return <SliderQuestionFill key={index} question={question} />;
            case "file_upload":
              return <FileUploadQuestionFill key={index} question={question} />;
            case "yes_no":
              return <YesNoQuestionFill key={index} question={question} />;
            case "image_choice":
              return (
                <ImageChoiceQuestionFill key={index} question={question} />
              );
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
};

export default SectionFill;
