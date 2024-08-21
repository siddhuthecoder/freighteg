import React, { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import l1 from '../new/l1.avif'
import l2 from '../new/l2.avif'
import l3 from '../new/l3.avif'
import l4 from '../new/l4.avif'
import l5 from '../new/l5.avif'
import { FaArrowRightLong } from "react-icons/fa6";

import '../styles.css'

const Layer2 = () => {
  const [tab, setTab] = useState("Top Products");
  const tabs = [
    { name: "Top Products" },
    { name: "On Website / App" },
    { name: "Plugins" },
    { name: "Intern" }
  ];

  const products = [
    {
      name: "Payment Links",
      desc: "Effortlessly add a pay to your account",
      img:l1
    },
    {
      name: "Invoice Payments",
      desc: "Send invoices and collect payments online",
      img:l2
    },
    {
      name: "Quick Checkout",
      desc: "Seamless checkout experience for your customers",
      img:l3
    },
    {
      name: "Mobile Payments",
      desc: "Accept payments via mobile devices",
      img:l4
    },
    {
      name: "POS Integration",
      desc: "Integrate with point-of-sale systems",
      img:l5
    },
    {
      name: "Mobile Payments",
      desc: "Accept payments via mobile devices",
      img:l4
    },
    {
      name: "POS Integration",
      desc: "Integrate with point-of-sale systems",
      img:l5
    },
   
  ];

  
  
  const cardContainerRef = useRef(null);

  const scrollLeft = () => {
    cardContainerRef.current.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    cardContainerRef.current.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  };
  const Products = () => {
    return (
      <>
          <div className="relative w-full flex items-center   rounded-md mt-[20px] pb-5">
            <button onClick={scrollLeft} className="absolute left-0 z-10 p-2 rounded-sm bg-white">
              <FaChevronLeft />
            </button>
            <div
              ref={cardContainerRef}
              className="w-full flex items-center overflow-x-auto gap-3 px-8"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {products.map((item,index) => (
                <div className="w-[80%] max-w-[378px] cursor-pointer shadow-xl my-4 overflow-y-hidden group min-w-[320px] h-[400px] relative rounded-md flex flex-col">
                  <img src={l1} alt="" className="w-full" />
                  <div className="w-full bg-white flex flex-col ps-2 absolute bottom-0 h-[100px] group-hover:h-[150px] duration-500 ease-in-out">
                    <div className="text-lg pt-3 text-[rgb(19,_38,_68)]   font-bold not-italic [text-decoration-line:none]  m-0 p-0">{item.name}</div>
                    <div className="text-[rgb(94,_110,_135)] text-[0.875rem] font-normal not-italic leading-5 mt-[8px] mx-0 mb-0 p-0">{item.desc}</div>
                    <div className="w-full mt-3  group-hover:flex hidden justify-center items-center">
                      <div className="text-[rgb(94,_110,_135)] text-[0.875rem] font-normal not-italic [text-decoration-line:none] leading-5 mx-0 ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae laudantium veniam, vel fuga ipsum natus itaque sit eius velit quisquam facilis porro recusandae doloribus perspiciatis. Vitae rerum maxime incidunt repellat.</div>
                  </div>
                  </div>
                  
                </div>
              ))}
            </div>
            <button onClick={scrollRight} className="absolute right-0 z-10 p-2 bg-white">
              <FaChevronRight />
            </button>
          </div>
      </>
    )
  }


  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-[100%] mx-auto flex flex-col shadoww">
        <div className="text-[rgb(19,_38,_68)]  pt-5 text-3xl font-bold not-italic   p-0  sticky left-[20px]">Manage Bid</div>
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

export default Layer2;
