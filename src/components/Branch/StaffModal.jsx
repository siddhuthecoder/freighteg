import React from 'react';

const StaffModal = ({ isOpen, onClose, staff }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Staff</h2>
        {staff.length > 0 ? (
          <ul>
            {staff.map((staffMember, index) => (
              <li key={index} className="mb-2">
                Staff ID: {staffMember}
              </li>
            ))}
          </ul>
        ) : (
          <p>No staff members available.</p>
        )}
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StaffModal;
