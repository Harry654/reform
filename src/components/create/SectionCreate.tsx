import { ISection } from "@/types/survey";
import React, { useState } from "react";
import CreateSurveyQuestionEditor from "./CreateSurveyQuestionEditor";
import { useQuestion } from "@/context/CreateSurveyContext";
import DeleteIcon from "../icons/DeleteIcon";
import DownArrowIcon from "../icons/DownArrowIcon";
import AddQuestionModal from "../AddQuestionModal";

interface Props {
  section: ISection;
}

const SectionCreate: React.FC<Props> = ({ section }) => {
  const [sectionOpen, setSectionOpen] = useState<boolean>(true);
  const { updateSection, removeSection, addQuestion } = useQuestion();

  const toggleSectionOpen = () => setSectionOpen(!sectionOpen);

  const handleTitleChange = (e: React.FormEvent<HTMLElement>) => {
    const newTitle = e.currentTarget.textContent || "";
    if (newTitle === "") {
      e.currentTarget.textContent = section.title;
      return;
    }
    updateSection({ ...section, title: newTitle });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateSection({ ...section, description: value });
  };
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border mt-5">
      <div className="flex items-center sticky top-0 z-10 backdrop-blur-md">
        <DownArrowIcon
          onClick={toggleSectionOpen}
          className={`duration-500 ${sectionOpen ? "rotate-0" : "-rotate-90"}`}
        />
        <h1
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={handleTitleChange}
          className="font-bold text-2xl p-2 focus:border-b focus:border-gray-400 outline-none"
        >
          {section.title}
        </h1>

        <div className="ms-auto space-x-5 flex items-center">
          <AddQuestionModal
            onAddQuestion={(type, section_id) => {
              addQuestion(type, section_id);
              setSectionOpen(true);
            }}
            section_id={section.id}
          />
          <DeleteIcon
            color="red"
            onClick={() => removeSection(section.id)}
            className="hover:scale-110 duration-200"
          />
        </div>
      </div>

      <div
        className={`${
          sectionOpen ? "section-expanded" : "section-collapsed"
        } duration-500 overflow-hidden`}
      >
        <input
          type="text"
          id="description"
          name="description"
          className="mt-5 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-transparent"
          placeholder="Describe this section"
          value={section.description}
          onChange={handleDescriptionChange}
        />
        <CreateSurveyQuestionEditor section={section} />
      </div>
    </section>
  );
};

export default SectionCreate;
