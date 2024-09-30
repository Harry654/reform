"use client";

import React, { Suspense, useState } from "react";
import SearchBar from "@/components/SearchBar";
// import GenerateTemplateModal from "@/components/GenerateTemplateModal";
import TemplateCard from "@/components/TemplateCard";
import { templates } from "@/constants/template_data";
import { ITemplate } from "@/types/template";
import FullPageLoader from "@/components/FullPageLoader";
import Frame from "@/components/layout/Frame";

const SurveyTemplates: React.FC = () => {
  const [searchResults, setSearchResults] = useState<ITemplate[]>(templates);

  const handleSearch = (query: string) => {
    const filtered = templates.filter(
      (template) =>
        template.title.toLowerCase().includes(query.toLowerCase()) ||
        template.description.toLowerCase().includes(query.toLowerCase()) ||
        template.survey_data.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
    );
    setSearchResults(filtered);
  };

  //   const handleGenerateTemplate = (prompt: string) => {
  //     // Here you would typically send the prompt to an API to generate a new template
  //     console.log("Generating template with prompt:", prompt);
  //     // For now, we'll just add a dummy template to the list
  //     // const newTemplate: Template = {
  //     //   id: String(templates.length + 1),
  //     //   title: `Custom Template: ${prompt.slice(0, 20)}...`,
  //     //   description: prompt,
  //     //   tags: ["Custom"],
  //     // };
  //     // setSearchResults([newTemplate, ...searchResults]);
  //   };

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Frame>
        <div className="container mx-auto px-4 py-8">
          {/* <h1 className="text-3xl font-bold text-center mb-8">
            Sample Templates
          </h1> */}
          <div className="flex justify-between items-center mb-8">
            <SearchBar onSearch={handleSearch} />
            {/* <GenerateTemplateModal onGenerateTemplate={handleGenerateTemplate} /> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </Frame>
    </Suspense>
  );
};

export default SurveyTemplates;
