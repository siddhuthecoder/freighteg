import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaUserPlus, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { format, toZonedTime } from "date-fns-tz";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetVendorByCompany,
  useGetPodHistoryByCompany,
} from "../HelperFunction/api";
import Imagepopup from "./customPopUp/Imagepopup";
import PodAddForm from "./PodAddForm";

const PodForm = () => {
  const { getVendorData, getVendorLoading, getVendorError } =
    useGetVendorByCompany();
  const {
    getPodHistory,
    getPodHistoryLoading,
    getPodHistoryError,
    refetchHistoryPodData,
  } = useGetPodHistoryByCompany();

  const [userOptions, setUserOptions] = useState([]);
  const [showPodAddForm, setShowPodAddForm] = useState(false);
  const [viewImage, setViewImage] = useState({ show: false, imageUrl: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (getVendorData && Array.isArray(getVendorData)) {
      const newOptions = getVendorData.map((vendor) => ({
        value: vendor._id,
        label: vendor.name,
      }));
      setUserOptions(newOptions);
    }
  }, [getVendorData]);

  const utcToIndianDate = (utcDate) => {
    const timeZone = "Asia/Kolkata";
    const zonedDate = toZonedTime(new Date(utcDate), timeZone);
    return format(zonedDate, "dd/MM/yyyy", { timeZone });
  };

  const utcToIndianTime = (utcDate) => {
    const timeZone = "Asia/Kolkata";
    const zonedDate = toZonedTime(new Date(utcDate), timeZone);
    return format(zonedDate, "hh:mm a", { timeZone });
  };

  const handleDownload = async (url) => {
    const fileExtension = url.split(".").pop().toLowerCase();
    const isImage = fileExtension.match(/(jpeg|jpg|png)$/i) !== null;
    const isPDF = fileExtension.match(/pdf$/i) !== null;
    const response = await fetch(url);
    const blob = await response.blob();
    const urlBlob = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlBlob;
    if (isImage) {
      link.download = `downloaded_image.${fileExtension}`;
    } else if (isPDF) {
      link.download = "document.pdf";
    } else {
      console.log("File extension is not defined");
    }
    link.click();
    URL.revokeObjectURL(urlBlob);
  };

  if (getVendorLoading)
    return (
      <div className="p-5 text-center text-xl font-semibold">Loading...</div>
    );
  if (getVendorError)
    return (
      <div className="p-5 text-center text-xl font-semibold text-red-600">
        Something went wrong!
      </div>
    );

  return (
    <div className="p-5 font-sans min-h-screen bg-gray-100">
      <div className="sticky top-20  bg-gray-100 ">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-8">
            <Link
              to="/allpodrequest"
              className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Live POD
            </Link>
            <Link
              to="#"
              className="text-blue-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-blue-600"
            >
              History POD
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
              />
            </div>
            <button
              onClick={() => setShowPodAddForm(true)}
              className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              <FaUserPlus className="mr-2" />
              <span>Request POD</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 px-4 text-left">S No.</th>
                <th className="py-3 px-4 text-left">POD Requested Date</th>
                <th className="py-3 px-4 text-left">LR / GR /Bity Number</th>
                <th className="py-3 px-4 text-left">Vehicle Number</th>
                <th className="py-3 px-4 text-left">Vehicle Loading Date</th>
                <th className="py-3 px-4 text-left">Vendor Code & Name</th>
                <th className="py-3 px-4 text-left">Action</th>
                <th className="py-3 px-4 text-left">Download</th>
              </tr>
            </thead>
            <tbody>
              {getPodHistory &&
              getPodHistory.pods &&
              getPodHistory.pods.length > 0 ? (
                getPodHistory.pods.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="py-3 px-4">{index + 1}.</td>
                    <td className="py-3 px-4">
                      {utcToIndianDate(item.createdAt)}
                      <br />
                      {utcToIndianTime(item.createdAt)}
                    </td>
                    <td className="py-3 px-4">{item.lrNumber}</td>
                    <td className="py-3 px-4">{item.vehicleNumber}</td>
                    <td className="py-3 px-4">
                      {utcToIndianDate(item.loadingDate)}
                    </td>
                    <td className="py-3 px-4">
                      {item.vendorCode}
                      <br />
                      {item.vendorName}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className={`flex items-center gap-1 text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out ${
                          item.documents.some((doc) =>
                            /\.(jpeg|jpg|png)$/i.test(doc)
                          )
                            ? ""
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={() =>
                          setViewImage({
                            show: true,
                            imageUrl: item.documents[0],
                          })
                        }
                        disabled={
                          item.documents.length === 0 ||
                          item.documents.some((doc) => /\.pdf$/i.test(doc))
                        }
                      >
                        <span>View</span>
                        {item.documents.some((doc) =>
                          /\.(jpeg|jpg|png)$/i.test(doc)
                        ) ? (
                          <FaRegEye className="h-5 w-5" />
                        ) : (
                          <FaRegEyeSlash className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className={`flex items-center gap-1 text-white py-1 px-3 rounded transition duration-150 ease-in-out ${
                          item.documents.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-900"
                        }`}
                        disabled={item.documents.length === 0}
                        onClick={() => handleDownload(item.documents[0])}
                      >
                        <span>Download</span>
                        <MdOutlineFileDownload className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPodAddForm && (
        <PodAddForm onClose={() => setShowPodAddForm(false)} />
      )}
      {viewImage.show && (
        <Imagepopup
          imageUrl={viewImage.imageUrl}
          onClose={() => setViewImage({ show: false, imageUrl: "" })}
        />
      )}
    </div>
  );
};

export default PodForm;
