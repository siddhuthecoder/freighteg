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
            console.log({body})

            const response1 = await axios.post(`https://freighteg.in/freightapi/assignBid`, body);
            if (response1.status === 200) {
                alert(`Thank you! This Bid is now Assigned to "${vendors[vendorId]?.name}"`);
                onClose();  // Close the modal after assignment
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
           
            var body;
            if (data?.branch_id){
             body={
                company_id: user?.id,
                vendor_id: selectedVendor,
                counter_price: counterPrice,
                bid_id: data?._id,
                branch_id:data?.branch_id
            }
            }
            else{
                body={
                    company_id: user?.id,
                    vendor_id: selectedVendor,
                    counter_price: counterPrice,
                    bid_id: data?._id,
                }
            }
            
            // console.log({data})
            console.log({body})
           

            const response = await axios.post(`https://freighteg.in/freightapi/counter`, body);
            if (response.status === 200) {
                alert(`Counter offer sent successfully to ${vendors[selectedVendor]?.name}`);
                setIsCounterModalOpen(false);
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
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 p-6 relative">
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
                
                <h3 className="text-gray-800 font-medium mb-4">Vendor Information</h3>
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
                                [...new Set([...data.viewedBy, ...data.responded_by])].map((id, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {vendors[id]?.name || 'Vendor name unavailable'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {data.viewedBy.includes(id) ? <MdOutlineRemoveRedEye className="h-5 w-5 text-green-500" /> :  <FaEyeSlash className="h-5 w-5 text-red-500" />}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {data.responded_by.includes(id) ? <MdCheck className="h-5 w-5 text-green-500" /> : <MdClear className="h-5 w-5 text-red-500" />}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {response?.[id] || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <button onClick={() => openCounterModal(id)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Counter</button>
                                            <button onClick={() => handleAssign(vendors[id]?.name, id, index)} className="bg-green-500 text-white px-3 py-1 rounded">Assign</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="w-full p-4 bg-white border-t">
                    <button onClick={onClose} className="px-4 py-2 text-white bg-red-600 rounded">Close</button>
                </div>
            </div>

            {isCounterModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h3 className="text-lg font-medium mb-4">Counter Offer</h3>
                        <input 
                            type="text" 
                            className="w-full p-2 mb-4 border border-gray-300 rounded" 
                            placeholder="Enter counter price" 
                            value={counterPrice} 
                            onChange={(e) => setCounterPrice(e.target.value)} 
                        />
                        <div className="flex justify-end">
                            <button 
                                onClick={() => setIsCounterModalOpen(false)} 
                                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleCounterOffer} 
                                className="px-4 py-2 text-white bg-blue-600 rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewQuotesModal;
