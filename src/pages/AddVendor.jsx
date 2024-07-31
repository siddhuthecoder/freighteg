import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { FiSearch } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import VendorState from "./VendorStates/VendorState";
import { statesAndUnionTerritoriesOfIndia } from "./VendorStates/State";
import {
  VendorDataMutation,
  useGetAllVendor,
  updateVendorData,
  usePanData,
  useUserById,
} from "../HelperFunction/api";
import { vehicleTypeData } from "./VehicleTypesAndState/Vehicletype";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Panpopup from "./customPopUp/Panpopup";

const AddVendor = () => {
  const user = useSelector((state) => state.login.user);
  const location = useLocation();
  const fromViewState = location.state?.fromViewState || false;
  const {
    getAllVendor,
    getAllVendorLoading,
    getAllVendorError,
    getVendorById,
  } = useGetAllVendor();
  const { usersData, usersLoading, usersError } = useUserById();
  const [assignPan, setAssignPan] = useState("");
  const { panData } = usePanData(assignPan);
  const [isPopupOpen, setIsPopupOpen] = useState(!fromViewState);
  const [vendorId, setVendorId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    code: [""],
    vtype: "",
    address: "",
    state: "",
    pin: "",
    owner_name: "",
    phone: "",
    password: "",
    supervisor_name: "",
    supervisor_phone1: "",
    gst: "",
    pan: "",
    operation_states: [],
    role: "vendor",
    company_id: [user?.id],
    vehicle_type: [],
    assigned_staff: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const Navigate = useNavigate();

  const userOptions = useMemo(
    () =>
      usersData?.user?.map((user) => ({
        value: user._id,
        label: user.name,
      })),
    [usersData]
  );

  const handleAssignChange = (selectedOptions) => {
    setFormData({
      ...formData,
      assigned_staff: selectedOptions ? [selectedOptions.value] : [],
    });
  };

  const handleVehicleChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions?.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      vehicle_type: values,
    });
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    Navigate("/allvendor");
  };

  const handleSubmits = useCallback((panNumber) => {
    setAssignPan(panNumber);
    setIsPopupOpen(false);
  }, []);

  useEffect(() => {
    (async () => {
      if (panData) {
        try {
          const data = await panData;
          const comIndx = data?.company_id.indexOf(user?.id);
          const existingCode = comIndx !== -1 ? data.code[comIndx] : "NA";
          if (data) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              ...data,
              code: [existingCode],
              company_id: [user?.id],
            }));
            setVendorId(data._id);
          }
        } catch (error) {
          console.error("Error occurred while fetching vendor data:", error);
        }
      } else {
        setVendorId("");
      }
    })();
  }, [panData]);

  const roleOptions = [
    { value: "Broker", label: "Broker" },
    { value: "Vehicle Owner", label: "Vehicle Owner" },
  ];

  const stateOptions = statesAndUnionTerritoriesOfIndia.map((state) => ({
    value: state,
    label: state,
  }));

  const PostMutation = useMutation({
    mutationFn: VendorDataMutation,
    onSuccess: () => {
      alert("Vendor Added Successfully !!");
      setFormData({
        name: "",
        code: [""],
        vtype: "",
        address: "",
        state: "",
        pin: "",
        owner_name: "",
        phone: "",
        password: "",
        supervisor_name: "",
        supervisor_phone1: "",
        gst: "",
        pan: "",
        assigned_staff: [],
        operation_states: [],
        vehicle_type: [],
      });
    },
    onError: () => {
      alert("Something went wrong. Please check the PAN and Phone Number.");
    },
  });

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
      alert("Data is updated successfully");
    },
  });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "code") {
        setFormData({
          ...formData,
          [name]: [value],
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    },
    [formData]
  );

  const handleSelectType = (selectedOption) => {
    setFormData({
      ...formData,
      vtype: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSelectState = (selectedOption) => {
    setFormData({
      ...formData,
      state: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const requiredFields = [
        "name",
        "code",
        "vtype",
        "address",
        "state",
        "pin",
        "owner_name",
        "phone",
        "password",
        "supervisor_name",
        "supervisor_phone1",
        "gst",
        "pan",
      ];
      const emptyFields = requiredFields.filter((field) => !formData[field]);
      if (emptyFields.length > 0) {
        alert("All Fields Are Required. Please fill all the inputs");
        return;
      }

      try {
        if (panData && vendorId) {
          await updateVendorMutation.mutate({
            id: vendorId,
            newData: formData,
          });
        } else {
          PostMutation.mutate(formData);
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
      }
    },
    [formData, PostMutation]
  );

  const assignedStaff = formData.assigned_staff || [];
  const selectedValues = userOptions?.filter((option) =>
    assignedStaff.includes(option.value)
  );

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      color: "white",
      backgroundColor: "#e5e7eb",
      border: state.isFocused ? "1px solid #e5e7eb" : provided.border,
      borderRadius: "7px",
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
      "&:hover": {
        border: "1px solid #e5e7eb",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "black" : "",
      backgroundColor: state.isSelected ? "#f0f0f0" : "white",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e5e7eb",
      borderRadius: "2px",
      padding: "2px 5px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#333",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#333",
      ":hover": {
        backgroundColor: "#ccc",
        color: "black",
      },
    }),
  };

  const [vehicleTypeVisible, setVehicleTypeVisible] = useState(false);

  const toggleVehicleTypeVisible = () => {
    setVehicleTypeVisible(!vehicleTypeVisible);
  };

  return (
    <>
      <nav className="bg-gray-100 h-16 flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center space-x-4">
          <h4 className="text-blue-900 text-2xl font-semibold">All Vendors</h4>
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
        </div>
        <button
          onClick={() => Navigate("/addvendors")}
          className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-900 transition duration-150 ease-in-out"
        >
          <FaUserPlus className="mr-2" />
          <span>Add Vendor</span>
        </button>
      </nav>

      <div className="bg-gray-100 p-6">
        {getAllVendorLoading && usersLoading && <h1>Data is Fetching...</h1>}
        {getAllVendorError && usersError && (
          <h1>Error: {getAllVendorError.message}</h1>
        )}
        {!isPopupOpen ? (
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-100 rounded-lg shadow pb-6 mb-6 p-2">
              <p className="text-blue-900 text-lg p-5 font-semibold">
                Vendor Detail
              </p>
              <div className="grid grid-cols-3 gap-6 p-6">
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Vendor Name..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Vendor Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Vendor Code..."
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Vendor Type
                  </label>
                  <Select
                    value={
                      roleOptions.find(
                        (option) => option.value === formData.vtype
                      ) || null
                    }
                    onChange={handleSelectType}
                    options={roleOptions}
                    placeholder="Vendor Type..."
                    className="w-full"
                    isDisabled={!!vendorId}
                    styles={selectStyles}
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Vendor Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Vendor Address..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    State
                  </label>
                  <Select
                    value={
                      stateOptions.find(
                        (option) => option.value === formData.state
                      ) || null
                    }
                    onChange={handleSelectState}
                    options={stateOptions}
                    placeholder="Select State..."
                    className="w-full"
                    isDisabled={!!vendorId}
                    styles={selectStyles}
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    placeholder="Enter PIN Code..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    name="owner_name"
                    value={formData.owner_name}
                    onChange={handleChange}
                    placeholder="Owner Name..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Owner Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Owner Phone Number..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Supervisor Name
                  </label>
                  <input
                    type="text"
                    name="supervisor_name"
                    value={formData.supervisor_name}
                    onChange={handleChange}
                    placeholder="Supervisor Name..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Supervisor Phone Number
                  </label>
                  <input
                    type="text"
                    name="supervisor_phone1"
                    value={formData.supervisor_phone1}
                    onChange={handleChange}
                    placeholder="Supervisor Phone Number..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Assign Staff
                  </label>
                  <Select
                    value={selectedValues}
                    options={userOptions}
                    onChange={handleAssignChange}
                    className="w-full"
                    placeholder="Select Staff..."
                    styles={selectStyles}
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={handleChange}
                    placeholder="Enter GST Number..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    placeholder="Enter PAN Number..."
                    disabled={!!vendorId}
                    className="w-full bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-sm mb-2 text-gray-500 block">
                    Vehicle Type
                  </label>
                  <div
                    onClick={toggleVehicleTypeVisible}
                    className="cursor-pointer bg-gray-200 h-10 rounded-md p-2 flex items-center justify-between border border-gray-400"
                  >
                    <span>Click to view vehicle types...</span>
                    <span>{vehicleTypeVisible ? "▲" : "▼"}</span>
                  </div>
                  {vehicleTypeVisible && (
                    <Select
                      isMulti
                      value={vehicleTypeData.filter((option) =>
                        formData.vehicle_type?.includes(option.value)
                      )}
                      onChange={handleVehicleChange}
                      options={vehicleTypeData}
                      placeholder="Select vehicle types..."
                      className="w-full mt-2"
                      isDisabled={!!vendorId}
                      styles={selectStyles}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-100 shadow-sm mb-1 rounded-xl p-3">
              <h3 className="text-blue-900 text-lg font-semibold mb-4">
                Operational States
              </h3>
              <VendorState
                formData={formData}
                setFormData={setFormData}
                panData={panData}
              />
            </div>
            <div className="flex justify-end pr-10 pt-6">
              <button
                type="submit"
                className="bg-blue-900 px-10 py-2 rounded-xl text-white font-semibold"
              >
                Create
              </button>
            </div>
          </form>
        ) : (
          <Panpopup onClose={handleClose} onSubmit={handleSubmits} />
        )}
      </div>
    </>
  );
};

export default AddVendor;
