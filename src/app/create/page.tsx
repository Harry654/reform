"use client";
import CreateSurveyQuestionEditor from "@/components/create/CreateSurveyQuestionEditor";
import { useAuth } from "@/context/AuthContext";
import { useQuestion } from "@/context/CreateSurveyContext";
import { ISurvey } from "@/types/survey";
import React, { useEffect, useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config"; // Import Firestore instance
import { BeatLoader } from "react-spinners";
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component

export default function SurveyCreator() {
  const { user } = useAuth();
  const { formMetadata, setFormMetadata, questions, resetSurvey } =
    useQuestion();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormMetadata((prevFormMetadata) => ({
      ...prevFormMetadata,
      createdBy: user?.uid || "",
    }));
  }, [user]);

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    // Determine the correct value based on the input type
    const newValue = type === "checkbox" ? (checked as boolean) : value;

    setFormMetadata((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    if (name === "isAnonymous")
      setFormMetadata((prevData) => ({
        ...prevData,
        allowMultipleResponses: true,
      }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!questions.length) return alert("Add at least one question");
    if (!formMetadata.createdBy)
      return alert("Please login to create a survey");

    const SurveyFormData: ISurvey = {
      ...formMetadata,
      questionCount: questions.length,
      expired: false,
      access_url: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${formMetadata.id}`,
      questions,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      startDate: Timestamp.now(),
      endDate: Timestamp.now(),
      status: "active",
      visibility: "public",
      responsesCount: 0,
      maxResponses: null,
      isAnonymous: true,
      tags: [],
      allowMultipleResponses: true,
      successMessage: null,
    };

    try {
      setLoading(true);
      // Add survey form data to Firestore
      await setDoc(doc(db, "surveys", formMetadata.id), SurveyFormData);
      alert("Survey created successfully!");
      setLoading(false);
      resetSurvey();
    } catch (error) {
      setLoading(false);
      console.error("Error adding survey to Firestore: ", error);
      alert("There was an error submitting the survey. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto h-screen">
        <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Create a New Survey</h2>
          <p className="text-gray-600 mb-6">
            Set up the basic details for your survey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                <option value="product_rating">Product Rating</option>
                <option value="feedback">General Feedback</option>
                <option value="complaints">Complaints</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="surveyType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Survey Type
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="normal"
                    name="type"
                    value="normal"
                    checked={formMetadata.type === "normal"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    required
                  />
                  <label
                    htmlFor="normal"
                    className="ml-2 block text-sm font-medium text-gray-700"
                  >
                    Normal
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="interactive"
                    name="type"
                    value="interactive"
                    checked={formMetadata.type === "interactive"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    required
                  />
                  <label
                    htmlFor="interactive"
                    className="ml-2 block text-sm font-medium text-gray-700"
                  >
                    Interactive
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="isAnonymous"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Anonymous Responses
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  name="isAnonymous"
                  checked={formMetadata.isAnonymous}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="isAnonymous"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Enable Anonymous Responses
                </label>
              </div>
            </div>

            <div className={`${formMetadata.isAnonymous && "opacity-50"}`}>
              <label
                htmlFor="allowMultipleResponses"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Allow Multiple Responses
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowMultipleResponses"
                  name="allowMultipleResponses"
                  checked={formMetadata.allowMultipleResponses}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  disabled={formMetadata.isAnonymous}
                />
                <label
                  htmlFor="allowMultipleResponses"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Allow Multiple Responses
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="successMessage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Success Message (Optional)
              </label>
              <input
                type="text"
                id="successMessage"
                name="successMessage"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                placeholder="Enter a custom message to display after the response has been recorded"
                value={formMetadata.successMessage || ""}
                onChange={handleChange}
              />
            </div>

            <CreateSurveyQuestionEditor />

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {!loading ? (
                "Create Survey"
              ) : (
                <BeatLoader size={10} color="#fff" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
