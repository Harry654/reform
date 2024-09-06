"use client";
import Navbar from "@/components/NavBar";
import SurveyQuestionEditor from "@/components/SurveyQuestionEditor";
import React, { useState } from "react";

interface SurveyForm {
  title: string;
  description: string;
  questionCount: number;
  primaryAim: string;
}

export default function SurveyCreator() {
  const [formData, setFormData] = useState<SurveyForm>({
    title: "",
    description: "",
    questionCount: 5,
    primaryAim: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "questionCount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log(formData);
    alert("Survey created successfully!");
  };
return null
  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter survey title"
              value={formData.title}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What is this survey about?"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="50"
              value={formData.questionCount}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="primaryAim"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Primary Aim of the Survey
            </label>
            <select
              id="primaryAim"
              name="primaryAim"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.primaryAim}
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
          >
            Create Survey
          </button>
        </form>
      </div>
    </>
  );
}
