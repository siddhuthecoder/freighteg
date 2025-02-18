import React, { useState, useEffect } from "react";
import { format, toZonedTime } from "date-fns-tz";
import AssignedVendorsModal from "../repeats/AssignedVendorsModal";
import ViewQuotesModal from "./ViewQuotesModal";
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";
import BidEditForm from "../repeats/BidEditForm";

const CancelledTable = ({ datas }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] =
    useState(false);
  const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
//   const [minimum, setMinimum] = useState(null);
  const [response, setresponse] = useState(null);
  const user = useSelector((state) => state.login.user);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(datas.length / itemsPerPage);
console.log(datas)

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
  const getMinimumVendorPrice = (vendorPrices) => {
    if (!vendorPrices || vendorPrices.length === 0) {
      return null; // Return null or a default value if the array is empty or undefined
    }
    return Math.min(...vendorPrices);
  };
  

  const handlePrintClick = (data) => {
    // Process and format only the required data
    const formattedData = {
        bidNo: data.bidNo,
        name: user?.name,
        remarks: data.bid_remarks,
        loadingDate: data.loading_date.slice(0, 10), // YYYY-MM-DD
        loadingTime: formatTo12HourTime(data.loading_date), // hh:mm a
        loadingLocation: `${data.loading_city} (${data.loading_state})`,
        loadingAddress: `${data.loading_address} (${data.loading_pincode})`,
        unloadingLocation: `${data.unloading_city} (${data.unloading_state})`,
        unloadingAddress: `${data.unloading_address} (${data.unloading_pincode})`,
        vehicleDetails: {
            quantity: data.quantity,
            type: data.vehicle_type,
            size: data.vehicle_size,
            bodyType: data.body_type,
        },
        materialDetails: {
            type: data.material_type,
            weight: `${data.material_weight} Mt`,
        },
        distance: `${data.route_distance} Km`,
        // minimumPrice: getMinimumVendorPrice(data) || 0,
        targetPrice: `${data.target_price} Rs`,
        assignedStaff: `${data.assignedToUser?.name}, +91${data.assignedToUser?.phone}`,
        createdBy: `${data.createdByUser?.name}`,
        createdAt: `${data.createdAt.slice(0, 10)}, ${formatTo12HourTime(data.createdAt)}`,
    };

    // Convert formatted data to JSON string
    const dataStr = JSON.stringify(formattedData, null, 2);
    
    // Create a blob and download it
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `data-${data.bidNo}.txt`; // Saving the file as JSON
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};


  const handleAssignedVendorsClick = (data) => {
   
    setAssignedVendorsModalOpen(true);
    
  };

  const handleViewQuotesClick = (data) => {
    const vendorPriceMap = {};

    data.vendorIds.forEach((vendorId, index) => {
        vendorPriceMap[vendorId] = data.vendorPrices[index];
    });
    setSelectedData(data);
    setresponse(vendorPriceMap)
    setViewQuotesModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = datas.slice(startIndex, startIndex + itemsPerPage);

  if (!datas || datas.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">No data available</div>
    );
  }

//   console.log(datas[0]);
  return (
    <>
      {currentItems.map((data) => {
        const timeLeft = calculateTimeLeft(data.expiry_date);
        const minimumPrice = getMinimumVendorPrice(data.vendorPrices || []);

        return (
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
                  Time Remaining :{" "}
                  {timeLeft.expired
                    ? "Expired"
                    : `${timeLeft.days}d ${timeLeft.hours}hr ${timeLeft.minutes}min`}
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
                <span className="block">Vehicle Type- {data.vehicle_type}</span>
                <span className="block">
                  Vehicle Size- {data.vehicle_size} ({data.body_type})
                </span>
                <span className="block">
                  Material type- {data.material_type} ({data.material_weight}Mt)
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
                  <IoMdMail className="text-2xl text-blue-600 cursor-pointer" />
                  <MdLocalPrintshop className='text-2xl text-blue-600 cursor-pointer' onClick={() => handlePrintClick(data)} />
                </div>
                <div className="text-lg font-semibold text-gray-700 mr-5">
                  {/* Rs Minumum Value  */}Rs {minimumPrice || 0}
                </div>
                <div
                  className="text-blue-600 underline text-sm cursor-pointer"
                  onClick={() => handleViewQuotesClick(data)}
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
        );
      })}

    

      {isAssignedVendorsModalOpen && selectedData && (
        <AssignedVendorsModal
          data={selectedData}
          onClose={() => setAssignedVendorsModalOpen(false)}
        />
      )}
      {isViewQuotesModalOpen && selectedData && (
        <ViewQuotesModal
          data={selectedData}
          response={response}
          onClose={() => setViewQuotesModalOpen(false)}
        />
      )}
    </>
  );
};

export default CancelledTable;
