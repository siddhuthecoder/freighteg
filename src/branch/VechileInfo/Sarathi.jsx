import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import car1 from "../../assets/car1.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Map from "./openstreetMap/Map";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useDispatch } from 'react-redux';
import BranchNavbar from '../BranchNavbar';
import { useSelector } from 'react-redux';


const BranchSarathi = () => {
  const [dlNumber, setDlNumber] = useState("");
  const [dob, setDob] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const pathName = location.pathname;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
 

  const handleSearch = async () => {
    const capitalizedVehicleNumber = dlNumber.toUpperCase();
  
    setLoading(true);
    setError(null);
    try {
      // alert(user?.id)
      const response = await axios.post(
        "https://freighteg.in/freightapi/ULLIPtracking",
        {
          company_id: user?.id,
          tracking_For: "SARATHI",
          parameters: {
            dlnumber: capitalizedVehicleNumber,
            dob: format(dob, "yyyy-MM-dd"),
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setVehicleData(response.data.response[0].response);

      
    } catch (error) {
      setError(`${error.response?.data.error}`);
      console.log(error)
      setVehicleData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Generate years from 1980 to the current year
  const startYear = 1900;
  const endYear = new Date().getFullYear();
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );
  
  return (
    <>
    <BranchNavbar/>
      <div className="w-full grid grid-cols-1 mt-[10px] lg:grid-cols-12 gap-5 md:gap-2  overflow-y-auto md:pt-0 pt-3  md:pb-0 pb-2">
        <div className="md:w-[90%] ms-2 w-[100%] mx-auto max-h-[620px]md:col-span-6 xl:col-span-4 flex flex-col">
          
          <div className="w-full flex flex-col mt-3">
            <input
              type="text"
              className="w-full px-3 min-h-[52px] rounded-md border"
              placeholder="Enter Driving License Number"
              value={dlNumber.toUpperCase()}
              onChange={(e) => setDlNumber(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress} // Add onKeyPress event
            />
            <div className="flex w-full mx-auto items-center bg-white rounded-md mt-3 relative">
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Enter Date of Birth"
                className="w-full px-3 h-[52px] rounded-md focus:outline-none"
                minDate={new Date("1900-01-01")}
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                showMonthDropdown
                yearDropdownItemNumber={50} // Adjust this number based on your requirement
                yearDropdown
                onKeyPress={handleKeyPress} // Add onKeyPress event
              />
              <div
                className="absolute right-0 w-[50px] z-[2] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-br-md flex justify-center items-center cursor-pointer"
                onClick={handleSearch}
              >
                <IoSearchOutline className="text-white text-2xl" />
              </div>
            </div>
            <div className="mt-3 w-full bg-white rounded-md h-[450px] overflow-y-scroll flex flex-col ps-3">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Please Wait, Data is Fetching...
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-full text-red-500">
                  {error}
                </div>
              ) : vehicleData ? (
                <>
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-lg font-bold">DL Number</div>
                    <div className="font-semi-bold text-zinc-500">
                      {vehicleData.licenseInformation.licenseNumber}{" "}
                      <span className="text-green-500">
                        ({vehicleData.licenseInformation.status})
                      </span>
                    </div>
                  </div>
                  <img src={car1} alt="" className="m-2" />
                </div>
                <hr className="mx-3 my-1" />
                <div className="text-2xl font-semibold text-[#5E81F4]">
                  Personal Information
                </div>
                <div className="flex flex-col ps-2">
                  <div className="text-lg font-bold">Name</div>
                  <div className="text-zinc-500 font-semibold">
                    {vehicleData.personalInformation.name}
                  </div>
                  <div className="grid grid-cols-2 pt-2  gap-4">
                    <div>
                      <div className="text-lg font-bold">Father's Name</div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.personalInformation.fatherName}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Date of Birth</div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.personalInformation.dateOfBirth.replace(
                          /\*/g,
                          ""
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Aadhaar Number</div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.personalInformation.aadhaarNumber}
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold">Blood Group</div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.personalInformation.bloodGroup}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Mobile Number</div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.personalInformation.mobileNumber.replace(
                          /\*/g,
                          ""
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Gender</div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.personalInformation.gender}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mx-3 my-1" />
                <div className="text-2xl font-semibold text-[#5E81F4]">
                  License Information
                </div>
                <div className="flex flex-col ps-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-lg font-bold">License Number</div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.licenseInformation.licenseNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Issued Authority</div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.licenseInformation.issuedAuthority}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Issued Date</div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.licenseInformation.issuedDate}
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold">
                        Validity (Transport)
                      </div>
                      <div className="text-zinc-500 font-semibold">
                        {vehicleData.licenseInformation.validity.transport}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mx-3 my-1" />
                <div className="text-2xl font-semibold text-[#5E81F4]">
                  Driving Classes
                </div>
                <div className="flex flex-col ps-2">
                  {vehicleData.drivingClasses.map((drivingClass, index) => (
                    <div key={index} className="mb-2">
                      <div className="font-bold text-lg">
                        {drivingClass.class}{" "}
                        <span className="text-green-500 font-semibold">
                          ({drivingClass.status})
                        </span>
                      </div>
                      <div className="text-zinc-400">
                        Issued: {drivingClass.issued}
                      </div>
                    </div>
                  ))}
                </div>
              </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  Enter DL Number and DOB
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:w-[90%] w-[100%] ms-1 mx-auto min-h-[620px] z-[-0] md:col-span-6 xl:col-span-8 hidden md:flex justify-center items-center">
          <Map tollData={[]} />
        </div>
      </div>
    </>
  );
};

export default BranchSarathi;
