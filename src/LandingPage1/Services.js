import React from "react";

const ServiceItem = ({ title, description }) => (
  <div className="service-item text-center p-4">
    <div className="icon mb-2">🚚</div>
    <h3 className="font-bold">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);

const Services = () => {
  const services = [
    { title: "IN-PLANT LOGISTICS", description: "Optimized in-plant TAT" },
    {
      title: "SHIPMENT TRACKING",
      description: "Real-time shipment visibility",
    },
    {
      title: "PROOF OF DELIVERY",
      description: "Digital delivery confirmation",
    },
    {
      title: "FREIGHT ACCOUNTING",
      description: "Auto-invoicing & reconciliation",
    },
    {
      title: "FREIGHT SOURCING",
      description: "Automated vehicle procurement",
    },
    {
      title: "INDENT ALLOCATION",
      description: "Rule-based vendor allocation",
    },
  ];

  return (
    <div className="services-container grid grid-cols-3 gap-4 p-8">
      {services.map((service, index) => (
        <ServiceItem
          key={index}
          title={service.title}
          description={service.description}
        />
      ))}
    </div>
  );
};

export default Services;
