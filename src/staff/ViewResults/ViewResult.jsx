import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import StaffNavbarr from '../StaffNavBarr';

const BASE_URL = 'https://freighteg.in/freightapi'; 

const ViewResult = () => {
    const user = useSelector((state) => state.login.user);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] =useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/getBidResultHistory?assigned_to=669dae7a05b20689c41f417b&page=${currentPage}&limit=5`);
                const bidData = response.data.data;
                setTotalPages(response.data.totalPages);

                // Fetch bid details for all bids and merge them into bidData
                const bidsDetailsPromises = bidData.map(async (item) => {
                    const bidDetails = await fetchBidDetails(item.bid_id);
                    return { ...item, ...bidDetails };
                });
                const mergedData = await Promise.all(bidsDetailsPromises);

                setData(mergedData);
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

    console.log(data)

    return (
        <>
            <StaffNavbarr />
            <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">View Result</h2>
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
                                    <p className="text-lg text-gray-600">Vendor Price: {item.vendorPrice}</p>
                                    <p className="text-lg text-gray-600">Vendor Rank: {item.vendorRank}</p>
                                    <p className="text-lg text-gray-600">Target Price: ₹{item.target_price}</p>
                                    <p className="text-lg text-gray-600">Bid Expired: {item.bidExpired ? 'Yes' : 'No'}</p>
                                    <p className="text-lg text-gray-600">Created At: {new Date(item.createdAt).toLocaleString()}</p>
                                    <p className="text-lg text-gray-600">Updated At: {new Date(item.updatedAt).toLocaleString()}</p>

                                    {item.vehicleDetails.length > 0 && (
                                        <>
                                            <h3 className="text-lg font-semibold text-gray-700 mt-4">Vehicle Details:</h3>
                                            <ul className="ml-4 list-disc">
                                                {item.vehicleDetails.map((vehicle) => (
                                                    <li key={vehicle._id} className="text-gray-600">
                                                        Vehicle No: {vehicle.vehicleNo}, Driver Name: {vehicle.driverName || 'N/A'}, Driver Phone: {vehicle.driverPhone}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    {item.allVendorBids.length > 0 && (
                                        <>
                                            <h3 className="text-lg font-semibold text-gray-700 mt-4">All Vendor Bids:</h3>
                                            <ul className="ml-4 list-disc">
                                                {item.allVendorBids.map((bid, index) => (
                                                    <li key={index} className="text-gray-600">
                                                        Vendor ID: {bid.vendor_id.join(', ')}, Bidding Price: ₹{bid.bidding_price.join(', ')}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    <h3 className="text-lg font-semibold text-gray-700 mt-4">Bid Details:</h3>
                                    <p className="text-lg text-gray-600">Loading City: {item.loading_city}</p>
                                    <p className="text-lg text-gray-600">Unloading City: {item.unloading_city}</p>
                                    <p className="text-lg text-gray-600">Vehicle Type: {item.vehicle_type}</p>
                                    <p className="text-lg text-gray-600">Material Type: {item.material_type}</p>
                                    <p className="text-lg text-gray-600">Route Distance: {item.route_distance} km</p>
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

export default ViewResult;
