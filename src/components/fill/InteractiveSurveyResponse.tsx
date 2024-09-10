"use client";

import { ISurvey } from "@/types/survey";
import React from "react";

interface InteractiveSurveyResponseProps {
  surveyData: ISurvey;
}

export const InteractiveSurveyResponse: React.FC<
  InteractiveSurveyResponseProps
> = ({ surveyData }) => {
  return (
    <div>
      <p>{surveyData.title}</p>
      {/* code for interactive response here */}
    </div>
  );
};
