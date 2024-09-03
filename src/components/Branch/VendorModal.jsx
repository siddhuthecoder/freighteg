import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'
const VendorModal = ({ isOpen, onClose, vendors }) => {
  const [vendorDetails, setVendorDetails] = useState([]);
  const [expandedVendor, setExpandedVendor] = useState(null);

  useEffect(() => {
    if (isOpen && vendors.length > 0) {
      const fetchVendorDetails = async () => {
        try {
          const responses = await Promise.all(
            vendors.map((vendorId) =>
              axios.get(`https://freighteg.in/freightapi/vendor/${vendorId}`)
            )
          );
          setVendorDetails(responses.map(response => response.data.data));
        } catch (error) {
          console.error('Error fetching vendor details:', error);
        }
      };
      fetchVendorDetails();
    }
  }, [isOpen, vendors]);

  const toggleVehicleView = (vendorId) => {
    setExpandedVendor(expandedVendor === vendorId ? null : vendorId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full  max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">Vendors</h2>
        <div className="overflow-auto max-h-[60vh]">
          {vendorDetails.length > 0 ? (
            <table className="table-auto w-full border-collapse table">
              <thead>
                <tr className='tr'>
                  {/* <th className="border px-4 py-2">Vendor ID</th> */}
                  <th className="border px-4 py-2 th">Name</th>
                  <th className="border px-4 py-2 th">Owner</th>
                  <th className="border px-4 py-2 th">Phone</th>
                  <th className="border px-4 py-2 th">State</th>
                  <th className="border px-4 py-2 th">Vehicle Types</th>
                </tr>
              </thead>
              <tbody>
                {vendorDetails.map((vendor) => (
                  <tr key={vendor._id}>
                    {/* <td className="border px-4 py-2">{vendor._id}</td> */}
                    <td className="border px-4 py-2 td  ">{vendor.name}</td>
                    <td className="border px-4 py-2 td  ">{vendor.owner_name}</td>
                    <td className="border px-4 py-2 td  ">{vendor.phone}</td>
                    <td className="border px-4 py-2 td  ">{vendor.state}</td>
                    <td className="border px-4 py-2 td  ">
                      <button
                        onClick={() => toggleVehicleView(vendor._id)}
                        className="bg-blue-500 text-white px-4 py-2"
                      >
                        View
                      </button>
                      {expandedVendor === vendor._id && (
                        <div className="mt-2">
                          <ul className="list-disc pl-4">
                            {vendor.vehicle_type.map((vehicle, index) => (
                              <li key={index}>{vehicle}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No vendors available.</p>
          )}
        </div>
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
