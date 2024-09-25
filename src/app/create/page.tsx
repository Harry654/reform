"use client";
import CreateSurveyQuestionEditor from "@/components/create/CreateSurveyQuestionEditor";
import { useAuth } from "@/context/AuthContext";
import { useQuestion } from "@/context/CreateSurveyContext";
import { ISurvey } from "@/types/survey";
import React, { useEffect, useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BeatLoader } from "react-spinners";
import SectionCreate from "@/components/create/SectionCreate";
import SurveySettings from "@/components/SurveySettings";
import AddQuestionModal from "@/components/AddQuestionModal";
import AddIcon from "@/components/icons/AddIcon";
import { useSearchParams } from "next/navigation";
import { templates } from "@/constants/template_data";
import { survey_categories } from "@/constants/survey_categories";
import AccessURLModal from "@/components/AccessURLModal";
import FullPageLoader from "@/components/FullPageLoader";
import Frame from "@/components/layout/Frame";

export default function SurveyCreator() {
  const { user } = useAuth();
  const {
    formMetadata,
    setFormMetadata,
    setTemplate,
    sections,
    addSection,
    addQuestion,
    resetSurvey,
  } = useQuestion();
  const searchParams = useSearchParams();
  const t_id = searchParams.get("t_id");
  const [loading, setLoading] = useState<boolean>(false);
  const [showAccessURLModal, setShowAccessURLModal] = useState<boolean>(false);

  useEffect(() => {
    setFormMetadata((prevFormMetadata) => ({
      ...prevFormMetadata,
      createdBy: user?.uid || "",
    }));
  }, [user]);

  useEffect(() => {
    const template = templates.find((template) => template.id === t_id);
    if (!template) return;

    setTemplate(template);
  }, [t_id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormMetadata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSettingsChanged = (setting: string, value: boolean | string) => {
    setFormMetadata((prevData) => ({
      ...prevData,
      [setting]: value,
    }));

    if (setting === "allowAnonymousResponses")
      setFormMetadata((prevData) => ({
        ...prevData,
        allowMultipleSubmissions: true,
      }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const allQuestions = sections.flatMap((section) => section.questions);
    // if no questions were added, return
    if (!!!allQuestions.length) return alert("Add at least one question");

    if (!formMetadata.createdBy)
      return alert("Please login to create a survey");

    const questionCount = sections.reduce(
      (sum, section) => sum + section.questions.length,
      0
    );
    const SurveyFormData: ISurvey = {
      ...formMetadata,
      questionCount,
      expired: false,
      access_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${formMetadata.id}`,
      sections,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      startDate: Timestamp.now(),
      endDate: Timestamp.now(),
      status: "active",
      visibility: "public",
      responsesCount: 0,
      maxResponses: null,
      tags: [],
    };

    try {
      setLoading(true);
      // Add survey form data to Firestore
      await setDoc(doc(db, "surveys", formMetadata.id), SurveyFormData);
      setLoading(false);

      // display the survey url
      setShowAccessURLModal(true);
    } catch (error) {
      setLoading(false);
      console.error("Error adding survey to Firestore: ", error);
      alert("There was an error submitting the survey. Please try again.");
    }
  };
  const handleCloseAccessURLModal = () => {
    setShowAccessURLModal(false);
    resetSurvey();
  };

  if (!user) return <FullPageLoader />;

  return (
    <Frame>
      {" "}
      <AccessURLModal
        accessUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/s/${formMetadata.id}`}
        isOpen={showAccessURLModal}
        onClose={handleCloseAccessURLModal}
      />
      <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-md">
        <div className="w-full flex justify-end">
          <SurveySettings
            formMetadata={formMetadata}
            onSettingsChange={handleSettingsChanged}
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Create a New Survey</h2>
        <p className="text-gray-600 mb-6">
          Set up the basic details for your survey
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 md:min-w-[600px]">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Survey Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              placeholder="Enter survey title"
              value={formMetadata.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Survey Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              placeholder="What is this survey about?"
              rows={3}
              value={formMetadata.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Primary Aim of the Survey
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              value={formMetadata.category}
              onChange={handleChange}
              required
            >
              <option value="">Select the primary aim</option>
              {survey_categories.map(({ title, label }) => (
                <option key={title} id={title} value={title}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* render the questions for the main section */}
          <div>
            <div className="sticky top-0 backdrop-blur-md">
              <AddQuestionModal
                onAddQuestion={addQuestion}
                section_id="main_section"
              />
            </div>
            <CreateSurveyQuestionEditor
              section={
                sections.find((section) => section.isMainSection) || null
              }
            />
          </div>

          <button
            type="button"
            className="w-min whitespace-nowrap flex items-center gap-2 border border-gray-400 rounded-3xl py-1 px-2 text-sm cursor-pointer hover:scale-105 duration-200"
            onClick={addSection}
            disabled={loading}
          >
            <AddIcon />
            Add Section
          </button>

          {sections
            .filter((section) => !section.isMainSection)
            .map((section) => (
              <SectionCreate key={section.id} section={section} />
            ))}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {!loading ? "Create Survey" : <BeatLoader size={10} color="#fff" />}
          </button>
        </form>
      </div>
    </Frame>
  );
}
