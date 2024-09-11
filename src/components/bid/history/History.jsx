import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import Header from "../repeats/Header";
// import HistoryTable from './HistoryTable';
import Tabs from "../repeats/Tabs";
import Navbar from "../../../components/Navbar";

import { MdEmail } from "react-icons/md";
import { BsFillPrinterFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import { format, toZonedTime } from "date-fns-tz";

// import { ChevronDownIcon, EnvelopeIcon, PrinterIcon,EyeIcon,CheckIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import ViewQuotesModal from "../repeats/ViewQuotesModal";
import AssignedVendorsModal from "../repeats/AssignedVendorsModal";
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";

import { Link } from "react-router-dom";

const HistoryPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // const totalPages = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataHandling, setDataHandling] = useState({});
  const user = useSelector((state) => state.login.user);
  // const [datas, setdatas] = useState(null);
  // Function to get all bid details and merge with user and assigned_to data
  const getAllBidDetails = async () => {
    const bids = await fetchBidResultHistory();
    if (bids && bids.length > 0) {
      const allBidDetails = [];
      for (const bid of bids) {
        const bidDetail = await fetchBidDetails(bid.bid_id);
        if (bidDetail) {
          const createdByUser = await fetchFreightUserData(
            bidDetail.created_by
          );
          const assignedToUser = await fetchFreightUserData(
            bidDetail.assigned_to
          ); // Fetch assigned_to data

          const mergedData = {
            ...bidDetail,
            createdByUser, // Embed created_by user data
            assignedToUser, // Embed assigned_to user data
            vendorPrice: bid.vendorPrice,
            vendor_idd: bid.vendor_id, // Merge additional data
            vendorRank: bid.vendorRank, // Merge additional data
            vehicleDetails: bid.vehicleDetails, // Merge additional data
            target_price: bid.target_price, // Merge target price
            allVendorBids: bid.allVendorBids,
            // Merge vendor bids
          };
          allBidDetails.push(mergedData);
        }
      }
      setBidDetails(allBidDetails);
      setFilteredData(allBidDetails);
      alert("Sucessfully Called getAllBids");
    } else {
      console.log("No bids found.");
      setError("No bids found.");
    }
    setLoading(false);
  };
  // Function to fetch bid details using bid_id

  const HistoryTable = ({ datas }) => {
    
    const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] =
      useState(false);
   
    const [vendorDetails, setVendorDetails] = useState(null);

    const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const user = useSelector((state) => state.login.user);
    // const [showModal, setshowReponseModel] = useState(false);
    const [showVendorsModal, setShowVendorsModal] = useState(false);
    const [showVendorDetailsModal, setShowVendorDetailsModal] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [selectedVehicleDetails, setSelectedVehicleDetails] = useState([]);
    const [allvendorResponse, setallvendorResponse] = useState(null);
    const [showReponseModel, setshowReponseModel] = useState(false);
    const [targetPrice, settargetPrice] = useState(null);
    const handleViewVehiclesClick = (vehicleDetails) => {
      setSelectedVehicleDetails(vehicleDetails);
      setShowVehicleModal(true);
    };
    const handleVendorDetails = async (vendorId) => {
      try {
        const response = await axios.get(
          `https://freighteg.in/freightapi/vendor/${vendorId}`
        );
        setVendorDetails(response.data);
        console.log(response.data);
        setShowVendorDetailsModal(true);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        // Handle error if necessary
      }
    };

    const handleResponseClick = async (allVendorBids, target_price) => {
      settargetPrice(target_price);
      setshowReponseModel(true);
      console.log(allVendorBids);

      setallvendorResponse(allVendorBids);
    };

    const convertToTimeDifference = (updatedAt) => {
      const now = new Date();
      const updatedDate = new Date(updatedAt);

      const diffInMs = now - updatedDate;
      const diffInMinutes = Math.floor(diffInMs / 60000);

      const days = Math.floor(diffInMinutes / (24 * 60));
      const hours = Math.floor((diffInMinutes % (24 * 60)) / 60);
      const minutes = diffInMinutes % 60;

      return `${days}d ${hours}hr ${minutes}min`;
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

    // const handleAssignedVendorsClick = (data) => {
    //   setSelectedData(data);
    //   setAssignedVendorsModalOpen(true);
    // };

    // const handleViewQuotesClick = (data) => {
    //   setSelectedData(data);
    //   setViewQuotesModalOpen(true);
    // };

    const handlePageChange = async (newPage) => {
      await getAllBidDetails();
      setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = datas.slice(startIndex, startIndex + itemsPerPage);

    if (datas.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">No data available</div>
      );
    }

    return (
      <>
        {currentItems.map((data) => (
          <div className=" bg-blue-50 rounded-b-lg p-4 - mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]">
            <div className="w-[100%] text-sm  mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
              <div className="flex flex-col  pt-1">
                <span className="block text-black font-semibold">
                  {user?.name}
                </span>
                <span className="block text-blue-600 font-semibold">
                  #{data.bidNo}
                </span>
                {/* <span className="block text-red-600">
                  {convertToTimeDifference(data.updatedAt)}{" "}
                </span> */}
                <div className="block text-grey-500 mt-12">
                  Remarks : {data.bid_remarks}
                </div>
              </div>

              <div className="flex flex-col  pt-1">
                <span className="block font-medium ml-6">
                  {data.loading_date.slice(0, 10)}
                </span>
                <span className="block ml-6">
                  {formatTo12HourTime(data.loading_date)}
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

              <div className="flex flex-col  pt-1 ">
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
                {/* <span className="block">Equipments</span> */}
                <a href="#" className="text-blue-600">
                  Distance - {data.route_distance} Km
                </a>
              </div>

              <div className="flex flex-col  pt-1 ">
                <div className="w-full flex items-center justify-end gap-3">
                  <IoMdMail className="text-2xl text-blue-600 cursor-pointer" />
                  <MdLocalPrintshop
                    className="text-2xl text-blue-600 cursor-pointer"
                    onClick={() => handlePrintClick(data)}
                  />
                </div>
                <div className="text-lg font-semibold text-gray-700 mr-5">
                  {" "}
                  Rs {data.vendorPrice}
                </div>
                <div
                  className="text-blue-600 underline text-sm cursor-pointer"
                  onClick={() => handleVendorDetails(data.vendor_idd)}
                  //   onClick={() => setshowReponseModel(true)}
                >
                  Vendor Info
                </div>

                <div className="absolute top-0 right-[-100px] mt-1 mr-1 flex space-x-2">
                  {/* <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                          <PrinterIcon className="h-5 w-5 text-blue-600 cursor-pointer"/>
                          <PencilIcon className="h-5 w-5 text-blue-600 cursor-pointer" /> */}
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
              <div
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  handleViewVehiclesClick(data.vehicleDetails);
                }}
              >
                Vehicle Info ({data.vehicleDetails.length})
              </div>
              <div
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  handleResponseClick(data.allVendorBids, data.target_price);
                  // debugger;
                  // console.log("hi")
                  console.log(data.allVendorBids[0].bidding_price.length);
                }}
              >
                Responses ({data.allVendorBids[0].bidding_price.length})
              </div>
              <div className="mr-15px">
                Created By -{" "}
                <span className="font-semibold">{data.createdByUser.name}</span>
                <span>
                  ( {data.createdAt.slice(0, 10)} ,{" "}
                  {formatTo12HourTime(data.createdAt)})
                </span>
              </div>
            </div>
          </div>
        ))}

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

        {isAssignedVendorsModalOpen && (
          <AssignedVendorsModal
            data={selectedData}
            onClose={() => setAssignedVendorsModalOpen(false)}
          />
        )}
        {isViewQuotesModalOpen && (
          <ViewQuotesModal
            data={selectedData}
            onClose={() => setViewQuotesModalOpen(false)}
          />
        )}
        <QuotesModal
          showReponseModel={showReponseModel}
          setshowReponseModel={setshowReponseModel}
          allvendorResponse={allvendorResponse}
          target_price={targetPrice}
        />
        <VehicleInfoModal
          showVehicleModal={showVehicleModal}
          setShowVehicleModal={setShowVehicleModal}
          vechileDetails={selectedVehicleDetails}
        />
        <VendorDetailsModal
          showVendorDetailsModal={showVendorDetailsModal}
          setShowVendorDetailsModal={setShowVendorDetailsModal}
          vendorDetails={vendorDetails}
        />
      </>
    );
  };

  // Function to fetch bid result history
  const fetchBidResultHistory = async () => {
    const branchId = localStorage.getItem("branch_id");
    // const url = `https://freighteg.in/freightapi/getBidResultHistory?company_id=${user?.id}`;
    const url =
      branchId && branchId !== user?.id
        ? `https://freighteg.in/freightapi/getBidResultHistory?branch_id=${branchId}&page=${currentPage}&limit=5`
        : `https://freighteg.in/freightapi/getBidResultHistory?company_id=${user?.id}&page=${currentPage}&limit=5`;
    try {
      const response = await axios.get(url);
      console.log({ currentPage });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching bid result history:", error);
      setError("Failed to fetch bid result history");
      setLoading(false);
    }
  };

  const fetchBidDetails = async (bidId) => {
    const url = `https://freighteg.in/freightapi/bids/${bidId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for bid_id ${bidId}:`, error);
      setError(`Failed to fetch details for bid_id ${bidId}`);
      setLoading(false);
    }
  };

  // Function to fetch freight user data using created_by id
  const fetchFreightUserData = async (userId) => {
    const url = `https://freighteg.in/freightapi/freightusers/${userId}`;
    try {
      const response = await axios.get(url);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user data for id ${userId}:`, error);
      setError(`Failed to fetch user data for id ${userId}`);
      setLoading(false);
    }
  };

  // Function to handle form submission for filtering data
  const handleFormSubmit = (formData) => {
    console.log(formData);
    setDataHandling(formData);
  };

  // Effect to filter data based on user inputs
  useEffect(() => {
    const { searchTerm, selectedOption, startDate, endDate } = dataHandling;

    const filtered = bidDetails.filter((item) => {
      const matchesSearchTerm = searchTerm
        ? item.bidNo.includes(searchTerm)
        : true;
      const matchesOption = selectedOption
        ? item.vehicle_type === selectedOption
        : true;
      const matchesStartDate = startDate
        ? new Date(item.loading_date) >= new Date(startDate)
        : true;
      const matchesEndDate = endDate
        ? new Date(item.loading_date) <= new Date(endDate)
        : true;

      return (
        matchesSearchTerm && matchesOption && matchesStartDate && matchesEndDate
      );
    });

    setFilteredData(filtered);
  }, [dataHandling, bidDetails]);

  // Function to handle downloading filtered data as Excel file
  const handleDownloadClick = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the filtered data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "BidsData");

    // Generate a binary string of the workbook
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the binary string
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute with the desired file name
    link.download = "BidsData.xlsx";

    // Create a URL for the Blob and set it as the href of the link
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the document body
    document.body.appendChild(link);

    // Programmatically trigger a click on the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };
  useEffect(() => {
    const branchId = localStorage.getItem("branch_id");
    // const url = `https://freighteg.in/freightapi/getBidResultHistory?company_id=${user?.id}`;
    const url =
      branchId && branchId !== user?.id
        ? `https://freighteg.in/freightapi/getBidResultHistory?branch_id=${branchId}&page=${currentPage}&limit=5`
        : `https://freighteg.in/freightapi/getBidResultHistory?company_id=${user?.id}&page=${currentPage}&limit=5`;
    async function getCount() {
      const [historyRes] = await Promise.all([fetch(`${url}`)]);

      const historyData = await historyRes.json();
      // alert(historyData.totalBids)
      settotalPages(Math.ceil(historyData.totalBids / itemsPerPage));
    }
    getCount();
    getAllBidDetails();
  }, []);
  // useEffect(() => {
  //   async function getData() {
  //     await getAllBidDetails();
  //   }
  //   getData();
  // }, []);
  
  return (
    <>
      <Navbar />
      <Header onSubmit={handleFormSubmit} />
      <div className="w-full overflow-x-auto">
        <Tabs
          onDownloadClick={handleDownloadClick}
          onFilterClick={() => {
            /* Handle filter click if needed */
          }}
        />
      </div>
      <div className="w-full flex flex-col overflow-x-auto  bg-white">
        <div className=" bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2  rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
          <div className="font-semibold md:text-lg ps-[30px]">ID</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading Date</div>
          <div className="font-semibold md:text-lg ps-[30px]">
            Loading Point{" "}
          </div>
          <div className="font-semibold md:text-lg ps-[30px]">
            Unloading Point
          </div>
          <div className="font-semibold md:text-lg ps-[30px]">Details</div>
          <div className="font-semibold md:text-sm ps-[30px]">Bid Result</div>
        </div>
        {loading ? (
          <div className="text-center my-4">
            {/* Loading spinner */}
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            {/* Loading text */}
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        ) : (
          <HistoryTable datas={filteredData} />
        )}
      </div>
    </>
  );
};

