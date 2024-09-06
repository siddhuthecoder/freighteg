import React, { useState } from 'react';

const VehicleDetailsModal = ({ isOpen, onClose, quantity }) => {
    const initialVehicleData = {
        vehicleNumber: '',
        driverName: '',
        driverNumber: '',
        gpsLink: '',
        time: '',
        remark: ''
    };

    // Use Array.from to create a separate instance of initialVehicleData for each vehicle
    const [vehicles, setVehicles] = useState(Array.from({ length: quantity }, () => ({ ...initialVehicleData })));
    const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0); // Track current vehicle being filled

    const handleVehicleChange = (field, event) => {
        const newVehicles = [...vehicles];
        newVehicles[currentVehicleIndex] = {
            ...newVehicles[currentVehicleIndex],
            [field]: event.target.value
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

    const handleSubmit = () => {
        console.log('Vehicle Details:', vehicles);
        onClose();
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
                    <h3 className="font-semibold text-lg text-gray-700">Vehicle {currentVehicleIndex + 1} of {quantity}:</h3>
                    <div className="mt-2">
                        <label htmlFor="vehicleNumber" className="block text-gray-600">
                            Vehicle Number:
                        </label>
                        <input
                            type="text"
                            id="vehicleNumber"
                            value={vehicles[currentVehicleIndex].vehicleNumber}
                            onChange={(event) => handleVehicleChange('vehicleNumber', event)}
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
                            value={vehicles[currentVehicleIndex].driverName}
                            onChange={(event) => handleVehicleChange('driverName', event)}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="driverNumber" className="block text-gray-600">
                            Driver Number:
                        </label>
                        <input
                            type="text"
                            id="driverNumber"
                            value={vehicles[currentVehicleIndex].driverNumber}
                            onChange={(event) => handleVehicleChange('driverNumber', event)}
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
                            value={vehicles[currentVehicleIndex].gpsLink}
                            onChange={(event) => handleVehicleChange('gpsLink', event)}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="time" className="block text-gray-600">
                            Time:
                        </label>
                        <input
                            type="text"
                            id="time"
                            value={vehicles[currentVehicleIndex].time}
                            onChange={(event) => handleVehicleChange('time', event)}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="remark" className="block text-gray-600">
                            Remark:
                        </label>
                        <input
                            type="text"
                            id="remark"
                            value={vehicles[currentVehicleIndex].remark}
                            onChange={(event) => handleVehicleChange('remark', event)}
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
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Submit
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

export default VehicleDetailsModal;
