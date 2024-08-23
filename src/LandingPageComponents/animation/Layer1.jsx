import React, { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import l1 from "../new/623eeeb7-3ff2-43d2-9186-8e75c5f72b9f.jpg";
import l22 from "../new/WhatsApp Image 2024-08-20 at 3.09.07 PM.jpeg";
import l33 from "../new/8443deab-e7b7-4d9a-998c-8536772f5c49.jpg";
// import l4 from '../new/l4.avif'
// import l5 from '../new/l5.avif'
import { FaArrowRightLong } from "react-icons/fa6";
import "../styles.css";

const Layer1 = () => {
  const [tab, setTab] = useState("Top Products");
  const tabs = [
    { name: "Top Products" },
    { name: "On Website / App" },
    { name: "Plugins" },
    { name: "Intern" },
  ];

  const products = [
    {
      name: "Route Details",
      desc:
        "Effortlessly add a pay to your account hi this is siddhu froms rikaulam",
      img: l1,
    },
    {
      name: "Vehicle details",
      desc: "Send invoices and collect payments online",
      img: l22,
    },
    {
      name: "Bid details",
      desc: "Seamless checkout experience for your customers",
      img: l33,
    },
  ];

  const cardContainerRef = useRef(null);

  const scrollLeft = () => {
    cardContainerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    cardContainerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  const Products = () => {
    return (
      <>
        <div className="relative w-full flex items-center   rounded-md mt-[20px] pb-5">
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 p-2 rounded-sm bg-white md:hidden"
          >
            <FaChevronLeft />
          </button>
          <div
            ref={cardContainerRef}
            className="w-full flex items-center overflow-x-auto gap-3 px-8"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {products.map((item, index) => (
              <div className="w-[80%] max-w-[378px] cursor-pointer shadow-xl my-4 overflow-y-hidden group min-w-[320px] h-[400px] relative rounded-md flex flex-col">
                <img src={item.img} alt="" className="w-full" />
                <div className="w-full bg-white flex flex-col ps-2 absolute bottom-0 h-[100px] group-hover:h-[100px] duration-500 ease-in-out">
                  <div className="text-lg pt-3 text-[rgb(19,_38,_68)]   font-bold not-italic [text-decoration-line:none]  m-0 p-0">
                    {item.name}
                  </div>
                  <div className="text-[rgb(94,_110,_135)] text-[0.875rem] font-normal not-italic leading-5 mt-[8px] mx-0 mb-0 p-0">
                    {item.desc}
                  </div>
                  <div className="w-full mt-3  group-hover:flex hidden justify-center items-center">
                    {/* <div className="text-[rgb(94,_110,_135)] text-[0.875rem] font-normal not-italic [text-decoration-line:none] leading-5 mx-0 ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae laudantium veniam, vel fuga ipsum natus itaque sit eius velit quisquam facilis porro recusandae doloribus perspiciatis. Vitae rerum maxime incidunt repellat.</div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 p-2 bg-white md:hidden"
          >
            <FaChevronRight />
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="w-full rounded-md flex justify-center shadoww rounded-md ">
        <div className="w-full md:w-[100%]  mx-auto flex flex-col  ">
          <div className="text-[rgb(19,_38,_68)]  pt-5 text-3xl font-bold not-italic    p-0  sticky left-[20px]">
            Create Bid
          </div>
          {/* <div className="w-full flex items-center ms-4 justify-start overflow-x-auto gap-3">
            {tabs.map((item, index) => (
              <div
                key={index}
                className={`tab cursor-pointer text-nowrap hover:text-[#0c43FF] mx-3 pb-2 hover:border-b-[2px] border-[#0c43FF] font-semibold ${tab === item.name ? 'text-[#0c43FF] border-b-[2px]' : ''}`}
                onClick={() => setTab(item.name)}
              >
                {item.name}
              </div>
            ))}
          </div>
          <hr className="mx-4" /> */}
          {tab == "Top Products" && <Products />}
        </div>
      </div>
    </>
  );
};

export default Layer1;
