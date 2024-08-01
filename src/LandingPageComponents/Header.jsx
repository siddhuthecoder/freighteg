import React, { useState, useEffect } from 'react';
import { HiViewList } from "react-icons/hi";
import { RiCloseLargeFill } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import logo from './new/logo.png';

const Header = () => {
  const [show, setShow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const tabs = [
    { name: "Home", path: "/" },
    { name: "Map", path: "/map" },
    { name: "About us", path: "/about-us" },
    { name: "Support", path: "/support" },
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
        className={`w-full shadow mx-auto flex fixed top-0 z-[3] items-center justify-between transition-colors duration-300 ${
          isScrolled ? 'bg-white backdrop-filter backdrop-blur-lg bg-opacity-70' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center">
          <div className="logo text-2xl font-bold py-3 mx-3 flex items-center">
            <img src={logo} className="w-[35px] h-[35px]" alt="Logo" />
            <div className="md:flex hidden flex-col ms-2">
              <div className={`font-bold ${isScrolled?"text-black":"text-white"} text-2xl`}>Freight-EG</div>
              <div className={` ${isScrolled?"text-black":"text-zinc-400"} text-[10px] mt-[-10px]`}>Effortless Transport solutions</div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="items-center justify-start gap-5 hidden lg:flex">
            {tabs.map((tab, index) => (
              <div key={index} className={`rounded-full cursor-pointer text-[20px] hover:bg-[#0C43FF] hover:text-white px-2 py-1 font-semibold  ${isScrolled?"text-black":"text-zinc-300 "}`}>
                {tab.name}
              </div>
            ))}
          </div>
          <button className="rounded-full mb-1 md:px-4 md:py-2 md:bg-white font-bold text-white md:text-black md:mx-2 flex items-center">
            <IoIosArrowDown className={`text-2xl me-1  ${isScrolled?"text-black":"text-white"}`} />
            <span className="hidden md:block">sribabu@gmail.com</span>
            <div className={`w-[30px] h-[30px] rounded-full border-[2px] mx-1  md:border-[black]  ${isScrolled?"text-black border-black":"text-white border-white"} flex items-center justify-center`}>
              <GoPerson />
            </div>
          </button>
          {!show ? (
            <HiViewList className={`text-2xl mx-3 lg:hidden  ${isScrolled?"text-black":"text-white"}`} onClick={() => setShow(!show)} />
          ) : (
            <RiCloseLargeFill className="text-2xl mx-3 lg:hidden text-red-600" onClick={() => setShow(!show)} />
          )}
        </div>
      </div>
      {show && (
        <div className="w-[95%] bg-white shadow-md rounded-sm fixed top-16 left-[2.5%] z-[10] lg:hidden h-[90vh] flex flex-col">
          {tabs.map((tab, index) => (
            <div key={index} className="px-2 py-2 cursor-pointer text-zinc-600 text-[20px] hover:text-blue-600 font-semibold">
              {tab.name}
            </div>
          ))}
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
