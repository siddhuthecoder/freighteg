import React, { useState, useEffect } from 'react';
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { Link } from 'react-router-dom';
import { format, toZonedTime } from 'date-fns-tz';


const BASE_URL = 'https://freighteg.in/freightapi'; // Assuming this is the base URL for all your APIs

const AssignedRequestHistory = () => {
    const user = useSelector((state) => state.login.user);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] = useState(false);
    const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [minimum, setMinimum] = useState(null);
    const [response, setresponse] = useState(null)

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


    
    const formatTo12HourTime = (utcDate) => {
        const timeZone = "Asia/Kolkata";
        const zonedDate = toZonedTime(new Date(utcDate), timeZone);
        return format(zonedDate, "hh:mm a", { timeZone });
    };

    return (
        <>
            <TransportNavBar />
            <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
                {/* <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Assigned Request History</h2> */}
                <div className="flex gap-8 my-2">
                    <Link
                        to="/transporter/assignedRequests"
                        className={`cursor-pointer  px-3 py-2 text-gray-500 hover:text-blue-600 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
                    >
                        Assigned Requests
                    </Link>
                    <Link
                        to="#"
                        className={`cursor-pointer text-blue-600 border-b-2 border-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
                    >
                        Assigned History
                    </Link>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                        <p className="ml-4 text-lg text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {data.map((data) => (
                                <div
                                key={data.bidNo}
                                className="bg-blue-50 rounded-b-lg p-4 mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]"
                            >
                                <div className="w-[100%] text-sm mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                                    <div className="flex flex-col pt-1">
                                        <span className="block text-black font-semibold">{user?.name}</span>
                                        <span className="block text-blue-600 font-semibold">#{data.bidNo}</span>
                                        <span className="block text-red-600">
                                          {/* Time Remaining : {timeLeft.expired ? 'Expired' : `${timeLeft.days}d ${timeLeft.hours}hr ${timeLeft.minutes}min`} */}
                                        </span>
                                        <div className="block text-grey-500 mt-12">Remarks :  {data.bid_remarks}</div>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        {/* <span className="block font-medium ml-6">{data.createdAt.slice(0, 10)}</span> */}
                                        <span className="block ml-6">{formatTo12HourTime(data.createdAt)}</span>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <span className="block font-medium ml-4">
                                            {data.loading_city} ({data.loading_state})
                                        </span>
                                        <span className="block text-xs text-gray-500 ml-4">
                                            {data.loading_address} ( {data.loading_pincode})
                                        </span>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <span className="block font-medium">
                                            {data.unloading_city} ({data.unloading_state})
                                        </span>
                                        <span className="block text-xs text-gray-500">
                                            {data.unloading_address} ({data.unloading_pincode})
                                        </span>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <span className="block">Vehicle Quantity - {data.quantity}</span>
                                        <span className="block">
                                           Vehicle Type-  {data.vehicle_type} 
                                        </span>
                                        <span className="block">
                                           Vehicle Size-  {data.vehicle_size} ({data.body_type})
                                        </span>
                                        <span className="block">
                                        Material type-  {data.material_type} ({data.material_weight}Mt)
                                        </span>
                                        {/* <span className="block">
                                        Material weight-  {data.material_weight}
                                        </span> */}
                                        <a href="#" className="text-blue-600">
                                            Distance - {data.route_distance} Km
                                        </a>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <div className="w-full flex items-center justify-end gap-3">
                                            {/* <IoMdMail className='text-2xl text-blue-600 cursor-pointer' />
                                            <MdLocalPrintshop className='text-2xl text-blue-600 cursor-pointer' onClick={() => handlePrintClick(data)} /> */}
                                        </div>
                                        {/* <div className="text-lg font-semibold text-gray-700 mr-5">Rs {minimumPrice || 0}</div> */}
                                        <div className=""></div>
                                        <div
                                            className="text-blue-600 underline text-sm cursor-pointer"
                                         //    onClick={() => handleViewQuotesClick(data)}
                                        >
                                            View all quotes
                                        </div>
                                    </div>
                                </div>
        
                                <div className="flex justify-between items-center mt-2 border-t pt-2 text-sm text-gray-600">
                                    <span className="block text-xs text-gray-500">
                                        Target Price - {data.target_price}Rs
                                        <span className="gap-8 text-grey-600 text-sm font-semibold ml-5 px-3 py-1 rounded-lg">
                                            Assigned Staff ({data.assignedToUser?.name}, +91
                                            {data.createdByUser?.phone})
                                        </span>
                                    </span>
                                    <div className="mr-15px">
                                        Created By - <span className="font-semibold">{data.createdByUser?.name}</span>
                                        <span>
                                            {/* ({data.createdAt.slice(0, 10)}, {formatTo12HourTime(data.createdAt)}) */}
                                        </span>
                                    </div>
                                </div>
                            </div>
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

export default AssignedRequestHistory;
