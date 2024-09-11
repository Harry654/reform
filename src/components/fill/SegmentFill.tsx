import { ISegment } from "@/types/survey";
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
  segment: ISegment;
}

const SegmentFill: React.FC<Props> = ({ segment }) => {
  return (
    <section>
      <div className="flex items-center">
        <h1 className="font-bold text-2xl p-2 border-gray-400">
          {segment.title}
        </h1>
      </div>
      <div>
        {segment.questions.map((question, index) => {
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

export default SegmentFill;
