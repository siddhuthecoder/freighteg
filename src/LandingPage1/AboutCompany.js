import React from "react";

const AboutCompany = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="http://localhost:3000/static/media/QIKTRACK%20LOGO%20.714ac7e113f6c23f3031.png"
            alt="FreightEG Team Get Set Load..."
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h2 className="text-3xl font-bold mb-4">About The Companyyyy</h2>
          <p className="mb-4">
            At FreightEG, we provide a comprehensive solution for all your
            logistics needs, making us one of India's leading providers for top
            manufacturing and infrastructure companies. Our acclaimed products,
            including Spot Freight Negotiation, Trip Management Systems,
            Contract Management, Dispatch Planning, and Freight Accounting,
            effectively address critical logistics and supply chain challenges.
          </p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            About Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
