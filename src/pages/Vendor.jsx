import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVendorData, useUserById } from "../HelperFunction/api";
import { useSelector } from "react-redux";
import OperationalStatesModal from "./VendorStates/OperationalStates"; // Import the modal component

const Vendor = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOperationalStates, setSelectedOperationalStates] = useState(
    []
  );

  const toggleRowExpansion = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const user = useSelector((state) => state.login.user);
  const { usersData, usersLoading, usersError } = useUserById();
  const [tableData, setTableData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          `https://freighteg.in/freightapi/getVendorsBy/${user?.id}`
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, [refreshData]);

  const handleDetailsClick = (item) => {
    setExpandedDetails(item === expandedDetails ? null : item);
  };

  const handleNavigate = () => {
    navigate("/addvendors");
  };

  const queryClient = useQueryClient();
  const updateVendorMutation = useMutation({
    mutationFn: updateVendorData,
    onSuccess: (data, variable) => {
      queryClient.setQueriesData(["vendor", variable.id], (oldData) => {
        return {
          ...oldData,
          ...data,
        };
      });
      alert(
        `Status is changed successfully. Status is now ${
          data.isActive ? "Active" : "Inactive"
        }`
      );
      setRefreshData((prev) => !prev);
    },
  });

  const handleToggles = (id) => {
    const vendor = tableData.find((item) => item._id === id);
    const updatedVendor = { ...vendor, isActive: !vendor.isActive };

    updateVendorMutation.mutate({
      id,
      newData: { isActive: updatedVendor.isActive },
    });
  };

  const toggleDetailsVisibility = (data) => {
    setSelectedOperationalStates(data.operation_states);
    setModalOpen(true);
  };

  const toogleDetailsUpdate = (data) => {
    navigate("/addvendors", {
      state: { fromViewUpdate: true, vend_id: data },
    });
  };

  const filteredVendors = tableData.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm) ||
      vendor.vtype.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-5 font-sans">
      <div className="sticky top-20 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-blue-900 text-2xl font-semibold">
            All Vendors ({tableData.length})
          </h4>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
              />
            </div>
            <button
              onClick={handleNavigate}
              className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              <FaUserPlus className="mr-2" />
              <span>Add Vendor</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div
          className="overflow-x-auto overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                {[
                  "S.No",
                  "Vendor Code",
                  "Phone Number",
                  "Vehicle Type",
                  "Vendor Type",
                  "Vendor Name",
                  "GST Number / PAN Number",
                  "Assign Staff",
                  "View State",
                  "Action",
                ].map((header) => (
                  <th key={header} className="px-4 py-2 text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVendors && filteredVendors.length > 0 ? (
                filteredVendors.map((item, index) => {
                  const comIndx = item?.company_id.indexOf(user?.id);
                  const code = comIndx !== -1 ? item.code[comIndx] : "NA";
                  const vehicleTypeDisplay = item.vehicle_type
                    ? item.vehicle_type.join(", ")
                    : "NA";
                  const assignedId =
                    comIndx !== -1 && item.assigned_staff
                      ? item.assigned_staff[comIndx]
                      : "NA";
                  const assignedStaff = usersData?.user?.find(
                    (user) => user._id === assignedId
                  );
                  const assignedStaffName = assignedStaff
                    ? assignedStaff.name
                    : "Unknown";
                  return (
                    <React.Fragment key={index}>
                      <tr
                        className={`font-semibold border-t border-b border-gray-300 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } hover:bg-blue-50 transition-all`}
                      >
                        <td className="px-4 py-2">{index + 1}.</td>
                        <td className="px-4 py-2 ">{code}</td>
                        <td className="px-4 py-2">{item.phone}</td>
                        <td className="px-4 py-2 w-35 text center">
                          <button
                            onClick={() => toggleRowExpansion(index)}
                            className=" text-justify text-blue-600 hover:underline "
                          >
                            {expandedRows[index] ? "Hide" : "View"}
                          </button>
                          {expandedRows[index] && (
                            <div className="mt-2 text-left text-gray-700">
                              {vehicleTypeDisplay}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2">{item.vtype}</td>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">
                          {item.gst}
                          <br />
                          {item.pan}
                        </td>
                        <td className="px-4 py-2 w-44">{assignedStaffName}</td>
                        <td className="px-4 py-2">
                          <button onClick={() => toggleDetailsVisibility(item)}>
                            <label className="text-blue-600 cursor-pointer hover:underline">
                              View States
                            </label>
                          </button>
                        </td>
                        <td className="px-4 py-2">
                          <button onClick={() => handleDetailsClick(item)}>
                            <label className="text-blue-600 cursor-pointer hover:underline">
                              View Details
                            </label>
                          </button>
                        </td>
                      </tr>
                      {expandedDetails === item && (
                        <tr key={`${index}-details`}>
                          <td colSpan="10">
                            <div className="flex flex-col p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-inner">
                              <div className="flex justify-between mb-2 pb-2 border-b border-gray-300">
                                <div className="flex items-center">
                                  <span className="font-semibold text-gray-800 mr-2">
                                    Vendor Code:
                                  </span>
                                  <span className="font-semibold text-blue-600">
                                    {code}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-semibold text-gray-800 mr-2">
                                    Vendor Name:
                                  </span>
                                  <span className="font-semibold text-blue-600">
                                    {item.name}
                                  </span>
                                  <span className="text-gray-500 ml-2">
                                    (Vehicle Owner)
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-wrap mb-2">
                                <div className="w-1/2 p-2">
                                  <div className="flex items-center bg-white p-2 rounded shadow">
                                    <span className="font-semibold text-gray-700 mr-2">
                                      Owner Name:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {item.owner_name}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-1/2 p-2">
                                  <div className="flex items-center bg-white p-2 rounded shadow">
                                    <span className="font-semibold text-gray-700 mr-2">
                                      Owner Phone Number:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {item.phone}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap mb-2">
                                <div className="w-1/2 p-2">
                                  <div className="flex items-center bg-white p-2 rounded shadow">
                                    <span className="font-semibold text-gray-700 mr-2">
                                      Supervisor Name:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {item.supervisor_name}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-1/2 p-2">
                                  <div className="flex items-center bg-white p-2 rounded shadow">
                                    <span className="font-semibold text-gray-700 mr-2">
                                      Phone Number:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {item.supervisor_phone1}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap mb-2">
                                <div className="w-1/2 p-2">
                                  <div className="flex items-center bg-white p-2 rounded shadow">
                                    <span className="font-semibold text-gray-700 mr-2">
                                      Address:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {item.address}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-1/4 p-2">
                                  <div className="flex items-center bg-white p-2 rounded shadow">
                                    <span className="font-semibold text-gray-700 mr-2">
                                      State:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {item.state}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-1/4 p-2">
                                  <div className="flex items-center bg-white p-2 rounded shadow">
                                    <span className="font-semibold text-gray-700 mr-2">
                                      Pin Code:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {item.pin}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap mb-2">
                                <div className="w-1/2 p-2">
                                  <div className="flex items-center bg-white p-2 rounded shadow">
                                    <span className="font-semibold text-gray-700 mr-2">
                                      GST Number:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {item.gst}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-1/2 p-2">
                                  <div className="flex items-center bg-white p-2 rounded shadow">
                                    <span className="font-semibold text-gray-700 mr-2">
                                      PAN Number:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {item.pan}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-2 text-gray-700">
                    Data not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <OperationalStatesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        operationalStates={selectedOperationalStates}
      />
    </div>
  );
};

export default Vendor;
