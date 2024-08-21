import React, { useState } from "react";
import { MdAttachFile } from "react-icons/md";

const PodOne = () => {
  const [activeButton, setActiveButton] = useState("Pending POD");
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingData, setPendingData] = useState([
    {
      serialNo: 1,
      cnBiltyGRNumber: "CN001",
      vehicleNumber: "AB1234",
      companyName: "Company A",
      selectFiles: null,
      action: "Upload",
    },
    {
      serialNo: 2,
      cnBiltyGRNumber: "CN002",
      vehicleNumber: "CD5678",
      companyName: "Company B",
      selectFiles: null,
      action: "Upload",
    },
    {
      serialNo: 3,
      cnBiltyGRNumber: "CN003",
      vehicleNumber: "EF9012",
      companyName: "Company C",
      selectFiles: null,
      action: "Upload",
    },
    {
      serialNo: 4,
      cnBiltyGRNumber: "CN004",
      vehicleNumber: "GH3456",
      companyName: "Company D",
      selectFiles: null,
      action: "Upload",
    },
    {
      serialNo: 5,
      cnBiltyGRNumber: "CN005",
      vehicleNumber: "IJ7890",
      companyName: "Company E",
      selectFiles: null,
      action: "Upload",
    },
  ]);

  const podHistoryData = [
    {
      serialNo: 1,
      cnBiltyGRNumber: "CN001",
      vehicleNumber: "AB1234",
      companyName: "Company A",
      selectFiles: "file",
      uploaddate: "12/12/2024",
    },
    {
      serialNo: 2,
      cnBiltyGRNumber: "CN002",
      vehicleNumber: "CD5678",
      companyName: "Company B",
      selectFiles: "file",
      uploaddate: "12/12/2024",
    },
    {
      serialNo: 3,
      cnBiltyGRNumber: "CN003",
      vehicleNumber: "EF9012",
      companyName: "Company C",
      selectFiles: "file",
      uploaddate: "12/12/2024",
    },
    {
      serialNo: 4,
      cnBiltyGRNumber: "CN004",
      vehicleNumber: "GH3456",
      companyName: "Company D",
      selectFiles: "file",
      uploaddate: "12/12/2024",
    },
    {
      serialNo: 5,
      cnBiltyGRNumber: "CN005",
      vehicleNumber: "IJ7890",
      companyName: "Company E",
      selectFiles: "file",
      uploaddate: "12/12/2024",
    },
  ];

  const buttons = [{ label: "Pending POD" }, { label: "POD History" }];

  const handleFileSelect = (index, event) => {
    const newData = [...pendingData];
    newData[index].selectFiles = event.target.files[0];
    setPendingData(newData);
  };

  const renderForm = () => {
    switch (activeButton) {
      case "Pending POD":
        return (
          <div
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
            className="w-[95%] bg-white h-auto border-t-0.5 border-gray-300 rounded-xl mt-10 mx-5 mb-10"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-[#113870] text-white font-nunito">
                  <th className="px-4 py-3 border-r border-[#113870] rounded-tl-lg">
                    S No
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870]">
                    CN/Bilty/GRNumber
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870]">
                    Vehicle Number
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870]">
                    Company Name
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870]">
                    Select Files
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870] rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingData.map((item, index) => (
                  <tr
                    className="text-md border-dashed border-b justify-start text-center font-nunito"
                    key={index}
                  >
                    <td className="px-4 py-2 text-blue-900">{item.serialNo}</td>
                    <td className="px-4 py-2 text-blue-900">
                      {item.cnBiltyGRNumber}
                    </td>
                    <td className="px-4 py-2 text-blue-900">
                      {item.vehicleNumber}
                    </td>
                    <td className="px-4 py-2 text-blue-900">
                      {item.companyName}
                    </td>
                    <td className="px-4 py-2 text-blue-900">
                      <div className="flex items-center ml-20">
                        <MdAttachFile className="mr-2" />
                        <input
                          type="file"
                          onChange={(e) => handleFileSelect(index, e)}
                          className="hidden"
                          id={`fileInput-${index}`}
                        />
                        <label
                          htmlFor={`fileInput-${index}`}
                          className="cursor-pointer"
                        >
                          {item.selectFiles
                            ? item.selectFiles.name
                            : "Select Files"}
                        </label>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-blue-900">
                      <button className="bg-blue-900 text-white px-4 py-2 rounded-md">
                        {item.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "POD History":
        return (
          <div
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
            className="w-[95%] bg-white h-auto border-t-0.5 border-gray-300 rounded-xl mt-10 mx-5 mb-10"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-[#113870] text-white font-nunito">
                  <th className="px-4 py-3 border-r border-[#113870] rounded-tl-lg">
                    S No
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870]">
                    CN/Bilty/GRNumber
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870]">
                    Vehicle Number
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870]">
                    Company Name
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870]">
                    View Files
                  </th>
                  <th className="px-4 py-3 border-r border-[#113870] rounded-tr-lg">
                    Upload Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {podHistoryData.map((item, index) => (
                  <tr
                    className="text-md border-dashed border-b justify-start text-center font-nunito"
                    key={index}
                  >
                    <td className="px-4 py-2 text-blue-900">{item.serialNo}</td>
                    <td className="px-4 py-2 text-blue-900">
                      {item.cnBiltyGRNumber}
                    </td>
                    <td className="px-4 py-2 text-blue-900">
                      {item.vehicleNumber}
                    </td>
                    <td className="px-4 py-2 text-blue-900">
                      {item.companyName}
                    </td>
                    <td className="px-4 py-2 text-blue-900 ">
                      <div className="flex items-center text-blue-500 ml-20">
                        <MdAttachFile className="mr-2" />
                        {item.selectFiles}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-blue-900">
                      {item.uploaddate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen justify-start items-start relative">
      <div className="w-full h-[10vh] mt-5 flex justify-between items-center px-5">
        <div className="flex space-x-5">
          {buttons.map((button) => (
            <button
              key={button.label}
              className={`px-3 py-2 rounded-md ${
                activeButton === button.label
                  ? "bg-blue-900 text-white"
                  : "border border-blue-900 text-blue-900"
              }`}
              onClick={() => setActiveButton(button.label)}
            >
              {button.label}
            </button>
          ))}
        </div>
        {activeButton === "POD History" && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-[25%] h-[5vh] border rounded-3xl focus:outline-none bg-gray-100 px-2 mr-20"
          />
        )}
      </div>
      {renderForm()}
    </div>
  );
};

export default PodOne;
