import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const BASE_URL = 'https://freighteg.in/freightapi'; // Replace with your actual base URL
const PAYMENT_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID; // Replace with your actual Razorpay key
 
const AddBalanceModal = ({ isOpen, onRequestClose }) => {
  // alert(PAYMENT_KEY)
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
            contact: user?.phone,
            name: user?.name,
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
      const response = await axios.post(`${BASE_URL}/order`, {
        amount: totalAmount * 100, // Amount in paisa
        currency: 'INR',
        receipt: (user?.id + totalAmount).toString(),
        notes: {
          company_id: user?.id,
          amount: totalAmount,
          payment_for: 'balance',
          gst: gst.toFixed(2),
        },
      });
      if (response.status === 200) {
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
      const response = await axios.put(`${BASE_URL}/updateFreightWalletBalance`, {
        company_id: user?.id,
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
      const [plan, duration] = paymentFor.split(' ');
      const capitalizedPlan = plan.charAt(0).toUpperCase() + plan.slice(1);
      const newDate = new Date();
      const daysToAdd = duration === 'monthly' ? 30 : duration === 'quarterly' ? 90 : 365;
      newDate.setDate(newDate.getDate() + daysToAdd);

      const response = await axios.put(`${BASE_URL}/update-companies/${user.id}`, {
        maxBid: (parseInt(user?.maxBid, 10) || 0) + (parseInt(amount, 10) || 0),
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
    className="modal-content  rounded-lg shadow-lg max-w-sm w-full p-6"
    overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full mx-auto p-6 transform transition-all">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Refill Wallet Balance</h2>
          <button
            onClick={onRequestClose}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Enter amount"
          />
          <div className="border-t border-dashed border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <p>Amount</p>
              <p>{amount ? `INR ${parseFloat(amount).toLocaleString()}` : 'INR 0.00'}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>GST (18%)</p>
              <p>{amount ? `INR ${gst.toFixed(2)}` : 'INR 0.00'}</p>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t border-dashed pt-2">
              <p>Total Amount</p>
              <p>{amount ? `INR ${finalAmount.toFixed(2)}` : 'INR 0.00'}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handlePayNow}
            className="w-full bg-green-500 text-white text-center py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddBalanceModal;
