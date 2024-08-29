import React from 'react';
import Modal from 'react-modal';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';

const TransactionDetailsModal = ({ isOpen, onRequestClose, transaction }) => {
  if (!transaction) return null;

  const {
    order_id,
    amount,
    gst,
    Total_amount,
    payment_for,
    quantity,
    createdAt,
    payments,
  } = transaction;

  // Determine payment status
  const isSuccessful = payments && payments.some(payment => payment.status === 'success');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Transaction Details"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-2">
            {isSuccessful ? (
              <>
                <FaCheckCircle className="text-green-500 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Transaction Successful!
                </h2>
                
                
              </>
            ) : (
              <>
                <FaTimesCircle className="text-red-500 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Incomplete Payment!
                </h2>
                {/* <p className="text-gray-600 mb-6">
            Your payment was initiated but not completed. Please review the details below.
          </p> */}
              </>
            )}
          </div>
          <button
            onClick={onRequestClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Total Payment */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Total Payment</p>
              <p className="text-2xl font-bold text-gray-800">₹{Total_amount}</p>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Payment For</p>
              <p className="text-gray-700 font-medium">{payment_for || 'N/A'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Transaction ID</p>
              <p className="text-gray-700 font-medium">{order_id || 'N/A'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Payment Time</p>
              <p className="text-gray-700 font-medium">
                {createdAt ? format(new Date(createdAt), 'dd MMM yyyy, hh:mm a') : 'N/A'}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Quantity</p>
              <p className="text-gray-700 font-medium">{quantity || 'N/A'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">GST (18%)</p>
              <p className="text-gray-700 font-medium">₹{gst}</p>
            </div>
          </div>

          {/* Payment Details */}
          {payments && payments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
              <div className="space-y-4">
                {payments.map((payment, index) => (
                  <div
                    key={payment._id || index}
                    className="bg-gray-50 p-4 rounded-lg border"
                  >
                    <div className="flex justify-between">
                      <p className="text-gray-500">Razorpay Order ID</p>
                      <p className="text-gray-700 font-medium">
                        {payment.razorpay_order_id || 'N/A'}
                      </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-gray-500">Razorpay Payment ID</p>
                      <p className="text-gray-700 font-medium">
                        {payment.razorpay_payment_id || 'N/A'}
                      </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-gray-500">Status</p>
                      <p
                        className={`font-medium ${
                          payment.status === 'success' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {payment.status || 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={onRequestClose}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionDetailsModal;
