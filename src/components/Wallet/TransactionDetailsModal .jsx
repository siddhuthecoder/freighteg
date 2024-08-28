import React from 'react';
import Modal from 'react-modal';

const TransactionDetailsModal = ({ isOpen, onRequestClose, transaction }) => {
  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Transaction Details">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
        <p><strong>Order ID:</strong> {transaction.order_id}</p>
        <p><strong>Amount:</strong> ₹{transaction.amount}</p>
        <p><strong>GST:</strong> ₹{transaction.gst}</p>
        <p><strong>Total Amount:</strong> ₹{transaction.Total_amount}</p>
        <p><strong>Payment For:</strong> {transaction.payment_for}</p>
        <p><strong>Quantity:</strong> {transaction.quantity}</p>
        <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleDateString()}</p>
        <h3 className="text-lg font-semibold mt-4">Payment Details:</h3>
        {transaction.payments.map((payment, index) => (
          <div key={payment._id} className="mt-2">
            <p><strong>Razorpay Order ID:</strong> {payment.razorpay_order_id}</p>
            <p><strong>Razorpay Payment ID:</strong> {payment.razorpay_payment_id}</p>
            <p><strong>Status:</strong> {payment.status}</p>
          </div>
        ))}
        <button onClick={onRequestClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default TransactionDetailsModal;
