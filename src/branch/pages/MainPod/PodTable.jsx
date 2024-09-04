import React, { useEffect, useState } from "react";
import { useGetPodByCompany } from "../../HelperFunction/api";
import { format, toZonedTime } from "date-fns-tz";
import { MdOutlineFileDownload, MdRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import Imagepopup from "../customPopUp/Imagepopup";
import Confirmationpopup from "../customPopUp/Confirmationpopup";
import { updatePODdata } from "../../HelperFunction/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PodTable = () => {
  const {
    getPodData = [],
    getPodLoading,
    getPodError,
    vendorData = [],
    refetchAll,
  } = useGetPodByCompany();

  const [viewImage, setViewImage] = useState({ show: false, imageUrl: "" });
  const [confirmationPopup, setConfirmationPopup] = useState({
    show: false,
    action: "",
    itemId: null,
  });
  const [selectedActions, setSelectedActions] = useState({});
  const [podCount, setPODCount] = useState(0);
  const [receivedCount, setReceivedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (getPodData) {
      const documentsReceived = getPodData.filter(
        (item) => item.documents && item.documents.length > 0
      );
      const documentsPending = getPodData.filter(
        (item) => !item.documents || item.documents.length === 0
      );
      setPODCount(getPodData.length);
      setReceivedCount(documentsReceived.length);
      setPendingCount(documentsPending.length);
    }
  }, [getPodData]);

  const getVendorName = (vendor_id) => {
    if (!vendorData || vendorData.length === 0) return "Unknown Vendor";
    const vendor = vendorData.find((vendor) => vendor?.data?._id === vendor_id);
    return vendor?.data?.name || "Unknown Vendor";
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
      const fileExtension = url.split(".").pop().toLowerCase();
      link.download = `downloaded_image.${fileExtension}`;
    } else if (isPDF) {
      link.download = "document.pdf";
    } else {
      console.log("File extension is not defined");
    }
    link.click();
    URL.revokeObjectURL(urlBlob);
  };

  const updatePODMutation = useMutation({
    mutationFn: updatePODdata,
    onSuccess: () => {
      refetchAll();
    },
    onError: () => {
      alert("Something went wrong...");
    },
  });

  const handleAction = (action, itemId) => {
    setConfirmationPopup({ show: true, action, itemId });
  };

  const handleSelectChange = (e, itemId) => {
    const action = e.target.value;
    setSelectedActions((prevActions) => ({
      ...prevActions,
      [itemId]: action,
    }));
    if (action) {
      handleAction(action, itemId);
    }
  };

  const confirmAction = () => {
    setSelectedActions((prevActions) => ({
      ...prevActions,
      [confirmationPopup.itemId]: confirmationPopup.action,
    }));
    setConfirmationPopup({ show: false, action: "", itemId: null });
    let dataToUpdate = {};
    if (confirmationPopup.action === "approved") {
      dataToUpdate = {
        approved: true,
      };
    } else if (confirmationPopup.action === "reassign") {
      dataToUpdate = {
        submitted: false,
        documents: [],
      };
    }
    updatePODMutation.mutate({
      id: confirmationPopup.itemId,
      data: dataToUpdate,
    });
  };

  const cancelAction = () => {
    setConfirmationPopup({ show: false, action: "", itemId: null });
    setSelectedActions((prevActions) => ({
      ...prevActions,
      [confirmationPopup.itemId]: "",
    }));
  };

  return (
    <div className="bg-gray-100 p-5 font-sans">
      <div className="flex gap-4 mb-4">
        <div className="bg-gray-100 rounded-lg shadow p-2">
          <p className="text-sm font-semibold">
            Requested POD ({podCount || 0})
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg shadow p-2">
          <p className="text-sm font-semibold text-green-600">
            Received ({receivedCount || 0})
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg shadow p-2">
          <p className="text-sm font-semibold text-red-600">
            Pending ({pendingCount || 0})
          </p>
        </div>
      </div>

      <div className=" bg-white rounded-lg shadow overflow-hidden">
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
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {getPodData && getPodData.length > 0 ? (
                getPodData.map((item, index) => (
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
                      {getVendorName(item.vendor_id)}
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
                          <MdRemoveRedEye className="h-5 w-5" />
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
                    <td className="py-3 px-4">
                      <select
                        className="border rounded-md p-2 text-gray-700 bg-gray-100 hover:border-gray-400 transition duration-150 ease-in-out"
                        value={selectedActions[item._id] || ""}
                        onChange={(e) => handleSelectChange(e, item._id)}
                      >
                        <option value="">Select</option>
                        <option value="approved">Approved</option>
                        <option value="reassign">Reassign</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-4 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmationpopup for action confirmation */}
      {confirmationPopup.show && (
        <Confirmationpopup
          action={confirmationPopup.action}
          onConfirm={confirmAction}
          onCancel={cancelAction}
        />
      )}

      {/* Imagepopup for viewing images */}
      {viewImage.show && (
        <Imagepopup
          imageUrl={viewImage.imageUrl}
          onClose={() => setViewImage({ show: false, imageUrl: "" })}
        />
      )}
    </div>
  );
};

export default PodTable;
