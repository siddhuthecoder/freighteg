import React from "react";

const FeatureItem = ({ icon, title, description }) => (
  <div className="feature-item text-center p-4">
    <img src={icon} alt={title} className="mx-auto mb-2 w-16 h-16" />
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: "https://www.superprocure.com/wp-content/uploads/2022/12/smart-freight-sourcing.png",
      title: "Smart Freight Sourcing",
      description:
        "Our intelligent freight sourcing system offers manufacturing and infrastructure companies fast, efficient, and transparent logistic solutions.",
    },
    {
      icon: "https://www.superprocure.com/wp-content/uploads/2022/11/Improve-Business-Agility.png",
      title: "Easy Integration",
      description:
        "SuperProcure has the simplest user interface and easy integration features. It enables faster adoption across all supply chain stakeholders.",
    },
    {
      icon: "https://www.superprocure.com/wp-content/uploads/2022/11/Get-up-to-21-ROI-on-your-investments-with-SuperProcure.png",
      title: "Real-time Analytics",
      description:
        "The all-in-one TMS dashboard offers visibility to insightful logistics data. This ensures real-time collaboration and decision-making much more effortless.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          What Sets Us Apart?
        </h2>
        <p className="text-center text-gray-600 mb-12">
          FreightEG: Maximizing Value in Every Mile
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
