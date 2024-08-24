import React, { useState, useEffect } from 'react';

const ViewQuotesModal = ({ data, onClose }) => {
    const [vendors, setVendors] = useState({});

    // Fetch vendor details based on the IDs in the arrays
    useEffect(() => {
        const fetchVendorDetails = async () => {
            const vendorDetails = {};
            for (let id of [...data.viewedBy, ...data.responded_by]) {
                if (!vendorDetails[id]) { // Avoid redundant requests
                    const response = await fetch(`https://freighteg.in/freightapi/vendor/${id}`);
                    const result = await response.json();
                    vendorDetails[id] = result.data;
                }
            }
            setVendors(vendorDetails);
        };
        fetchVendorDetails();
    }, [data]);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-full overflow-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center bg-blue-600 p-4 text-white">
                    <h2 className="text-lg font-semibold">#{data.id}</h2>
                    <button onClick={onClose} className="text-white">
                        ✖
                    </button>
                </div>

                {/* Main Details Section */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-gray-500">Loading City</p>
                            <p className="font-semibold">{data.loading_city}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Loading State</p>
                            <p className="font-semibold">{data.loading_state}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Unloading City</p>
                            <p className="font-semibold">{data.unloading_city}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Unloading State</p>
                            <p className="font-semibold">{data.unloading_state}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Material Type</p>
                            <p className="font-semibold">{data.material_type}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Target Price</p>
                            <p className="font-semibold text-red-500">Rs {data.target_price}</p>
                        </div>
                    </div>

                    {/* Vendor Information */}
                    <h3 className="text-lg font-semibold mb-4">Vendor Information</h3>
                    <div className="overflow-y-auto max-h-96">
                        {data.viewedBy.concat(data.responded_by).map((id, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b">
                                <span>{vendors[id]?.name || 'Loading...'}</span>
                                <div className="flex space-x-2">
                                    {/* Eye Icon */}
                                    <button className={`px-3 py-1 rounded-full ${data.viewedBy.includes(id) ? 'bg-green-500' : 'bg-red-500'}`}>
                                        👁
                                    </button>
                                    {/* Check Icon */}
                                    <button className={`px-3 py-1 rounded-full ${data.responded_by.includes(id) ? 'bg-green-500' : 'bg-red-500'}`}>
                                        ✅
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Close Button */}
                <div className="p-4">
                    <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded w-full">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewQuotesModal;
