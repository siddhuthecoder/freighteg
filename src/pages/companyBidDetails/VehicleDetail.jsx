import React, { useEffect, useState } from "react";
import { useResultData } from "../../HelperFunction/api";
const VehicleDetail = ({ rowData }) => {
  const { resultBidData } = useResultData();
  const [vendorData, setVendorData] = useState([]);
  useEffect(() => {
    if (resultBidData && rowData._id) {
      const ResponseItem = resultBidData
        .map((curr) => curr)
        .filter((Current) => rowData._id.includes(Current.bid_id));
      setVendorData(ResponseItem);
    }
  }, [resultBidData, rowData._id]);
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };
  return (
    <div className="pl-5 pr-5 p-2">
      <div className="bg-[#e7f7ff] rounded pb-2">
        <table className="min-w-full">
          <thead>
            {vendorData.length > 0 &&
            vendorData[0].vehicleDetails?.length > 0 ? (
              <tr className="text-[#888888] text-center" colspan={12}>
                <th className="font-normal">S NO.</th>
                <th className="font-normal">Vehicle Number</th>
                <th className="font-normal">Driver Name</th>
                <th className="font-normal">Driver Number</th>
                <th className="font-normal">GPS Link</th>
                <th className="font-normal">Reporting Time</th>
                <th className="font-normal">Remarks</th>
              </tr>
            ) : (
              <tr>
                <th colspan={12}></th>
              </tr>
            )}
          </thead>
          {vendorData.length > 0 && vendorData[0].vehicleDetails?.length > 0 ? (
            vendorData.map((vendor, vendorIndex) =>
              vendor.vehicleDetails.map((item, index) => {
                return (
                  <React.Fragment key={item._id}>
                    <tr className="">
                      <td className="py-2">{index + 1}.</td>
                      <td className="py-2">{item.vehicleNo}</td>
                      <td className="py-2">{item.driverName}</td>
                      <td className="py-2">{item.driverPhone}</td>
                      <td className="py-2">{item.gpsLink}</td>
                      <td className="py-2">{item.reportingTime}</td>
                      <td className="py-2">{truncateText(item.remarks, 13)}</td>
                    </tr>
                  </React.Fragment>
                );
              })
            )
          ) : (
            <tr>
              <td colspan={12} className="pt-2">
                No Data Found.
              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};

export default VehicleDetail;
