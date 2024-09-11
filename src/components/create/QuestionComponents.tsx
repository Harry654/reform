import React from "react";
import {
  MCQQuestion,
  ShortAnswerQuestion,
  LongAnswerQuestion,
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
  Question,
} from "@/types/question";

interface QuestionProps {
  question: Question;
  onUpdate: (updatedQuestion: Question) => void;
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

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={mcqQuestion.text}
        onChange={(e) => onUpdate({ ...mcqQuestion, text: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      {mcqQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            required={true}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder={`Option ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => {
              if (mcqQuestion.options.length === 1) return;
              onUpdate({
                ...mcqQuestion,
                options: mcqQuestion.options.filter((_, i) => i !== index),
              });
            }}
            className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
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

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={shortAnswerQuestion.text}
        onChange={(e) =>
          onUpdate({ ...shortAnswerQuestion, text: e.target.value })
        }
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <input
        type="text"
        required={true}
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

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
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

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
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
            onUpdate({ ...ratingQuestion, maxRating: parseInt(e.target.value || "3") })
          }
          className="w-20 p-2 border rounded"
          min="3"
          max="10"
        />
      </div>
      <div className="flex items-center space-x-2">
        {[...Array(ratingQuestion.maxRating)].map((_, i) => (
          <button
            type="button"
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

export const CheckboxesQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const checkboxesQuestion = question as CheckboxesQuestion;

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...checkboxesQuestion.options];
    updatedOptions[index] = value;
    onUpdate({ ...checkboxesQuestion, options: updatedOptions });
  };

  const addOption = () => {
    onUpdate({
      ...checkboxesQuestion,
      options: [...checkboxesQuestion.options, ""],
    });
  };

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={checkboxesQuestion.text}
        onChange={(e) =>
          onUpdate({ ...checkboxesQuestion, text: e.target.value })
        }
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      {checkboxesQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input type="checkbox" disabled className="form-checkbox" />
          <input
            type="text"
            required={true}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder={`Option ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => {
              if (checkboxesQuestion.options.length === 1) return;
              onUpdate({
                ...checkboxesQuestion,
                options: checkboxesQuestion.options.filter(
                  (_, i) => i !== index
                ),
              });
            }}
            className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addOption}
        className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-100"
      >
        Add Option
      </button>
    </div>
  );
};

export const DropdownQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const dropdownQuestion = question as DropdownQuestion;

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...dropdownQuestion.options];
    updatedOptions[index] = value;
    onUpdate({ ...dropdownQuestion, options: updatedOptions });
  };

  const addOption = () => {
    onUpdate({
      ...dropdownQuestion,
      options: [...dropdownQuestion.options, ""],
    });
  };

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={dropdownQuestion.text}
        onChange={(e) =>
          onUpdate({ ...dropdownQuestion, text: e.target.value })
        }
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <select className="w-full p-2 border rounded">
        <option value="">Select an option</option>
        {dropdownQuestion.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {dropdownQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            required={true}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder={`Option ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => {
              if (dropdownQuestion.options.length === 1) return;
              onUpdate({
                ...dropdownQuestion,
                options: dropdownQuestion.options.filter((_, i) => i !== index),
              });
            }}
            className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addOption}
        className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-100"
      >
        Add Option
      </button>
    </div>
  );
};

export const RankingQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const rankingQuestion = question as RankingQuestion;

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...rankingQuestion.options];
    updatedOptions[index] = value;
    onUpdate({ ...rankingQuestion, options: updatedOptions });
  };

  const addOption = () => {
    onUpdate({ ...rankingQuestion, options: [...rankingQuestion.options, ""] });
  };

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={rankingQuestion.text}
        onChange={(e) => onUpdate({ ...rankingQuestion, text: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      {rankingQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="font-bold">{index + 1}.</span>
          <input
            type="text"
            required={true}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder={`Option ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => {
              if (rankingQuestion.options.length === 1) return;
              onUpdate({
                ...rankingQuestion,
                options: rankingQuestion.options.filter((_, i) => i !== index),
              });
            }}
            className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addOption}
        className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-100"
      >
        Add Option
      </button>
    </div>
  );
};

