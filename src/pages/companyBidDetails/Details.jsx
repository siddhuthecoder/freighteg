import React from "react";
import greencircle from "../../assets/greencircle.png";
import line from "../../assets/LineTwo.png";
import location from "../../assets/location.png";
import { FaCalendar } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { BsFillTruckFrontFill } from "react-icons/bs";
import { IoMdCube } from "react-icons/io";
import { useBidData } from "../../HelperFunction/api";
const Details = ({ rowData }) => {
  const { userData } = useBidData();
  const convertToIndianDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="pl-5 pr-5 p-2">
      {rowData && rowData.length > 0 ? (
        rowData.map((data, index) => {
          const createdByUserData = userData?.find(
            (user) => user._id === data.created_by
          );
          return (
            <div
              className="bg-[#e7f7ff] rounded flex justify-between pl-2 pr-2 pt-2"
              key={index}
            >
              {/* first div*/}
              <div>
                <div className="flex gap-2 ml-2">
                  <span className="font-semibold text-black">Bid No:</span>
                  <span className="text-black-500">{data.bidNo}</span>
                  <span className="text-gray-500">
                    (
                    <span>
                      {createdByUserData
                        ? createdByUserData.name
                        : "Unknown User"}
                    </span>
                    )
                  </span>
                </div>
                <div>
                  <div className="flex">
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src={greencircle}
                        alt="Loading Icon"
                        className="w-4 h-4 mt-1"
                      />
                      <img
                        src={line}
                        alt="Line"
                        className="w-[2.5px] h-[3.8rem]"
                      />
                      <img
                        src={location}
                        alt="Location Icon"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex flex-col ml-4">
                      <div className="flex gap-1">
                        <span className="text-[#113870]">
                          {" "}
                          {data.loading_city},
                        </span>
                        <span className="text-gray-500">
                          {data.loading_state}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#0a8f47]">Loading Point:</span>
                        <div className="flex flex-col">
                          <span className="text-[#4c4c4c]">
                            {data.loading_city}
                          </span>
                          <span className="text-[#4c4c4c]"></span>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-10">
                        <span className="text-[#113870]">
                          {" "}
                          {data.unloading_city},
                        </span>
                        <span className="text-gray-500">
                          {data.unloading_state}
                        </span>
                      </div>
                      <div className="flex gap-2 ">
                        <span className="text-[#e90505]">Unloading Point:</span>
                        <div className="flex flex-col">
                          <span className="text-[#4c4c4c]">
                            {" "}
                            {data.unloading_city}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second div */}
              <div>
                <div className="flex   ">
                  <div className="bg-[#00a6f6] flex rounded gap-3 p-2">
                    <FaCalendar className="text-white w-[20px] h-[20px]" />
                    <span className="text-white">Vehicle loading date:</span>
                    <span className="text-white">
                      {convertToIndianDate(data.loading_date)}
                    </span>
                  </div>
                </div>
                <div className="flex p-2 gap-3">
                  <BsFillTruckFrontFill className="text-[#113870] w-[20px] h-[20px] " />
                  <span className="text-[#113870]">
                    Vehicle Type:{" "}
                    <span className="text-[#00a6f6]">{data.vehicle_type}</span>
                    <span className="text-[#00a6f6]"> {data.body_type}</span>
                  </span>
                  {data.is_cng ? (
                    <span className="bg-[#0a8f47] text-white p-3 pt-0 pb-0 rounded">
                      CNG
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="flex p-2 gap-3">
                  <IoMdCube className="text-[#113870] w-[20px] h-[20px]" />
                  <span className="text-[#113870]">Material:</span>
                  <span className="text-[#00a6f6]">{data.material_type}</span>
                  <span className="text-[#113870]">Weight:</span>
                  <span className="text-[#00a6f6]">
                    {data.material_weight} T
                  </span>
                </div>
                <div className="flex p-2 gap-3">
                  <FaCalendar className="text-[#113870] w-[20px] h-[20px]" />
                  <span className="text-[#113870]">Request Date:</span>
                  <span className="text-[#00a6f6]">
                    {convertToIndianDate(data.createdAt)}
                  </span>
                  <FaCalendar className="text-[#113870] w-[20px] h-[20px]" />
                  <span className="text-[#113870]">Expire Date:</span>
                  <span className="text-[#00a6f6]">
                    {convertToIndianDate(data.expiry_date)}
                  </span>
                </div>
                <div className="flex p-2 pt-0 gap-3">
                  <span className="text-[#113870]">Remarks:</span>
                  <span className="text-[#00a6f6]">{data.bid_remarks}</span>
                </div>
              </div>
              {/* Third div */}
              <div>
                <div className="flex   ">
                  <div className="bg-[#00a6f6] flex rounded gap-3 p-2">
                    <FaCarAlt className="text-white w-[20px] h-[20px]" />
                    <span className="text-white">Vehicle Quantity:</span>
                    <span className="text-white">{data.quantity}</span>
                  </div>
                </div>
                <div className="flex p-2 gap-3">
                  <IoMdPerson className="text-[#113870] w-[20px] h-[20px] " />
                  <span className="text-[#113870]">Assigned Staff:</span>
                  <span className="text-[#00a6f6]">
                    {" "}
                    {createdByUserData
                      ? createdByUserData.name
                      : "Unknown User"}
                  </span>
                </div>
                <div className="flex p-2 gap-3">
                  <MdLocalPhone className="text-[#113870] w-[20px] h-[20px]" />
                  <span className="text-[#113870]">Phone Number:</span>
                  <span className="text-[#00a6f6]">
                    {createdByUserData ? createdByUserData.phone : "NA"}
                  </span>
                </div>
                <div className="flex p-2 gap-3">
                  <span className="text-[#113870]">Target Price:</span>
                  <span className="text-[#00a6f6]">{data.target_price}</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center bg-[#e7f7ff] p-2">
          <span>Data Not Found!</span>
        </div>
      )}
    </div>
  );
};

export default Details;
