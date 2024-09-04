import React, { useState, useEffect } from "react";
import axios from "axios";

const VendorNamesModal = ({ isOpen, onClose, vendorIds }) => {
  const [vendorNames, setVendorNames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && vendorIds.length > 0) {
      fetchVendorNames();
    }
  }, [isOpen, vendorIds]);

  const fetchVendorNames = async () => {
    setLoading(true);
    try {
      const promises = vendorIds.map(id =>
        axios.get(`https://freighteg.in/freightapi/vendor/${id}`)
      );
      const responses = await Promise.all(promises);
      const names = responses.map(res => res.data.data.name);
      setVendorNames(names);
    } catch (error) {
      console.error("Error fetching vendor names:", error);
      setVendorNames([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Vendor Names</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
          </div>
        ) : (
          <ul>
            {vendorNames.length > 0 ? (
              vendorNames.map((name, index) => (
                <li key={index} className="mb-2">
                  {name}
                </li>
              ))
            ) : (
              <li>No vendors found.</li>
            )}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VendorNamesModal;
