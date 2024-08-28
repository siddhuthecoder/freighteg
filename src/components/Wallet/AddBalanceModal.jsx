import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const BASE_URL = 'https://freighteg.in/freightapi'; // Replace with your actual base URL
const PAYMENT_KEY = 'rzp_live_hUBa71YRLBFQG0'; // Replace with your actual Razorpay key

const AddBalanceModal = ({ isOpen, onRequestClose }) => {
  const user = useSelector((state) => state.login.user);
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const gst = amount * 0.18;
  const finalAmount = parseFloat(amount) + gst;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePayNow = async () => {
    try {
      const userData = user;
      const totalAmount = parseFloat(finalAmount);
      const orderData = await createOrder(totalAmount);

      if (orderData) {
        const options = {
          key: PAYMENT_KEY,
          amount: orderData.amount * 100, // Amount in paisa
          currency: 'INR',
          name: 'Freight Eg',
          description: 'Credits towards consultation',
          image: 'https://freighteg.s3.ap-south-1.amazonaws.com/logo10.png',
          order_id: orderData.id,
          handler: async (response) => {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            const authResponse = await verifyPayment(paymentData, orderData);

            if (authResponse && authResponse.success) {
              if (orderData.notes.payment_for === 'balance') {
                const walletResponse = await updateWallet(totalAmount);
                if (walletResponse) {
                  navigate('/Wallet');
                  window.alert('Payment done and wallet updated successfully.');
                } else {
                  navigate('/Wallet');
                  window.alert('Payment processed but wallet updation failed.');
                }
              } else {
                const companyResponse = await updateCompany(orderData.notes.payment_for);
                if (companyResponse) {
                  navigate('/Wallet');
                  window.alert('Payment done and plan updated successfully.');
                } else {
                  navigate('/Wallet');
                  window.alert('Payment processed but company updation failed.');
                }
              }
            } else {
              navigate('/Wallet');
              window.alert('Payment failed');
            }
          },
          prefill: {
            contact: userData?.phone,
            name: userData?.name,
          },
          theme: {
            color: '#5E81F4',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } catch (error) {
      console.error('Error handling payment:', error);
      window.alert('An error occurred while processing your payment.');
    }
  };

  const createOrder = async (totalAmount) => {
    try {
      const userData = user;
      const response = await axios.post(`${BASE_URL}/order`, {
        amount: totalAmount * 100, // Amount in paisa
        currency: 'INR',
        receipt: (userData?.id + totalAmount).toString(),
        notes: {
          company_id: userData?.id,
          amount: totalAmount,
          payment_for: 'balance', 
          gst:gst// or other values like 'subscription'
        },
      });
      if (response.status === 200) {
        alert(JSON.stringify(response.data))
        return response.data;
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  };

  const verifyPayment = async (paymentData, orderData) => {
    try {
      const response = await axios.post(`${BASE_URL}/verifyPayment`, {
        ...paymentData,
        order_id: orderData.id,
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return null;
    }
  };

  const updateWallet = async (amount) => {
    try {
      const userData = user;
      const response = await axios.put(`${BASE_URL}/updateFreightWalletBalance`, {
        company_id: userData?.id,
        Tracking_Balance: parseFloat(amount),
      });
      return response.status === 200;
    } catch (error) {
      console.error('Error updating wallet:', error);
      return false;
    }
  };

  const updateCompany = async (paymentFor) => {
    try {
      const userData = user;
      const [plan, duration] = paymentFor.split(' ');
      const capitalizedPlan = plan.charAt(0).toUpperCase() + plan.slice(1);
      const newDate = new Date();
      const daysToAdd = duration === 'monthly' ? 30 : duration === 'quarterly' ? 90 : 365;
      newDate.setDate(newDate.getDate() + daysToAdd);

      const response = await axios.put(`${BASE_URL}/update-companies/${userData.id}`, {
        maxBid: (parseInt(userData?.maxBid, 10) || 0) + (parseInt(amount, 10) || 0),
        subscriptionPlan: capitalizedPlan,
        subscriptionExpiryDate: newDate,
      });
      return response.status === 200;
    } catch (error) {
      console.error('Error updating company:', error);
      return false;
    }
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
