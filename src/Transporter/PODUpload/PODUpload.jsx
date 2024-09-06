import React, { useState, useEffect } from 'react';
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './PODUpload.css'; // Import the CSS file for styles
import { FaEdit } from "react-icons/fa";
import { FaUserPlus, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { format, toZonedTime } from "date-fns-tz";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import Imagepopup  from '../../pages/customPopUp/Imagepopup';


const PODUpload = () => {
  const user = useSelector((state) => state.login.user);
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingPODs, setPendingPODs] = useState([]);
  const [historyPODs, setHistoryPODs] = useState([]); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewImage, setViewImage] = useState({ show: false, imageUrl: "" });


  useEffect(() => {
    if (user) {
      axios.get(`https://freighteg.in/freightapi/pod/pending/${user?.id}`)
        .then((response) => setPendingPODs(response.data.pods))
        .catch((error) => console.error(error));

      axios.get(`https://freighteg.in/freightapi/pod/history/${user?.id}`)
        .then((response) => setHistoryPODs(response.data.pods))
        .catch((error) => console.error(error));
    }
  }, [user]);

  const handleFileUpload = (podId, event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log(`Uploading file for POD ID: ${podId}`);
    }
  };



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


  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
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

  console.log(pendingPODs)

  return (
    <>
      <TransportNavBar />
      <div className="pod-upload-container">
      <div className="flex gap-8 my-2">
          <div
            onClick={() => setActiveTab("pending")}
            className={`cursor-pointer ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
          >
            Live POD
          </div>
          <div
            to="/branch/podform"
            className={`cursor-pointer ${
              activeTab === "history"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
            onClick={() => setActiveTab("history")}
          >
            History POD
          </div>
        </div>

        {activeTab === 'pending' && (
          <div className="container mx-auto p-4">
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
                <th className="py-3 px-4 text-left">Upload</th>
              </tr>
            </thead>
            <tbody>
              {pendingPODs &&
              pendingPODs &&
              pendingPODs.length > 0 ? (
                pendingPODs.map((item, index) => (
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
                        <span>Upload</span>
                        <MdOutlineFileUpload className="h-5 w-5" />
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
        )}

        {activeTab === 'history' && (
          <div className="container mx-auto p-4">
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
                <th className="py-3 px-4 text-left">Upload</th>
              </tr>
            </thead>
            <tbody>
              {historyPODs &&
              historyPODs &&
              historyPODs.length > 0 ? (
                historyPODs.map((item, index) => (
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
        )}

        {selectedImage && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <img src={selectedImage} alt="POD Document" />
            </div>
          </div>
        )}
      </div>
      {viewImage.show && (
        <Imagepopup
          imageUrl={viewImage.imageUrl}
          onClose={() => setViewImage({ show: false, imageUrl: "" })}
        />
      )}
    </>
  );
};

export default PODUpload;
