import React, { useEffect, useState } from "react";
import { useResultData } from "../../HelperFunction/api";
import { useSelector } from "react-redux";
const ViewResponse = ({ id }) => {
  const user = useSelector((state) => state.login.user);
  const { vendorDetail, resultBidData } = useResultData();
  const [vendorData, setVendorData] = useState([]);
  useEffect(() => {
    const resultBid = resultBidData?.find((bid) => bid.bid_id === id) || [];
    if (resultBid) {
      const ResponseItem = vendorDetail
        .map((curr) => curr.data)
        .filter((Current) => resultBid.vendor_id?.includes(Current._id));
      setVendorData(ResponseItem);
    }
  }, [resultBidData, id]);

  return (
    <div className="pl-5 pr-5 p-2">
      <div className="bg-[#e7f7ff] rounded pb-2">
        <table className="min-w-full">
          <thead>
            {vendorData && vendorData.length > 0 ? (
              <tr className="text-[#888888] text-center" colspan={12}>
                <th className="font-normal">Rank</th>
                <th className="font-normal">Vendor Code</th>
                <th className="font-normal">Vendor Name</th>
                <th className="font-normal">Address</th>
                <th className="font-normal">Phone Number 1</th>
                <th className="font-normal">Bid Amount/Vehicle</th>
              </tr>
            ) : (
              <tr>
                <th colspan={12}></th>
              </tr>
            )}
          </thead>
          {vendorData && vendorData.length > 0 ? (
            vendorData?.map((item, index) => {
              const comIndx = item?.company_id.indexOf(user?.id);
              const code = comIndx !== -1 ? item.code[comIndx] : "NA";
              const resultBid =
                resultBidData?.find((bid) => bid.bid_id === id) || [];
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      {resultBid?.vendorRank === 199
                        ? "Counter Accepted"
                        : resultBid?.vendorRank}
                    </td>
                    <td>{code}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                    <td>{resultBid.vendorPrice}</td>
                  </tr>
                </React.Fragment>
              );
            })
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

export default ViewResponse;
