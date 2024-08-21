import React from "react";

const FeatureItem = ({ icon, title, description }) => (
  <div className="feature-item flex bg-blue-50 rounded-lg p-4 mb-4">
    <img src={icon} alt={title} className="w-12 h-12 mr-4 flex-shrink-0" />
    <div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const TopFeatures = () => {
  const features = [
    {
      icon: "https://www.superprocure.com/wp-content/uploads/2022/11/Freight-Sourcing-and-Reverse-Auctions-1.png",
      title: "Freight Sourcing and Reverse Auctions",
      description:
        "Find, negotiate, and quickly source freight providers' details. Use our transparent and collaborative bidding process.",
    },
    {
      icon: "https://www.superprocure.com/wp-content/uploads/2022/11/Contract-Guided-Online-Indenting-1.png",
      title: "Contract Guided Online Indenting",
      description:
        "Easily create e-indents for your transport service provider from the list of contracted vendors from to facilitate quick vehicle placements.",
    },
    {
      icon: "https://www.superprocure.com/wp-content/uploads/2022/11/In-Plant-Vehicle-Movement-and-Optimization-1.png",
      title: "In-Plant Vehicle Movement and Optimization",
      description:
        "Optimize in-plant vehicle movement through advanced truck reporting, load scheduling, and plant optimization solutions.",
    },
    {
      icon: "https://www.superprocure.com/wp-content/uploads/2022/11/Unified-and-Integrated-Platform-1.png",
      title: "Unified and Integrated Platform",
      description:
        "SuperProcure TMS has one integrated solution to ensure minimal to zero errors in payment documentation, billings, waybills, etc.",
    },
    {
      icon: "https://www.superprocure.com/wp-content/uploads/2022/11/Realtime-Communication-Collaboration-1.png",
      title: "Realtime Communication & Collaboration",
      description:
        "Collaborate across all communication channels through email, text, and push notifications using a unified platform to make faster decisions.",
    },
    {
      icon: "https://www.superprocure.com/wp-content/uploads/2022/11/Dashboards-and-Analytics-1.png",
      title: "Dashboards and Analytics",
      description:
        "Get real-time analytics on vendor performance, dispatch, & delivery details to take complete control over your transport operations.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          QikTrack Top Features & Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeatures;
