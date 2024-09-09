import React, { useState, useEffect } from 'react';
import axios from 'axios';
 // Replace with your actual base URL
const BASE_URL = "https://freighteg.in/freightapi"; // Assuming this is the base URL for all your APIs


const VehicleDetailsModal = ({ isOpen, onClose, quantity, modalData }) => {
    const initialVehicleData = {
        vehicleNo: '',
        driverName: '',
        driverPhone: '',
        gpsLink: null,
        reportingTime: null,
        remarks: null
    };
    console.log({modalData})
    const [vehicles, setVehicles] = useState([]);
    const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    // Update vehicles state when quantity changes
    useEffect(() => {
        setVehicles(Array.from({ length: quantity }, () => ({ ...initialVehicleData })));
    }, [quantity]);

    const handleVehicleChange = (field, event) => {
        const newVehicles = [...vehicles];
        newVehicles[currentVehicleIndex] = {
            ...newVehicles[currentVehicleIndex],
            [field]: event.target.value || null // Use null if input is empty
        };
        setVehicles(newVehicles);
    };

    const handleNext = () => {
        if (currentVehicleIndex < quantity - 1) {
            setCurrentVehicleIndex(currentVehicleIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentVehicleIndex > 0) {
            setCurrentVehicleIndex(currentVehicleIndex - 1);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // Prepare the data for the API request
            const updatedVehicleData = vehicles.map(vehicle => ({
                vehicleNo: vehicle.vehicleNo,
                driverName: vehicle.driverName,
                driverPhone: vehicle.driverPhone,
                gpsLink: vehicle.gpsLink,
                reportingTime: vehicle.reportingTime,
                remarks: vehicle.remarks,
            }));

            // Call the API function to update vehicle details
            console.log({modalData})
            await handleVehicleDetails(updatedVehicleData, modalData.idofBid);

            // Close the modal after successful submission
            onClose();
        } catch (error) {
            console.error("Error submitting vehicle details:", error);
            // Handle error if necessary
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Vehicle Details
                </h2>

                <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">
                        Vehicle {currentVehicleIndex + 1} of {quantity}:
                    </h3>
                    <div className="mt-2">
                        <label htmlFor="vehicleNo" className="block text-gray-600">
                            Vehicle Number:
                        </label>
                        <input
                            type="text"
                            id="vehicleNo"
                            value={vehicles[currentVehicleIndex]?.vehicleNo || ''}
                            onChange={(event) => handleVehicleChange('vehicleNo', event)}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="driverName" className="block text-gray-600">
                            Driver Name:
                        </label>
                        <input
                            type="text"
                            id="driverName"
                            value={vehicles[currentVehicleIndex]?.driverName || ''}
                            onChange={(event) => handleVehicleChange('driverName', event)}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="driverPhone" className="block text-gray-600">
                            Driver Phone:
                        </label>
                        <input
                            type="text"
                            id="driverPhone"
                            value={vehicles[currentVehicleIndex]?.driverPhone || ''}
                            onChange={(event) => handleVehicleChange('driverPhone', event)}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="gpsLink" className="block text-gray-600">
                            GPS Link:
                        </label>
                        <input
                            type="text"
                            id="gpsLink"
                            value={vehicles[currentVehicleIndex]?.gpsLink || ''}
                            onChange={(event) => handleVehicleChange('gpsLink', event)}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="reportingTime" className="block text-gray-600">
                            Reporting Time:
                        </label>
                        <input
                            type="text"
                            id="reportingTime"
                            value={vehicles[currentVehicleIndex]?.reportingTime || ''}
                            onChange={(event) => handleVehicleChange('reportingTime', event)}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="remarks" className="block text-gray-600">
                            Remarks:
                        </label>
                        <input
                            type="text"
                            id="remarks"
                            value={vehicles[currentVehicleIndex]?.remarks || ''}
                            onChange={(event) => handleVehicleChange('remarks', event)}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                </div>

                {/* Previous/Next and Submit buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePrevious}
                        disabled={currentVehicleIndex === 0}
                        className={`bg-gray-500 text-white px-4 py-2 rounded ${currentVehicleIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
                    >
                        Previous
                    </button>

                    {currentVehicleIndex === quantity - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`bg-blue-500 text-white px-6 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Separate API function to handle vehicle details update
const handleVehicleDetails = async (updatedVehicleData, modalId) => {
    try {
        const body = {
            vehicleDetails: updatedVehicleData,
        };
        console.log("Body in API request", body);

        const response = await axios.patch(
            `${BASE_URL}/updateAssignedBid/${modalId}`,
            body
        );
        console.log("Response from API", response.data);
        if (response?.status === 200) {
            alert("Success", "Vehicle details sent Successfully!!");
            // Handle post-success actions here
        } else {
            throw new Error("Something went wrong!! Try Again.");
        }
    } catch (error) {
        console.log("Error in API request", error);
        const errorMessage =
            error?.response?.data?.message || "Something went wrong!! Try Again.";
        alert("Error", errorMessage);
    }
};

export default VehicleDetailsModal;
