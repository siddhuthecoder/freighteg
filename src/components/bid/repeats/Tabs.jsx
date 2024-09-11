import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CountsContext } from './CountsContext'; // Import the context

const Tabs = ({ onDownloadClick }) => {
  const location = useLocation();
  const path = location.pathname.split("/");

  // Use the context to get the counts
  const { counts } = useContext(CountsContext);

  const tabs = [
    { name: "Open", path: "open", count: counts.open },
    { name: "Result", path: "result", count: counts.result },
    { name: "History", path: "history", count: counts.history },
    { name: "Counter", path: "counter", count: counts.counter },
    { name: "Cancelled", path: "cancelled", count: counts.cancelled }
  ];

  return (
    <div className="w-full flex-wrap gap-3 py-1 bg-white flex items-center overflow-x-auto justify-between">
      <div className="mx-2 flex items-center gap-3">
        {tabs.map((tab, index) => {
          const isActive = path.includes(tab.path);
          return (
            <Link to={`/${tab.path}`}
              key={index}
              className={`cursor-pointer text-sm hover:text-[#0662C6] ${isActive ? 'text-[#0662C6] border-b-2 pb-1 border-[#0662C6]' : ''}`}
            >
              {tab.name} ({tab.count})
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center mx-2">
          <button 
            onClick={onDownloadClick} 
            className="w-12 h-12 flex items-center justify-center border rounded-md border-[#0662C6] hover:bg-[#0662C6] hover:text-white text-[#0662C6]">
            <FaDownload size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
