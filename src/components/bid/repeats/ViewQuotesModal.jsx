import React, { useState, useEffect } from 'react';
import { MdOutlineRemoveRedEye, MdCheck, MdClear } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';

const ViewQuotesModal = ({ data, onClose, response }) => {
    const [vendors, setVendors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);
    const [counterPrice, setCounterPrice] = useState('');
    const user = useSelector((state) => state.login.user);
    
    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const vendorDetails = {};
                const vendorIds = data.assigned_transporter;
                const requests = vendorIds.map(id =>
                    fetch(`https://freighteg.in/freightapi/vendor/${id}`).then(res => res.json())
                );
                const results = await Promise.all(requests);

                results.forEach((result, index) => {
                    vendorDetails[vendorIds[index]] = result.data;
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

    const handleAssign = (name, vendorId, index) => {
        if (window.confirm(`Do you really want to assign this bid to "${name}"?`)) {
            handleAssignBid(vendorId, index);
        }
    };

    const handleAssignBid = async (vendorId, index) => {
        try {
            const body = {
                vendor_id: vendorId,
                bid_id: data._id,
                vendorPrice: response?.[vendorId],
                vendorRank: index + 1,
            };

            const response1 = await axios.post('https://freighteg.in/freightapi/assignBid', body);
            if (response1.status === 200) {
                alert(`Thank you! This Bid is now Assigned to "${vendors[vendorId]?.name}"`);
                onClose(); 
                window.location.reload(); // Close the modal after assignment
            } else {
                throw new Error("Something went wrong in assigning the bid!");
            }
        } catch (error) {
            console.error("Error assigning bid:", error);
            alert(error?.response?.data?.message || "Something went wrong in assigning the bid!");
        }
    };

    const openCounterModal = (vendorId) => {
        setSelectedVendor(vendorId);
        setIsCounterModalOpen(true);
    };

    const handleCounterOffer = async () => {
        try {
            const body = {
                company_id: user?.id,
                vendor_id: selectedVendor,
                counter_price: counterPrice,
                bid_id: data?._id,
                branch_id: data?.branch_id
            };

            const response = await axios.post('https://freighteg.in/freightapi/counter', body);
            if (response.status === 200) {
                alert(`Counter offer sent successfully to ${vendors[selectedVendor]?.name}`);
                setIsCounterModalOpen(false);
                window.location.reload();
            } else {
                throw new Error("Failed to send counter offer!");
            }
        } catch (error) {
            console.error("Error sending counter offer:", error);
            alert(error?.response?.data?.message || "Failed to send counter offer!");
        }
    };

    if (!data) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-7xl w-full h-auto max-h-[90vh] overflow-y-auto p-6 relative">
                <div className="bg-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <h2 className="text-lg">#{data.bidNo}</h2>
                    <button onClick={onClose} className="text-2xl">X</button>
                </div>

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
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Viewed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responded</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">Loading vendor information...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-red-500">{error}</td>
                                </tr>
                            ) : (
                                Object.keys(vendors).map((id, index) => (
                                    <tr key={id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {vendors[id]?.name || 'Vendor name unavailable'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {data.viewedBy.includes(id) ? <MdOutlineRemoveRedEye className="h-5 w-5 text-green-500" /> : <FaEyeSlash className="h-5 w-5 text-red-500" />}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {data.responded_by.includes(id) ? <MdCheck className="h-5 w-5 text-green-500" /> : <MdClear className="h-5 w-5 text-red-500" />}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {response?.[id] || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <button
                                                onClick={() => handleAssign(vendors[id]?.name, id, index)}
                                                className="bg-green-500 text-white px-4 py-1 rounded mx-2 "
                                            >
                                                Assign
                                            </button>
                                            <button
                                                onClick={() => openCounterModal(id)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                            >
                                                Counter 
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {isCounterModalOpen && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
                            <h3 className="text-lg font-medium mb-4">Counter Offer</h3>
                            <button onClick={() => setIsCounterModalOpen(false)} className="absolute top-2 right-2 text-2xl">&times;</button>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Enter Counter Price</label>
                                <input
                                    type="number"
                                    value={counterPrice}
                                    onChange={(e) => setCounterPrice(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleCounterOffer}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewQuotesModal;
