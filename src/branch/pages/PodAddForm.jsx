import React, { useEffect, useCallback, useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { FiUser, FiPhone, FiLock, FiX } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useGetVendorByCompany,
  useGetPodHistoryByCompany,
} from "../../HelperFunction/api";
import { postDataMutation } from "../../HelperFunction/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const PodAddForm = ({ onClose }) => {
  const user = useSelector((state) => state.login.user);
  const { getVendorData, getVendorLoading, getVendorError } =
    useGetVendorByCompany();
  const [data, setData] = useState({
    lrNumber: "",
    vehicleNumber: "",
    vendor_id: "",
    company_id: user?.id,
    loadingDate: "",
    vendorCode: "",
  });
  const [userOptions, setUserOptions] = useState([]);
  const [showPodAddForm, setShowPodAddForm] = useState(false);

  useEffect(() => {
    if (getVendorData && Array.isArray(getVendorData)) {
      const newOptions = getVendorData.map((vendor) => ({
        value: vendor._id,
        label: vendor.name,
      }));
      setUserOptions(newOptions);
    }
  }, [getVendorData]);

  const handleChangeUser = (selectedOption) => {
    const selectedVendor = getVendorData.find(
      (vendor) => vendor._id === selectedOption.value
    );
    const comIndx = selectedVendor?.company_id.indexOf(user?.id);
    const vendorCode = comIndx !== -1 ? selectedVendor.code[comIndx] : "NA";
    setData((prevData) => ({
      ...prevData,
      vendor_id: selectedOption.value,
      vendorCode: vendorCode,
    }));
  };

  const PostMutation = useMutation({
    mutationFn: postDataMutation,
    onSuccess: () => {
      console.log("Success");
      alert("POD Add Successfully");
      setData({
        lrNumber: "",
        vehicleNumber: "",
        vendor_id: "",
        loadingDate: "",
        vendorCode: "",
      });
    },
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];

    setData((prevData) => ({
      ...prevData,
      loadingDate: formattedDate,
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        PostMutation.mutate(data);
      } catch (error) {
        console.error("Error occurred while posting data:", error);
      }
    },
    [data, PostMutation]
  );

  if (getVendorLoading) return <h1>Data is Loading</h1>;
  if (getVendorError) return <h1>Something went wrong!!</h1>;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-xl w-full relative animate-fade-in-down">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-blue-900 text-3xl font-bold mb-6 text-center">
          Request New POD
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LR / GR / Bilty Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="lrNumber"
                value={data.lrNumber}
                onChange={handleChange}
                className="w-full bg-gray-50 h-12 rounded-lg pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 transition duration-300"
                placeholder="Enter LR / GR / Bilty Number"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Number
            </label>
            <div className="relative">
              <FiPhone className="absolute top-4 left-3 text-gray-400" />
              <input
                type="text"
                name="vehicleNumber"
                value={data.vehicleNumber}
                onChange={handleChange}
                className="w-full bg-gray-50 h-12 rounded-lg pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 transition duration-300"
                placeholder="Enter Vehicle Number"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Vendor
            </label>
            <Select
              name="vendor_id"
              value={userOptions.find(
                (option) => option.value === data.vendor_id
              )}
              onChange={handleChangeUser}
              options={userOptions}
              placeholder="Select Vendor"
              className="w-full"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "#f9fafb",
                  borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                  borderRadius: "0.5rem",
                  height: "48px",
                  boxShadow: state.isFocused ? "0 0 0 2px #93c5fd" : "none",
                  "&:hover": {
                    borderColor: "#3b82f6",
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#e5e7eb" : "white",
                  color: state.isSelected ? "black" : "inherit",
                }),
              }}
              required
            />
          </div>
          <div className="flex justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Loading Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={data.loadingDate}
                  onChange={handleDateChange}
                  className="w-full bg-gray-50 h-12 rounded-lg pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 transition duration-300"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Date"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="vendorCode"
                  value={data.vendorCode}
                  readOnly
                  className="w-full bg-gray-50 h-12 rounded-lg pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 transition duration-300"
                  placeholder="vendor code"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-3 rounded-lg text-white text-lg font-semibold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PodAddForm;
