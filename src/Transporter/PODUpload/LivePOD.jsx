import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { format, toZonedTime } from "date-fns-tz";

const LivePOD = ({ pendingPODs, handleDownload, setViewImage }) => {

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

  return (
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
            {pendingPODs && pendingPODs.length > 0 ? (
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
  );
};

export default LivePOD;
