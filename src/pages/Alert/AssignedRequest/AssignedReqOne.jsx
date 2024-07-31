import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdEdit } from "react-icons/md";

const AssignedReqOne = () => {
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


  const handleToggle = () => {
    setIsFormOpen(!isFormOpen);
  }

  const handleClick = (index) => {
    setOpenRowIndex(index === openRowIndex ? null : index); // Toggle the state on click
  };
  const data = [
    {
      SNo: "1",
      Company: "ABC Company",
      BidNumber: "162545258541262",
      StartDate: "2024-05-20",
      StartTime: "09:00 AM",
      LoadingDate: "2024-05-20",
      EndDate: "2024-05-21",
      EndTime: "05:00 PM",
      FromCity: "Gurgoan",
      ToCity: "Mumbai",
      VehicleType: "Truck",
      Size: "20ft",
      Body: "Closed",
      VehicleQuantity: "5",
      VehicleDetails: <h1>Upload Details</h1>,
      Rank: "L1",
      Status: "assigned",
      PricePerVehicle: "4000.0",
      info: <h1 style={{ borderBottom: "1px solid #00A6F6", width: "3vw" }}>View</h1>,
    },
    {
      SNo: "2",
      Company: "ABC Company",
      BidNumber: "162545258541262",
      StartDate: "2024-05-20",
      StartTime: "09:00 AM",
      LoadingDate: "2024-05-20",
      EndDate: "2024-05-21",
      EndTime: "05:00 PM",
      FromCity: "Gurgoan",
      ToCity: "Mumbai",
      VehicleType: "Truck",
      Size: "20ft",
      Body: "Closed",
      VehicleQuantity: "5",
      VehicleDetails: <h1>Upload Details</h1>,
      Rank: "L1",
      Status: "assigned",
      PricePerVehicle: "4000.0",
      info: <h1 style={{ borderBottom: "1px solid #00A6F6", width: "3vw" }}>View</h1>,
    },
    {
      SNo: "3",
      Company: "ABC Company",
      BidNumber: "162545258541262",
      StartDate: "2024-05-20",
      StartTime: "09:00 AM",
      LoadingDate: "2024-05-20",
      EndDate: "2024-05-21",
      EndTime: "05:00 PM",
      FromCity: "Gurgoan",
      ToCity: "Mumbai",
      VehicleType: "Truck",
      Size: "20ft",
      Body: "Closed",
      VehicleQuantity: "5",
      VehicleDetails: <h1>Upload Details</h1>,
      Rank: "L1",
      Status: "assigned",
      PricePerVehicle: "4000.0",
      info: <h1 style={{ borderBottom: "1px solid #00A6F6", width: "3vw" }}>View</h1>,
    },
    {
      SNo: "4",
      Company: "ABC Company",
      BidNumber: "162545258541262",
      StartDate: "2024-05-20",
      StartTime: "09:00 AM",
      LoadingDate: "2024-05-20",
      EndDate: "2024-05-21",
      EndTime: "05:00 PM",
      FromCity: "Gurgoan",
      ToCity: "Mumbai",
      VehicleType: "Truck",
      Size: "20ft",
      Body: "Closed",
      VehicleQuantity: "5",
      VehicleDetails: <h1>Upload Details</h1>,
      Rank: "L1",
      Status: "assigned",
      PricePerVehicle: "4000.0",
      info: <h1 style={{ borderBottom: "1px solid #00A6F6", width: "3vw" }}>View</h1>,
    },
    {
      SNo: "5",
      Company: "ABC Company",
      BidNumber: "162545258541262",
      StartDate: "2024-05-20",
      StartTime: "09:00 AM",
      LoadingDate: "2024-05-20",
      EndDate: "2024-05-21",
      EndTime: "05:00 PM",
      FromCity: "Gurgoan",
      ToCity: "Mumbai",
      VehicleType: "Truck",
      Size: "20ft",
      Body: "Closed",
      VehicleQuantity: "5",
      VehicleDetails: <h1>Upload Details</h1>,
      Rank: "L1",
      Status: "assigned",
      PricePerVehicle: "4000.0",
      info: <h1 style={{ borderBottom: "1px solid #00A6F6", width: "3vw" }}>View</h1>,
    },
    {
      SNo: "6",
      Company: "ABC Company",
      BidNumber: "162545258541262",
      StartDate: "2024-05-20",
      StartTime: "09:00 AM",
      LoadingDate: "2024-05-20",
      EndDate: "2024-05-21",
      EndTime: "05:00 PM",
      FromCity: "Gurgoan",
      ToCity: "Mumbai",
      VehicleType: "Truck",
      Size: "20ft",
      Body: "Closed",
      VehicleQuantity: "5",
      VehicleDetails: <h1>Upload Details</h1>,
      Rank: "L1",
      Status: "assigned",
      PricePerVehicle: "4000.0",
      info: <h1 style={{ borderBottom: "1px solid #00A6F6", width: "3vw" }}>View</h1>,
    },
    // Add more rows here as needed
  ];

  const subData = [
    { SNo: "vehicle 1", Details: "Add/Edit" },
    { SNo: "vehicle 2", Details: "Add/Edit" },
    { SNo: "vehicle 3", Details: "Add/Edit" },
    { SNo: "vehicle 4", Details: "Add/Edit" },
    { SNo: "vehicle 5", Details: "Add/Edit" },

  ];



  return (
    <div className="bg-gray-100 min-h-screen relative">
      <div className="relative top-5 left-5" style={{ width: "25vw" }}>
        <div className="relative bg-white rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-1 w-full border border-gray-300 rounded-full focus:outline-none focus:border-gray-100"
          />
          <CiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            style={{ width: "16px", height: "16px", color: "#000" }}
          />
        </div>
      </div>

      <div className="mt-10 mx-5">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-[#113870] text-white font-nunito">
              <th className="px-4 py-3 border-r border-[#113870] rounded-tl-lg">S No</th>
              <th className="px-4 py-3 border-r border-[#113870]">Company<br />Bid Number</th>
              <th className="px-4 py-3 border-r border-[#113870]">From city<br />To city</th>
              <th className="px-4 py-3 border-r border-[#113870]">VehicleType<br />Size,Body</th>
              <th className="px-4 py-3 border-r border-[#113870]">LoadingDate<br />VehicleQuantity</th>
              <th className="px-4 py-3 border-r border-[#113870]">Rank,price<br />Status</th>
              <th className="px-4 py-3 border-r border-[#113870]">Price/vehicle</th>
              <th className="px-4 py-3 border-r border-[#113870]">VehicleDetails</th>
              <th className="px-4 py-3 border-r border-[#113870] rounded-tr-lg">Info</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <tr className="border-b text-center font-semibold font-nunito cursor-pointer">
                  <td style={{ color: "#113870" }} className="px-4 py-3">{item.SNo}</td>
                  <td style={{ color: "#113870" }} className="px-4 py-3">{item.Company}<br /><span style={{ color: "#00A6F6" }} className="text-xs">{item.BidNumber}</span></td>
                  <td className="px-4 py-3 text-green-500">{item.FromCity}<br /><span className="text-red-500">{item.ToCity}</span></td>
                  <td style={{ color: "#113870" }} className="px-4 py-3">{item.VehicleType}, {item.Size}<br /><span style={{ color: "#00A6F6" }} >{item.Body}</span></td>
                  <td style={{ color: "#113870" }} className="px-4 py-3">{item.LoadingDate}<br /><span style={{ color: "#00A6F6" }}>{item.VehicleQuantity}</span></td>
                  <td style={{ color: "#113870" }} className="px-4 py-3">{item.Rank}<br /><span style={{ color: "#00A6F6" }}>{item.Status}</span></td>
                  <td style={{ color: "#113870" }} className="px-4 py-3">{item.PricePerVehicle}Rs</td>
                  <td style={{ color: "#113870" }} className="px-4" onClick={() => handleClick(index)}>
                    {item.VehicleDetails}
                  </td>
                  <td style={{ color: "#00A6F6" }} className="px-4 py-3">
                    {item.info}
                  </td>
                </tr>
                {openRowIndex === index && (
                  <tr key={`${index}-detail`} className="border-b">
                    <td colSpan="100%">
                      <div style={{ width: '90%', height: "40vh", backgroundColor: '#E7F7FF', marginLeft: "60px", borderRadius: "5px" }}>
                        <table className="min-w-full">
                          <thead>
                            <tr className="text-gray-500">
                              <th className="">S No</th>
                              <th className="">Vehicle No.</th>
                              <th className="">Driver Name</th>
                              <th className="">Driver Phone No.</th>
                              <th className="">Vehicle Reporting Time</th>
                              <th className="">Gps link</th>
                              <th className="">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subData.map((item, index) => (
                              <tr key={index} className="border-b text-center font-semibold font-nunito cursor-pointer">
                                <td style={{ color: "#113870" }} className="px-4 py-3">{item.SNo}</td>
                                <td style={{ color: "#113870" }} className="px-4 py-3"></td>
                                <td style={{ color: "#113870" }} className="px-4 py-3"></td>
                                <td style={{ color: "#113870" }} className="px-4 py-3"></td>
                                <td style={{ color: "#113870" }} className="px-4 py-3"></td>
                                <td style={{ color: "#113870" }} className="px-4 py-3"></td>
                                <td style={{ color: "#113870" }} className="px-4 py-3 flex flex-row ml-2" onClick={() => handleToggle(true)}>
                                  <MdEdit className="mt-2" />{item.Details}
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {isFormOpen && (
          <div style={{
            width: '20%',
            height: '60vh',
            backgroundColor: '#FFFFFF',
            marginLeft: '27rem',
            borderRadius: '5px',
            marginTop: '-750px',
            position: 'relative',
            zIndex: 1010,
            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          }}>
            <div className="mt-10">
              <h1 className="text-blue-900 text-center font-nunito font-semibold text-lg">Vehicle Details</h1>
            </div>
            <div className="h-[50vh] flex flex-col justify-center items-center gap-4 mt-2">
              <input
                type="text"
                placeholder="Vehicle Number"
                className="w-[250px] h-[40px] px-2 rounded border border-gray-300 focus:outline-none bg-gray-100"
              />
              <input
                type="text"
                placeholder="Driver Name"
                className="w-[250px] h-[40px] px-2 rounded border border-gray-300 focus:outline-none bg-gray-100"
              />
              <input
                type="text"
                placeholder="Driver Phone Number"
                className="w-[250px] h-[40px] px-2 rounded border border-gray-300 focus:outline-none bg-gray-100"
              />
              <input
                type="text"
                placeholder="GPS Link"
                className="w-[250px] h-[40px] px-2 rounded border border-gray-300 focus:outline-none bg-gray-100"
              />
              <input
                type="text"
                placeholder="Time"
                className="w-[250px] h-[40px] px-2 rounded border border-gray-300 focus:outline-none bg-gray-100"
              />
              <input
                type="text"
                placeholder="Remark"
                className="w-[250px] h-[40px] px-2 rounded border border-gray-300 focus:outline-none bg-gray-100"
              />
              <button

                className="w-[250px] h-[40px] text-white bg-blue-900 font-semibold px-2 rounded text-xl"
              >Submit</button>
            </div>


          </div>
        )}
      </div>
    </div >
  );
};

export default AssignedReqOne;
