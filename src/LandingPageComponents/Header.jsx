import React, { useState, useEffect } from 'react';
import { HiViewList } from "react-icons/hi";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logo from './new/logo.png';

const Header = () => {
  const [show, setShow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const tabs = [
    { name: "Solutions", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "Resources", path: "/resources" },
    { name: "About Us", path: "/about-us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className=""></div>
      <div
        className={`w-full m shadow mx-auto flex justify-center fixed top-0 z-[1000]  transition-colors duration-300 ${
          isScrolled ? 'bg-[#0E1C35]  backdrop-blur-lg ' : 'bg-transparent'
        }`}
      >
        <div className="w-full md:w-[70%] mx-atuo flex items-center justify-between">
        <div className="flex items-center">
          <div className="logo cursor-pointer text-2xl font-bold py-3 mx-3 flex items-center">
            <img src={logo} className="w-[35px] h-[35px]" alt="Logo" />
            <div className="md:flex flex-col hidden ms-2">
              <div className={`font-bold text-white text-2xl`}>Freight-EG</div>
              <div className={` text-[10px]  text-white mt-[-10px]`}>Effortless Transport solutions</div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="items-center justify-start gap-5 hidden lg:flex">
            {tabs.map((tab, index) => (
              <div key={index} className={`rounded-full text-[17px] cursor-pointer t hover:bg-[#0C43FF] hover:text-white  px-3 py-1 font-semibold  ${isScrolled?"text-white":"text-zinc-300 "}`}>
                {tab.name}
              </div>
            ))}
          </div>
          <button className="rounded-md lg:mx-5  py-[3px]  text-[18px] bg-[rgb(12,67,255)] text-white px-2 flex items-center">
              <div className="font-bold">Login</div>
              <div className="text-2xl font-bold px-2">/</div>
              <div className="font-bold">Register</div>
          </button>
          <button className={`rounded-full hidden mb-1 md:px-4 md:py-2 md:bg-white font-bold text-white md:text-black md:mx-2  items-center ${isScrolled?"border border-black":""}`}>
            {/* <IoIosArrowDown className={`text-2xl me-1  ${isScrolled?"text-black":"text-white"}`} /> */}
            <span className="hidden md:block">sribabu</span>
            
              <FaRegUserCircle className="text-2xl ms-2 me-1" />
            
          </button>
          {!show ? (
            <HiViewList className={`text-2xl mx-3 lg:hidden  text-white`} onClick={() => setShow(!show)} />
          ) : (
            <RiCloseLargeFill className="text-2xl mx-3 lg:hidden text-red-600" onClick={() => setShow(!show)} />
          )}
        </div>
        </div>
      </div>
      {show && (
        <div className="w-[95%] bg-white shadow-md   rounded-sm fixed top-16 left-[2.5%] z-[1000000] lg:hidden h-[90vh] flex flex-col">
          {tabs.map((tab, index) => (
            <div key={index} className="px-2 py-2 cursor-pointer text-zinc-600 text-[20px] hover:text-blue-600 font-semibold">
              {tab.name}
            </div>
          ))}
          <button className="rounded-md w-[160px] ms-2 lg:mx-5  py-[3px]  text-[18px] bg-[rgb(12,67,255)] text-white px-2 flex items-center">
              <div className="font-bold">Login</div>
              <div className="text-2xl font-bold px-2">/</div>
              <div className="font-bold">Register</div>
          </button>
        </div>
      )}
    </>
  );
};

const truncateEmail = (email, length) => {
  if (email.length <= length) return email;
  return email.slice(0, length) + '...';
};

export default Header;
