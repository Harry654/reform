import { ITemplate } from "@/types/template";

export const templates: ITemplate[] = [
  {
    id: "9d22b9c7-b9e0-4ab5-92ba-8a2005df2a29",
    title: "Customer Feedback Survey",
    description:
      "Gather feedback from customers to improve products and services.",
    isFree: true,
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
    isFree: false,
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
    isFree: true,
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
  {
    id: "f8c7e9d6-3b2a-4f1c-9e5d-1a2b3c4d5e6f",
    title: "Product Launch Feedback Survey",
    description: "Gather feedback on a newly launched product or feature.",
    isFree: false,
    survey_data: {
      title: "New Product Feedback",
      description:
        "Help us improve our new product by sharing your thoughts and experiences.",
      category: "product_rating",
      sections: [
        {
          id: "a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p",
          title: "Product Usage",
          description: "Questions about your experience using the new product.",
          questions: [
            {
              id: "q1w2e3r4-t5y6-u7i8-o9p0-a1s2d3f4g5h6",
              type: "rating",
              text: "How would you rate the overall quality of the new product?",
              required: true,
              section_id: "a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p",
              maxRating: 5,
            },
            {
              id: "z1x2c3v4-b5n6-m7k8-l9j0-h1g2f3d4s5a6",
              type: "mcq",
              text: "How often do you use the new product?",
              required: true,
              section_id: "a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p",
              options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
            },
            {
              id: "p1o2i3u4-y5t6-r7e8-w9q0-m1n2b3v4c5x6",
              type: "long_answer",
              text: "What features do you find most useful in the new product?",
              required: false,
              section_id: "a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p",
            },
          ],
          isMainSection: true,
        },
        {
          id: "j1k2l3m4-n5o6-p7q8-r9s0-t1u2v3w4x5y6",
          title: "Improvement Suggestions",
          description: "Help us enhance the product with your suggestions.",
          questions: [
            {
              id: "d1f2g3h4-j5k6-l7z8-x9c0-v1b2n3m4q5w6",
              type: "checkboxes",
              text: "Which areas of the product need improvement?",
              required: true,
              section_id: "j1k2l3m4-n5o6-p7q8-r9s0-t1u2v3w4x5y6",
              options: [
                "Performance",
                "User Interface",
                "Features",
                "Documentation",
                "Support",
              ],
            },
            {
              id: "e1r2t3y4-u5i6-o7p8-a9s0-d1f2g3h4j5k6",
              type: "short_answer",
              text: "What additional features would you like to see in future updates?",
              required: false,
              section_id: "j1k2l3m4-n5o6-p7q8-r9s0-t1u2v3w4x5y6",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["product", "feedback", "launch"],
    },
  },
  {
    id: "a7b8c9d0-e1f2-3g4h-5i6j-7k8l9m0n1o2",
    title: "Website Usability Survey",
    description: "Evaluate the user experience and usability of a website.",
    isFree: true,
    survey_data: {
      title: "Website Usability Feedback",
      description:
        "Help us improve our website by sharing your experience and suggestions.",
      category: "feedback",
      sections: [
        {
          id: "p3q4r5s6-t7u8-v9w0-x1y2-z3a4b5c6d7e8",
          title: "Navigation and Design",
          description: "Questions about website navigation and overall design.",
          questions: [
            {
              id: "f9g0h1i2-j3k4-l5m6-n7o8-p9q0r1s2t3u4",
              type: "rating",
              text: "How easy is it to navigate our website?",
              required: true,
              section_id: "p3q4r5s6-t7u8-v9w0-x1y2-z3a4b5c6d7e8",
              maxRating: 5,
            },
            {
              id: "v5w6x7y8-z9a0-b1c2-d3e4-f5g6h7i8j9k0",
              type: "mcq",
              text: "How would you describe the overall design of our website?",
              required: true,
              section_id: "p3q4r5s6-t7u8-v9w0-x1y2-z3a4b5c6d7e8",
              options: [
                "Modern",
                "Clean",
                "Cluttered",
                "Outdated",
                "Confusing",
              ],
            },
            {
              id: "l1m2n3o4-p5q6-r7s8-t9u0-v1w2x3y4z5a6",
              type: "yes_no",
              text: "Were you able to find the information you were looking for easily?",
              required: true,
              section_id: "p3q4r5s6-t7u8-v9w0-x1y2-z3a4b5c6d7e8",
            },
          ],
          isMainSection: true,
        },
        {
          id: "b7c8d9e0-f1g2-h3i4-j5k6-l7m8n9o0p1q2",
          title: "Content and Functionality",
          description: "Feedback on website content and features.",
          questions: [
            {
              id: "r3s4t5u6-v7w8-x9y0-z1a2-b3c4d5e6f7g8",
              type: "checkboxes",
              text: "Which features of our website do you find most useful?",
              required: true,
              section_id: "b7c8d9e0-f1g2-h3i4-j5k6-l7m8n9o0p1q2",
              options: [
                "Search functionality",
                "Product catalog",
                "User reviews",
                "FAQ section",
                "Contact form",
              ],
            },
            {
              id: "h9i0j1k2-l3m4-n5o6-p7q8-r9s0t1u2v3w4",
              type: "long_answer",
              text: "What additional content or features would you like to see on our website?",
              required: false,
              section_id: "b7c8d9e0-f1g2-h3i4-j5k6-l7m8n9o0p1q2",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["website", "usability", "user experience"],
    },
  },
  {
    id: "x5y6z7a8-b9c0-d1e2-f3g4-h5i6j7k8l9m0",
    title: "Customer Service Complaint Survey",
    description: "Gather details about customer service issues and complaints.",
    isFree: false,
    survey_data: {
      title: "Customer Service Complaint Form",
      description:
        "We're sorry you had a negative experience. Please help us improve by providing details about your complaint.",
      category: "complaints",
      sections: [
        {
          id: "n1o2p3q4-r5s6-t7u8-v9w0-x1y2z3a4b5c6",
          title: "Complaint Details",
          description:
            "Information about the nature and context of your complaint.",
          questions: [
            {
              id: "d7e8f9g0-h1i2-j3k4-l5m6-n7o8p9q0r1s2",
              type: "dropdown",
              text: "What department does your complaint concern?",
              required: true,
              section_id: "n1o2p3q4-r5s6-t7u8-v9w0-x1y2z3a4b5c6",
              options: ["Sales", "Support", "Billing", "Technical", "Other"],
            },
            {
              id: "t3u4v5w6-x7y8-z9a0-b1c2-d3e4f5g6h7i8",
              type: "long_answer",
              text: "Please describe your complaint in detail.",
              required: true,
              section_id: "n1o2p3q4-r5s6-t7u8-v9w0-x1y2z3a4b5c6",
            },
            {
              id: "j9k0l1m2-n3o4-p5q6-r7s8-t9u0v1w2x3y4",
              type: "date_time",
              text: "When did this issue occur?",
              required: true,
              section_id: "n1o2p3q4-r5s6-t7u8-v9w0-x1y2z3a4b5c6",
              includeTime: false,
            },
          ],
          isMainSection: true,
        },
        {
          id: "z5a6b7c8-d9e0-f1g2-h3i4-j5k6l7m8n9o0",
          title: "Resolution and Follow-up",
          description: "Help us understand how to resolve your complaint.",
          questions: [
            {
              id: "p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6",
              type: "mcq",
              text: "How would you like us to resolve this issue?",
              required: true,
              section_id: "z5a6b7c8-d9e0-f1g2-h3i4-j5k6l7m8n9o0",
              options: [
                "Refund",
                "Replacement",
                "Apology",
                "Explanation",
                "Other",
              ],
            },
            {
              id: "f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2",
              type: "yes_no",
              text: "Would you like a follow-up call from our customer service team?",
              required: true,
              section_id: "z5a6b7c8-d9e0-f1g2-h3i4-j5k6l7m8n9o0",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["complaint", "customer service", "resolution"],
    },
  },
  {
    id: "v3w4x5y6-z7a8-b9c0-d1e2-f3g4h5i6j7k8",
    title: "Employee Training Needs Assessment",
    description: "Identify training needs and preferences among employees.",
    isFree: true,
    survey_data: {
      title: "Employee Training Needs Assessment",
      description:
        "Help us tailor our training programs to meet your needs and career goals.",
      category: "human_resources",
      sections: [
        {
          id: "l9m0n1o2-p3q4-r5s6-t7u8-v9w0x1y2z3a4",
          title: "Current Skills and Knowledge",
          description:
            "Assess your current skill level and areas of expertise.",
          questions: [
            {
              id: "b5c6d7e8-f9g0-h1i2-j3k4-l5m6n7o8p9q0",
              type: "matrix",
              text: "Rate your proficiency in the following areas:",
              required: true,
              section_id: "l9m0n1o2-p3q4-r5s6-t7u8-v9w0x1y2z3a4",
              rows: [
                "Technical skills",
                "Communication skills",
                "Leadership skills",
                "Project management",
              ],
              columns: ["Beginner", "Intermediate", "Advanced", "Expert"],
            },
            {
              id: "r1s2t3u4-v5w6-x7y8-z9a0-b1c2d3e4f5g6",
              type: "checkboxes",
              text: "Which of the following software tools do you use regularly?",
              required: true,
              section_id: "l9m0n1o2-p3q4-r5s6-t7u8-v9w0x1y2z3a4",
              options: [
                "Microsoft Office",
                "Adobe Creative Suite",
                "Project management tools",
                "CRM software",
                "Data analysis tools",
              ],
            },
          ],
          isMainSection: true,
        },
        {
          id: "h7i8j9k0-l1m2-n3o4-p5q6-r7s8t9u0v1w2",
          title: "Training Preferences",
          description:
            "Tell us about your preferred training methods and topics.",
          questions: [
            {
              id: "x3y4z5a6-b7c8-d9e0-f1g2-h3i4j5k6l7m8",
              type: "ranking",
              text: "Rank the following training methods in order of preference:",
              required: true,
              section_id: "h7i8j9k0-l1m2-n3o4-p5q6-r7s8t9u0v1w2",
              options: [
                "In-person workshops",
                "Online courses",
                "Mentoring",
                "On-the-job training",
                "Conferences",
              ],
            },
            {
              id: "n9o0p1q2-r3s4-t5u6-v7w8-x9y0z1a2b3c4",
              type: "long_answer",
              text: "What specific skills or knowledge areas would you like to develop?",
              required: false,
              section_id: "h7i8j9k0-l1m2-n3o4-p5q6-r7s8t9u0v1w2",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["training", "skills", "employee development"],
    },
  },
  {
    id: "d5e6f7g8-h9i0-j1k2-l3m4-n5o6p7q8r9s0",
    title: "Conference Feedback Survey",
    description:
      "Gather feedback from attendees about various aspects of a conference.",
    isFree: false,
    survey_data: {
      title: "Conference Feedback",
      description:
        "Help us improve future conferences by sharing your thoughts and experiences.",
      category: "events",
      sections: [
        {
          id: "t1u2v3w4-x5y6-z7a8-b9c0-d1e2f3g4h5i6",
          title: "Overall Experience",
          description: "Rate your overall conference experience.",
          questions: [
            {
              id: "j7k8l9m0-n1o2-p3q4-r5s6-t7u8v9w0x1y2",
              type: "rating",
              text: "How would you rate your overall conference experience?",
              required: true,
              section_id: "t1u2v3w4-x5y6-z7a8-b9c0-d1e2f3g4h5i6",
              maxRating: 10,
            },
            {
              id: "z3a4b5c6-d7e8-f9g0-h1i2-j3k4l5m6n7o8",
              type: "yes_no",
              text: "Would you recommend this conference to colleagues?",
              required: true,
              section_id: "t1u2v3w4-x5y6-z7a8-b9c0-d1e2f3g4h5i6",
            },
            {
              id: "p9q0r1s2-t3u4-v5w6-x7y8-z9a0b1c2d3e4",
              type: "short_answer",
              text: "What was the most valuable aspect of the conference for you?",
              required: false,
              section_id: "t1u2v3w4-x5y6-z7a8-b9c0-d1e2f3g4h5i6",
            },
          ],
          isMainSection: true,
        },
        {
          id: "f5g6h7i8-j9k0-l1m2-n3o4-p5q6r7s8t9u0",
          title: "Session Feedback",
          description:
            "Provide feedback on the conference sessions and speakers.",
          questions: [
            {
              id: "v1w2x3y4-z5a6-b7c8-d9e0-f1g2h3i4j5k6",
              type: "matrix",
              text: "Rate the following aspects of the conference sessions:",
              required: true,
              section_id: "f5g6h7i8-j9k0-l1m2-n3o4-p5q6r7s8t9u0",
              rows: [
                "Content relevance",
                "Speaker knowledge",
                "Presentation quality",
                "Q&A session",
              ],
              columns: ["Poor", "Fair", "Good", "Excellent"],
            },
            {
              id: "l7m8n9o0-p1q2-r3s4-t5u6-v7w8x9y0z1a2",
              type: "long_answer",
              text: "What topics would you like to see covered in future conferences?",
              required: false,
              section_id: "f5g6h7i8-j9k0-l1m2-n3o4-p5q6r7s8t9u0",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["conference", "feedback", "event"],
    },
  },
  {
    id: "b3c4d5e6-f7g8-h9i0-j1k2-l3m4n5o6p7q8",
    title: "Restaurant Customer Satisfaction Survey",
    description:
      "Gather feedback from diners about their restaurant experience.",
    isFree: true,
    survey_data: {
      title: "Dining Experience Feedback",
      description:
        "Help us enhance your dining experience by sharing your thoughts and suggestions.",
      category: "feedback",
      sections: [
        {
          id: "r9s0t1u2-v3w4-x5y6-z7a8-b9c0d1e2f3g4",
          title: "Food and Service",
          description:
            "Rate the quality of food and service during your visit.",
          questions: [
            {
              id: "h5i6j7k8-l9m0-n1o2-p3q4-r5s6t7u8v9w0",
              type: "rating",
              text: "How would you rate the overall quality of the food?",
              required: true,
              section_id: "r9s0t1u2-v3w4-x5y6-z7a8-b9c0d1e2f3g4",
              maxRating: 5,
            },
            {
              id: "x1y2z3a4-b5c6-d7e8-f9g0-h1i2j3k4l5m6",
              type: "rating",
              text: "How would you rate the service provided by our staff?",
              required: true,
              section_id: "r9s0t1u2-v3w4-x5y6-z7a8-b9c0d1e2f3g4",
              maxRating: 5,
            },
            {
              id: "n7o8p9q0-r1s2-t3u4-v5w6-x7y8z9a0b1c2",
              type: "mcq",
              text: "How long did you wait for your food to arrive?",
              required: true,
              section_id: "r9s0t1u2-v3w4-x5y6-z7a8-b9c0d1e2f3g4",
              options: [
                "Less than 15 minutes",
                "15-30 minutes",
                "30-45 minutes",
                "More than 45 minutes",
              ],
            },
          ],
          isMainSection: true,
        },
        {
          id: "d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8",
          title: "Ambiance and Overall Experience",
          description:
            "Share your thoughts on the restaurant atmosphere and overall experience.",
          questions: [
            {
              id: "t9u0v1w2-x3y4-z5a6-b7c8-d9e0f1g2h3i4",
              type: "checkboxes",
              text: "Which aspects of our restaurant did you enjoy the most?",
              required: true,
              section_id: "d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8",
              options: [
                "Food quality",
                "Service",
                "Ambiance",
                "Cleanliness",
                "Value for money",
              ],
            },
            {
              id: "j5k6l7m8-n9o0-p1q2-r3s4-t5u6v7w8x9y0",
              type: "yes_no",
              text: "Would you recommend our restaurant to friends and family?",
              required: true,
              section_id: "d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8",
            },
            {
              id: "z1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
              type: "long_answer",
              text: "Do you have any suggestions for improving our restaurant?",
              required: false,
              section_id: "d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["restaurant", "dining", "customer satisfaction"],
    },
  },
  {
    id: "p7q8r9s0-t1u2-v3w4-x5y6-z7a8b9c0d1e2",
    title: "Product Return Feedback Survey",
    description:
      "Gather information about product returns and customer satisfaction with the return process.",
    isFree: true,
    survey_data: {
      title: "Product Return Feedback",
      description:
        "Help us improve our products and return process by sharing your experience.",
      category: "product_rating",
      sections: [
        {
          id: "f3g4h5i6-j7k8-l9m0-n1o2-p3q4r5s6t7u8",
          title: "Return Reason",
          description: "Tell us why you returned the product.",
          questions: [
            {
              id: "v9w0x1y2-z3a4-b5c6-d7e8-f9g0h1i2j3k4",
              type: "dropdown",
              text: "What was the main reason for returning the product?",
              required: true,
              section_id: "f3g4h5i6-j7k8-l9m0-n1o2-p3q4r5s6t7u8",
              options: [
                "Defective",
                "Wrong size",
                "Not as described",
                "Changed mind",
                "Received wrong item",
                "Other",
              ],
            },
            {
              id: "l5m6n7o8-p9q0-r1s2-t3u4-v5w6x7y8z9a0",
              type: "long_answer",
              text: "Please provide more details about why you returned the product.",
              required: false,
              section_id: "f3g4h5i6-j7k8-l9m0-n1o2-p3q4r5s6t7u8",
            },
          ],
          isMainSection: true,
        },
        {
          id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6",
          title: "Return Process Feedback",
          description: "Rate your experience with our return process.",
          questions: [
            {
              id: "r7s8t9u0-v1w2-x3y4-z5a6-b7c8d9e0f1g2",
              type: "rating",
              text: "How would you rate the ease of our return process?",
              required: true,
              section_id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6",
              maxRating: 5,
            },
            {
              id: "h3i4j5k6-l7m8-n9o0-p1q2-r3s4t5u6v7w8",
              type: "yes_no",
              text: "Did you receive a refund within the promised timeframe?",
              required: true,
              section_id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6",
            },
            {
              id: "x9y0z1a2-b3c4-d5e6-f7g8-h9i0j1k2l3m4",
              type: "short_answer",
              text: "How can we improve our return process?",
              required: false,
              section_id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: ["product return", "customer feedback", "quality improvement"],
    },
  },
  {
    id: "mf001-a1b2-c3d4-e5f6-g7h8i9j0k1l2",
    title: "Market Feasibility Survey for Startup Product",
    description:
      "Assess market demand and feasibility for a new product or service before development.",
    isFree: true,
    survey_data: {
      title: "Product Market Feasibility Study",
      description:
        "Help us understand your needs and preferences to shape our upcoming product. Your input is invaluable in ensuring we create something truly useful and desirable.",
      category: "product_rating",
      sections: [
        {
          id: "mfs001-m3n4-o5p6-q7r8-s9t0u1v2w3x4",
          title: "Problem Identification",
          description:
            "Help us understand the challenges you face that our product might solve.",
          questions: [
            {
              id: "mfq001-y5z6-a7b8-c9d0-e1f2g3h4i5j6",
              type: "long_answer",
              text: "What are the biggest challenges you face in [relevant area of focus]?",
              required: true,
              section_id: "mfs001-m3n4-o5p6-q7r8-s9t0u1v2w3x4",
            },
            {
              id: "mfq002-k7l8-m9n0-p1q2-r3s4t5u6v7w8",
              type: "rating",
              text: "How significant is this problem in your daily life or work?",
              required: true,
              section_id: "mfs001-m3n4-o5p6-q7r8-s9t0u1v2w3x4",
              maxRating: 5,
            },
            {
              id: "mfq003-x9y0-z1a2-b3c4-d5e6f7g8h9i0",
              type: "mcq",
              text: "How often do you encounter this problem?",
              required: true,
              section_id: "mfs001-m3n4-o5p6-q7r8-s9t0u1v2w3x4",
              options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
            },
          ],
          isMainSection: true,
        },
        {
          id: "mfs002-j1k2-l3m4-n5o6-p7q8r9s0t1u2",
          title: "Current Solutions",
          description: "Tell us about how you currently address this problem.",
          questions: [
            {
              id: "mfq004-v3w4-x5y6-z7a8-b9c0d1e2f3g4",
              type: "checkboxes",
              text: "What methods or tools do you currently use to address this problem? (Select all that apply)",
              required: true,
              section_id: "mfs002-j1k2-l3m4-n5o6-p7q8r9s0t1u2",
              options: [
                "Manual processes",
                "Existing software",
                "Outsourcing",
                "Ignoring the problem",
                "Other",
              ],
            },
            {
              id: "mfq005-h5i6-j7k8-l9m0-n1o2p3q4r5s6",
              type: "rating",
              text: "How satisfied are you with your current solution?",
              required: true,
              section_id: "mfs002-j1k2-l3m4-n5o6-p7q8r9s0t1u2",
              maxRating: 5,
            },
            {
              id: "mfq006-t7u8-v9w0-x1y2-z3a4b5c6d7e8",
              type: "short_answer",
              text: "What do you like most about your current solution?",
              required: false,
              section_id: "mfs002-j1k2-l3m4-n5o6-p7q8r9s0t1u2",
            },
            {
              id: "mfq007-f9g0-h1i2-j3k4-l5m6n7o8p9q0",
              type: "short_answer",
              text: "What do you dislike most about your current solution?",
              required: false,
              section_id: "mfs002-j1k2-l3m4-n5o6-p7q8r9s0t1u2",
            },
          ],
          isMainSection: false,
        },
        {
          id: "mfs003-r1s2-t3u4-v5w6-x7y8z9a0b1c2",
          title: "Proposed Solution Feedback",
          description: "We'd like your thoughts on our proposed solution.",
          questions: [
            {
              id: "mfq008-d3e4-f5g6-h7i8-j9k0l1m2n3o4",
              type: "long_answer",
              text: "Based on the following brief description of our proposed solution, what are your initial thoughts? [Insert brief product description here]",
              required: true,
              section_id: "mfs003-r1s2-t3u4-v5w6-x7y8z9a0b1c2",
            },
            {
              id: "mfq009-p5q6-r7s8-t9u0-v1w2x3y4z5a6",
              type: "rating",
              text: "How likely would you be to use this solution if it were available?",
              required: true,
              section_id: "mfs003-r1s2-t3u4-v5w6-x7y8z9a0b1c2",
              maxRating: 5,
            },
            {
              id: "mfq010-b7c8-d9e0-f1g2-h3i4j5k6l7m8",
              type: "checkboxes",
              text: "Which features would be most important to you? (Select all that apply)",
              required: true,
              section_id: "mfs003-r1s2-t3u4-v5w6-x7y8z9a0b1c2",
              options: [
                "Feature A",
                "Feature B",
                "Feature C",
                "Feature D",
                "Feature E",
              ],
            },
            {
              id: "mfq011-n9o0-p1q2-r3s4-t5u6v7w8x9y0",
              type: "short_answer",
              text: "What additional features would you like to see in this solution?",
              required: false,
              section_id: "mfs003-r1s2-t3u4-v5w6-x7y8z9a0b1c2",
            },
          ],
          isMainSection: false,
        },
        {
          id: "mfs004-z1a2-b3c4-d5e6-f7g8h9i0j1k2",
          title: "Market Potential",
          description:
            "Help us understand the potential market for this solution.",
          questions: [
            {
              id: "mfq012-l3m4-n5o6-p7q8-r9s0t1u2v3w4",
              type: "mcq",
              text: "How much would you be willing to pay for this solution?",
              required: true,
              section_id: "mfs004-z1a2-b3c4-d5e6-f7g8h9i0j1k2",
              options: [
                "$0-$50",
                "$51-$100",
                "$101-$250",
                "$251-$500",
                "More than $500",
              ],
            },
            {
              id: "mfq013-x5y6-z7a8-b9c0-d1e2f3g4h5i6",
              type: "dropdown",
              text: "How often would you use this solution?",
              required: true,
              section_id: "mfs004-z1a2-b3c4-d5e6-f7g8h9i0j1k2",
              options: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
            },
            {
              id: "mfq014-j7k8-l9m0-n1o2-p3q4r5s6t7u8",
              type: "yes_no",
              text: "Would you recommend this solution to others in your industry?",
              required: true,
              section_id: "mfs004-z1a2-b3c4-d5e6-f7g8h9i0j1k2",
            },
            {
              id: "mfq015-v9w0-x1y2-z3a4-b5c6d7e8f9g0",
              type: "long_answer",
              text: "What factors would influence your decision to purchase and use this solution?",
              required: false,
              section_id: "mfs004-z1a2-b3c4-d5e6-f7g8h9i0j1k2",
            },
          ],
          isMainSection: false,
        },
      ],
      tags: [
        "market research",
        "product feasibility",
        "startup",
        "customer feedback",
      ],
    },
  },
];
