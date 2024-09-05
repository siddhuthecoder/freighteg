import React, { useState, useEffect } from 'react';
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const BASE_URL = 'https://freighteg.in/freightapi'; // Assuming this is the base URL for all your APIs

const AssignedRequest = () => {
    const user = useSelector((state) => state.login.user);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/getBidResultHistory?vendor_id=669be1f26d77579092b9b435&page=${currentPage}&limit=5`);
                const bidData = response.data.data;

                const detailedBidData = await Promise.all(
                    bidData.map(async (bid) => {
                        const bidDetails = await fetchBidDetails(bid.bid_id);
                        return { ...bid, ...bidDetails };
                    })
                );

                setData(detailedBidData);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, user.vendor_id]);

    const fetchBidDetails = async (bidId) => {
        const url = `${BASE_URL}/bids/${bidId}`;
        try {
            const response = await axios.get(url);
            return response.data || {};
        } catch (error) {
            console.error(`Error fetching details for bid_id ${bidId}:`, error);
            return {}; // Return an empty object if there's an error
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
    
    return (
        <>
            <TransportNavBar />
            <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Assigned Requests</h2>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                        <p className="ml-4 text-lg text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {data.map((item) => (
                                <li key={item._id} className="p-6 bg-white rounded-lg shadow-md">
                                    <p className="text-lg font-semibold text-gray-700">Bid ID: <span className="text-blue-500">{item.bid_id}</span></p>
                                    <p className="text-lg text-gray-600">Bid No: {item.bidNo}</p>
                                    <p className="text-lg text-gray-600">Vendor Price: {item.vendorPrice}</p>
                                    <p className="text-lg text-gray-600">Vendor Rank: {item.vendorRank}</p>
                                    <p className="text-lg text-gray-600">Body Type: {item.body_type}</p>
                                    <p className="text-lg text-gray-600">Material Type: {item.material_type}</p>
                                    <p className="text-lg text-gray-600">Material Weight: {item.material_weight} tons</p>
                                    <p className="text-lg text-gray-600">Vehicle Type: {item.vehicle_type}</p>
                                    <p className="text-lg text-gray-600">Vehicle Size: {item.vehicle_size}</p>
                                    <p className="text-lg text-gray-600">Loading City: {item.loading_city}</p>
                                    <p className="text-lg text-gray-600">Loading Address: {item.loading_address}</p>
                                    <p className="text-lg text-gray-600">Loading Pincode: {item.loading_pincode}</p>
                                    <p className="text-lg text-gray-600">Loading State: {item.loading_state}</p>
                                    <p className="text-lg text-gray-600">Loading Date: {new Date(item.loading_date).toLocaleDateString()}</p>
                                    <p className="text-lg text-gray-600">Loading Time: {item.loading_time}</p>
                                    <p className="text-lg text-gray-600">Unloading City: {item.unloading_city}</p>
                                    <p className="text-lg text-gray-600">Unloading Address: {item.unloading_address}</p>
                                    <p className="text-lg text-gray-600">Unloading Pincode: {item.unloading_pincode}</p>
                                    <p className="text-lg text-gray-600">Unloading State: {item.unloading_state}</p>
                                    <p className="text-lg text-gray-600">Route Distance: {item.route_distance} km</p>
                                    <p className="text-lg text-gray-600">Target Price: ₹{item.target_price}</p>
                                    <p className="text-lg text-gray-600">Bid Expired: {item.bidExpired ? 'Yes' : 'No'}</p>
                                    <p className="text-lg text-gray-600">Bid Remarks: {item.bid_remarks}</p>
                                    <p className="text-lg text-gray-600">Created At: {new Date(item.createdAt).toLocaleString()}</p>
                                    <p className="text-lg text-gray-600">Expiry Date: {new Date(item.expiry_date).toLocaleDateString()}</p>
                                    <p className="text-lg text-gray-600">Expiry Time: {item.expiry_time}</p>
                                    <p className="text-lg text-gray-600">Assigned To: {item.assigned_to}</p>
                                    <p className="text-lg text-gray-600">Assigned Transporter: {item.assigned_transporter.join(', ')}</p>
                                    <p className="text-lg text-gray-600">Responded By: {item.responded_by.join(', ')}</p>
                                    <p className="text-lg text-gray-600">Vehicle Details: {JSON.stringify(item.vehicleDetails)}</p>
                                    <p className="text-lg text-gray-600">Is CNG: {item.is_cng ? 'Yes' : 'No'}</p>
                                    <p className="text-lg text-gray-600">Is Active: {item.isActive ? 'Yes' : 'No'}</p>
                                    <p className="text-lg text-gray-600">Is Deleted: {item.isDeleted ? 'Yes' : 'No'}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center mt-6">
                            <button 
                                onClick={handlePreviousPage} 
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-lg text-gray-600"> Page {currentPage} of {totalPages} </span>
                            <button 
                                onClick={handleNextPage} 
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AssignedRequest;