export default HistoryPage;

const QuotesModal = ({
  showReponseModel,
  setshowReponseModel,
  allvendorResponse,
  target_price,
}) => {
  const [vendorNames, setVendorNames] = useState({});

  useEffect(() => {
    if (showReponseModel) {
      const fetchVendorNames = async () => {
        const names = {};
        for (const vendor of allvendorResponse) {
          try {
            const response = await axios.get(
              `https://freighteg.in/freightapi/vendor/${vendor.vendor_id}`
            );
            console.log(response);
            names[vendor.vendor_id] = response.data.data.name; // Assuming the API returns a `vendor_name` field
          } catch (error) {
            console.error(
              `Failed to fetch name for vendor ${vendor.vendor_id}:`,
              error
            );
          }
        }
        setVendorNames(names);
        console.log(names);
      };

      fetchVendorNames();
    }
  }, [showReponseModel, allvendorResponse]);

  if (!showReponseModel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setshowReponseModel(false)}
        >
          X
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Vendor Quotes
        </h2>

        {/* Responsive table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left font-semibold text-gray-800">
                  Vendor Name
                </th>
                <th className="p-2 text-left font-semibold text-gray-800">
                  Vendor Price
                </th>
                <th className="p-2 text-left font-semibold text-gray-800">
                  Target Price
                </th>
              </tr>
            </thead>
            <tbody>
              {allvendorResponse.map((vendor, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 text-gray-800">
                    {vendorNames[vendor.vendor_id] || "Loading..."}
                  </td>
                  <td className="p-2 text-gray-800">{vendor.bidding_price}</td>
                  <td className="p-2 text-gray-800">{target_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const VehicleInfoModal = ({
  showVehicleModal,
  setShowVehicleModal,
  vechileDetails,
}) => {
  if (!showVehicleModal) return null;
  //  alert(JSON.stringify(vechileDetails) )
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
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
                <th className="p-2 text-left font-semibold text-gray-800">
                  Vehicle Number
                </th>
                <th className="p-2 text-left font-semibold text-gray-800">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {vechileDetails?.map((vehicle, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 text-gray-800">{vehicle.vehicleNo}</td>
                  <td className="p-2 text-gray-800">
                    <div className="flex space-x-2">
                      <Link to={`/vahan/${vehicle.vehicleNo}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                          Vahan
                        </button>
                      </Link>
                      <Link to={`/fastag/${vehicle.vehicleNo}`}>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
                          Fastag Tracking
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const VendorDetailsModal = ({
  showVendorDetailsModal,
  setShowVendorDetailsModal,
  vendorDetails,
}) => {
  if (!showVendorDetailsModal) return null;

  // Extract relevant data from the vendorDetails object
  const { data } = vendorDetails || {};

  if (!data) return null;

  // Helper function to render lists
  const renderList = (list) => (
    <ul className="list-disc pl-5">
      {list.map((item, index) => (
        <li key={index} className="text-gray-800">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowVendorDetailsModal(false)}
        >
          <div className="text-xl">X</div>
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Vendor Details
        </h2>

        <div className="overflow-y-auto max-h-96 space-y-2">
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">Vendor Name</span>
            <span className="text-gray-800">{data.name} </span>
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">Owner Name</span>
            <span className="text-gray-800">{data.owner_name} </span>
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">Phone</span>
            <span className="text-gray-800">{data.phone}</span>
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">Supervisor Name</span>
            <span className="text-gray-800">{data.supervisor_name} </span>
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">Supervisor Number</span>
            <span className="text-gray-800">{data.supervisor_phone1} </span>
          </div>

          {/* <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">Role</span>
            <span className="text-gray-800">{data.role}</span>
          </div> */}
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">Address</span>
            <span className="text-gray-800">{data.address}</span>
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">PAN Number</span>
            <span className="text-gray-800">{data.pan}</span>
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">GST Number</span>
            <span className="text-gray-800">{data.gst}</span>
          </div>
          <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">Code</span>
            <span className="text-gray-800">{data.code}</span>
          </div>

          {/* <div className="flex justify-between items-center p-2 border-b">
            <span className="text-blue-600 font-medium">Vehicle Types</span>
            <span className="text-gray-800">
              {renderList(data.vehicle_type)}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};
