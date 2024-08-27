import React, { useState, useEffect } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const ViewQuotesModal = ({ data, onClose, response }) => {
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

    if (!data) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 p-6 relative">
                
                <div className="bg-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <h2 className="text-lg">#{data.bidNo}</h2>
                    <button onClick={onClose}>
                        <div className="text-2xl">X</div>
                    </button>
                </div>

                <div className="border-b p-4">
                    <div className="flex justify-between text-gray-600">
                        {/* ...other details... */}
                    </div>
                </div>

                <div className="p-4">
                <div className="border-b p-4">
                    <div className="flex justify-between text-gray-600">
                        <div>
                            <p className="text-sm font-medium">Date</p>
                            <p className="text-sm">{data.createdAt}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Loading</p>
                            <p className="text-sm">●  {data.loading_city} ({data.loading_state})</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Unloading</p>
                            <p className="text-sm">●{data.unloading_city} ({data.unloading_state})</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Details</p>
                            <p className="text-sm">Vehicle Quantity - {data.quantity}<br/>Vehicle Type: {data.vehicle_type} <br/>  Vehicle Size-  {data.vehicle_size} ({data.body_type}) <br/>  Material type-  {data.material_type} ({data.material_weight}Mt) <br/> Distance - {data.route_distance} Km</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Target Price</p>
                            <p className="text-sm text-red-500">Rs {data.target_price}</p>
                        </div>
                    </div>
                </div>
                
                    <h3 className="text-gray-800 font-medium mb-2">Vendor Information</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <p className="text-sm font-medium">Vendor Name</p>
                            <p className="text-sm font-medium">Viewed</p>
                            <p className="text-sm font-medium">Responded</p>
                            <p className="text-sm font-medium">Bid Price</p>
                            <div className="w-40"></div> {/* Placeholder for buttons alignment */}
                        </div>
                        {isLoading ? (
                            <p>Loading vendor information...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            [...new Set([...data.viewedBy, ...data.responded_by])].map((id, index) => (
                                <div key={index} className="flex justify-between mb-5 mt-5 items-center text-gray-600 p-2 border-b">
                                    <p className="font-medium">{vendors[id]?.name || 'Vendor name unavailable'}</p>
                                    <p className="text-sm">
                                        <span className={data.viewedBy.includes(id) ? "text-green-500" : "text-red-500"}>
                                            <MdOutlineRemoveRedEye className={data.viewedBy.includes(id) ? "h-5 w-5 text-green-500" : "h-5 w-5 text-red-500 line-through"} />
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        <span className={data.responded_by.includes(id) ? "text-green-500" : "text-red-500"}>
                                            <FaCheck className={data.responded_by.includes(id) ? "h-5 w-5 text-green-500" : "h-5 w-5 text-red-500 line-through"} />
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        {response[0]?.[id] || 'N/A'}
                                    </p>
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-500 text-white px-4 py-1 rounded">
                                            Counter
                                        </button>
                                        <button className="bg-green-500 text-white px-4 py-1 rounded">
                                            Assign
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="w-full p-4 bg-white border-t">
                    <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded w-full">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewQuotesModal;
