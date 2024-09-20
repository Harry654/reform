import React, { useState } from 'react';
import { ISurvey } from '@/types/survey';

interface SurveyEditViewProps {
  survey: ISurvey;
  onSave: (updatedSurvey: ISurvey) => void;
}

const SurveyEditView: React.FC<SurveyEditViewProps> = ({ survey, onSave }) => {
  const [editedSurvey, setEditedSurvey] = useState<ISurvey>(survey);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedSurvey((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedSurvey);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={editedSurvey.title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={editedSurvey.description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          id="category"
          value={editedSurvey.category}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="product_rating">Product Rating</option>
          <option value="feedback">Feedback</option>
          <option value="complaints">Complaints</option>
          <option value="human_resources">Human Resources</option>
          <option value="events">Events</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <button
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SurveyEditView;