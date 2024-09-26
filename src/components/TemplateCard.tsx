import React from "react";
import { ITemplate } from "@/types/template";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface TemplateCardProps {
  template: ITemplate;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const router = useRouter();
  const { user } = useAuth();

  const userCanUseTemplate = () => {
    if (user?.subscription.plan.name !== "free" || template.isFree) return true;

    return false;
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {template.title}
        </h3>
        <p className="text-gray-600 mb-4">{template.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {template.survey_data.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => router.push(`/create?t_id=${template.id}`)}
        >
          {userCanUseTemplate() ? "Use Template" : "Upgrade Plan"}
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
