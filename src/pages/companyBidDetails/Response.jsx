import React, { useEffect, useState } from "react";
import { useBidData } from "../../HelperFunction/api";
import { useSelector } from "react-redux";
import Assignpop from "../customPopUp/Assignpop";
import CouterPop from "../customPopUp/CouterPop";

const Response = ({ rowData, onSuccess }) => {
  const user = useSelector((state) => state.login.user);
  const { liveBidData, vendorDetail } = useBidData();
  const [vendorIds, setVendorIds] = useState([]);
  const [price, setPrice] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [showCounterPopup, setShowCounterPopup] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [rank, setRank] = useState("");
  const handleAssignClick = (vendor, price, index) => {
    setSelectedVendor(vendor);
    setSelectedPrice(price);
    setRank(index);
    setShowAssignPopup(true);
  };

  const handleCounterClick = (vendor) => {
    setSelectedVendor(vendor);
    setShowCounterPopup(true);
  };

  const handleCancel = () => {
    setShowAssignPopup(false);
    setShowCounterPopup(false);
    setSelectedPrice("");
    setRank("");
  };

  useEffect(() => {
    const biddingResponse = liveBidData?.data.find((data) =>
      data.bidding_response.some((response) => response.bid_id === rowData._id)
    );
    if (biddingResponse) {
      const biddingResponseItem = biddingResponse.bidding_response.find(
        (response) => response.bid_id === rowData._id
      );
      setVendorIds(biddingResponseItem.vendor_id);
      setPrice(biddingResponseItem.bidding_price);
    }
  }, [liveBidData, rowData._id]);

  useEffect(() => {
    if (vendorIds.length > 0 && vendorDetail) {
      const updatedVendorData = vendorDetail
        .map((curr) => curr.data)
        .filter((Current) => vendorIds.includes(Current._id));

      setVendorData(updatedVendorData);
    }
  }, [vendorDetail, vendorIds]);

  return (
    <>
      <div className="pl-5 pr-5 p-2">
        <div className="bg-[#e7f7ff] rounded pb-2">
          <table className="min-w-full">
            <thead>
              {vendorData && vendorData.length > 0 ? (
                <tr>
                  <th className="px-4 py-2 text-gray-500 font-semibold">
                    Position
                  </th>
                  <th className="px-4 py-2 text-gray-500 font-semibold">
                    Vendor Code
                  </th>
                  <th className="px-4 py-2 text-gray-500 font-semibold">
                    Vendor Name
                  </th>
                  <th className="px-4 py-2 text-gray-500 font-semibold">
                    Address
                  </th>
                  <th className="px-4 py-2 text-gray-500 font-semibold">
                    Phone Number1
                  </th>
                  <th className="px-4 py-2 text-gray-500 font-semibold">
                    Phone Number2
                  </th>
                  <th className="px-4 py-2 text-gray-500 font-semibold">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-gray-500 font-semibold">
                    Action
                  </th>
                </tr>
              ) : (
                <tr>
                  <td colSpan={12}></td>
                </tr>
              )}
            </thead>
            <tbody>
              {vendorData && vendorData.length > 0 ? (
                vendorData.map((item, index) => {
                  const comIndx = item?.company_id.indexOf(user?.id);
                  const code = comIndx !== -1 ? item.code[comIndx] : "NA";

                  return (
                    <React.Fragment key={index}>
                      <tr className="font-semibold" colSpan="12">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{code}</td>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.address}</td>
                        <td className="px-4 py-2">{item.phone}</td>
                        <td className="px-4 py-2">{item.supervisor_phone1}</td>
                        <td className="px-4 py-2">{price[index]}</td>
                        <td className="flex justify-center gap-5">
                          <button
                            className=" text-[#113870] px-1 py-1 rounded-xl"
                            onClick={() =>
                              handleAssignClick(item, price[index], index + 1)
                            }
                          >
                            Assign
                          </button>
                          <button
                            className=" text-[#00a6f6] px-1 py-1 rounded-xl"
                            onClick={() => handleCounterClick(item)}
                          >
                            Counter
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="12">Data not found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showAssignPopup && selectedVendor && (
        <Assignpop
          onCancel={handleCancel}
          rowData={selectedVendor}
          bid={rowData}
          price={selectedPrice}
          rank={rank}
        />
      )}
      {showCounterPopup && selectedVendor && (
        <CouterPop
          onCancel={handleCancel}
          rowData={selectedVendor}
          bid={rowData}
        />
      )}
    </>
  );
};

export default Response;
