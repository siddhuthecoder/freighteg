import React, { useState, useEffect } from "react";
import TransportNavBar from "../TransportNavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import { Link } from "react-router-dom";
import { format, toZonedTime } from "date-fns-tz";

const BASE_URL = "https://freighteg.in/freightapi"; // Assuming this is the base URL for all your APIs

const AssignedRequestHistory = () => {
  const user = useSelector((state) => state.login.user);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] =
    useState(false);
  const [selectedVehicleData, setSelectedVehicleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/getBidResultHistory?vendor_id=${user?.id}&page=${currentPage}&limit=5`
        );
        const bidData = response.data.data;

        const detailedBidData = await Promise.all(
          bidData.map(async (bid) => {
            const bidDetails = await fetchBidDetails(bid.bid_id);
            const createdByUser = await fetchFreightUserData(bidDetails.created_by);
            const assignedToUser = await fetchFreightUserData(bidDetails.assigned_to);
            return { ...bid, ...bidDetails, createdByUser,assignedToUser };
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

  const handleViewVehiclesClick = (vehicleDetails) => {
    setSelectedVehicleData(vehicleDetails || []);
    setAssignedVendorsModalOpen(true);
  };

  const formatTo12HourTime = (utcDate) => {
    const timeZone = "Asia/Kolkata";
    const zonedDate = toZonedTime(new Date(utcDate), timeZone);
    return format(zonedDate, "hh:mm a", { timeZone });
  };
  console.log(data[0])

  return (
    <>
      <TransportNavBar />
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
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
                        <span className="block text-red-600"></span>
                        <div className="block text-grey-500 mt-12">
                          Remarks : {data.bid_remarks}
                        </div>
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
                        <a href="#" className="text-blue-600">
                          Distance - {data.route_distance} Km
                        </a>
                      </div>
                      <div className="flex flex-col pt-1">
                        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleViewVehiclesClick(data.vehicleDetails)}
                                        >
                                            View all Vehicles
                                        <button/> */}
                        <button
                          className="bg-blue-500 text-white  py-2 rounded"
                          onClick={() =>
                            handleViewVehiclesClick(data.vehicleDetails)
                          }
                        >
                          View all Vehicles
                        </button>
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
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
              <div className="flex justify-center  items-center mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 mx-4  text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
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
                  className="px-4 py-2 mx-4  bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal for Assigned Vendors */}
        {isAssignedVendorsModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 ease-out scale-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
                Assigned Vehicles
              </h2>

              {selectedVehicleData.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">
                  No vehicles assigned.
                </p>
              ) : (
                <div className="overflow-auto max-h-96">
                  <table className="min-w-full bg-white text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-blue-100 border-b border-gray-300 font-semibold text-gray-800">
                          Vehicle No.
                        </th>
                        <th className="px-6 py-3 bg-blue-100 border-b border-gray-300 font-semibold text-gray-800">
                          Driver Name
                        </th>
                        <th className="px-6 py-3 bg-blue-100 border-b border-gray-300 font-semibold text-gray-800">
                          Driver Phone
                        </th>
                        <th className="px-6 py-3 bg-blue-100 border-b border-gray-300 font-semibold text-gray-800">
                          GPS Link
                        </th>
                        <th className="px-6 py-3 bg-blue-100 border-b border-gray-300 font-semibold text-gray-800">
                          Reporting Time
                        </th>
                        <th className="px-6 py-3 bg-blue-100 border-b border-gray-300 font-semibold text-gray-800">
                          Remarks
                        </th>
                        <th className="px-6 py-3 bg-blue-100 border-b border-gray-300 font-semibold text-gray-800">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedVehicleData.map((vehicle, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="border-t px-6 py-4 text-gray-700">
                            {vehicle.vehicleNo}
                          </td>
                          <td className="border-t px-6 py-4 text-gray-700">
                            {vehicle.driverName}
                          </td>
                          <td className="border-t px-6 py-4 text-gray-700">
                            {vehicle.driverPhone || "N/A"}
                          </td>
                          <td className="border-t px-6 py-4 text-gray-700">
                            {vehicle.gpsLink ? (
                              <a
                                href={vehicle.gpsLink}
                                className="text-blue-600 underline"
                              >
                                Link
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="border-t px-6 py-4 text-gray-700">
                            {vehicle.reportingTime || "N/A"}
                          </td>
                          <td className="border-t px-6 py-4 text-gray-700">
                            {vehicle.remarks || "N/A"}
                          </td>
                          <td className="border-t px-6 py-4 flex gap-4">
                            <Link
                              to={`/transporter/vahan/${vehicle.vehicleNo.toUpperCase()}`}
                            >
                              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                                Vahan
                              </button>
                            </Link>
                            <Link
                              to={`/transporter/fastag/${vehicle.vehicleNo.toUpperCase()}`}
                            >
                              <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
                                Fastag
                              </button>
                            </Link>
                            {/* <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Fastag</button>
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Vaahan</button> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setAssignedVendorsModalOpen(false)}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transform transition-transform duration-200 ease-in-out"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AssignedRequestHistory;
