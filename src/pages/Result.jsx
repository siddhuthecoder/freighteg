import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import { FiSearch } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { format, toZonedTime } from "date-fns-tz";
import {
  useVendorById,
  useGetVendorByCompany,
  useResultData,
} from "../HelperFunction/api";
import Arrow from "../assets/Arrow.png";
import ViewResponse from "./companyBidDetails/ViewResponse";
import VehicleDetail from "./companyBidDetails/VehicleDetail";
import ResultDetails from "./companyBidDetails/ResultDetails";

const Result = () => {
  const { vendorData } = useVendorById();
  const { getVendorData } = useGetVendorByCompany();
  const {
    resultBidData,
    bidDetails,
    bidDetailsLoading,
    bidDetailsError,
    userData,
  } = useResultData();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedType, setExpandedType] = useState(null);
  const [resultBidCount, setResultBidCount] = useState(0);
  const [bidsWithVehicleDetailsCount, setBidsWithVehicleDetailsCount] =
    useState(0);
  const [bidsWithoutVehicleDetailsCount, setBidsWithoutVehicleDetailsCount] =
    useState(0);
  const [activeTab, setActiveTab] = useState("Result");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (resultBidData) {
      const bidIds = resultBidData?.map((bid) => bid.bid_id) || [];
      const details = resultBidData.filter(
        (bid) => bid.vehicleDetails.length > 0
      );
      const withoutDetails = resultBidData.filter(
        (bid) => bid.vehicleDetails.length === 0
      );
      if (bidIds && details && withoutDetails) {
        setResultBidCount(bidIds.length);
        setBidsWithVehicleDetailsCount(details.length);
        setBidsWithoutVehicleDetailsCount(withoutDetails.length);
      }
    }
  }, [resultBidData]);

  const toggleExpand = (index, type) => {
    if (expandedRow === index && expandedType === type) {
      setExpandedRow(null);
      setExpandedType(null);
    } else {
      setExpandedRow(index);
      setExpandedType(type);
    }
  };

  const utcToIndianDate = (utcDate) => {
    const timeZone = "Asia/Kolkata";
    const zonedDate = toZonedTime(new Date(utcDate), timeZone);
    return format(zonedDate, "dd/MM/yyyy", { timeZone });
  };

  const utcToIndianTime = (utcDate) => {
    const timeZone = "Asia/Kolkata";
    const zonedDate = toZonedTime(new Date(utcDate), timeZone);
    return format(zonedDate, "hh:mm a", { timeZone });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (bidDetailsLoading)
    return (
      <div className="p-5 text-center text-xl font-semibold">Loading...</div>
    );
  if (bidDetailsError)
    return (
      <div className="p-5 text-center text-xl font-semibold text-red-600">
        Error: {bidDetailsError.message}
      </div>
    );

  return (
    <>
      <nav className="bg-gray-100 h-[8vh] flex items-center justify-between px-4 static top-0 left-40 right-0 z-10">
        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <NavLink
              to="/bid"
              className={`${
                activeTab === "Live"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
              onClick={() => setActiveTab("Live")}
            >
              Live
            </NavLink>
            <NavLink
              to="/result"
              className={`${
                activeTab === "Result"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
              onClick={() => setActiveTab("Result")}
            >
              Result
            </NavLink>
            <NavLink
              to="/history"
              className={`${
                activeTab === "History"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
              onClick={() => setActiveTab("History")}
            >
              History
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <div className="absolute right-5">
              <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Bid"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gray-100 p-5 font-sans">
        <div className="flex gap-4 mb-4">
          <div className="bg-gray-100 rounded-lg shadow p-2">
            <p className="text-sm font-semibold">
              All Result ({resultBidCount || 0})
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg shadow p-2">
            <p className="text-sm font-semibold text-green-600">
              Vehicle Detail ({bidsWithVehicleDetailsCount || 0})
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg shadow p-2">
            <p className="text-sm font-semibold text-red-600">
              Vehicle Pending Detail ({bidsWithoutVehicleDetailsCount || 0})
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-center">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="py-3 px-4 text-left">S.No</th>
                  <th className="py-3 px-4 text-left">Bid Number</th>
                  <th className="py-3 px-4 text-left">Created By</th>
                  <th className="py-3 px-4 text-left">Start Date & Time</th>
                  <th className="py-3 px-4 text-left">End Date & Time</th>
                  <th className="py-3 px-4 text-left">From City to City</th>
                  <th className="py-3 px-4 text-left">Vehicle Type</th>
                  <th className="py-3 px-4 text-left">Vehicle Size & Body</th>
                  <th className="py-3 px-4 text-left">No of Vehicle</th>
                  <th className="py-3 px-4 text-left">Material Weight (Ton)</th>
                  <th className="py-3 px-4 text-left">L1 Result</th>
                  <th className="py-3 px-4 text-left">Vehicle Detail</th>
                  <th className="py-3 px-4 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {bidDetails && bidDetails.length > 0 ? (
                  bidDetails.map((data, index) => {
                    const createdByUserData = userData?.find(
                      (user) => user._id === data.created_by
                    );
                    const isExpanded = expandedRow === index;
                    return (
                      <React.Fragment key={index}>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">{data.bidNo}</td>
                          <td className="py-3 px-4">
                            {createdByUserData
                              ? createdByUserData.name
                              : "Unknown User"}
                          </td>
                          <td className="py-3 px-4">
                            {utcToIndianDate(data.createdAt)}
                            <br />
                            {utcToIndianTime(data.createdAt)}
                          </td>
                          <td className="py-3 px-4">
                            {utcToIndianDate(data.expiry_date)}
                            <br />
                            {utcToIndianTime(data.expiry_date)}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-green-600">
                              {data.loading_city}
                            </span>
                            <img
                              src={Arrow}
                              alt="to"
                              className="mx-auto pt-2 mb-0 pb-1"
                            />
                            <span className="text-red-600">
                              {data.unloading_city}
                            </span>
                          </td>
                          <td className="py-3 px-4">{data.vehicle_type}</td>
                          <td className="py-3 px-4">
                            {data.vehicle_size}
                            <br />
                            {data.body_type}
                          </td>
                          <td className="py-3 px-4">{data.quantity}</td>
                          <td className="py-3 px-4">
                            {data.material_weight} T
                          </td>
                          <td className="py-3 px-4">
                            <button
                              className="text-blue-500"
                              onClick={() => toggleExpand(index, "vendor")}
                            >
                              Vendor Detail
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              className="text-blue-500"
                              onClick={() => toggleExpand(index, "vehicle")}
                            >
                              Vehicle Detail
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              className="text-blue-500"
                              onClick={() => toggleExpand(index, "general")}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                        {/* Expands */}
                        {isExpanded && expandedType === "vendor" && (
                          <tr>
                            <td colSpan="13">
                              <ViewResponse id={data._id} />
                            </td>
                          </tr>
                        )}
                        {isExpanded && expandedType === "vehicle" && (
                          <tr>
                            <td colSpan="13">
                              <VehicleDetail rowData={data} />
                            </td>
                          </tr>
                        )}
                        {isExpanded && expandedType === "general" && (
                          <tr>
                            <td colSpan="13">
                              <ResultDetails rowData={[data]} />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="13" className="py-4 text-center text-gray-500">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
