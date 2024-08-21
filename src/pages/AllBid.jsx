import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AllBid = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const data = [
    { label: "Live", link: "/live" },
    { label: "Result", link: "/result" },
    { label: "History", link: "/history" },
  ];

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div
      className="flex flex-col justify-between px-3 py-5 rounded-md gap-3 mx-2"
      style={{
        width: "90%",
        height: "4.25rem",
        top: "232px",
        left: "207px",
        padding: "0px",
        gap: "5px",
      }}
    >
      {data.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          className="w-[175.12px]"
          activeClassName="bg-[#e7f7ff]"
          style={{ height: "4rem" }}
        >
          <div
            className={`flex items-center cursor-pointer px-3 gap-1 ${
              selectedItem === index ? "bg-[#e7f7ff]" : "bg-[#ffffff]"
            }`}
            onClick={() => handleItemClick(index)}
            style={{
              borderRadius: "40px",
              border: "0.75px solid #dbe5f1",
              width: "70%",
              height: "2rem",
            }}
          >
            <div
              style={{ fontSize: "16px", marginLeft: "20px" }}
              className={` ${
                selectedItem === index
                  ? "text-[#00A6F6] font-nunito"
                  : "text-[#888888] font-nunito"
              }`}
            >
              {item.label}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default AllBid;
