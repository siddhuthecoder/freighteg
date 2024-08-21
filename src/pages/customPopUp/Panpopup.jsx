import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import "./Pan.css";

const Panpopup = ({ onClose, onSubmit }) => {
  const [panNumber, setPanNumber] = useState("");

  const handlePanChange = (e) => {
    setPanNumber(e.target.value);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <div className="bg-[#1e3a8a] pt-2 pl-1 rounded-md">
            <div className="popup-header flex justify-between">
              <h2 className="font-semibold text-[#ffffff] text-[24px] -mt-1">
                Enter PAN Number
              </h2>
              <div className="-mt-1">
                <IoClose
                  onClick={onClose}
                  className="close-icon w-8 h-8 text-white"
                />
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter PAN Number"
            value={panNumber}
            onChange={handlePanChange}
            className="rounded bg-gray-100"
          />
        </div>
        <div className="popup-buttons">
          <button
            onClick={() => onSubmit(panNumber)}
            className="font-semibold bg-[#2e5ad6] text-[#ffffff]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panpopup;
