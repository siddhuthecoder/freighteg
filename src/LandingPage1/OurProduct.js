import React from "react";
import FreightEGicon from "../assets/FreightEGicon.png";
import profferIcon from "../assets/Proffer_logo.png";
import TrackEG from "../assets/QIKTRACKLOGO.png";

const ProductCard = ({ icon, title }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
    <img src={icon} alt={title} className="w-16 h-16 mb-4" />
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <button className="mt-auto bg-blue-600 text-white rounded-full p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
);

const OurProduct = () => {
  const products = [
    {
      icon: FreightEGicon,
      title: "SP Shipment Tracking",
    },
    {
      icon: profferIcon,
      title: "SP Proof of Delivery",
    },
    {
      icon: TrackEG,
      title: "SP Freight Accounting",
    },
  ];

  return (
    <section className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Our Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <p className="mb-4">
              FreightEG offers a one-stop transport management system for all
              your logistics needs. Our logistics management software includes
              products for Freight Sourcing, In Plant Logistics, Indent
              Allocation, Shipment Tracking, Proof of Delivery, and Freight
              Accounting.
            </p>
          </div>
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProduct;
