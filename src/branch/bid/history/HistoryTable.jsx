import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { BsFillPrinterFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import { format, toZonedTime } from "date-fns-tz";
import axios from "axios";
// import { ChevronDownIcon, EnvelopeIcon, PrinterIcon,EyeIcon,CheckIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import ViewQuotesModal from "../repeats/ViewQuotesModal";
import AssignedVendorsModal from "../repeats/AssignedVendorsModal";
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

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

// export default QuotesModal;

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

const HistoryTable = ({ datas }) => {
  // console.log(datas)
  const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(datas.length / itemsPerPage);
  const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const user = useSelector((state) => state.login.user);
  // const [showModal, setshowReponseModel] = useState(false);
  const [showVendorsModal, setShowVendorsModal] = useState(false);
  const [showVendorDetailsModal, setShowVendorDetailsModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vendorDetails, setVendorDetails] = useState(null);
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
      console.log(response.data)
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = datas.slice(startIndex, startIndex + itemsPerPage);

  if (datas.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">No data available</div>
    );
  }
  console.log(datas);

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

            <div className="flex flex-col  pt-1 ">
              <span className="block">Vehicle Quantity - {data.quantity}</span>
              <span className="block">Vehicle Type- {data.vehicle_type}</span>
              <span className="block">
                Vehicle Size- {data.vehicle_size} ({data.body_type})
              </span>
              <span className="block">
                                Material type-  {data.material_type} ({data.material_weight}Mt)
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
              onClick={() =>
                       {
                handleResponseClick(data.allVendorBids, data.target_price);
                    // debugger;
                    // console.log("hi")
                     console.log(data.allVendorBids[0].bidding_price.length)
                       }
              }
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

export default HistoryTable;
