import { useSurvey } from "@/context/SurveyResponseContext";
import {
  LongAnswerQuestion,
  MCQQuestion,
  Question,
  ShortAnswerQuestion,
  RatingQuestion,
  CheckboxesQuestion,
  DropdownQuestion,
  RankingQuestion,
  DateTimeQuestion,
  MatrixQuestion,
  SliderQuestion,
  FileUploadQuestion,
  YesNoQuestion,
  ImageChoiceQuestion,
} from "@/types/question";
import Image from "next/image";
import React from "react";

interface QuestionProps {
  question: Question;
}

export const MCQQuestionFill: React.FC<QuestionProps> = ({ question }) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, options } = question as MCQQuestion;

  return (
    <div id={id} className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      {options.map((option, index) => (
        <div key={index} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name={id}
              value={option}
              checked={
                (responses.find((response) => response.questionId === id)
                  ?.answer as string) === option
              }
              onChange={(e) => updateResponse(question, e.target.value)}
            />
            <span className="ml-2">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export const LongAnswerQuestionFill: React.FC<QuestionProps> = ({
  question,
}) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required } = question as LongAnswerQuestion;

  return (
    <div id={id} className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <textarea
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={
          (responses.find((response) => response.questionId === id)
            ?.answer as string) || ""
        }
        onChange={(e) => updateResponse(question, e.target.value)}
        rows={4}
      />
    </div>
  );
};

export const ShortAnswerQuestionFill: React.FC<QuestionProps> = ({
  question,
}) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required } = question as ShortAnswerQuestion;

  return (
    <div id={id} className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <input
        type="text"
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={
          (responses.find((response) => response.questionId === id)
            ?.answer as string) || ""
        }
        onChange={(e) => updateResponse(question, e.target.value)}
      />
    </div>
  );
};

