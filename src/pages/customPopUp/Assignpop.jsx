import React, { useCallback } from "react";
import "../../css/Assignvendor.css";
import { AssignMutation } from "../../HelperFunction/api";
import { useMutation } from "@tanstack/react-query";

const Assignpop = ({ onCancel, rowData, bid, price, rank }) => {
  // console.log("id ", rowData._id, bid._id, price, rank);
  const postData = useMutation({
    mutationFn: AssignMutation,
    onSuccess: () => {
      alert(`Vendor is assigned`);
    },
  });
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (rowData && bid) {
          postData.mutate({
            bid_id: bid._id,
            vendor_id: rowData._id,
            vendorPrice: price.toString(),
            vendorRank: rank.toString(),
          });
        }
      } catch (error) {
        console.log("Error occurred while posting data: ", error);
      }
      onCancel();
    },
    [postData, rowData._id, bid._id]
  );

  return (
    <div className="custompopup">
      <div className="popupcontent">
        <p>Are you sure you want to assign to this vendor?</p>
        <div className="flex gap-10 justify-center mt-5">
          <button className="okbutton" onClick={handleSubmit}>
            Yes
          </button>
          <button className="okbutton" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assignpop;
