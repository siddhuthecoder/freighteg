import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineModeEdit } from "react-icons/md";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditModal = ({ data, onClose }) => {
    const [loading, setLoad] = useState(false);
    const [quantity, setQuantity] = useState(data.quantity);
    const [showQuantityInput, setShowQuantityInput] = useState(false);
    const [expiryDate, setExpiryDate] = useState(new Date(data.expiry_date));
    const [loadingDate, setLoadingDate] = useState(new Date(data.loading_date));
    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    console.log({data})
    // Handle stop bidding
    const handleStop = async () => {
        setLoad(true);
        try {
            const currentDate = new Date();
            currentDate.setMinutes(currentDate.getMinutes() - 1);
            const body = { expiry_date: currentDate };

            const response = await axios.patch(
                `https://freighteg.in/freightapi/updateBid/${data._id}`,
                body
            );
            console.log("response update bid status ", response.data);

            if (response?.status === 200) {
                alert("Success: Bid has been stopped!");
                window.location.reload();
                onClose();
            } else {
                throw new Error("Something went wrong! Try Again.");
            }
        } catch (error) {
            console.log("catch error ", error);
            const errorMessage =
                error?.response?.data?.message ||
                "Something went wrong with updating bid! Try Again.";
            alert("Error: " + errorMessage);
        } finally {
            setLoad(false);
        }
    };

    // Handle cancel bidding
    const handleCancel = async () => {
        setLoad(true);
        try {
            const body = {
                isActive: false,
                isDeleted: true,
            };

            const response = await axios.patch(
                `https://freighteg.in/freightapi/updateBid/${data._id}`,
                body
            );
            console.log("response update bid status ", response.data);

            if (response?.status === 200) {
                alert("Success: Bid Cancelled Successfully!");
                window.location.reload();
                onClose();
            } else {
                throw new Error("Something went wrong! Try Again.");
            }
        } catch (error) {
            console.log("catch error ", error);
            const errorMessage =
                error?.response?.data?.message ||
                "Something went wrong with updating bid! Try Again.";
            alert("Error: " + errorMessage);
        } finally {
            setLoad(false);
        }
    };

    // Handle updating quantity
    const handleQuantityUpdate = async () => {
        setLoad(true);
        try {
            const body = {
                quantity: quantity,
            };

            const response = await axios.patch(
                `https://freighteg.in/freightapi/updateBid/${data._id}`,
                body
            );
            console.log("response update bid quantity ", response.data);

            if (response?.status === 200) {
                alert("Success: Quantity updated successfully!");
                window.location.reload();
                onClose();
            } else {
                throw new Error("Something went wrong! Try Again.");
            }
        } catch (error) {
            console.log("catch error ", error);
            const errorMessage =
                error?.response?.data?.message ||
                "Something went wrong while updating the quantity! Try Again.";
            alert("Error: " + errorMessage);
        } finally {
            setLoad(false);
        }
    };

    // Handle updating time (expiry and loading)
    const handleUpdateTime = async () => {
        setLoad(true);
        try {
            const body = {
                expiry_date: expiryDate,
                loading_date: loadingDate,
            };

            const response = await axios.patch(
                `https://freighteg.in/freightapi/updateBid/${data._id}`,
                body
            );
            console.log("response update bid time ", response.data);

            if (response?.status === 200) {
                alert("Success: Time updated successfully!");
                window.location.reload();
                setShowEditTimeModal(false);
                onClose();
            } else {
                throw new Error("Something went wrong! Try Again.");
            }
        } catch (error) {
            console.log("catch error ", error);
            const errorMessage =
                error?.response?.data?.message ||
                "Something went wrong with updating time! Try Again.";
            alert("Error: " + errorMessage);
        } finally {
            setLoad(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Manage Bid #{data.bidNo}</h2>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Cancel Bid'}
                    </button>
                    <button
                        onClick={handleStop}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Stop Bidding'}
                    </button>

                    {/* Edit Quantity Section */}
                    <button
                        onClick={() => setShowQuantityInput(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                    >
                        Edit Quantity
                    </button>

                    {showQuantityInput && (
                        <div className="flex flex-col">
                            <label htmlFor="quantity" className="text-lg font-semibold">
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="px-4 py-2 border rounded-lg"
                                disabled={loading}
                            />
                            <button
                                onClick={handleQuantityUpdate}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Update Quantity'}
                            </button>
                        </div>
                    )}

                    {/* Edit Time Section */}
                    <button
                        onClick={() => setShowEditTimeModal(true)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
                    >
                        Edit Time
                    </button>

                    {showEditTimeModal && (
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full mt-4">
                            <h3 className="text-lg font-semibold mb-2">Edit Expiry & Loading Time</h3>

                            {/* Expiry Time */}
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold">Current Expiry Time:</label>
                                <DatePicker
                                    selected={expiryDate}
                                    onChange={(date) => setExpiryDate(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className="border rounded-lg px-4 py-2"
                                />
                            </div>

                            {/* Loading Time */}
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold">Current Loading Time:</label>
                                <DatePicker
                                    selected={loadingDate}
                                    onChange={(date) => setLoadingDate(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className="border rounded-lg px-4 py-2"
                                />
                            </div>

                            <button
                                onClick={handleUpdateTime}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Update Time'}
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
