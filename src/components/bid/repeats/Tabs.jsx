import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars, FaWrench, FaBan, FaFilter, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Tabs = ({ onFilterClick, onDownloadClick,tabname,length }) => {
    const location = useLocation();
    const path = location.pathname.split("/");
    console.log("path",path.includes("counter"))
    
    const tabs = [
        { name: "Open", path: "open" },
        { name: "Result", path: "result" },
        { name: "History", path: "his1" },
        { name: "Counter", path: "counter" },
        { name: "Cancelled", path: "cancelled" }
        
    ];
    console.log(tabname)

    return (
        <div className="w-[100%] min-w-[1200px] py-1 bg-white flex items-center overflow-x-auto justify-between">
            <div className="mx-2 flex items-center gap-3">
                {tabs.map((tab, index) => { 
                    const isActive = path.includes(tab.path);
                    return (
                        <Link to={`/${tab.path}`}
                            key={index}
                            className={` cursor-pointer  text-sm hover:text-[#0662C6] ${path.includes(tab.path) ? 'text-[#0662C6] border-b-2 pb-1 border-[#0662C6]' : ''}`}
                        >
                            {tab.name} 
                        </Link>
                    );
                })}
            </div>
            <div className="flex items-center gap-  2">
                {/* <div className="flex items-center">
                    <button className="w-12 h-12 flex items-center justify-center border rounded-tl-md rounded-bl-md border-[#0662C6] hover:bg-[#0662C6] hover:text-white text-[#0662C6]">
                        <FaBars size={20} />
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center border border-[#0662C6] hover:bg-[#0662C6] hover:text-white text-[#0662C6]">
                        <FaWrench size={20} />
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center border rounded-tr-md rounded-br-md rounded-tb-md border-[#0662C6] hover:bg-[#0662C6] hover:text-white text-[#0662C6]">
                        <FaBan size={20} />
                    </button>
                </div> */}
                <div className="flex items-center mx-2">
                    <button 
                        onClick={onFilterClick} 
                        className="w-12 h-12 flex items-center justify-center border rounded-tl-md rounded-bl-md border-[#0662C6] hover:bg-[#0662C6] hover:text-white text-[#0662C6]">
                        <FaFilter size={20} />
                    </button>
                    <button 
                        onClick={onDownloadClick} 
                        className="w-12 h-12 flex items-center justify-center border rounded-tr-md rounded-br-md border-[#0662C6] hover:bg-[#0662C6] hover:text-white text-[#0662C6]">
                        <FaDownload size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
