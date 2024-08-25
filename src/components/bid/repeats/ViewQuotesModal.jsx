import React, { useState, useEffect } from 'react';

const ViewQuotesModal = ({ data, onClose }) => {
    const [vendors, setVendors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const vendorDetails = {};
                const uniqueIds = [...new Set([...data.viewedBy, ...data.responded_by])];
                const requests = uniqueIds.map(id =>
                    fetch(`https://freighteg.in/freightapi/vendor/${id}`).then(res => res.json())
                );
                const results = await Promise.all(requests);

                results.forEach((result, index) => {
                    vendorDetails[uniqueIds[index]] = result.data;
                });

                setVendors(vendorDetails);
            } catch (err) {
                setError('Failed to fetch vendor details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchVendorDetails();
    }, [data]);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-full overflow-auto">
                <div className="flex justify-between items-center bg-blue-600 p-4 text-white">
                    <h2 className="text-lg font-semibold">#{data.id}</h2>
                    <button onClick={onClose} className="text-white">
                        ✖
                    </button>
                </div>

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

                    <h3 className="text-lg font-semibold mb-4">Vendor Information</h3>
                    <div className="overflow-y-auto max-h-96">
                        {isLoading ? (
                            <p>Loading vendor information...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            [...new Set([...data.viewedBy, ...data.responded_by])].map((id, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b">
                                    <span>{vendors[id]?.name || 'Vendor name unavailable'}</span>
                                    <div className="flex space-x-2">
                                        <button className={`px-3 py-1 rounded-full ${data.viewedBy.includes(id) ? 'bg-green-500' : 'bg-red-500'}`}>
                                            👁
                                        </button>
                                        <button className={`px-3 py-1 rounded-full ${data.responded_by.includes(id) ? 'bg-green-500' : 'bg-red-500'}`}>
                                            ✅
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

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
