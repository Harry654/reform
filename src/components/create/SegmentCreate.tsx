import { ISegment } from "@/types/survey";
import React, { useState } from "react";
import CreateSurveyQuestionEditor from "./CreateSurveyQuestionEditor";
import { useQuestion } from "@/context/CreateSurveyContext";
import DeleteIcon from "../icons/DeleteIcon";
import DownArrowIcon from "../icons/DownArrowIcon";
import AddQuestionModal from "../AddQuestionModal";

interface Props {
  segment: ISegment;
}

const SegmentCreate: React.FC<Props> = ({ segment }) => {
  const [segmentOpen, setSegmentOpen] = useState<boolean>(true);
  const { updateSegment, removeSegment, addQuestion } = useQuestion();

  const toggleSegmentOpen = () => setSegmentOpen(!segmentOpen);

  const handleTitleChange = (e: React.FormEvent<HTMLElement>) => {
    const newTitle = e.currentTarget.textContent || "";
    if (newTitle === "") {
      e.currentTarget.textContent = segment.title;
      return;
    }
    updateSegment({ ...segment, title: newTitle });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateSegment({ ...segment, description: value });
  };
  return (
    <section>
      <div className="flex items-center sticky top-0 z-10 backdrop-blur-md">
        <DownArrowIcon
          onClick={toggleSegmentOpen}
          className={`duration-500 ${segmentOpen ? "rotate-0" : "-rotate-90"}`}
        />
        <h1
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={handleTitleChange}
          className="font-bold text-2xl p-2 focus:border-b focus:border-gray-400 outline-none"
        >
          {segment.title}
        </h1>

        <div className="ms-auto space-x-5 flex items-center">
          <AddQuestionModal
            onAddQuestion={(type, segment_id) => {
              addQuestion(type, segment_id);
              setSegmentOpen(true);
            }}
            segment_id={segment.id}
          />
          <DeleteIcon
            color="red"
            onClick={() => removeSegment(segment.id)}
            className="hover:scale-110 duration-200"
          />
        </div>
      </div>

      <div
        className={`${
          segmentOpen ? "segment-expanded" : "segment-collapsed"
        } duration-500 overflow-hidden`}
      >
        <input
          type="text"
          id="description"
          name="description"
          className="mt-5 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-transparent"
          placeholder="Describe this section"
          value={segment.description}
          onChange={handleDescriptionChange}
        />
        <CreateSurveyQuestionEditor segment={segment} />
      </div>
    </section>
  );
};

export default SegmentCreate;