export const DateTimeQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const dateTimeQuestion = question as DateTimeQuestion;

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={dateTimeQuestion.text}
        onChange={(e) =>
          onUpdate({ ...dateTimeQuestion, text: e.target.value })
        }
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <div className="flex items-center space-x-2">
        <input type="date" className="p-2 border rounded" disabled />
        {dateTimeQuestion.includeTime && (
          <input type="time" className="p-2 border rounded" disabled />
        )}
      </div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={dateTimeQuestion.includeTime}
          onChange={(e) =>
            onUpdate({ ...dateTimeQuestion, includeTime: e.target.checked })
          }
          className="form-checkbox"
        />
        <span>Include time</span>
      </label>
    </div>
  );
};

export const MatrixQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const matrixQuestion = question as MatrixQuestion;

  const addRow = () => {
    onUpdate({ ...matrixQuestion, rows: [...matrixQuestion.rows, ""] });
  };

  const addColumn = () => {
    onUpdate({ ...matrixQuestion, columns: [...matrixQuestion.columns, ""] });
  };

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={matrixQuestion.text}
        onChange={(e) => onUpdate({ ...matrixQuestion, text: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th></th>
              {matrixQuestion.columns.map((column, index) => (
                <th key={index} className="p-2">
                  <input
                    type="text"
                    required={true}
                    value={column}
                    onChange={(e) =>
                      onUpdate({
                        ...matrixQuestion,
                        columns: matrixQuestion.columns.map((c, i) =>
                          i === index ? e.target.value : c
                        ),
                      })
                    }
                    className="w-full p-1 border rounded"
                    placeholder={`Column ${index + 1}`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrixQuestion.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2">
                  <input
                    type="text"
                    required={true}
                    value={row}
                    onChange={(e) =>
                      onUpdate({
                        ...matrixQuestion,
                        rows: matrixQuestion.rows.map((r, i) =>
                          i === rowIndex ? e.target.value : r
                        ),
                      })
                    }
                    className="w-full p-1 border rounded"
                    placeholder={`Row ${rowIndex + 1}`}
                  />
                </td>
                {matrixQuestion.columns.map((_, columnIndex) => (
                  <td key={columnIndex} className="p-2">
                    <input type="radio" disabled />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={addRow}
          className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-100"
        >
          Add Row
        </button>
        <button
          type="button"
          onClick={addColumn}
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
        >
          Add Column
        </button>
      </div>
    </div>
  );
};

export const SliderQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const sliderQuestion = question as SliderQuestion;

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={sliderQuestion.text}
        onChange={(e) => onUpdate({ ...sliderQuestion, text: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={sliderQuestion.min}
          onChange={(e) =>
            onUpdate({ ...sliderQuestion, min: parseInt(e.target.value) })
          }
          className="w-20 p-2 border rounded"
          placeholder="Min"
        />
        <input
          type="range"
          min={sliderQuestion.min}
          max={sliderQuestion.max}
          step={sliderQuestion.step}
          className="flex-grow"
          disabled
        />
        <input
          type="number"
          value={sliderQuestion.max}
          onChange={(e) =>
            onUpdate({ ...sliderQuestion, max: parseInt(e.target.value) })
          }
          className="w-20 p-2 border rounded"
          placeholder="Max"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="step" className="font-medium">
          Step:
        </label>
        <input
          type="number"
          id="step"
          value={sliderQuestion.step}
          onChange={(e) =>
            onUpdate({ ...sliderQuestion, step: parseFloat(e.target.value) })
          }
          className="w-20 p-2 border rounded"
          min="0.1"
          step="0.1"
        />
      </div>
    </div>
  );
};

export const FileUploadQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const fileUploadQuestion = question as FileUploadQuestion;

  const handleFileTypeChange = (index: number, value: string) => {
    const updatedFileTypes = [...fileUploadQuestion.allowedFileTypes];
    updatedFileTypes[index] = value;
    onUpdate({ ...fileUploadQuestion, allowedFileTypes: updatedFileTypes });
  };

  const addFileType = () => {
    onUpdate({
      ...fileUploadQuestion,
      allowedFileTypes: [...fileUploadQuestion.allowedFileTypes, ""],
    });
  };

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={fileUploadQuestion.text}
        onChange={(e) =>
          onUpdate({ ...fileUploadQuestion, text: e.target.value })
        }
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <input type="file" disabled className="p-2 border rounded w-full" />
      <div>
        <p className="font-medium mb-2">Allowed File Types:</p>
        {fileUploadQuestion.allowedFileTypes.map((fileType, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              required={true}
              value={fileType}
              onChange={(e) => handleFileTypeChange(index, e.target.value)}
              className="flex-grow p-2 border rounded"
              placeholder="e.g., .pdf, .jpg, .png"
            />
            <button
              type="button"
              onClick={() =>
                onUpdate({
                  ...fileUploadQuestion,
                  allowedFileTypes: fileUploadQuestion.allowedFileTypes.filter(
                    (_, i) => i !== index
                  ),
                })
              }
              className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFileType}
          className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-100"
        >
          Add File Type
        </button>
      </div>
    </div>
  );
};

export const YesNoQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const yesNoQuestion = question as YesNoQuestion;

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={yesNoQuestion.text}
        onChange={(e) => onUpdate({ ...yesNoQuestion, text: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <input type="radio" name="yesno" value="yes" disabled />
          <span>Yes</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="yesno" value="no" disabled />
          <span>No</span>
        </label>
      </div>
    </div>
  );
};

export const ImageChoiceQuestionComponent: React.FC<QuestionProps> = ({
  question,
  onUpdate,
}) => {
  const imageChoiceQuestion = question as ImageChoiceQuestion;

  const handleOptionChange = (
    index: number,
    field: "imageUrl" | "label",
    value: string
  ) => {
    const updatedOptions = [...imageChoiceQuestion.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    onUpdate({ ...imageChoiceQuestion, options: updatedOptions });
  };

  const addOption = () => {
    onUpdate({
      ...imageChoiceQuestion,
      options: [...imageChoiceQuestion.options, { imageUrl: "", label: "" }],
    });
  };

  const toggleRequired = () => {
    onUpdate({ ...question, required: !question.required });
  };

  return (
    <div className="space-y-4">
      <input
        id={question.id + "required"}
        type="checkbox"
        checked={question.required}
        className="form-checkbox"
        onChange={toggleRequired}
      />
      <label htmlFor={question.id + "required"} className="ms-2">
        Required
      </label>
      <input
        type="text"
        required={true}
        value={imageChoiceQuestion.text}
        onChange={(e) =>
          onUpdate({ ...imageChoiceQuestion, text: e.target.value })
        }
        className="w-full p-2 border rounded"
        placeholder="Enter question text"
      />
      {imageChoiceQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            required={true}
            value={option.imageUrl}
            onChange={(e) =>
              handleOptionChange(index, "imageUrl", e.target.value)
            }
            className="flex-grow p-2 border rounded"
            placeholder="Image URL"
          />
          <input
            type="text"
            required={true}
            value={option.label}
            onChange={(e) => handleOptionChange(index, "label", e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="Image Label"
          />
          <button
            type="button"
            onClick={() => {
              if (imageChoiceQuestion.options.length === 1) return;
              onUpdate({
                ...imageChoiceQuestion,
                options: imageChoiceQuestion.options.filter(
                  (_, i) => i !== index
                ),
              });
            }}
            className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addOption}
        className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-100"
      >
        Add Image Option
      </button>
    </div>
  );
};
