import React from "react";

const privacyPolicies: { title: string; description: string }[] = [
  {
    title: "Data Collection",
    description:
      "We collect personal data during the signup process, including your name, email address, and password. This data is used solely for account creation and management purposes.",
  },
  {
    title: "Survey Data",
    description:
      "All survey data created and collected through the app is securely stored and processed. Only authorized users have access to this data, and it is used solely for the purposes of the app.",
  },
  {
    title: "Third-Party Services",
    description:
      "We may integrate with third-party services, such as payment processors or analytics providers. These services are governed by their own privacy policies, and we encourage users to review them.",
  },
  {
    title: "Data Protection",
    description:
      "We take reasonable measures to protect your personal and survey data. However, no online service is completely secure, and we cannot guarantee absolute protection against unauthorized access or data breaches.",
  },
  {
    title: "User Rights",
    description:
      "You have the right to request access to your personal data, request its deletion, or modify it at any time through your account settings. You may also contact our support team for assistance.",
  },
  {
    title: "Cookies",
    description:
      "Our app may use cookies to enhance your experience, including maintaining session data and user preferences. You may disable cookies through your browser settings, but this may affect app functionality.",
  },
  {
    title: "Changes to Privacy Policy",
    description:
      "We reserve the right to update this Privacy Policy at any time. Any changes will be communicated to users via email or through an in-app notification.",
  },
  {
    title: "Data Retention",
    description:
      "We retain personal and survey data as long as your account is active or as needed to provide you with services. You may request deletion of your data at any time.",
  },
  {
    title: "Children's Privacy",
    description:
      "Our app is not intended for use by children under the age of 13. We do not knowingly collect personal information from children without verifiable parental consent.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-4">
        {privacyPolicies.map(({ title, description }, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-2">
              {`${index + 1}. ${title}`}
            </h2>
            <p className="text-gray-700">{description}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
