

import React, { useState } from 'react';
import Modal from 'react-modal';

// Ensure you set the app element for accessibility
Modal.setAppElement('#root');

const AddBalanceModal = ({ isOpen, onRequestClose }) => {
  const [amount, setAmount] = useState('');
  const [gst, setGst] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    const parsedAmount = parseFloat(value);
    if (!isNaN(parsedAmount)) {
      const gstAmount = parsedAmount * 0.18;
      setGst(gstAmount);
      setFinalAmount(parsedAmount + gstAmount);
    } else {
      setGst(0);
      setFinalAmount(0);
    }
  };

  const handlePayNow = () => {
    // Add payment logic here
    alert('Payment functionality to be implemented.');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Add Balance</h2>
        <button
          onClick={onRequestClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-lg mb-2 text-gray-700">Enter Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-4">
        <p className="text-lg text-gray-800">Your Amount: ₹{amount}</p>
        <p className="text-lg text-gray-800">GST (18%): ₹{gst.toFixed(2)}</p>
        <p className="text-lg font-bold text-gray-800">Final Amount: ₹{finalAmount.toFixed(2)}</p>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={onRequestClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
        >
          Close
        </button>
        <button
          onClick={handlePayNow}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Pay Now
        </button>
      </div>
    </Modal>
  );
};

export default AddBalanceModal;
