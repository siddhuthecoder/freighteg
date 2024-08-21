// CustomPopup.js
import React from "react";
import "../../css/CustomePop.css"; // Import CSS for styling (create this file next)

const CustomPopup = ({ onClose }) => {
  return (
    <div className="custom-popup">
      <div className="popup-content">
        <p>Thank you for your form submission!</p>
        <p>Thank You!</p>
        <p>Your details have been successfully submitted. Thanks!</p>
        <button className="ok-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomPopup;
