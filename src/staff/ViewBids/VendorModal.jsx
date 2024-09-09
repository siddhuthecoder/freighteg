import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const VendorNamesModal = ({ isOpen, onClose, vendorIds, respondedBy = [], viewedBy = [] }) => {
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("VendorIds:", vendorIds);
    console.log("RespondedBy:", respondedBy);
    console.log("ViewedBy:", viewedBy);
    if (isOpen && vendorIds.length > 0) {
      fetchVendorDetails();
    }
  }, [isOpen, vendorIds, respondedBy, viewedBy]); // Include `respondedBy` and `viewedBy` in the dependency array

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

        // Debugging lines to verify data
       
        console.log("Is Responded By:", respondedBy.map(String).includes(String(id)));
        console.log("Is Viewed By:", viewedBy.map(String).includes(String(id)));

        return {
          id,
          name: vendor.name,
          isRespondedBy: respondedBy.map(String).includes(String(id)),
          isViewedBy: viewedBy.map(String).includes(String(id))
        };
      });

      // Debugging line to verify details
      console.log("Vendor Details:", details);
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[400px] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Vendor Names</h2>
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
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VendorNamesModal;
