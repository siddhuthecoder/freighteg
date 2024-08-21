import React from "react";
import logo from "../assets/QIKTRACKLOGO.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const tabs = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Privacy Policy",
      link: "/privacy",
    },
    {
      name: "Terms and Conditions",
      link: "/Terms",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
  ];

  return (
    <div className="flex flex-col mt-3 w-full  bg-[#0E1C35] text-white py-6">
      <div className="flex flex-col items-center justify-center mb-4">
        <img src={logo} alt="Logo" className="mb-3" width={50} height={50} />
        <div className="flex flex-col md:flex-row items-center space-y-2">
          {tabs.map((data, index) => (
            <Link
              to={data.link}
              key={index}
              className={` ${index==0?"pt-2":""} text-zinc-300 mx-3 hover:text-white`}
            >
              {data.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-zinc-300 font-semibold   text-sm">
          &copy; {new Date().getFullYear()} FreightEG , All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
