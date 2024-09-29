import { InteractiveSurveyResponse } from "@/components/fill/InteractiveSurveyResponse";
import { ISurvey } from "@/types/survey";
import { Timestamp } from "firebase/firestore";
import React from "react";

function page() {
  const surveyData: ISurvey = {
    access_url:
      "https://reform-ai.vercel.app/s/26802246-4a13-4288-aef7-7323697ae736",
    status: "active",
    endDate: Timestamp.now(),
    category: "feedback",
    type: "interactive",
    createdAt: Timestamp.now(),
    expired: false,
    allowMultipleSubmissions: false,
    id: "26802246-4a13-4288-aef7-7323697ae736",
    description:
      "This survey is designed to gather feedback on customer satisfaction and experience.",
    allowAnonymousResponses: false,
    maxResponses: null,
    startDate: Timestamp.now(),
    tags: [],
    createdBy: "3K9V5D4dVrYmZZOmLC2CeBXasLn2",
    questionCount: 6,
    title: "Customer Feedback",
    successMessage:
      "Thank You for your feedback. Your response has been saved.",
    visibility: "public",
    responsesCount: 0,
    sections: [
      {
        id: "4c718b14-bc29-4d04-8e9d-47f7683f84e4",
        description: "Questions related to overall satisfaction.",
        questions: [
          {
            text: "How satisfied are you with our product/service?",
            id: "4d0a9e87-0c16-4a18-9335-2eea38d11819",
            section_id: "b87d92a8-269a-43ff-ac12-0db7deb74c77",
            required: true,
            type: "mcq",
            options: [
              "Very Satisfied",
              "Satisfied",
              "Neutral",
              "Unsatisfied",
              "Very Unsatisfied",
            ],
          },
          {
            section_id: "1c403dc0-b42e-4566-a43b-6f215ad7bce8",
            id: "10867340-1389-47e0-a4b0-96642b2b022a",
            type: "rating",
            text: "Rate your overall experience on a scale of 1-5.",
            maxRating: 5,
            required: true,
          },
          {
            id: "b550a5e4-01dd-4bc4-8b31-40e2d0e3f000",
            type: "yes_no",
            required: true,
            text: "Would you recommend our product/service to others?",
            section_id: "536db408-3b72-4588-85f6-c76b4d516c04",
          },
        ],
        title: "General Satisfaction",
        isMainSection: true,
      },
      {
        isMainSection: false,
        description: "Questions about the product/service experience.",
        title: "Product/Service Experience",
        id: "90acc091-af99-4d8a-aa59-5aa09be81d72",
        questions: [
          {
            text: "What product/service did you purchase?",
            id: "8ad9cf51-adff-4d6a-8014-e9b2afc43247",
            options: ["Product A", "Product B", "Product C"],
            required: true,
            section_id: "d304654b-8450-44f3-926e-4ddd26219b16",
            type: "dropdown",
          },
          {
            text: "What aspects did you like the most?",
            options: ["Quality", "Price", "Support", "Design", "Usability"],
            required: true,
            id: "9544b2d2-6d0c-47e9-bc35-d2914212d95c",
            section_id: "22a7309d-51b8-454b-bb47-b2926a308c37",
            type: "checkboxes",
          },
          {
            id: "491479bb-26c1-44a1-ae7d-cea308e3f097",
            section_id: "65355bda-4a81-47c5-bffa-083dbaa244bd",
            text: "What could we improve about the product/service?",
            required: false,
            type: "short_answer",
          },
        ],
      },
    ],
    updatedAt: Timestamp.now(),
  };
  return <InteractiveSurveyResponse surveyData={surveyData} />;
}

export default page;
