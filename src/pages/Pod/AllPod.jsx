import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AllPod = () => {
    const [selectedItem, setSelectedItem] = useState(0);

    const data = [
        { label: "Company1", link: "/podone" },
        { label: "Company2", link: "/podtwo" },
        { label: "Company3", link: "/podthree" },
    ];

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };
    return (
        <div className="flex flex-col justify-between px-3 py-5 gap-3 mx-2 mr-5" style={{ width: "90%", gap: "5px" }}>
            {data.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.link}
                    className="w-[87.56px]"
                    activeClassName="bg-[#e7f7ff]"
                    style={{ width: "120.56px", height: "2rem" }}
                    onClick={() => handleItemClick(index)}
                >
                    <div
                        className={`flex items-center cursor-pointer px-3 gap-1 ${selectedItem === index ? "bg-[#e7f7ff]" : "bg-[#ffffff]"
                            }`}
                        style={{
                            borderRadius: "40px",
                            border: "0.75px solid #dbe5f1",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <div
                            style={{ fontSize: "14px", marginLeft: "10px" }}
                            className={`${selectedItem === index ? "text-[#00A6F6] font-nunito" : "text-[#888888] font-nunito"
                                }`}
                        >
                            {item.label}
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default AllPod;
