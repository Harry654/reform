import { ITemplate } from "@/types/template";

export const templates: ITemplate[] = [
  {
    id: "9d22b9c7-b9e0-4ab5-92ba-8a2005df2a29",
    title: "Customer Feedback Survey",
    description:
      "Gather feedback from customers to improve products and services.",
    survey_data: {
      title: "Customer Feedback",
      description:
        "This survey is designed to gather feedback on customer satisfaction and experience.",
      category: "feedback",
      sections: [
        {
          id: "4c718b14-bc29-4d04-8e9d-47f7683f84e4",
          title: "General Satisfaction",
          description: "Questions related to overall satisfaction.",
          questions: [
            {
              id: "4d0a9e87-0c16-4a18-9335-2eea38d11819",
              type: "mcq",
              text: "How satisfied are you with our product/service?",
              required: true,
              section_id: "b87d92a8-269a-43ff-ac12-0db7deb74c77",
              options: [
                "Very Satisfied",
                "Satisfied",
                "Neutral",
                "Unsatisfied",
                "Very Unsatisfied",
              ],
            },
            {
              id: "10867340-1389-47e0-a4b0-96642b2b022a",
              type: "rating",
              text: "Rate your overall experience on a scale of 1-5.",
              required: true,
              section_id: "1c403dc0-b42e-4566-a43b-6f215ad7bce8",
              maxRating: 5,
            },
            {
              id: "b550a5e4-01dd-4bc4-8b31-40e2d0e3f000",
              type: "yes_no",
              text: "Would you recommend our product/service to others?",
              required: true,
              section_id: "536db408-3b72-4588-85f6-c76b4d516c04",
            },
          ],
          isMainSection: true,
        },
        {
          id: "90acc091-af99-4d8a-aa59-5aa09be81d72",
          title: "Product/Service Experience",
          description: "Questions about the product/service experience.",
          questions: [
            {
              id: "8ad9cf51-adff-4d6a-8014-e9b2afc43247",
              type: "dropdown",
              text: "What product/service did you purchase?",
              required: true,
              section_id: "d304654b-8450-44f3-926e-4ddd26219b16",
              options: ["Product A", "Product B", "Product C"],
            },
            {
              id: "9544b2d2-6d0c-47e9-bc35-d2914212d95c",
              type: "checkboxes",
              text: "What aspects did you like the most?",
              required: true,
              section_id: "22a7309d-51b8-454b-bb47-b2926a308c37",
              options: ["Quality", "Price", "Support", "Design", "Usability"],
            },
            {
              id: "491479bb-26c1-44a1-ae7d-cea308e3f097",
              type: "short_answer",
              text: "What could we improve about the product/service?",
              required: false,
              section_id: "65355bda-4a81-47c5-bffa-083dbaa244bd",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["feedback", "customer", "service"],
    },
  },
  {
    id: "ba5f82da-d4de-4a3f-98c4-eb2b3e54d198",
    title: "Employee Engagement Survey",
    description:
      "Assess employee satisfaction, motivation, and engagement within the organization.",
    survey_data: {
      title: "Employee Engagement",
      description:
        "This survey helps measure employee engagement and satisfaction in the workplace.",
      category: "human_resources",
      sections: [
        {
          id: "6e8653f1-a3f8-41c0-a56e-13a38d2e7623",
          title: "Work Environment",
          description: "Questions about the work environment and culture.",
          questions: [
            {
              id: "d36463d8-cebf-4a1f-bcb2-213ab5510802",
              type: "rating",
              text: "How satisfied are you with the work environment?",
              required: true,
              section_id: "8274e3ee-4607-4655-ad86-1f33fcb084f7",
              maxRating: 10,
            },
            {
              id: "242ad096-0de1-42ad-b743-603d01c5be26",
              type: "mcq",
              text: "Do you feel valued in your current role?",
              required: true,
              section_id: "61aaf0a3-caab-49b9-bb0a-dae1d1ce014a",
              options: ["Yes", "No", "Unsure"],
            },
            {
              id: "3c23d654-5a96-485f-af27-1ce5ef3dd6af",
              type: "long_answer",
              text: "What changes would improve the work culture?",
              required: false,
              section_id: "c2477be0-00b3-44d0-abc5-2af07758288a",
            },
          ],
          isMainSection: true,
        },
        {
          id: "16bf45e9-15cf-4e63-8b72-e4421ac21d69",
          title: "Employee Motivation",
          description: "Questions about motivation and career development.",
          questions: [
            {
              id: "756a5357-45bf-42b8-bf10-9a668edec56e",
              type: "checkboxes",
              text: "What motivates you in your work?",
              required: true,
              section_id: "321b3e03-7d7a-4596-a786-9a53d74cf98a",
              options: [
                "Salary",
                "Work-Life Balance",
                "Recognition",
                "Career Growth",
              ],
            },
            {
              id: "12d78db5-10ee-4656-98ad-49561055f534",
              type: "rating",
              text: "On a scale of 1-10, how motivated are you in your role?",
              required: true,
              section_id: "93e9a84a-6d5b-4c5c-ad58-148bec2c878b",
              maxRating: 10,
            },
            {
              id: "0f1a9b97-84a2-4157-a098-fbccfdcf3244",
              type: "short_answer",
              text: "What improvements would help boost your motivation?",
              required: false,
              section_id: "99411781-00e2-410f-85af-4c22fbdb20fa",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["employee", "engagement", "motivation"],
    },
  },
  {
    id: "acf94013-665d-4424-9afa-669139fa5625",
    title: "Event Feedback Survey",
    description:
      "Gather feedback from attendees about their experience at your event.",
    survey_data: {
      title: "Event Feedback",
      description:
        "This survey collects feedback on various aspects of the event experience.",
      category: "events",
      sections: [
        {
          id: "0c353fc7-7d02-468f-af0c-fa4278f8adf4",
          title: "General Event Feedback",
          description: "Questions regarding the overall event experience.",
          questions: [
            {
              id: "52fd8860-4919-46fc-91bf-9c1cf4a03c48",
              type: "rating",
              text: "Rate the event on a scale of 1-10.",
              required: true,
              section_id: "32cd71d8-d029-4b8a-8220-5d539f523f0c",
              maxRating: 10,
            },
            {
              id: "5331ff77-c30f-4d5f-a682-0ad0c6e3c3fc",
              type: "yes_no",
              text: "Would you attend another event like this?",
              required: true,
              section_id: "e181c4f4-eae8-409f-9a94-d54e3209a122",
            },
            {
              id: "3c976ea1-05d8-401a-982c-8f241e9462c2",
              type: "short_answer",
              text: "What was your favorite part of the event?",
              required: false,
              section_id: "51430604-40ea-4f29-bb1c-951b7d518afc",
            },
          ],
          isMainSection: true,
        },
        {
          id: "8f303e7d-128e-49a6-80ab-c09fa67f3680",
          title: "Speaker Feedback",
          description:
            "Feedback regarding the event speakers and presentations.",
          questions: [
            {
              id: "65e52677-007a-4e67-8f03-be210bb6b70c",
              type: "mcq",
              text: "Which speaker did you enjoy the most?",
              required: true,
              section_id: "fc061cf8-5437-4926-9690-26ecafe2cab4",
              options: ["Speaker A", "Speaker B", "Speaker C"],
            },
            {
              id: "4b6c5e88-1445-4d47-8752-7e90a21a8cfe",
              type: "long_answer",
              text: "What could the speakers improve?",
              required: false,
              section_id: "8ea19305-913d-4358-81d1-7fc0128f6ac2",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["event", "feedback", "speaker"],
    },
  },
];
