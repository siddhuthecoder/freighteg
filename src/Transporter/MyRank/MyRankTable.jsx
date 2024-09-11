import React, { useState } from "react";
import { format, toZonedTime } from "date-fns-tz";
import { useSelector } from "react-redux";
import axios from "axios";

const MyRankTable = ({ datas }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newBidPrice, setNewBidPrice] = useState("");
  const [currentBidData, setCurrentBidData] = useState(null);
  const [load, setLoad] = useState(false);
  const user = useSelector((state) => state.login.user);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(datas.length / itemsPerPage);
  console.log({ datas });
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
    link.download = `data-${data._id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddBidClick = (data) => {
    setCurrentBidData(data);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewBidPrice("");
  };

  const handleSubmit = async () => {
    if (newBidPrice <= currentBidData?.target_price * 0.6) {
      alert("Please enter a valid bid price.");
      return;
    }

    setLoad(true);

    try {
      if (newBidPrice.trim() === "") return;

      const body = {
        bid_id: currentBidData?.bid_id,
        vendor_id: user?.id,
        bidding_price: newBidPrice,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addBidding`,
        body
      );

      if (response?.status === 200) {
        handleModalClose();
        alert("Bid Added Successfully");
        setNewBidPrice("");
        // Replace fetchVendorRank with your function to update the bid data
      } else {
        throw new Error("Something went wrong !! Try Again.");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong !! Try Again.";
      alert(errorMessage);
    } finally {
      setLoad(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = datas.slice(startIndex, startIndex + itemsPerPage);

  if (!datas || datas.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">No data available</div>
    );
  }
  console.log(datas[0]);
  return (
    <>
      {currentItems.map((data) => {
        const timeLeft = calculateTimeLeft(data.expiry_date);
        let rankColor = "";

        if (data.vendor_rank === 1) {
          rankColor = "bg-green-500"; // Green for Rank 1
        } else if (data.vendor_rank >= 2 && data.vendor_rank <= 5) {
          rankColor = "bg-orange-500"; // Orange for Rank 2-5
        } else {
          rankColor = "bg-red-500"; // Red for Rank 6 or more
        }
        return (
          <div
            key={data.bidNo}
            className="bg-blue-50 rounded-b-lg p-4 mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]"
          >
            <div className="w-[100%] text-sm mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
              <div className="flex flex-col pt-1">
                <span className="block text-black font-semibold">
                  {data?.companyName}
                </span>
                <span className="block text-blue-600 font-semibold">
                  #{data.bidNo}
                </span>
                <span className="block text-red-600">
                  Time Remaining:{" "}
                  {timeLeft.expired
                    ? "Expired"
                    : `${timeLeft.days}d ${timeLeft.hours}hr ${timeLeft.minutes}min`}
                </span>
                <div className="block text-grey-500 mt-12">
                  Remarks: {data.bid_remarks}
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
                  {data.loading_address} ({data.loading_pincode})
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
                  Vehicle Type - {data.vehicle_type}
                </span>
                <span className="block">
                  Vehicle Size - {data.vehicle_size} ({data.body_type})
                </span>
                <span className="block">
                  Material Type - {data.material_type} ({data.material_weight}
                  Mt)
                </span>
                <a href="#" className="text-blue-600">
                  Distance - {data.route_distance} Km
                </a>
              </div>
              <div className="flex flex-col pt-1">
                <div className="w-full flex items-center justify-end gap-3">
                  {/* <IoMdMail className='text-2xl text-blue-600 cursor-pointer' /> */}
                  {/* <MdLocalPrintshop className='text-2xl text-blue-600 cursor-pointer' onClick={() => handlePrintClick(data.} /> */}
                </div>
                <div className="flex items-center mb-2">
                  <span
                    className={`inline-block w-6 h-6 rounded-full mr-2 ${rankColor}`}
                  ></span>{" "}
                  {/* Colored dot */}
                  <p className="text-[15px]">
                    Vendor Rank : {data.Vendor_rank}
                  </p>
                </div>
                <p className="text-[15px]">
                  Current Vendor Price : {data.Vendor_price}
                </p>
                {data.vendor_bidding_count >= 3 ? (
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded mt-2 cursor-not-allowed"
                    disabled
                  >
                    Bid Limit Exceeded
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
                    onClick={() => handleAddBidClick(data)}
                  >
                    BID AGAIN
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 border-t pt-2 text-sm text-gray-600">
              <span className="block text-xs text-gray-500">
                <span className="gap-8 text-grey-600 text-sm font-semibold  px-1 py-1 rounded-lg">
                  Assigned Staff ({data.assignedToUser?.name}, +91
                  {data.assignedToUser?.phone})
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
            <h2 className="text-lg font-semibold mb-4">Add New Bid</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter Your Bidding Price
              </label>
              <input
                type="number"
                value={newBidPrice}
                onChange={(e) => setNewBidPrice(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={load}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {load ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyRankTable;
