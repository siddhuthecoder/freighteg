import React, { useState, useEffect } from "react";
import "../../css/VendorState.css";
import { statesAndUnionTerritoriesOfIndia } from "./State";
import { useLocation } from "react-router-dom";
import { useGetAllVendor } from "../../HelperFunction/api";

const VendorState = ({ formData, setFormData, panData }) => {
  const location = useLocation();
  const fromViewState = location.state?.fromViewState || false;
  const vendorId = location.state?.vendor_id || null;
  const { getAllVendorLoading, getAllVendorError, getVendorById } =
    useGetAllVendor();
  const [selectedStates, setSelectedStates] = useState(
    statesAndUnionTerritoriesOfIndia.map((state) => ({
      name: state,
      source: false,
      dest: false,
    }))
  );

  useEffect(() => {
    (async () => {
      if (fromViewState && vendorId) {
        try {
          const data = await getVendorById(vendorId);
          if (data && data.operation_states) {
            const updatedStates = selectedStates.map((state) => {
              const matchingState = data.operation_states.find(
                (opState) => opState.name === state.name
              );
              return matchingState
                ? {
                    ...state,
                    source: matchingState.source,
                    dest: matchingState.dest,
                  }
                : state;
            });
            setSelectedStates(updatedStates);
          }
        } catch (error) {
          console.error("Error occurred while fetching vendor data:", error);
        }
      }
    })();
  }, [fromViewState, vendorId]);

  // useEffect(() => {
  //   (async () => {
  //     if (panData) {
  //       try {
  //         const data = await panData;
  //         if (data && data.operation_states) {
  //           const updatedStates = selectedStates.map((state) => {
  //             const matchingState = data.operation_states.find(
  //               (opState) => opState.name === state.name
  //             );
  //             return matchingState
  //               ? {
  //                   ...state,
  //                   source: matchingState.source,
  //                   dest: matchingState.dest,
  //                 }
  //               : state;
  //           });
  //           setSelectedStates(updatedStates);
  //         }
  //       } catch (error) {
  //         console.error("Error occurred while fetching vendor data:", error);
  //       }
  //     }
  //   })();
  // }, [panData]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      operation_states: selectedStates.filter(
        (state) => state.name !== "All State"
      ),
    }));
  }, [selectedStates, setFormData]);

  const handleCheckboxChange = (index, type) => {
    let newSelectedStates;
    if (index === 0) {
      const newValue = !selectedStates[0][type];
      newSelectedStates = selectedStates.map((state) => ({
        ...state,
        [type]: newValue,
      }));
    } else {
      newSelectedStates = selectedStates.map((state, idx) => {
        if (idx === index) {
          return { ...state, [type]: !state[type] };
        }
        return state;
      });

      const allSelected = newSelectedStates
        .slice(1)
        .every((state) => state[type]);
      newSelectedStates[0] = { ...newSelectedStates[0], [type]: allSelected };
    }

    setSelectedStates(newSelectedStates);
  };
  // console.log("code check", fromViewState, vendorId);
  if (getAllVendorLoading) return <h1>Data is Fetching...</h1>;
  if (getAllVendorError) return <h1>Error: {getAllVendorError.message}</h1>;

  return (
    <div className="p-1 bg-gray-100 pl-9 rounded-xl">
      <div className="grid grid-cols-3 text-[#22416e] font-semibold">
        <div>Operational States</div>
        <div className="flex justify-center">Source</div>
        <div className="flex justify-center">Destination</div>
      </div>
      <div
        className="overflow-y-scroll pt-2"
        style={{ height: fromViewState ? "40rem" : "17rem" }}
      >
        {statesAndUnionTerritoriesOfIndia.map((state, index) => (
          <div key={index} className="grid grid-cols-3 items-center my-2">
            <div>{state}</div>
            <div className="flex justify-center">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={selectedStates[index].source}
                onChange={() => handleCheckboxChange(index, "source")}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={selectedStates[index].dest}
                onChange={() => handleCheckboxChange(index, "dest")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorState;
