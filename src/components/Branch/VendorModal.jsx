import React from 'react';

const VendorModal = ({ isOpen, onClose, vendors }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Vendors</h2>
        {vendors.length > 0 ? (
          <ul>
            {vendors.map((vendor, index) => (
              <li key={index} className="mb-2">
                Vendor ID: {vendor}
              </li>
            ))}
          </ul>
        ) : (
          <p>No vendors available.</p>
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

export default VendorModal;
