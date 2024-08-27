// components/VendorModal.js
import React from 'react';

const VendorModal = ({ isOpen, vendors, vendorDetails, onClose }) => (
  isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Vendors</h2>
        <ul>
          {vendors.map((vendorId) => (
            <li key={vendorId} className="mb-2">
              <h3 className="font-semibold">Vendor ID: {vendorId}</h3>
              <p>Name: {vendorDetails[vendorId]?.name || 'N/A'}</p>
              <p>Contact: {vendorDetails[vendorId]?.contact || 'N/A'}</p>
              <p>Details: {vendorDetails[vendorId]?.details || 'N/A'}</p>
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

export default VendorModal;
