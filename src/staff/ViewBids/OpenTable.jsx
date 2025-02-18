import { format, toZonedTime } from 'date-fns-tz';
import React, { useState } from 'react';
// import AssignedVendorsModal from '../repeats/AssignedVendorsModal';
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
import { useSelector } from 'react-redux';
import VendorModal from './VendorModal';
import  axios  from 'axios';

const OpenTable = ({ datas }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] = useState(false);
    const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [minimum, setMinimum] = useState(null);
    const [response, setresponse] = useState(null)
    const [respondedBy, setrespondedBy] = useState([])
    const [viewedBy, setviewedBy] = useState([])
    const user = useSelector((state) => state.login.user);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(datas.length / itemsPerPage);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVendorIds, setSelectedVendorIds] = useState([]);
    const handleRowClick = async (item) => {
        const viewed = await fetchPageUsers([item._id]);
        console.log("Viewed By Data:", viewed); // Debugging line
        setviewedBy(viewed);
        console.log("Responded By Data:", item.responded_by); // Debugging line
        setrespondedBy(item.responded_by);
        setSelectedVendorIds(item.assigned_transporter);
        setIsModalOpen(true);
    };
    
    const fetchPageUsers = async (bidIds) => {
        const url = `https://freighteg.in/freightapi/pageusers`;
        try {
          const response = await axios.post(url, { bidIds });
          return response.data || [];
        } catch (error) {
          console.error("Error fetching page users:", error);
          return []; // Return an empty array if there's an error
        }
      };
  
    const getMinimumVendorPrice = (data) => {
        // Check if bidding_response exists and is an array with at least one element
        if (!data?.bidding_response || data.bidding_response?.length === 0) {
            return null; // Return null or a default value if the array is empty or undefined
        }
    
        // Ensure the bidding_price array exists and has values
        const vendorPrices = data?.bidding_response[0]?.bidding_price || [];
        
        if (vendorPrices?.length === 0) {
            return null; // Return null if there are no bidding prices
        }
    
        return Math.min(...vendorPrices);
    };
    
    
      const setRes = (data) => {
        if (data?.bidding_response && data.bidding_response?.length > 0) {
            const responses = data?.bidding_response?.reduce((acc, response) => {
                response?.vendor_id?.forEach((vendorId, index) => {
                    // Make sure that bidding_price has corresponding value
                    if (index < response?.bidding_price?.length) {
                        acc[vendorId] = response?.bidding_price[index];
                    }
                });
                return acc;
            }, {});
            setresponse(responses);
            // alert(JSON.stringify(responses));
        } else {
            setresponse({});
        }
    };
    

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

    const handleAssignedVendorsClick = (data) => {
        setSelectedData(data);
        setAssignedVendorsModalOpen(true);
    };

    const handleViewQuotesClick = (data) => {
        setRes(data)
        setSelectedData(data);
        setViewQuotesModalOpen(true);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = datas.slice(startIndex, startIndex + itemsPerPage);

    if (!datas || datas?.length === 0) {
        return <div className="text-center text-gray-500 py-4">No data available</div>;
    }
    async function getCompanyName(companyId) {
        const apiUrl = `https://freighteg.in/freightapi/get-companies/${companyId}`;
      
        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const companyData = await response.json();
          return companyData.name; // Return the company name
        } catch (error) {
          console.error('Error fetching company data:', error);
          return null;
        }
      }
      
      
        
    // console.log(datas[0])
    return (
        <>
            {currentItems?.map((data) => {
                const timeLeft = calculateTimeLeft(data.expiry_date);
                // const companyName=getCompanyName(data.company_id);
                return (
                    <div
                        key={data.bidNo}
                        className="bg-blue-50 rounded-b-lg p-4 mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]"
                    >
                        <div className="w-[100%] text-sm mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                            <div className="flex flex-col pt-1">
                                <span className="block text-black font-semibold">{data.companyName}</span>
                                <span className="block text-blue-600 font-semibold">#{data.bidNo}</span>
                                <span className="block text-red-600">
                                  Time Remaining : {timeLeft.expired ? 'Expired' : `${timeLeft.days}d ${timeLeft.hours}hr ${timeLeft.minutes}min`}
                                </span>
                                <div className="block text-grey-500 mt-12">Remarks :  {data.bid_remarks}</div>
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className="block font-medium ml-6">{data.createdAt.slice(0, 10)}</span>
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
                                    <MdLocalPrintshop className='text-2xl text-blue-600 cursor-pointer' onClick={() => handlePrintClick(data)} />
                                </div>
                                <div
                                    className="text-blue-600 underline text-sm cursor-pointer"
                                    onClick={() => handleRowClick(data)}
                                >
                                    View Assigned Vendors
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-2 border-t pt-2 text-sm text-gray-600">
                            <span className="block text-xs text-gray-500">
                                <span className="gap-8 text-grey-600 text-sm font-semibold  py-1 rounded-lg">
                                    Assigned Staff ({data.assignedToUser?.name}, +91
                                    {data.assignedToUser?.phone})
                                </span>
                            </span>
                            <div className="mr-15px">
                                Created By - <span className="font-semibold">{data.createdByUser?.name}</span>
                                <span>
                                    ({data.createdAt.slice(0, 10)}, {formatTo12HourTime(data.createdAt)})
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


            <VendorModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                vendorIds={selectedVendorIds}
                respondedBy={respondedBy}
                viewedBy={viewedBy}
            />

            
            
        </>
    );
};

export default OpenTable;
