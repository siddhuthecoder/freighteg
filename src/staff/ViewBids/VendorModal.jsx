import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const VendorNamesModal = ({ isOpen, onClose, vendorIds, respondedBy = [], viewedBy = [] }) => {
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && vendorIds.length > 0) {
      fetchVendorDetails();
    }
  }, [isOpen, vendorIds, respondedBy, viewedBy]);

  const fetchVendorDetails = async () => {
    setLoading(true);
    try {
      const promises = vendorIds.map(id =>
        axios.get(`https://freighteg.in/freightapi/vendor/${id}`)
      );
      const responses = await Promise.all(promises);

      const details = responses.map((res) => {
        const vendor = res.data.data;
        const id = vendor._id;

        return {
          id,
          name: vendor.name,
          isRespondedBy: respondedBy.map(String).includes(String(id)),
          isViewedBy: viewedBy.map(String).includes(String(id))
        };
      });

      setVendorDetails(details);
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      setVendorDetails([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[400px] overflow-y-auto relative">
        <AiOutlineClose
          className="absolute top-4 right-4 text-red-600 cursor-pointer w-6 h-6 hover:text-red-600 transition duration-300 ease-in-out"
          onClick={onClose}
        />
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Assigned Vendors</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <ul className="space-y-4">
            {vendorDetails.length > 0 ? (
              vendorDetails.map((vendor) => (
                <li key={vendor.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out">
                  <span className="font-semibold text-gray-800">{vendor.name}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600">
                      {vendor.isRespondedBy ? (
                        <AiOutlineCheck className="text-green-500 w-6 h-6" />
                      ) : (
                        <AiOutlineClose className="text-red-500 w-6 h-6" />
                      )}
                    </div>
                    <div className="flex items-center text-gray-600">
                      {vendor.isViewedBy ? (
                        <AiOutlineEye className="text-green-500 w-6 h-6" />
                      ) : (
                        <AiOutlineEyeInvisible className="text-red-500 w-6 h-6" />
                      )}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-600">No vendors found.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VendorNamesModal;
