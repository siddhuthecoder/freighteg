import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import StaffNavbarr from '../StaffNavBarr';
import { format, toZonedTime } from 'date-fns-tz';
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
const BASE_URL = 'https://freighteg.in/freightapi'; 


const VehicleInfoModal = ({
    showVehicleModal,
    setShowVehicleModal,
    vechileDetails,
  }) => {
    if (!showVehicleModal) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 w-full  relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowVehicleModal(false)}
          >
            X
          </button>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Vehicle Details
          </h2>
  
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left font-semibold text-nowrap text-gray-800">
                    Vehicle Number
                  </th>
                  <th className="p-2 text-left font-semibold text-nowrap text-gray-800">
                    Driver Name
                  </th>
                  <th className="p-2 text-left font-semibold text-nowrap text-gray-800">
                    Driver Number
                  </th>
                  <th className="p-2 text-left font-semibold text-nowrap text-gray-800">
                    GPS link
                  </th>
                  <th className="p-2 text-left font-semibold text-nowrap text-gray-800">
                    Remark
                  </th>
                 
                  <th className="p-2 text-left font-semibold text-nowrap text-gray-800">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Handle null or empty data */}
                {vechileDetails && vechileDetails.length > 0 ? (
                  vechileDetails.map((vehicle, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2 text-gray-800">{vehicle.vehicleNo || 'N/A'}</td>
                      <td className="p-2 text-gray-800">{vehicle.driverName || 'N/A'}</td>
                      <td className="p-2 text-gray-800">{vehicle.drverPhone || 'N/A'}</td>
                      <td className="p-2 text-gray-800">{vehicle.gpsLink || 'N/A'}</td>
                      <td className="p-2 text-gray-800">{vehicle.remarks || 'N/A'}</td>
                      <td className="p-2 gap-2 text-gray-800 flex items-center">
                        
                          <Link to={`/staff/vahan/${vehicle.vehicleNo}`}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                              Vahan
                            </button>
                          </Link>
                          <Link to={`/staff/fastag/${vehicle.vehicleNo}`}>
                            <button className="bg-green-500 text-nowrap text-white px-4 py-2 rounded-md text-sm">
                              Fastag Tracking
                            </button>
                          </Link>
                        
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="p-4 text-center text-gray-600">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

const ViewResultHistory = () => {
    const user = useSelector((state) => state.login.user);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] =useState(true);
    const [selectedVendorIds, setSelectedVendorIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [selectedVehicleDetails, setSelectedVehicleDetails] = useState([]);

    const handleViewVehiclesClick = (vehicleDetails) => {
        setSelectedVehicleDetails(vehicleDetails);
        setShowVehicleModal(true);
      };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/getBidResultHistory?assigned_to=${user?.id}&page=${currentPage}&limit=5`);
                const bidData = response.data.data;
                setTotalPages(response.data.totalPages);

                // Fetch bid details for all bids and merge them into bidData
                const bidsDetailsPromises = bidData.map(async (item) => {
                    const bidDetails = await fetchBidDetails(item.bid_id);
                    const createdByUser = await fetchFreightUserData(bidDetails.created_by);
                    const assignedToUser = await fetchFreightUserData(bidDetails.assigned_to);
                    const vendorData=await fetchVendorData(item.vendor_id)
                    // const vendorDeatisl=await fetchVendorDetails(bidDetails.vd)
                    const companyName=await getCompanyName(bidDetails.company_id);
                    
                    return { ...item, ...bidDetails,createdByUser,assignedToUser,vendorData,companyName };
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

    const fetchFreightUserData = async (userId) => {
        const url = `https://freighteg.in/freightapi/freightusers/${userId}`;
        try {
          const response = await axios.get(url);
          return response.data || null;
        } catch (error) {
          console.error(`Error fetching user data for id ${userId}:`, error);
          return null; // Return null if there's an error
        }
      };
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
      const fetchVendorData = async (id) => {
        const url = `https://freighteg.in/freightapi/vendor/${id}`;
        try {
            // alert(id)
          const response = await axios.get(url);
       
          return response.data || null;
          
        } catch (error) {
          console.error(`Error fetching user data for id ${id}:`, error);
          return null; // Return null if there's an error
        }
      };
      
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

    const handleRowClick = (vendorIds) => {
        setSelectedVendorIds(vendorIds);
        setIsModalOpen(true);
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

    return (
        <>
            <StaffNavbarr />
            <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
                <div className="flex gap-8 ">
                    <Link
                        to="/staff/viewResult"
                        className={`text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
                    >
                        View Result
                    </Link>
                    <Link
                        to="#"
                        className={` text-blue-600 border-b-2 border-blue-600  px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
                    >
                        Result History
                    </Link>
                </div>
                <div className="w-full flex flex-col overflow-x-scroll">
                <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                    <div className="font-semibold md:text-lg ps-[30px]">ID</div>
                    <div className="font-semibold md:text-lg ps-[30px]">Loading Date</div>
                    <div className="font-semibold md:text-lg ps-[30px]">Loading Point </div>
                    <div className="font-semibold md:text-lg ps-[30px]">Unloading Point</div>
                    <div className="font-semibold md:text-lg ps-[30px]">Details</div>
                    <div className="font-semibold md:text-lg ps-[30px]">View Results</div>
                    </div>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                        <p className="ml-4 text-lg text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {data.map((data) => {
                                const timeLeft = calculateTimeLeft(data.expiry_date);
                                const minimumPrice = getMinimumVendorPrice(data );
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
                                         <span className="block">
                                            Vendor -  {data.vendorData.data.name} ({data.vendorData.data.phone})
                                         </span>
                                        
                                         <div
                                            onClick={() => {
                                                handleViewVehiclesClick(data.vehicleDetails);
                                              }}
                                             className="bg-blue-600 max-w-[140px] text-center text-white px-3 py-1 mt-3 rounded-md  text-sm cursor-pointer"
                                            //  onClick={() => handleRowClick(data.assigned_transporter)}
                                         >
                                             Vehicle Info
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
                                )
                        })}
                        </ul>
                        <div className="flex justify-center items-center mt-6">
                            <button 
                                onClick={handlePreviousPage} 
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-blue-500 text-white  mx-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-lg text-gray-600"> Page {currentPage} of {totalPages} </span>
                            <button 
                                onClick={handleNextPage} 
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-blue-500 text-white mx-4  rounded-md hover:bg-blue-600 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                </div>
            </div>
            <VehicleInfoModal
                showVehicleModal={showVehicleModal}
                setShowVehicleModal={setShowVehicleModal}
                vechileDetails={selectedVehicleDetails}
            />
        </>
    );
};

export default ViewResultHistory;
