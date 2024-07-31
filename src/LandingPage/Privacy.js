import React from "react";

const PrivacyPolicy = () => {
  const privacyContent = [
    {
      title: "Information We Collect",
      text: "We collect personal information such as your name, email address, and payment details when you place an order or sign up for our newsletter.",
    },
    {
      title: "How We Use Your Information",
      text: "We use your information to process your orders, communicate with you, and improve our services.",
    },
    {
      title: "Cookies",
      text: "We use cookies to personalize content, analyze our traffic, and improve your browsing experience.",
    },
    {
      title: "Data Security",
      text: "We take precautions to protect your information both online and offline.",
    },
    {
      title: "Changes to This Privacy Policy",
      text: "We reserve the right to update or change our Privacy Policy at any time.",
    },
  ];

  return (
    <div className="bg-white-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-900">
          Privacy Policy
        </h1>
        <div className="bg-white p-8 shadow-lg rounded-lg">
          {privacyContent.map((item, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
                {item.title}
              </h2>
              <p className="text-gray-700 text-lg">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