export const RatingQuestionFill: React.FC<QuestionProps> = ({ question }) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, maxRating } = question as RatingQuestion;

  return (
    <div id={id} className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <div className="flex space-x-2">
        {[...Array(maxRating)].map((_, index) => (
          <button
            type="button"
            key={index}
            className={`w-8 h-8 rounded-full ${
              (responses.find((response) => response.questionId === id)
                ?.answer as number) > index
                ? "bg-yellow-400"
                : "bg-gray-200"
            }`}
            onClick={() => updateResponse(question, index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export const CheckboxesQuestionFill: React.FC<QuestionProps> = ({
  question,
}) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, options } = question as CheckboxesQuestion;

  const handleCheckboxChange = (option: string) => {
    const currentAnswers =
      (responses.find((response) => response.questionId === id)
        ?.answer as string[]) || [];
    const updatedAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((item) => item !== option)
      : [...currentAnswers, option];
    updateResponse(question, updatedAnswers);
  };

  return (
    <div id={id} className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      {options.map((option, index) => (
        <div key={index} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              value={option}
              checked={
                (
                  responses.find((response) => response.questionId === id)
                    ?.answer as string[]
                )?.includes(option) || false
              }
              onChange={() => handleCheckboxChange(option)}
            />
            <span className="ml-2">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export const DropdownQuestionFill: React.FC<QuestionProps> = ({ question }) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, options } = question as DropdownQuestion;

  return (
    <div id={id} className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <select
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={
          (responses.find((response) => response.questionId === id)
            ?.answer as string) || ""
        }
        onChange={(e) => updateResponse(question, e.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const RankingQuestionFill: React.FC<QuestionProps> = ({ question }) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, options } = question as RankingQuestion;

  const currentRanking = (responses.find(
    (response) => response.questionId === id
  )?.answer as string[]) || [...options];

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedRanking = [...currentRanking];
    const [reorderedItem] = updatedRanking.splice(fromIndex, 1);
    updatedRanking.splice(toIndex, 0, reorderedItem);
    updateResponse(question, updatedRanking);
  };

  return (
    <div id={id} className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <ul className="space-y-2">
        {currentRanking.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 bg-white p-2 rounded shadow"
          >
            <span className="font-bold">{index + 1}.</span>
            <span>{item}</span>
            <div className="ml-auto space-x-1">
              <button
                type="button"
                onClick={() => moveItem(index, Math.max(0, index - 1))}
                disabled={index === 0}
                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-20"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() =>
                  moveItem(
                    index,
                    Math.min(currentRanking.length - 1, index + 1)
                  )
                }
                disabled={index === currentRanking.length - 1}
                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-20"
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const DateTimeQuestionFill: React.FC<QuestionProps> = ({ question }) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, includeTime } = question as DateTimeQuestion;

  return (
    <div id={id} className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <input
        type={includeTime ? "datetime-local" : "date"}
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={
          (responses.find((response) => response.questionId === id)
            ?.answer as string) || ""
        }
        onChange={(e) => updateResponse(question, e.target.value)}
        max={new Date().toISOString().split("T")[0]}
      />
    </div>
  );
};

export const MatrixQuestionFill: React.FC<QuestionProps> = ({ question }) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, rows, columns } = question as MatrixQuestion;

  const currentAnswers =
    (responses.find((response) => response.questionId === id)?.answer as Record<
      string,
      string
    >) || {};

  const handleChange = (row: string, value: string) => {
    updateResponse(question, { ...currentAnswers, [row]: value });
  };

  return (
    <div id={id} className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th></th>
            {columns.map((column, index) => (
              <th key={index} className="p-2 border">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="p-2 border font-bold">{row}</td>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="p-2 border">
                  <input
                    type="radio"
                    name={`${id}-${row}`}
                    value={column}
                    checked={currentAnswers[row] === column}
                    onChange={() => handleChange(row, column)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const SliderQuestionFill: React.FC<QuestionProps> = ({ question }) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, min, max, step } = question as SliderQuestion;

  return (
    <div id={id} className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        className="w-full"
        value={
          (responses.find((response) => response.questionId === id)
            ?.answer as number) || min
        }
        onChange={(e) => updateResponse(question, parseFloat(e.target.value))}
      />
      <div className="flex justify-between text-xs">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export const FileUploadQuestionFill: React.FC<QuestionProps> = ({
  question,
}) => {
  const { updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, allowedFileTypes } =
    question as FileUploadQuestion;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateResponse(question, file);
  };

  return (
    <div id={id} className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <input
        type="file"
        id={id}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        accept={allowedFileTypes.join(",")}
        onChange={handleFileChange}
      />
      <p className="mt-1 text-sm text-gray-500">
        Allowed file types: {allowedFileTypes.join(", ")}
      </p>
    </div>
  );
};

export const YesNoQuestionFill: React.FC<QuestionProps> = ({ question }) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required } = question as YesNoQuestion;

  return (
    <div id={id} className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <div className="space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name={id}
            value="Yes"
            checked={
              (responses.find((response) => response.questionId === id)
                ?.answer as string) === "Yes"
            }
            onChange={() => updateResponse(question, "Yes")}
          />
          <span className="ml-2">Yes</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name={id}
            value="No"
            checked={
              (responses.find((response) => response.questionId === id)
                ?.answer as string) === "No"
            }
            onChange={() => updateResponse(question, "No")}
          />
          <span className="ml-2">No</span>
        </label>
      </div>
    </div>
  );
};

export const ImageChoiceQuestionFill: React.FC<QuestionProps> = ({
  question,
}) => {
  const { responses, updateResponse, skippedQuestion } = useSurvey();

  const { id, text, required, options } = question as ImageChoiceQuestion;

  return (
    <div id={id} className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {text} {required && <span className="text-red-500">*</span>}{" "}
        {skippedQuestion?.id === question.id && (
          <span className="text-red-900 ms-2">This is a required question</span>
        )}
      </label>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              className="sr-only"
              name={id}
              value={option.label}
              checked={
                (responses.find((response) => response.questionId === id)
                  ?.answer as string) === option.label
              }
              onChange={() => updateResponse(question, option.label)}
            />
            <div className="border-2 rounded-lg p-2 hover:border-blue-500 transition-colors">
              <Image
                src={option.imageUrl}
                alt={option.label}
                className="w-full h-32 object-cover rounded"
              />
              <p className="mt-2 text-center">{option.label}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
