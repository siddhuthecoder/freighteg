// components/StaffModal.js
import React from 'react';

const StaffModal = ({ isOpen, staff, onClose }) => (
  isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Staff</h2>
        <ul>
          {staff.map((staffId) => (
            <li key={staffId} className="mb-2">
              <h3 className="font-semibold">Staff ID: {staffId}</h3>
              {/* Display staff details here if available */}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  ) : null
);

export default StaffModal;
