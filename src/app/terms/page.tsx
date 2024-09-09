import React from "react";

const terms: { title: string; description: string }[] = [
  {
    title: "Acceptance of Terms",
    description:
      "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.",
  },
  {
    title: "Account Registration",
    description:
      "By registering for an account, you agree to provide accurate and complete information during signup. You are responsible for maintaining the confidentiality of your account credentials.",
  },
  {
    title: "Modifications to Terms",
    description:
      "We reserve the right to change these terms and conditions at any time. Your continued use of the website following the posting of changes to these terms will mean you accept those changes. We will take reasonable steps to notify you of any material changes to this agreement.",
  },
  {
    title: "Privacy Policy",
    description:
      "Please review our Privacy Policy, which also governs your visit to the website, to understand our practices. The Privacy Policy is incorporated into and subject to the terms of this User Agreement.",
  },
  {
    title: "User Conduct",
    description:
      "You agree to use the website only for lawful purposes. You are prohibited from posting on or transmitting through the website any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable material of any kind.",
  },
  {
    title: "Survey Data Ownership",
    description:
      "All survey data created through your account remains your intellectual property. You grant us permission to store and process this data solely for the purpose of operating and improving the app.",
  },
  {
    title: "Prohibited Use",
    description:
      "You agree not to use the app to collect sensitive information such as social security numbers, credit card details, or any other data that violates privacy laws.",
  },
  {
    title: "Payment & Subscription",
    description:
      "If you opt for any paid features or subscriptions, you agree to pay the applicable fees. Failure to do so may result in restricted access to premium features.",
  },
  {
    title: "Termination",
    description:
      "We reserve the right to terminate your account at our discretion if we detect any violation of these terms.",
  },
  {
    title: "Cookies",
    description:
      "Our app may use cookies to enhance user experience, such as maintaining session data.",
  },
];

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="space-y-4">
        {terms.map(({ title, description }, index) => (
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
