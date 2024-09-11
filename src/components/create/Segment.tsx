import { ISegment } from "@/types/survey";
import React, { useState } from "react";
import CreateSurveyQuestionEditor from "./CreateSurveyQuestionEditor";
import { useQuestion } from "@/context/CreateSurveyContext";

interface Props {
  segment: ISegment;
}

const Segment: React.FC<Props> = ({ segment }) => {
  const [segmentOpen, setSegmentOpen] = useState<boolean>(true);
  const { updateSegment, removeSegment } = useQuestion();

  const toggleSegmentOpen = () => setSegmentOpen(!segmentOpen);

  const handleTitleChange = (e: React.FormEvent<HTMLElement>) => {
    const newTitle = e.currentTarget.textContent || "";
    if (newTitle === "") {
      e.currentTarget.textContent = segment.title;
      return;
    }
    updateSegment({ ...segment, title: newTitle });
  };
  return (
    <section>
      <div className="flex items-center">
        <span onClick={toggleSegmentOpen}>
          {segmentOpen ? "close" : "open"}
        </span>
        <h1
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={handleTitleChange}
          className="font-bold text-2xl p-2 border-gray-400"
        >
          {segment.title}
        </h1>
      </div>
      <button
        type="button"
        onClick={() => removeSegment(segment.id)}
        className="mt-4 px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-100"
      >
        Remove Segment
      </button>
      <div className={segmentOpen ? "segment-expanded" : "segment-collapsed"}>
        <CreateSurveyQuestionEditor segment={segment} />
      </div>
    </section>
  );
};

export default Segment;
