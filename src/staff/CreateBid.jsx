import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";

import routes from "../assets/Route.svg";
import vehicle from "../assets/Vehiclelogo.svg";
import mat from "../assets/bi_box-fill.svg";
import additional from "../assets/addition.png";
import assign from "../assets/Mask group.svg";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@tanstack/react-query";
import StaffNavBarr from "./StaffNavBarr";

import {
  vehicleTypeData,
  sizeOptions,
  bodytype,
} from "../pages/VehicleTypesAndState/Vehicletype";
import { stateData } from "../pages/VehicleTypesAndState/BidState";
import "react-time-picker/dist/TimePicker.css";
import { useSelector } from "react-redux";
import {
  useUserById,
  fetchCitiesByState,
  useCreatedBid,
} from "../HelperFunction/api";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBid = () => {
  const user = useSelector((state) => state.login.user);

  const formRef = useRef(null);
  // console.log(user);
  const navigate=useNavigate()
  const [staff, setStaff] = useState([]);
  const { usersData, usersLoading, usersError, error } = useUserById();
  const [loadingDate, setLoadingDate] = useState(null);
  const [bidExpDate, setBidExpDate] = useState(null);
  const [expireTime, setExpireTime] = useState("");
  const [loadingTime, setLoadingTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeOptionsForVehicle, setSizeOptionsForVehicle] = useState([]);
  const [optionsVehicleBody, setOptionsVehicleBody] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedStates, setSelectedStates] = useState(null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState([]);
  const [inputerror, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [staffLoading, setStaffLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [staffPhone, setStaffPhone] = useState("");
  console.log(selectedOption);

  // select branch
  useEffect(() => {
    // Fetch branch data from the API
    const fetchBranchData = async () => {
      try {
        const response = await fetch(
          `https://freighteg.in/freightapi/getbranches/company/${user.id}`
        );
        const data = await response.json();
        console.log(data);

        // Map the data to the options array
        const branchOptions = [
          { label: "ALL", value: user?.id }, // Add "ALL" option
          ...data.map((branch) => ({
            label: branch.name,
            value: branch._id,
          })),
        ];
        setOptions(branchOptions);
        setLoading(false);

        // Set the default selected option based on localStorage
        const storedBranch = localStorage.getItem("branchName") || "ALL";
        const defaultOption = branchOptions.find(
          (option) => option.value === storedBranch
        );
        setSelectedOption(defaultOption);
      } catch (error) {
        console.error("Error fetching branch data:", error);
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [user.id]);

  // console.log(selectedOption.value)

  const branc = localStorage.getItem("branchName");
  // console.log(branc);
  
  // select branch

  // staff
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://freighteg.in/freightapi/freightuser/${selectedOption.value}`
        );
        const data = response.data;

        // Map the user data to the options array
        if (data && Array.isArray(data.user)) {
          const userOptions = data.user.map((user) => ({
            label: user.name, // Display userName as label
            value: user._id, // Use _id as value
          }));
          setStaff(userOptions);
        } else {
          console.error("Invalid data format");
        }

        setStaffLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setStaffLoading(false);
      }
    };

    fetchUserData();
  }, [branc, selectedOption]);

  useEffect(() => {
    setStaffPhone(selectedStaff.value);
  }, [selectedStaff]);

  const handleSelectStaff = (selectedOption) => {
    if (selectedOption) {
      setSelectedStaff(selectedOption);
    }
  };

  const handleOptionChange = (selectedOption) => {
    // console.log(selectedOption);
    if (selectedOption) {
      setSelectedOption(selectedOption);

      // Update localStorage based on the selected option
      // if (selectedOption.value === user?.id) {
      //   localStorage.setItem('branch_id',user?.id); // Remove branch_id if "ALL" is selected
      // } else {
      //   localStorage.setItem('branch_id', selectedOption.value);
      // }

      // Update branchName in localStorage with the selectedValue (branch ID or 'ALL')
      localStorage.setItem("branchName", selectedOption.value);

      // window.location.reload(); // Reload the page to apply the change
    }
  };
  // console.log("selectedStaff")

  //staff end
  useEffect(() => {
    (async () => {
      if (selectedState && selectedState.value) {
        try {
          const citiesData = await fetchCitiesByState(selectedState.value);
          const transformedCities = citiesData.map((city) => ({
            label: city,
            value: city,
          }));
          setCities((prevCities) => [...prevCities, ...transformedCities]);
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        }
      }
      if (selectedStates && selectedStates.value) {
        try {
          const citiesData = await fetchCitiesByState(selectedStates.value);
          const transformedCities = citiesData.map((city) => ({
            label: city,
            value: city,
          }));
          setCity((prevCities) => [...prevCities, ...transformedCities]);
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCity([]);
        }
      }
    })();
  }, [selectedState, selectedStates]);

  const handleLoadingDateChange = useCallback(
    (date) => {
      if (date !== bidExpDate && bidExpDate !== null) {
        setLoadingDate(date);
        setError("");
      } else {
        setLoadingDate(null);
        // setError(
        //   "The second time must be at least 30 minutes after the first time."
        // );
        setError(
          `Please first select the expire date and time, and then select the loading date and time.`
        );
      }
    },
    [bidExpDate]
  );
  const handleExpireDateChange = (date) => {
    if (date !== null) {
      setBidExpDate(date);
      setError("");
    }
  };
  const userOptions = useMemo(
    () =>
      usersData?.user?.map((user) => ({
        value: user._id,
        label: user.name,
      })),
    [usersData]
  );
  const handleUserChange = (selectedOption) => {
    const user = usersData?.user?.find(
      (user) => user._id === selectedOption.value
    );
    setPhoneNumber(user ? user.phone : "");
  };
  const handleVehicleTypeChange = (selectedOption) => {
    const vehicleKey = selectedOption.value
      .toLowerCase()
      .replace(/ /g, "")
      .replace(/\//g, "_");
    setSizeOptionsForVehicle(sizeOptions[vehicleKey] || []);
    switch (vehicleKey) {
      case "trailer20ft":
        setOptionsVehicleBody(bodytype[vehicleKey]);
        break;
      case "trailer40ft":
        setOptionsVehicleBody(bodytype[vehicleKey]);
        break;
      default:
        setOptionsVehicleBody(bodytype["normaltype"]);
        break;
    }
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };
  const handleStateChanges = (selectedOption) => {
    setSelectedStates(selectedOption);
  };
  const handleExpireTimeChange = (event) => {
    setExpireTime(event.target.value);
    setLoadingTime("");
    setError("");
  };

  const handleLoadingTimeChange = (event) => {
    const selectedTime = event.target.value;
    if (isTimeValid(selectedTime, expireTime)) {
      setLoadingTime(selectedTime);
      setError("");
    } else if (
      selectedTime &&
      loadingDate &&
      loadingDate.toDateString() !== bidExpDate.toDateString() &&
      expireTime
    ) {
      setLoadingTime(selectedTime);
    } else {
      setError(
        "The loading time must be at least 30 minutes after the expire time."
      );
    }
  };
  const isTimeValid = (loading, expire) => {
    if (!expire || !loading) return true;
    const [expireHours, expireMinutes] = expire.split(":").map(Number);
    const [loadingHours, loadingMinutes] = loading.split(":").map(Number);
    const expireDate = new Date();
    expireDate.setHours(expireHours);
    expireDate.setMinutes(expireMinutes);
    const loadingDate = new Date();
    loadingDate.setHours(loadingHours);
    loadingDate.setMinutes(loadingMinutes);
    const diff = (loadingDate - expireDate) / (1000 * 60);
    return diff >= 30;
  };
  const convertToAmPm = (time) => {
    let [hours, minutes] = time.split(":").map(Number);
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amPm}`;
  };

  function convertISTtoUTC(dateStr, timeStr) {
    const [month, day, year] = dateStr.split("/");
    const [hoursStr, minutesStr] = timeStr.split(":");
    const dateIST = new Date(
      `${year}-${month}-${day}T${hoursStr}:${minutesStr}:00`
    );
    const yearUTC = dateIST.getUTCFullYear();
    const monthUTC = (dateIST.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so add 1
    const dayUTC = dateIST.getUTCDate().toString().padStart(2, "0");
    const hoursUTC = dateIST.getUTCHours().toString().padStart(2, "0");
    const minutesUTC = dateIST.getUTCMinutes().toString().padStart(2, "0");
    const secondsUTC = dateIST.getUTCSeconds().toString().padStart(2, "0");
    const millisecondsUTC = dateIST
      .getUTCMilliseconds()
      .toString()
      .padStart(3, "0");
    const utcDateTime = `${yearUTC}-${monthUTC}-${dayUTC}T${hoursUTC}:${minutesUTC}:${secondsUTC}.${millisecondsUTC}Z`;
    return utcDateTime;
  }

  const PostMutation = useMutation({
    mutationFn: useCreatedBid,
    onSuccess: () => {
      alert("Successfully add bid");
      if (formRef.current) {
        setLoadingDate(null);
        setBidExpDate(null);
        setExpireTime("");
        setLoadingTime("");
        setQuantity(1);
        setSizeOptionsForVehicle([]);
        setOptionsVehicleBody([]);
        setSelectedState(null);
        setSelectedStates(null);
        setCities([]);
        setCity([]);
        formRef.current.reset();
      }
    },
  });
  const handleSubmit = useCallback(
    async (e) => {
      if (isSubmitting) return;
      e.preventDefault();
      setIsSubmitting(true);
      // alert("Called")
      const formData = new FormData(e.target);
      console.log({ formData });
      const formDataObj = Object.fromEntries(formData.entries());
      formDataObj.created_by = user?.id;
      console.log({ formDataObj });
      const requiredFields = [
        "loading_state",
        "loading_city",
        "loading_address",
        "loading_pincode",
        "unloading_state",
        "unloading_city",
        "unloading_address",
        "unloading_pincode",
        "route_distance",
        "vehicle_type",
        "vehicle_size",
        "body_type",
        "quantity",
        "material_type",
        "material_weight",
        "expiry_date",
        "expiry_time",
        "loading_date",
        "loading_time",
        "target_price",
        "bid_remarks",
        "assigned_to",
      ];

      formDataObj.loading_pincode = parseInt(formDataObj.loading_pincode);
      formDataObj.unloading_pincode = parseInt(formDataObj.unloading_pincode);
      formDataObj.route_distance = parseInt(formDataObj.route_distance);
      formDataObj.material_weight = parseInt(formDataObj.material_weight);
      formDataObj.target_price = parseInt(formDataObj.target_price);
      formDataObj.quantity = parseInt(formDataObj.quantity);
      formDataObj.is_cng = formDataObj.is_cng === "on" ? true : false;
      formDataObj.expiry_date = convertISTtoUTC(
        formDataObj.expiry_date,
        formDataObj.expiry_time
      );
      formDataObj.loading_date = convertISTtoUTC(
        formDataObj.loading_date,
        formDataObj.loading_time
      );
      formDataObj.loading_time = convertToAmPm(formDataObj.loading_time);
      formDataObj.expiry_time = convertToAmPm(formDataObj.expiry_time);
      formDataObj.company_id = user?.company_id;
      formDataObj.created_by = user?.id;
      formDataObj.assigned_transporter = [];
      formDataObj.responded_by = [];
      formDataObj.isActive = true;
      formDataObj.isDeleted = false;
      try {
        PostMutation.mutate(formDataObj);
        setIsSubmitting(false);
        navigate('/staff/viewBid')
        // window.location.reload()
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setIsSubmitting(false);
      }
    },
    [PostMutation]
  );
  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return <div>Error: {error.message}</div>;
  return (
    <>
      <StaffNavBarr />
      <div className="w-full overflow-x-auto">
        <div className="">
          <form
            ref={formRef}
            className="overflow-x-auto"
            onSubmit={handleSubmit}
          >
            {/* Route Card */}
            <div className="p-10 pt-3">
              <div className="p-5 rounded-xl shadow-lg">
                <div className="flex gap-3 items-center mb-2">
                  <img src={routes} alt="icons" className="h-9 w-9" />
                  <p className="text-[#113870] font-semibold text-[20px]">
                    Route Details
                  </p>
                </div>
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-[#508af1] text-[20px] pb-2">
                      Loading Point details
                    </p>
                    <div className="flex gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <p className="w-16 text-[#888888]">State</p>
                        <Select
                          name="loading_state"
                          options={stateData}
                          placeholder="Select State"
                          onChange={handleStateChange}
                          className="w-60"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              color: "white",
                              backgroundColor: "#e5e7eb",
                              border: state.isFocused
                                ? "1px solid #e5e7eb"
                                : provided.border,
                              borderRadius: "7px",
                              boxShadow: state.isFocused
                                ? "none"
                                : provided.boxShadow,
                              "&:hover": {
                                border: "1px solid #e5e7eb",
                              },
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              color: state.isSelected ? "black" : "",
                              backgroundColor: state.isSelected
                                ? "#f0f0f0"
                                : "white",
                            }),
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="w-16 text-end text-[#888888]">City</p>
                        <Select
                          name="loading_city"
                          options={cities}
                          placeholder="Select City.."
                          // onChange={handleStateChange}
                          className="w-60"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              color: "white",
                              backgroundColor: "#e5e7eb",
                              border: state.isFocused
                                ? "1px solid #e5e7eb"
                                : provided.border,
                              borderRadius: "7px",
                              boxShadow: state.isFocused
                                ? "none"
                                : provided.boxShadow,
                              "&:hover": {
                                border: "1px solid #e5e7eb",
                              },
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              color: state.isSelected ? "black" : "",
                              backgroundColor: state.isSelected
                                ? "#f0f0f0"
                                : "white",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="w-16 text-[#888888]">Address</p>
                      <input
                        name="loading_address"
                        type="text"
                        placeholder="Address"
                        className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 flex-grow"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="w-16 text-[#888888]">Pincode</p>
                      <input
                        type="text"
                        name="loading_pincode"
                        placeholder="Pincode"
                        className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 w-60"
                      />
                    </div>
                  </div>
                  <div className="">
                    <p className="text-[#508af1] text-[20px] pb-2">
                      Unloading Point details
                    </p>
                    <div className="flex gap-5 mb-3">
                      <div className="flex items-center gap-3">
                        <p className="w-16 text-[#888888]">State</p>
                        <Select
                          name="unloading_state"
                          options={stateData}
                          onChange={handleStateChanges}
                          placeholder="Select State"
                          className="w-60"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              color: "white",
                              backgroundColor: "#e5e7eb",
                              border: state.isFocused
                                ? "1px solid #e5e7eb"
                                : provided.border,
                              borderRadius: "7px",
                              boxShadow: state.isFocused
                                ? "none"
                                : provided.boxShadow,
                              "&:hover": {
                                border: "1px solid #e5e7eb",
                              },
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              color: state.isSelected ? "black" : "",
                              backgroundColor: state.isSelected
                                ? "#f0f0f0"
                                : "white",
                            }),
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="w-16 text-end text-[#888888]">City</p>
                        <Select
                          name="unloading_city"
                          options={city}
                          placeholder="Select City.."
                          className="w-60"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              color: "white",
                              backgroundColor: "#e5e7eb",
                              border: state.isFocused
                                ? "1px solid #e5e7eb"
                                : provided.border,
                              borderRadius: "7px",
                              boxShadow: state.isFocused
                                ? "none"
                                : provided.boxShadow,
                              "&:hover": {
                                border: "1px solid #e5e7eb",
                              },
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              color: state.isSelected ? "black" : "",
                              backgroundColor: state.isSelected
                                ? "#f0f0f0"
                                : "white",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="w-16 text-[#888888]">Address</p>
                      <input
                        type="text"
                        name="unloading_address"
                        placeholder="Address"
                        className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 flex-grow"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="w-16 text-[#888888]">Pincode</p>
                      <input
                        type="text"
                        name="unloading_pincode"
                        placeholder="Pincode"
                        className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 w-60"
                      />
                    </div>
                  </div>
                </div>
                {/* border */}
                <div className="mt-8">
                  <div className="border-b border-dotted border-[#8b8b8b]"></div>
                  <div className="flex items-center gap-3 mt-8">
                    <p className="text-[#508af1] font-semibold">
                      Route Distance
                    </p>
                    <input
                      type="text"
                      name="route_distance"
                      placeholder="Distance"
                      className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 w-[28rem]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Card */}
            <div className="p-10 pt-0">
              <div className="p-5 rounded-xl shadow-lg">
                <div className="flex gap-3 items-center mb-2">
                  <img src={vehicle} alt="vehicle" className="pt-1" />
                  <p className="text-[#113870] font-semibold text-[20px]">
                    Vehicle Details
                  </p>
                </div>
                <div className="flex gap-9">
                  <div className=" flex flex-1 gap-5">
                    <p className="text-[#888888]">Vehicle Type</p>
                    <Select
                      options={vehicleTypeData}
                      name="vehicle_type"
                      className="flex-grow"
                      onChange={handleVehicleTypeChange}
                      placeholder="Select Type.."
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          color: "white",
                          backgroundColor: "#e5e7eb",
                          border: state.isFocused
                            ? "1px solid #e5e7eb"
                            : provided.border,
                          borderRadius: "7px",
                          boxShadow: state.isFocused
                            ? "none"
                            : provided.boxShadow,
                          "&:hover": {
                            border: "1px solid #e5e7eb",
                          },
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          color: state.isSelected ? "black" : "",
                          backgroundColor: state.isSelected
                            ? "#f0f0f0"
                            : "white",
                        }),
                      }}
                    />
                  </div>
                  <div className=" flex flex-1 gap-5">
                    <p className="text-[#888888]">Size</p>
                    <Select
                      options={sizeOptionsForVehicle}
                      name="vehicle_size"
                      className="flex-grow"
                      placeholder="Select Size.."
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          color: "white",
                          backgroundColor: "#e5e7eb",
                          border: state.isFocused
                            ? "1px solid #e5e7eb"
                            : provided.border,
                          borderRadius: "7px",
                          boxShadow: state.isFocused
                            ? "none"
                            : provided.boxShadow,
                          "&:hover": {
                            border: "1px solid #e5e7eb",
                          },
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          color: state.isSelected ? "black" : "",
                          backgroundColor: state.isSelected
                            ? "#f0f0f0"
                            : "white",
                        }),
                      }}
                    />
                  </div>
                  <div className=" flex flex-1 gap-5">
                    <p className="text-[#888888]">Body Type</p>
                    <Select
                      options={optionsVehicleBody}
                      name="body_type"
                      className="flex-grow"
                      placeholder="Select Body.."
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          color: "white",
                          backgroundColor: "#e5e7eb",
                          border: state.isFocused
                            ? "1px solid #e5e7eb"
                            : provided.border,
                          borderRadius: "7px",
                          boxShadow: state.isFocused
                            ? "none"
                            : provided.boxShadow,
                          "&:hover": {
                            border: "1px solid #e5e7eb",
                          },
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          color: state.isSelected ? "black" : "",
                          backgroundColor: state.isSelected
                            ? "#f0f0f0"
                            : "white",
                        }),
                      }}
                    />
                  </div>
                  <div className=" flex flex-1 gap-5">
                    <p className="text-[#888888]">Quantity</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        className="bg-gray-200 h-10 w-10 rounded-md flex items-center justify-center focus:outline-none font-semibold"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        name="quantity"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(parseInt(e.target.value) || 1)
                        }
                        className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 flex-grow text-center"
                      />
                      <button
                        type="button"
                        onClick={handleIncrement}
                        className="bg-gray-200 h-10 w-10 rounded-md flex items-center justify-center focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {/* Remark */}
                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    name="is_cng"
                    className="h-5 w-5 mt-2 bg-gray-200 rounded"
                  />
                  <p className="text-[#888888]">Click here for CNG Vehicle</p>
                </div>
              </div>
            </div>

            {/* Material card */}
            <div className="p-10 pt-0">
              <div className="p-5 rounded-xl shadow-lg">
                <div className="flex gap-3 items-center mb-2">
                  <img src={mat} alt="material" className="pt-2" />
                  <p className="text-[#113870] font-semibold text-[20px]">
                    Material Details
                  </p>
                </div>
                <div className="flex gap-9">
                  <div className=" flex flex-1 gap-5">
                    <p className="text-[#888888]">Material Type</p>
                    <input
                      type="text"
                      name="material_type"
                      placeholder="Material type here..."
                      className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 flex-grow"
                    />
                  </div>
                  <div className=" flex flex-1 gap-5">
                    <p className="text-[#888888]">Material Weight (T)</p>
                    <input
                      type="text"
                      name="material_weight"
                      placeholder="Material Weight in (MT)..."
                      className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 flex-grow"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Addtional Information card */}
            <div className="p-10 pt-0">
              <div className="p-5 rounded-xl shadow-lg">
                <div className="flex gap-3 items-center mb-2">
                  <img
                    src={additional}
                    alt="Additional_Info"
                    className="pt-1"
                  />
                  <p className="text-[#113870] font-semibold text-[20px]">
                    Additional info.
                  </p>
                </div>
                <div className="flex gap-9">
                  <div className=" flex flex-1 gap-5">
                    <p className="text-[#888888]">Bid Exp Date & Time</p>
                    <DatePicker
                      name="expiry_date"
                      placeholderText="Expiry Date"
                      selected={bidExpDate}
                      onChange={(date) => handleExpireDateChange(date)}
                      minDate={new Date()}
                      className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 flex-grow"
                    />
                    <input
                      name="expiry_time"
                      type="time"
                      value={expireTime}
                      onChange={handleExpireTimeChange}
                      className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 w-50"
                    />
                  </div>
                  <div className=" flex flex-1 gap-5">
                    <p className="text-[#888888]">
                      Vehicle Loading Date & Time
                    </p>
                    <div className="flex flex-col">
                      <div className="flex gap-5">
                        <DatePicker
                          name="loading_date"
                          placeholderText="Loading Date"
                          selected={loadingDate}
                          onChange={handleLoadingDateChange}
                          minDate={bidExpDate}
                          className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 flex-grow"
                        />
                        <input
                          name="loading_time"
                          type="time"
                          value={loadingTime}
                          onChange={handleLoadingTimeChange}
                          className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 w-50"
                        />
                      </div>
                      {inputerror && (
                        <p style={{ color: "red" }}>{inputerror}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="text-[#888888]">Target Price</p>
                    <input
                      name="target_price"
                      type="text"
                      placeholder="Enter Price.."
                      className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 w-50"
                    />
                  </div>
                </div>
                {/* Remark */}
                <div className=" flex flex-1 gap-3 pt-4 ">
                  <p className="text-[#888888]">Remark (if any)</p>
                  <input
                    name="bid_remarks"
                    type="text"
                    placeholder="Remarks.."
                    className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 flex-grow"
                  />
                </div>
              </div>
            </div>

            {/* Assign Staff card */}
            <div className="p-10 pt-0">
              <div className="p-5 rounded-xl shadow-lg">
                <div className="flex gap-3 items-center mb-2">
                  <img src={assign} alt="Assign_staff" className="pt-2" />
                  <p className="text-[#113870] font-semibold text-[20px]">
                    Assigned Staff
                  </p>
                </div>
                <div className="flex gap-9">
                  <div className="flex flex-1 gap-5">
                    <p className="text-[#888888]">Name</p>
                    <input
                      value={user.name}
                      type="text"
                      name="assigned_to"
                      className="bg-gray-200 h-10 rounded-md p-2 focus:outline-none border border-gray-400 flex-grow"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-1 gap-5">
                    <input
                      value={user.id}
                      name="assigned_to"
                      type="text"
                      className="bg-gray-200 h-10 rounded-md p-2 hidden focus:outline-none border border-gray-400 flex-grow"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Create button */}
            <div className="p-5 text-center w-full flex justify-end pr-10">
              <button
                type="submit"
                className="bg-[#113870] hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <i className="fas fa-spinner fa-spin"></i> Creating bid...
                  </span>
                ) : (
                  "Submit Bid"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBid;
