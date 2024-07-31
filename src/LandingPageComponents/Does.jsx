import React from 'react';
import { FaTruck, FaWarehouse, FaIndustry, FaShippingFast, FaBoxes, FaClipboardList } from "react-icons/fa";

const cardsData = [
    { icon: <FaTruck className="text-3xl" />, title: "IN-PLANT LOGISTICS", description: "Optimized in-plant TAT", background: "#FFF2F2" },
    { icon: <FaWarehouse className="text-3xl" />, title: "WAREHOUSING", description: "Safe and secure storage", background: "#FDFBDA" },
    { icon: <FaIndustry className="text-3xl" />, title: "MANUFACTURING", description: "Efficient production process", background: "#FFE7FB" },
    { icon: <FaShippingFast className="text-3xl" />, title: "SHIPPING", description: "Fast and reliable delivery", background: "#FFF2F2" },
    { icon: <FaBoxes className="text-3xl" />, title: "PACKAGING", description: "Quality packaging solutions", background: "#FDFBDA" },
    { icon: <FaClipboardList className="text-3xl" />, title: "INVENTORY MANAGEMENT", description: "Accurate stock tracking", background: "#FFE7FB" },
  ];

const Does = () => {
  return (
    <>
      <div className="w-full flex flex-col min-h-screen">
        <div className="text-center text-3xl sm:text-5xl md:text-[60px] py-4 font-semibold">What we <span className="text-[#0C43FF]">Do?</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {cardsData.map((card, index) => (
            <div key={index} className="flex flex-col shadow rounded-md h-[200px] justify-center">
              <div className="w-[60px] h-[60px] rounded-md  mx-auto my-4 flex justify-center items-center" style={{
                backgroundColor:card.background
              }}>
                {card.icon}
              </div>
              <div className="text-center text-2xl text-[#0C43FF]">{card.title}</div>
              <div className="text-center text-zinc-500">{card.description}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Does;
