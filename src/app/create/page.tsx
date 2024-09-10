"use client";
import Navbar from "@/components/NavBar";
import SurveyQuestionEditor from "@/components/SurveyQuestionEditor";
import { useAuth } from "@/context/AuthContext";
import { useQuestion } from "@/context/QuestionContext";
import { ISurvey, ISurveyFormMetadata } from "@/types/survey";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config"; // Import Firestore instance
import { BeatLoader } from "react-spinners";

export default function SurveyCreator() {
  const { user } = useAuth();
  const { questions } = useQuestion();
  const [formMetadata, setFormMetadata] = useState<ISurveyFormMetadata>({
    id: uuidv4(),
    title: "",
    description: "",
    category: "",
    createdBy: user?.uid || "",
  });
  // const [error, setError] = useState<string>();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setError("");
    if (loading) return;

    if (!questions.length) return alert("Add at least one question");

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
    };

    try {
      setLoading(true);
      // Add survey form data to Firestore
      await setDoc(doc(db, "surveys", formMetadata.id), SurveyFormData);
      alert("Survey form submitted successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding survey to Firestore: ", error);
      alert("There was an error submitting the survey. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

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

          {/* <div>
            <label
              htmlFor="questionCount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Questions
            </label>
            <input
              type="number"
              id="questionCount"
              name="questionCount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              min="1"
              max="50"
              value={formMetadata.questionCount}
              onChange={handleChange}
              required
            />
          </div> */}

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

          <SurveyQuestionEditor />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {!loading ? "Create Survey" : <BeatLoader size={10} color="#fff" />}
          </button>
        </form>
      </div>
    </>
  );
}
