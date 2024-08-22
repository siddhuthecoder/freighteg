import React from "react";

const TermsAndConditions = () => {
  const termsContent = [
    {
      title: "Acceptance of Terms",
      text: "By accessing or using Qik Tracking Solution Pvt. Ltd.'s website, you agree to be bound by these Terms and Conditions.",
    },
    {
      title: "User Conduct",
      text: "You agree not to engage in any activity that disrupts or interferes with the functioning of the website or its services.",
    },
    {
      title: "Intellectual Property",
      text: "All content and materials available on the website are protected by intellectual property laws.",
    },
    {
      title: "Limitation of Liability",
      text: "Qik Tracking Solution Pvt. Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the website.",
    },
    {
      title: "Indemnification",
      text: "You agree to indemnify and hold Qik Tracking Solution Pvt. Ltd. harmless from any claims, losses, liabilities, damages, costs, and expenses arising out of or relating to your use of the website.",
    },
    {
      title: "Governing Law",
      text: "These Terms and Conditions shall be governed by and construed in accordance with the laws of INDIA and Jurisdiction will be Gurgaon, Haryana in any cases.",
    },
    {
      title: "Refund Policy",
      text: "Refund is not applicable in any cases.",
    },
  ];

  return (
    <div className="bg-white-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-900">
          Terms & Conditions
        </h1>
        <div className="bg-white p-8 shadow-lg rounded-lg">
          {termsContent.map((term, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
                {term.title}
              </h2>
              <p className="text-gray-700 text-lg">{term.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
