import React, { useCallback, useState } from "react";
import "../../css/Counter.css";
import { CounterMutation } from "../../HelperFunction/api";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const CounterPop = ({ onCancel, rowData, bid }) => {
  const user = useSelector((state) => state.login.user);
  // console.log("counterPopup", rowData.name, bid.bidNo);
  const [price, setPrice] = useState("");
  const [showInput, setShowInput] = useState(false);
  const handleInputChange = (event) => {
    setPrice(event.target.value);
  };
  const handleClick = () => {
    setShowInput(true);
  };
  const mutationCounter = useMutation({
    mutationFn: CounterMutation,
    onSuccess: () => {
      alert(`Entered price: ${price}`);
      setPrice("");
    },
  });
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        alert("Please enter a valid positive number for the price.");
        return;
      }
      try {
        if (parsedPrice) {
          mutationCounter.mutate({
            company_id: user?.id,
            vendor_id: rowData._id,
            counter_price: parsedPrice,
            bid_id: bid._id,
          });
        }
      } catch (error) {
        console.log("Error occurred while posting data: ", error);
      }
      onCancel();
    },
    [price, mutationCounter, user?.id, rowData._id, bid._id, onCancel]
  );

  return (
    <div className="custompopup">
      <div className="popupcontent">
        {!showInput ? (
          <p>
            Are you sure you want to assign bid {bid.bidNo} to vendor{" "}
            {rowData.name}?
          </p>
        ) : (
          <p className="text-white">
            Enter Your Counter Price for this bid {bid.bidNo}
          </p>
        )}
        <div className="flex gap-10 justify-center mt-5">
          {!showInput && (
            <>
              <button className="okbutton" onClick={handleClick}>
                Yes
              </button>
              <button className="okbutton" onClick={onCancel}>
                No
              </button>
            </>
          )}
        </div>
        {showInput && (
          <div>
            <div className="flex flex-col gap-3 mt-1">
              <input
                type="text"
                placeholder="Enter the Price"
                value={price}
                onChange={handleInputChange}
                className="rounded p-3 text-black"
              />
              <div className="flex justify-center gap-8">
                <button className="okbutton rounded" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="okbutton" onClick={onCancel}>
                  Cancle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterPop;
