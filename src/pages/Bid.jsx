import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { CiSearch } from "react-icons/ci";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { format, toZonedTime } from "date-fns-tz";
import "react-datepicker/dist/react-datepicker.css";
import vector from "../assets/Vector_new.png";
import {
  useVendorById,
  useAssignStaff,
  useGetVendorByCompany,
  useBidData,
} from "../HelperFunction/api";
import Arrow from "../assets/Arrow.png";
import Details from "./companyBidDetails/Details";
import Response from "./companyBidDetails/Response";
import BidVendor from "./customPopUp/BidVendor";

const Bid = () => {
  const { vendorData } = useVendorById();
  const { getVendorData } = useGetVendorByCompany();
  const {
    liveBidData,
    bidDetails,
    bidDetailsLoading,
    bidDetailsError,
    bidDetailsFetchError,
    userData,
  } = useBidData();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [bids, setBids] = useState([]);
  const [getVendor, setGetVendor] = useState([]);
  const [expandedResult, setExpandedResult] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [assignData, setAssignData] = useState([]);
  const [assigned, setAssigned] = useState(null);
  const [clickedText, setClickedText] = useState("Bill Created");
  const [click, setClick] = useState("Live");
  const [expandedRow, setExpandedRow] = useState(null);
  const [vendorResponse, setVendorResponse] = useState(null);
  const [IsOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [countRespond, setCountResponse] = useState(0);
  const [countUnrespond, setCountUnrespond] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const togglePopup = (data) => {
    setPopupData(data);
    setIsOpen((prev) => !prev);
  };

  const handleClick = (text) => {
    setClickedText(text);
  };

  const handleClicks = (text) => {
    setClick(text);
  };

  const clickStyle = (text) => ({
    color: click === text ? "#29a7e4" : "#888888",
    cursor: "pointer",
  });

  const textStyle = (text) => ({
    color: clickedText === text ? "black" : "#888888",
    cursor: "pointer",
  });

  const handleViewResponse = (index) => {
    setVendorResponse(vendorResponse === index ? null : index);
    if (expandedRow === index) {
      setExpandedRow(null);
    }
  };

  const handleViewDetails = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    if (vendorResponse === index) {
      setVendorResponse(null);
    }
  };

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNavigate = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (vendorData) {
      setBids(vendorData);
    }
  }, [vendorData]);

  useEffect(() => {
    if (getVendorData) {
      setGetVendor([getVendorData]);
    }
  }, [getVendorData]);

  useEffect(() => {
    if (bids.length > 0) {
      const assignedTransporter = bids[0]?.assigned_transporter;
      if (assignedTransporter && assignedTransporter.length > 0) {
        setAssigned(assignedTransporter[0]);
      }
    }
  }, [bids]);

  const { assignStaffData } = useAssignStaff(assigned);

  useEffect(() => {
    if (assignStaffData) {
      setAssignData([assignStaffData]);
    }
  }, [assignStaffData]);

  const handleResultClick = (bid) => {
    setExpandedResult(bid === expandedResult ? null : bid);
    if (expandedDetails === bid) {
      setExpandedDetails(null);
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

  const handleDetailsClick = (bid) => {
    setExpandedDetails(bid === expandedDetails ? null : bid);
    if (expandedResult === bid) {
      setExpandedResult(null);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (liveBidData?.data) {
      let responsedCount = 0;
      let UnrespondedCount = 0;
      liveBidData?.data.forEach((bid) => {
        if (bid.bidding_response.length > 0) {
          responsedCount++;
        } else {
          UnrespondedCount++;
        }
      });
      setCountResponse(responsedCount);
      setCountUnrespond(UnrespondedCount);
    }
  }, [liveBidData]);

  // Filtered bidDetails based on search term
  const filteredBidDetails = bidDetails?.filter(
    (bid) =>
      bid.bidNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.loading_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.unloading_city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (bidDetailsLoading) return <div>Loading...</div>;
  if (bidDetailsError && bidDetailsFetchError) return <div>Error:</div>;

  return (
    <>
      <nav className="bg-gray-100 h-[8vh] flex items-center justify-between px-4 static top-0 left-40 right-0 z-10">
        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <NavLink
              to="/bid"
              className={`${
                window.location.pathname === "/bid"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
              onClick={() => handleClicks("Live")}
            >
              Live
            </NavLink>
            <NavLink
              to="/result"
              className={`${
                window.location.pathname === "/result"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
              onClick={() => handleClicks("Result")}
            >
              Result
            </NavLink>
            <NavLink
              to="/history"
              className={`${
                window.location.pathname === "/history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
              onClick={() => handleClicks("History")}
            >
              History
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <div className="absolute right-36">
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
        <div className="flex items-center">
          <button
            onClick={handleNavigate}
            className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            <FaUserPlus className="mr-2" />
            <span>Add Bid</span>
          </button>
        </div>
      </nav>

      <div className="bg-gray-100 p-5 font-sans">
        <div className="flex justify-between mb-4">
          <div className="flex gap-5 items-center">
            <div className="bg-gray-100 rounded-lg shadow p-2">
              <p className="text-sm font-semibold min-w-5 min-h-5">
                Live ({liveBidData?.data.length || 0})
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow p-2">
              <p className="text-sm font-semibold text-green-600">
                Responded ({countRespond || 0})
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow p-2">
              <p className="text-sm font-semibold text-red-600">
                Unresponded ({countUnrespond || 0})
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <span
              className="text-md"
              style={textStyle("Bill Created")}
              onClick={() => handleClick("Bill Created")}
            >
              Bill Created
            </span>
            <span
              className="text-md"
              style={textStyle("Today")}
              onClick={() => handleClick("Today")}
            >
              Today
            </span>
            <span
              className="text-md"
              style={textStyle("Yesterday")}
              onClick={() => handleClick("Yesterday")}
            >
              Yesterday
            </span>
            <div className="relative flex items-center">
              <div className="shadow-lg">
                <span
                  className="cursor-pointer text-blue-800 bg-white px-3 py-1 rounded-md shadow-sm border border-gray-300 flex items-center"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <span className="ml-1 font-semibold">Calendar</span>
                  <svg
                    className="ml-3 w-3 h-3 mt-1"
                    viewBox="0 0 7 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 0.166687L3.5 4.83335L7 0.166687H0Z"
                      fill="#113870"
                    />
                  </svg>
                </span>
              </div>
              {showCalendar && (
                <div className="absolute top-full right-0 z-6 bg-white border border-gray-300 shadow-lg">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    inline
                  />
                </div>
              )}
            </div>
            <div>
              <img src={vector} alt="vector" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto ">
            <table className="min-w-full divide-y divide-gray-200 text-center ">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="py-2 px-2 text-left ">S.no</th>
                  <th className="py-3 px-4 text-left">Bid number Created by</th>
                  <th className="py-3 px-4 text-left">Start date Time</th>
                  <th className="py-3 px-4 text-left">Bid remaing time</th>
                  <th className="py-3 px-4 text-left">From city To city</th>
                  <th className="py-3 px-4 text-left">Vehicle type</th>
                  <th className="py-3 px-4 text-left">Vehicle size &Body</th>
                  <th className="py-3 px-4 text-left">No. of vehicle</th>
                  <th className="py-3 px-4 text-left">Material weight (Ton)</th>
                  <th className="py-3 px-4 text-left">Assigned vendor</th>
                  <th className="py-3 px-4 text-left">Response</th>
                  <th className="py-3 px-4 text-left">Assigned staff</th>
                  <th className="py-3 px-4 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredBidDetails && filteredBidDetails.length > 0 ? (
                  filteredBidDetails.map((data, index) => {
                    const createdByUserData = userData?.find(
                      (user) => user._id === data.created_by
                    );
                    return (
                      <React.Fragment key={index}>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">
                            {data.bidNo}
                            <br />
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
                          <td className="py-3 px-4">
                            {data.vehicle_type}
                            <br />
                            <span className="text-green-600">
                              {data.is_cng ? "CNG" : ""}
                            </span>
                          </td>
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
                              onClick={() => togglePopup(data)}
                            >
                              View Vendors
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              className="text-blue-500"
                              onClick={() => handleViewResponse(index)}
                            >
                              View Response
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            {createdByUserData
                              ? createdByUserData.name
                              : "Unknown User"}
                            <br />
                            {createdByUserData ? createdByUserData.phone : "NA"}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleViewDetails(index)}
                              className="text-blue-500"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                        {vendorResponse === index && (
                          <tr>
                            <td colSpan="13">
                              <Response
                                rowData={data}
                                onSuccess={refreshPage}
                              />
                            </td>
                          </tr>
                        )}
                        {expandedRow === index && (
                          <tr>
                            <td colSpan="13">
                              <Details rowData={[data]} />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="13">No Data Found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            {IsOpen && <BidVendor isOpen={IsOpen} Data={popupData} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bid;
