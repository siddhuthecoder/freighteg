import React, { useState, useEffect } from "react";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import "../../css/Bidvendor.css";
import { useBidData, useTransporterData } from "../../HelperFunction/api";

const BidVendor = ({ isOpen, Data }) => {
  const { liveBidData, bidDetails } = useBidData();
  const [isVisible, setIsVisible] = useState(isOpen);
  const { transporterData, transporterLoading, transporterError } =
    useTransporterData(Data.assigned_transporter);
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);
  const closePopup = () => {
    setIsVisible(false);
  };
  const vendorIds = [
    ...new Set(
      liveBidData?.data.flatMap((bid) =>
        bid.bidding_response.flatMap((response) => response.vendor_id)
      )
    ),
  ];
  console.log(vendorIds);
  const getStatus = (transporterId) => {
    return vendorIds.includes(transporterId) ? (
      <IoCheckmarkSharp style={{ color: "green" }} />
    ) : (
      <IoClose style={{ color: "red" }} />
    );
  };

  if (transporterLoading) return <h1>Loading Data....</h1>;
  if (transporterError) return <h1>Error: Vendor not available</h1>;

  return (
    <>
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <div className="flex justify-end">
                <IoClose
                  onClick={closePopup}
                  className="close-icon w-8 h-8 text-[#737373]"
                />
              </div>
              <div className="popup-scroll-content">
                <table className="popup-header text-center w-full font-semibold pt-2">
                  <thead className="bg-gray-100 text-center">
                    <tr>
                      <th className="px-4 py-2">Assign Vendor</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transporterData && transporterData.length > 0 ? (
                      transporterData?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="border px-4 py-2">
                              {item.data.name}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              <div className="flex justify-center">
                                {getStatus(item.data._id)}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr colspan={12}>
                        <td>Assign Data not found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BidVendor;
