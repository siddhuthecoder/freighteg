import React, { useState } from 'react';
import { format, toZonedTime } from 'date-fns-tz';
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
import { useSelector } from 'react-redux';
import axios from 'axios'; // Make sure axios is imported
const NewLoadTable = ({ datas }) => {
    console.log(datas)
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [bidRemarks, setBidRemarks] = useState('');
    const [currentBidData, setCurrentBidData] = useState(null);
    const user = useSelector((state) => state.login.user);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(datas.length / itemsPerPage);
    const [load, setLoad]=useState(null);
    const [currentData, setcurrentData] = useState(null)

    const calculateTimeLeft = (expiryDate) => {
        const now = new Date();
        const expiration = new Date(expiryDate);
        const difference = expiration - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = {
                expired: true
            };
        }

        return timeLeft;
    };

    const formatTo12HourTime = (utcDate) => {
        const timeZone = "Asia/Kolkata";
        const zonedDate = toZonedTime(new Date(utcDate), timeZone);
        return format(zonedDate, "hh:mm a", { timeZone });
    };

    const handlePrintClick = (data) => {
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `data-${data._id}.txt`; // Save as a .txt file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleAddBidClick = (data) => {
        setcurrentData(data)
        setCurrentBidData(data);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setBidAmount('');
        setBidRemarks('');
    };

    const handleSubmit =async () => {
       const data=currentData;
        if (!bidAmount ) {
            alert('Please fill in all fields');
            return;
        }
        // alert( data?.details.target_price * 1.15)
        if (bidAmount <=data?.details.target_price * 0.6) {
            alert('Sorry, please enter a valid bid price.');
            return;
        }
        
        if (bidAmount >= (data?.details.target_price * 1.05)) {
            alert('Sorry, please enter a valid bid price.');
            return;
        }
        setLoad(true);
         console.log({data})
        try {
            let body
            if(data?.details.branch_id!==null){
                body= {
                    bid_id: data?.bidId,
                    vendor_id: user?.id,
                    bidding_price: bidAmount,
                    branch_id:data?.details.branch_id
                };
            }
            else{
                body= {
                    bid_id: data?.bidId,
                    vendor_id:user?.id,
                    bidding_price:bidAmount,
                };
            }
            console.log('Submitting new bid:', body);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/addBidding`, body);
            if (response?.status === 200) {
                alert('Bid Added Successfully');
                
                await handleUpdateBid(user?.id,data);
                handleModalClose();
                setBidAmount('');
            }
            else{
                alert("Something Error Happend")
            }
        } catch (error) {
            console.log('Error:', error);
            const errorMessage = error?.response?.data?.message || 'Something went wrong! Try Again.';
            alert(errorMessage);
        }
       
        handleModalClose();
    };
    const handleUpdateBid = async (vendorId,data) => {
        setLoad(true);
        console.log({data})
        try {
            const body = {
                responded_by: [vendorId],
            };
            console.log({body})
            const response = await axios.patch(`https://freighteg.in/freightapi/updateBid/${data?.bidId}`, body);
            if (response?.status === 200) {
                window.location.reload() 
            } else {
                // alert('Something went wrong with updating bid status! Try Again.');
            }
        } catch (error) {
            console.log('Error:', error);
            const errorMessage = error?.response?.data?.message || 'Something went wrong with updating bid status! Try Again.';
            alert(errorMessage);
        } finally {
            setLoad(false);
        }
    };


    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = datas.slice(startIndex, startIndex + itemsPerPage);
    console.log(datas)
    if (!datas || datas.length === 0) {
        return <div className="text-center text-gray-500 py-4">No data available</div>;
    }

    return (
        <>
            {currentItems.map((data) => {
                const timeLeft = calculateTimeLeft(data.details.expiry_date);

                return (
                    <div
                        key={data.details.bidNo}
                        className="bg-blue-50 rounded-b-lg p-4 mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]"
                    >
                        <div className="w-[100%] text-sm mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                            <div className="flex flex-col pt-1">
                                <span className="block text-black font-semibold">{data?.companyName}</span>
                                <span className="block text-blue-600 font-semibold">#{data.details.bidNo}</span>
                                <span className="block text-red-600">
                                    Time Remaining: {timeLeft.expired ? 'Expired' : `${timeLeft.days}d ${timeLeft.hours}hr ${timeLeft.minutes}min`}
                                </span>
                                <div className="block text-grey-500 mt-12">Remarks: {data.details.bid_remarks}</div>
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className="block font-medium ml-6">{data.details.createdAt.slice(0, 10)}</span>
                                <span className="block ml-6">{formatTo12HourTime(data.details.createdAt)}</span>
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className="block font-medium ml-4">
                                    {data.details.loading_city} ({data.details.loading_state})
                                </span>
                                <span className="block text-xs text-gray-500 ml-4">
                                    {data.details.loading_address} ({data.details.loading_pincode})
                                </span>
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className="block font-medium">
                                    {data.details.unloading_city} ({data.details.unloading_state})
                                </span>
                                <span className="block text-xs text-gray-500">
                                    {data.details.unloading_address} ({data.details.unloading_pincode})
                                </span>
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className="block">Vehicle Quantity - {data.details.quantity}</span>
                                <span className="block">
                                   Vehicle Type - {data.details.vehicle_type} 
                                </span>
                                <span className="block">
                                   Vehicle Size - {data.details.vehicle_size} ({data.details.body_type})
                                </span>
                                <span className="block">
                                    Material Type - {data.details.material_type} ({data.details.material_weight}Mt)
                                </span>
                                <a href="#" className="text-blue-600">
                                    Distance - {data.details.route_distance} Km
                                </a>
                            </div>
                            <div className="flex flex-col pt-1">
                                <div className="w-full flex items-center justify-end gap-3">
                                    {/* <IoMdMail className='text-2xl text-blue-600 cursor-pointer' /> */}
                                    {/* <MdLocalPrintshop className='text-2xl text-blue-600 cursor-pointer' onClick={() => handlePrintClick(data.details)} /> */}
                                </div>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
                                    onClick={() => handleAddBidClick(data)}
                                >
                                    ADD BID
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-2 border-t pt-2 text-sm text-gray-600">
                            <span className="block text-xs text-gray-500">
                                
                                <span className="gap-8 text-grey-600 text-sm font-semibold px-1 py-1 rounded-lg">
                                     Assigned Staff ({data.assignedToUser?.name}, +91{data.assignedToUser?.phone})
                                </span>
                            </span>
                            <div className="mr-15px">
                            Created By - <span className="font-semibold">{data.createdByUser?.name}</span>
                                <span>
                                    ({data.details.createdAt.slice(0, 10)}, {formatTo12HourTime(data.details.createdAt)})
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-400"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>

            {/* Modal for Adding Bid */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Add New Bid</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Bid Amount:</label>
                            <input
                                type="number"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleModalClose}
                                className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewLoadTable;
