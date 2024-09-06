import React, { useState, useEffect } from "react";
import TransportNavBar from "../TransportNavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { format, toZonedTime } from "date-fns-tz";
import VehicleDetailsModal from './VehicleDetailsModal'

import "tailwindcss/tailwind.css"; // Import Tailwind CSS

const BASE_URL = "https://freighteg.in/freightapi"; // Assuming this is the base URL for all your APIs

const AssignedRequest = () => {
  const user = useSelector((state) => state.login.user);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("AssignedRequest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] =
    useState(false);
  const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [minimum, setMinimum] = useState(null);
  const [response, setresponse] = useState(null);
  const [qunatity, setqunatity] = useState(0);

  const openModal = (qunatityOfVehicle) => {
    setqunatity(5);
    alert(qunatity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/getBidResultHistory?vendor_id=669be1f26d77579092b9b435&page=${currentPage}&limit=5`
        );
        const bidData = response.data.data;

        const detailedBidData = await Promise.all(
          bidData.map(async (bid) => {
            const bidDetails = await fetchBidDetails(bid.bid_id);
            const createdByUser = await fetchFreightUserData(bidDetails.created_by);
            const assignedToUser = await fetchFreightUserData(bidDetails.assigned_to);
            return { ...bid, ...bidDetails ,createdByUser,assignedToUser};
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getMinimumVendorPrice = (data) => {
    // Check if bidding_response exists and is an array with at least one element
    if (!data?.bidding_response || data.bidding_response.length === 0) {
      return null; // Return null or a default value if the array is empty or undefined
    }

    // Ensure the bidding_price array exists and has values
    const vendorPrices = data.bidding_response[0]?.bidding_price || [];

    if (vendorPrices.length === 0) {
      return null; // Return null if there are no bidding prices
    }

    return Math.min(...vendorPrices);
  };

  const setRes = (data) => {
    if (data.bidding_response && data.bidding_response.length > 0) {
      const responses = data.bidding_response.reduce((acc, response) => {
        response.vendor_id.forEach((vendorId, index) => {
          // Make sure that bidding_price has corresponding value
          if (index < response.bidding_price.length) {
            acc[vendorId] = response.bidding_price[index];
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
        expired: true,
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

  console.log(data[0]);

  return (
    <>
      <TransportNavBar />
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <div className="flex gap-8 my-2">
          <Link
            to="#   "
            className={`cursor-pointer  px-3 py-2 text-blue-600 border-b-2 border-blue-600 hover:text-blue-600 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
          >
            Assigned Requests
          </Link>
          <Link
            to="/transporter/assignedRequestHistory"
            className={`cursor-pointer  text-gray-500  px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
          >
            Assigned History
          </Link>
        </div>
        <div className="w-full flex flex-col overflow-x-scroll">
          <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
            <div className="font-semibold md:text-lg ps-[30px]">ID</div>
            <div className="font-semibold md:text-lg ps-[30px]">
              Loading Date
            </div>
            <div className="font-semibold md:text-lg ps-[30px]">
              Loading Point{" "}
            </div>
            <div className="font-semibold md:text-lg ps-[30px]">
              Unloading Point
            </div>
            <div className="font-semibold md:text-lg ps-[30px]">Details</div>
            <div className="font-semibold md:text-lg ps-[30px]">Best Quote</div>
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
                  <>
                    {/* const timeLeft = calculateTimeLeft(data.expiry_date);
                                 const minimumPrice = getMinimumVendorPrice(data ); */}
                    <div
                      key={data.bidNo}
                      className="bg-blue-50 rounded-b-lg p-4 mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]"
                    >
                      <div className="w-[100%] text-sm mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                        <div className="flex flex-col pt-1">
                          <span className="block text-black font-semibold">
                            {user?.name}
                          </span>
                          <span className="block text-blue-600 font-semibold">
                            #{data.bidNo}
                          </span>
                          <span className="block text-red-600">
                            {/* Time Remaining : {timeLeft.expired ? 'Expired' : `${timeLeft.days}d ${timeLeft.hours}hr ${timeLeft.minutes}min`} */}
                          </span>
                          <div className="block text-grey-500 mt-12">
                            Remarks : {data.bid_remarks}
                          </div>
                        </div>
                        <div className="flex flex-col pt-1">
                          <span className="block font-medium ml-6">
                            {data.createdAt.slice(0, 10)}
                          </span>
                          <span className="block ml-6">
                            {formatTo12HourTime(data.createdAt)}
                          </span>
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
                          <span className="block">
                            Vehicle Quantity - {data.quantity}
                          </span>
                          <span className="block">
                            Vehicle Type- {data.vehicle_type}
                          </span>
                          <span className="block">
                            Vehicle Size- {data.vehicle_size} ({data.body_type})
                          </span>
                          <span className="block">
                            Material type- {data.material_type} (
                            {data.material_weight}Mt)
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
                            <button
                              onClick={()=>openModal(data.quantity)}
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                              Add Vehicle Details
                            </button>
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
                          Created By -{" "}
                          <span className="font-semibold">
                            {data.createdByUser?.name}
                          </span>
                          <span>
                            ({data.createdAt.slice(0, 10)},{" "}
                            {formatTo12HourTime(data.createdAt)})
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </ul>
              <div className="flex justify-center items-center mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500  mx-4 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-lg text-gray-600">
                  {" "}
                  Page {currentPage} of {totalPages}{" "}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 mx-4  text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
          <VehicleDetailsModal isOpen={isModalOpen} onClose={closeModal} quantity={qunatity} />
        </div>
      </div>
    </>
  );
};

export default AssignedRequest;
