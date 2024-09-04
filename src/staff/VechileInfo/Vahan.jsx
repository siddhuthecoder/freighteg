import React, { useState } from "react";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import truck from "../../assets/truck.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Map from "./openstreetMap/Map";
import { useDispatch } from 'react-redux';
import StaffNavBarr from '../StaffNavBarr'
// import { signInSuccess } from '../../store/authSlice';
import { useSelector } from 'react-redux';
const Vahan = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const pathName = location.pathname;
  const dispatch=useDispatch()
  const user = useSelector((state) => state.login.user);
  
  const handleSearch = async () => {
    const capitalizedVehicleNumber = vehicleNumber.toUpperCase();
    const comapny_id=localStorage.getItem('userID') 
    setLoading(true);
    setError("");
    try {
      // alert(user?.id)
      const response = await axios.post(
        "https://freighteg.in/freightapi/ULLIPtracking",
        {
          company_id: user?.id,
          tracking_For: "VAHAN",
          parameters: {
            vehiclenumber: capitalizedVehicleNumber,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(
        response.data.response[0].response,
        "text/xml"
      );

      // Extract data from XML
      const data = {
        vehicleNumber:
          xmlDoc.getElementsByTagName("rc_regn_no")[0]?.textContent || "N/A",
          vehicleStatus: xmlDoc.getElementsByTagName("rc_status")[0]?.textContent || "N/A",

        registrationDate:
          xmlDoc.getElementsByTagName("rc_regn_dt")[0]?.textContent || "N/A",
        registrationUpto:
          xmlDoc.getElementsByTagName("rc_regn_upto")[0]?.textContent || "N/A",
        purchaseDate:
          xmlDoc.getElementsByTagName("rc_purchase_dt")[0]?.textContent ||
          "N/A",
        ownerName:
          xmlDoc.getElementsByTagName("rc_owner_name")[0]?.textContent || "N/A",
        fatherName:
          xmlDoc.getElementsByTagName("rc_f_name")[0]?.textContent || "N/A",
        presentAddress:
          xmlDoc.getElementsByTagName("rc_present_address")[0]?.textContent ||
          "N/A",
        permanentAddress:
          xmlDoc.getElementsByTagName("rc_permanent_address")[0]?.textContent ||
          "N/A",
        mobileNo:
          xmlDoc.getElementsByTagName("rc_mobile_no")[0]?.textContent || "N/A",
        vehicleCategory:
          xmlDoc.getElementsByTagName("rc_vch_catg")[0]?.textContent || "N/A",
        vehicleClassDesc:
          xmlDoc.getElementsByTagName("rc_vh_class_desc")[0]?.textContent ||
          "N/A",
        chassisNo:
          xmlDoc.getElementsByTagName("rc_chasi_no")[0]?.textContent || "N/A",
        engineNo:
          xmlDoc.getElementsByTagName("rc_eng_no")[0]?.textContent || "N/A",
        makerDesc:
          xmlDoc.getElementsByTagName("rc_maker_desc")[0]?.textContent || "N/A",
        makerModel:
          xmlDoc.getElementsByTagName("rc_maker_model")[0]?.textContent ||
          "N/A",
        bodyTypeDesc:
          xmlDoc.getElementsByTagName("rc_body_type_desc")[0]?.textContent ||
          "N/A",
        fuelDesc:
          xmlDoc.getElementsByTagName("rc_fuel_desc")[0]?.textContent || "N/A",
        color: xmlDoc.getElementsByTagName("rc_color")[0]?.textContent || "N/A",
        normsDesc:
          xmlDoc.getElementsByTagName("rc_norms_desc")[0]?.textContent || "N/A",
        fitUpto:
          xmlDoc.getElementsByTagName("rc_fit_upto")[0]?.textContent || "N/A",
        npUpto:
          xmlDoc.getElementsByTagName("rc_np_upto")[0]?.textContent || "N/A",
        npIssuedBy:
          xmlDoc.getElementsByTagName("rc_np_issued_by")[0]?.textContent ||
          "N/A",
        taxUpto:
          xmlDoc.getElementsByTagName("rc_tax_upto")[0]?.textContent || "N/A",
        financer:
          xmlDoc.getElementsByTagName("rc_financer")[0]?.textContent || "N/A",
        insuranceComp:
          xmlDoc.getElementsByTagName("rc_insurance_comp")[0]?.textContent ||
          "N/A",
        insurancePolicyNo:
          xmlDoc.getElementsByTagName("rc_insurance_policy_no")[0]
            ?.textContent || "N/A",
        insuranceUpto:
          xmlDoc.getElementsByTagName("rc_insurance_upto")[0]?.textContent ||
          "N/A",
        manuMonthYr:
          xmlDoc.getElementsByTagName("rc_manu_month_yr")[0]?.textContent ||
          "N/A",
        unldWt:
          xmlDoc.getElementsByTagName("rc_unld_wt")[0]?.textContent || "N/A",
        gvw: xmlDoc.getElementsByTagName("rc_gvw")[0]?.textContent || "N/A",
        noCyl:
          xmlDoc.getElementsByTagName("rc_no_cyl")[0]?.textContent || "N/A",
        cubicCap:
          xmlDoc.getElementsByTagName("rc_cubic_cap")[0]?.textContent || "N/A",
        seatCap:
          xmlDoc.getElementsByTagName("rc_seat_cap")[0]?.textContent || "N/A",
        sleeperCap:
          xmlDoc.getElementsByTagName("rc_sleeper_cap")[0]?.textContent ||
          "N/A",
        standCap:
          xmlDoc.getElementsByTagName("rc_stand_cap")[0]?.textContent || "N/A",
        wheelbase:
          xmlDoc.getElementsByTagName("rc_wheelbase")[0]?.textContent || "N/A",
        registeredAt:
          xmlDoc.getElementsByTagName("rc_registered_at")[0]?.textContent ||
          "N/A",
        statusAsOn:
          xmlDoc.getElementsByTagName("rc_status_as_on")[0]?.textContent ||
          "N/A",
        puccUpto:
          xmlDoc.getElementsByTagName("rc_pucc_upto")[0]?.textContent || "N/A",
        puccNo:
          xmlDoc.getElementsByTagName("rc_pucc_no")[0]?.textContent || "N/A",
        permitNo:
          xmlDoc.getElementsByTagName("rc_permit_no")[0]?.textContent || "N/A",
        permitIssueDt:
          xmlDoc.getElementsByTagName("rc_permit_issue_dt")[0]?.textContent ||
          "N/A",
        permitValidFrom:
          xmlDoc.getElementsByTagName("rc_permit_valid_from")[0]?.textContent ||
          "N/A",
        permitValidUpto:
          xmlDoc.getElementsByTagName("rc_permit_valid_upto")[0]?.textContent ||
          "N/A",
        permitType:
          xmlDoc.getElementsByTagName("rc_permit_type")[0]?.textContent ||
          "N/A",
        permitCode:
          xmlDoc.getElementsByTagName("rc_permit_code")[0]?.textContent ||
          "N/A",
      };
      console.log(data);
      setVehicleData(data);
      setError("");
    } catch (error) {
      console.error("Error fetching vehicle data:", error.message);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      console.error("Response headers:", error.response?.headers);
      setError(
      ` ${error.response?.data.error}` 
      );
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  
  return (
    <>
      <StaffNavBarr/>
      <div className="w-full grid grid-cols-1 mt-[10px] lg:grid-cols-12 gap-5  md:gap-2  md:pt-0 pt-3  md:pb-0 pb-2">
        <div className="md:w-[90%] ms-2 w-[100%] mx-auto max-h-[620px]  md:col-span-6 xl:col-span-4 flex flex-col ">
          
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col ">
              <div className="flex w-full mx-auto items-center mt-3 relative">
                <input
                  type="text"
                  className="w-full px-3 h-[52px] rounded-md border"
                  placeholder="Enter Vehicle Number"
                  value={vehicleNumber.toUpperCase()}
                  onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                />
                <div
                  className="absolute right-0 w-[50px] z-[2] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-tb-md rounded-br-md flex justify-center items-center cursor-pointer"
                  onClick={handleSearch}
                  onKeyPress={handleKeyPress}
                >
                  <IoSearchOutline className="text-white text-2xl" />
                </div>
              </div>
              <div className="flex flex-col w-full rounded-md bg-white h-[75vh] overflow-y-auto mt-3 ps-3">
                {loading && !error && (
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
                )}
                {error && !loading && (
                  <div className="flex justify-center items-center h-full text-red-500">
                    {error}
                  </div>
                )}
                {vehicleData ? (
                  <>
                    <div className="w-full flex items-center justify-between">
                      <div className="flex flex-col  my-1">
                        <div className="text-lg font-bold">Vehicle Number</div>
                        <div className="font-semibold text-zinc-500 text-lg">
                          {vehicleData.vehicleNumber}{" "}
       
                          <span style={{ color: vehicleData.vehicleStatus === "ACTIVE" ? "green" : "red" }}>
  ({vehicleData.vehicleStatus})
</span>

  {/* ({new Date(vehicleData.registrationUpto) > new Date() ? "Active" : "Inactive"}) */}

                        </div>
                      </div>
                      <img src={truck} className="m-2" alt="" />
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="text-lg font-bold">Registration Date: </div>
                      <div className="font-semibold text-zinc-500">
                        {vehicleData.registrationDate}
                      </div>
                    </div>
                    <hr className="mx-3 my-1" />
                    <div className="text-2xl font-semi-bold text-[#5E81F4]">
                      Vehicle Details
                    </div>
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Registration Up To:</div>
                <div className="font-semibold">{vehicleData.registrationUpto}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Purchase Date:</div>
                <div className="font-semibold">{vehicleData.purchaseDate}</div>
              </div> */}
                    <div className="w-full flex flex-col mt-1">
                      <div className="text-lg font-bold ">Owner Name:</div>
                      <div className="font-semibold text-zinc-500">
                        {vehicleData.ownerName}
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-4 mt-1">
                      <div className="flex flex-col">
                        <div className="text-lg font-bold">
                          Registered Authority:
                        </div>
                        <div className="font-semibold text-zinc-500">
                          {vehicleData.registeredAt}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-lg font-bold ">Fuel Description:</div>
                        <div className="font-semibold text-zinc-500">
                          {vehicleData.fuelDesc}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-lg font-bold ">Vehicle Class:</div>
                        <div className="font-semibold text-zinc-500">
                          {vehicleData.vehicleClassDesc}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-lg font-bold ">Emission Norms:</div>
                        <div className="font-semibold text-zinc-500">
                          {vehicleData.normsDesc}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-semi-bold py-2 text-[#5E81F4]">
                      Document Details
                    </div>
                    <div className="w-full grid grid-cols-2 gap-4 mt-1">
  <div className="flex flex-col">
    <div className="text-lg font-bold">PUCC Up To:</div>
    <div className={`font-semibold ${new Date(vehicleData.puccUpto) < new Date() ? 'text-red-500' : 'text-green-500'}`}>
      {vehicleData.puccUpto}
    </div>
  </div>

  <div className="flex flex-col">
    <div className="text-lg font-bold">Permit Upto:</div>
    <div className={`font-semibold ${new Date(vehicleData.permitValidUpto) < new Date() ? 'text-red-500' : 'text-green-500'}`}>
      {vehicleData.permitValidUpto}
    </div>
  </div>

  <div className="flex flex-col">
    <div className="text-lg font-bold">Tax Up To:</div>
    <div className={`font-semibold ${new Date(vehicleData.taxUpto) < new Date() ? 'text-red-500' : 'text-green-500'}`}>
      {vehicleData.taxUpto}
    </div>
  </div>

  <div className="flex flex-col">
    <div className="text-lg font-bold">Insurance Up To:</div>
    <div className={`font-semibold ${new Date(vehicleData.insuranceUpto) < new Date() ? 'text-red-500' : 'text-green-500'}`}>
      {vehicleData.insuranceUpto}
    </div>
  </div>

  <div className="flex flex-col">
    <div className="text-lg font-bold">National permit Up To:</div>
    <div className={`font-semibold ${new Date(vehicleData.npUpto) < new Date() ? 'text-red-500' : 'text-green-500'}`}>
      {vehicleData.npUpto}
    </div>
  </div>

  <div className="flex flex-col mt-1">
    <div className="text-lg font-bold">Fitness Up To:</div>
    <div className={`font-semibold ${new Date(vehicleData.fitUpto) < new Date() ? 'text-red-500' : 'text-green-500'}`}>
      {vehicleData.fitUpto}
    </div>
  </div>
</div>


                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Father's Name:</div>
                <div className="font-semibold">{vehicleData.fatherName}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Present Address:</div>
                <div className="font-semibold">{vehicleData.presentAddress}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Permanent Address:</div>
                <div className="font-semibold">{vehicleData.permanentAddress}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Mobile No:</div>
                <div className="font-semibold">{vehicleData.mobileNo}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Vehicle Category:</div>
                <div className="font-semibold">{vehicleData.vehicleCategory}</div>
              </div> */}

                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Chassis No:</div>
                <div className="font-semibold">{vehicleData.chassisNo}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Engine No:</div>
                <div className="font-semibold">{vehicleData.engineNo}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Maker Description:</div>
                <div className="font-semibold">{vehicleData.makerDesc}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Maker Model:</div>
                <div className="font-semibold">{vehicleData.makerModel}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Body Type Description:</div>
                <div className="font-semibold">{vehicleData.bodyTypeDesc}</div>
              </div> */}

                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Color:</div>
                <div className="font-semibold">{vehicleData.color}</div>
              </div> */}

                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">NP Issued By:</div>
                <div className="font-semibold">{vehicleData.npIssuedBy}</div>
              </div>
             
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Financer:</div>
                <div className="font-semibold">{vehicleData.financer}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Insurance Company:</div>
                <div className="font-semibold">{vehicleData.insuranceComp}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Insurance Policy No:</div>
                <div className="font-semibold">{vehicleData.insurancePolicyNo}</div>
              </div>
             
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Manufacturing Month & Year:</div>
                <div className="font-semibold">{vehicleData.manuMonthYr}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Unladen Weight:</div>
                <div className="font-semibold">{vehicleData.unldWt}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">GVW:</div>
                <div className="font-semibold">{vehicleData.gvw}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Number of Cylinders:</div>
                <div className="font-semibold">{vehicleData.noCyl}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Cubic Capacity:</div>
                <div className="font-semibold">{vehicleData.cubicCap}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Seat Capacity:</div>
                <div className="font-semibold">{vehicleData.seatCap}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Sleeper Capacity:</div>
                <div className="font-semibold">{vehicleData.sleeperCap}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Standing Capacity:</div>
                <div className="font-semibold">{vehicleData.standCap}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Wheelbase:</div>
                <div className="font-semibold">{vehicleData.wheelbase}</div>
              </div> */}

                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Status As On:</div>
                <div className="font-semibold">{vehicleData.statusAsOn}</div>
              </div> */}

                    {/*  <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">PUCC No:</div>
                <div className="font-semibold">{vehicleData.puccNo}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Fitness Certificate No:</div>
                <div className="font-semibold">{vehicleData.fitCertNo}</div>
              </div> */}

                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Permit No:</div>
                <div className="font-semibold">{vehicleData.permitNo}</div>
              </div> */}

                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Permit Issued By:</div>
                <div className="font-semibold">{vehicleData.permitIssuedBy}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Body Style Description:</div>
                <div className="font-semibold">{vehicleData.bodyStyleDesc}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">City:</div>
                <div className="font-semibold">{vehicleData.city}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">District:</div>
                <div className="font-semibold">{vehicleData.district}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">State:</div>
                <div className="font-semibold">{vehicleData.state}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Pin Code:</div>
                <div className="font-semibold">{vehicleData.pinCode}</div>
              </div> */}
                    {/* <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">RTO Office:</div>
                <div className="font-semibold">{vehicleData.rtoOffice}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Sub RTO Office:</div>
                <div className="font-semibold">{vehicleData.subRtoOffice}</div>
              </div>
          */}
                  </>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    {!loading && !error && (
                      <>
                        <div className="flex justify-center items-center h-full">
                          Enter A Vechile Number
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[90%] w-[100%] ms-1  mx-auto min-h-[620px]  z-[-0] md:col-span-6 xl:col-span-8  hidden md:flex justify-center items-center">
          <Map tollData={[]} />
        </div>
      </div>
      {/* //child */}
    </>
  );
};

export default Vahan;
