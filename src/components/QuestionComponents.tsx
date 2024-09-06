import React from "react";
import {
  MCQQuestion,
  ShortAnswerQuestion,
  LongAnswerQuestion,
  RatingQuestion,
} from "@/types/question";

interface QuestionProps {
  question:
    | MCQQuestion
    | ShortAnswerQuestion
    | LongAnswerQuestion
    | RatingQuestion;
  onUpdate: (
    updatedQuestion:
      | MCQQuestion
      | ShortAnswerQuestion
      | LongAnswerQuestion
      | RatingQuestion
  ) => void;
}

export const MCQQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const mcqQuestion = question as MCQQuestion;

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...mcqQuestion.options];
    updatedOptions[index] = value;
    onUpdate({ ...mcqQuestion, options: updatedOptions });
  };

  const addOption = () => {
    onUpdate({ ...mcqQuestion, options: [...mcqQuestion.options, ""] });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={mcqQuestion.text}
        onChange={(e) => onUpdate({ ...mcqQuestion, text: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      {mcqQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder={`Option ${index + 1}`}
          />
          <button
            onClick={() =>
              onUpdate({
                ...mcqQuestion,
                options: mcqQuestion.options.filter((_, i) => i !== index),
              })
            }
            className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addOption}
        className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-100"
      >
        Add Option
      </button>
    </div>
  );
};

export const ShortAnswerQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const shortAnswerQuestion = question as ShortAnswerQuestion;

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={shortAnswerQuestion.text}
        onChange={(e) =>
          onUpdate({ ...shortAnswerQuestion, text: e.target.value })
        }
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <input
        type="text"
        className="w-full p-2 border rounded bg-gray-100"
        placeholder="Short answer field (for preview)"
        disabled
      />
    </div>
  );
};

export const LongAnswerQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const longAnswerQuestion = question as LongAnswerQuestion;

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={longAnswerQuestion.text}
        onChange={(e) =>
          onUpdate({ ...longAnswerQuestion, text: e.target.value })
        }
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <textarea
        className="w-full p-2 border rounded bg-gray-100"
        placeholder="Long answer field (for preview)"
        disabled
        rows={3}
      />
    </div>
  );
};

export const RatingQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const ratingQuestion = question as RatingQuestion;

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={ratingQuestion.text}
        onChange={(e) => onUpdate({ ...ratingQuestion, text: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <div className="flex items-center space-x-2">
        <label htmlFor="maxRating" className="font-medium">
          Max Rating:
        </label>
        <input
          type="number"
          id="maxRating"
          value={ratingQuestion.maxRating}
          onChange={(e) =>
            onUpdate({ ...ratingQuestion, maxRating: parseInt(e.target.value) })
          }
          className="w-20 p-2 border rounded"
          min="1"
          max="10"
        />
      </div>
      <div className="flex items-center space-x-2">
        {[...Array(ratingQuestion.maxRating)].map((_, i) => (
          <button
            key={i}
            className="w-8 h-8 text-gray-400 border rounded-full hover:bg-gray-100"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
