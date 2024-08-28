// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// // Set the app element for accessibility
// Modal.setAppElement('#root');

// const BASE_URL = 'https://freighteg.in/freightapi'; // Replace with your actual base URL
// const PAYMENT_KEY = 'your_razorpay_key'; // Replace with your actual Razorpay key

// const AddBalanceModal = ({ isOpen, onRequestClose }) => {
//   const user = useSelector((state) => state.login.user);
//   const [amount, setAmount] = useState('');
//   const navigate = useNavigate();

//   const handlePayment = async () => {
//     try {
//       const userData =user;
//       const totalAmount = parseFloat(amount);
//       const orderData = await createOrder(totalAmount);

//       if (orderData) {
//         const options = {
//           key: PAYMENT_KEY,
//           amount: orderData.amount * 100,
//           currency: 'INR',
//           name: 'Freight Eg',
//           description: 'Credits towards consultation',
//           image: 'https://freighteg.s3.ap-south-1.amazonaws.com/logo10.png',
//           order_id: orderData.id,
//           handler: async (response) => {
//             const paymentData = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             };
//             const authResponse = await verifyPayment(paymentData, orderData);

//             if (authResponse && authResponse.success) {
//               if (orderData.payment_for === 'balance') {
//                 const walletResponse = await updateWallet(response);
//                 if (walletResponse) {
//                   navigate('/Wallet');
//                   window.alert('Payment done and wallet updated successfully.');
//                 } else {
//                   navigate('/Wallet');
//                   window.alert('Payment processed but wallet updation failed.');
//                 }
//               } else {
//                 const companyResponse = await updateCompany(response);
//                 if (companyResponse) {
//                   navigate('/Wallet');
//                   window.alert('Payment done and plan updated successfully.');
//                 } else {
//                   navigate('/Wallet');
//                   window.alert('Payment processed but company updation failed.');
//                 }
//               }
//             } else {
//               navigate('/Wallet');
//               window.alert('Payment failed');
//             }
//           },
//           prefill: {
//             contact: userData?.phone,
//             name: userData?.name,
//           },
//           theme: {
//             color: '#5E81F4',
//           },
//         };

//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//       }
//     } catch (error) {
//       console.error('Error handling payment:', error);
//       window.alert('An error occurred while processing your payment.');
//     }
//   };

//   const createOrder = async (totalAmount) => {
//     try {
//       const userData =user;
//       const response = await axios.post(`${BASE_URL}/order`, {
//         amount: totalAmount * 100,
//         currency: 'INR',
//         receipt: (userData?.id + totalAmount).toString(),
//         notes: {
//           company_id: userData?.id,
//           amount: totalAmount,
//           payment_for: 'balance', // or other values
//         },
//       });
//       if (response.status === 200) {
//         return response.data;
//       } else {
//         throw new Error('Failed to create order');
//       }
//     } catch (error) {
//       console.error('Error creating order:', error);
//       return null;
//     }
//   };

//   const verifyPayment = async (paymentData, orderData) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/verifyPayment`, {
//         ...paymentData,
//         order_id: orderData.id,
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error verifying payment:', error);
//       return null;
//     }
//   };

//   const updateWallet = async (response) => {
//     try {
//       const userData =user;
//       const response = await axios.put(`${BASE_URL}/updateFreightWalletBalance`, {
//         company_id: userData?.id,
//         Tracking_Balance: parseFloat(response?.quantity),
//       });
//       return response.status === 200;
//     } catch (error) {
//       console.error('Error updating wallet:', error);
//       return false;
//     }
//   };

//   const updateCompany = async (response) => {
//     try {
//       const userData =user;
//       const plan = response?.payment_for.split(' ')[0].charAt(0).toUpperCase() + response?.payment_for.split(' ')[0].slice(1);
//       const duration = response?.payment_for.split(' ')[1];
//       const newDate = new Date();
//       const daysToAdd = duration === 'monthly' ? 30 : duration === 'quarterly' ? 90 : 365;
//       newDate.setDate(newDate.getDate() + daysToAdd);

//       const response = await axios.put(`${BASE_URL}/update-companies/${userData.id}`, {
//         maxBid: (parseInt(userData?.maxBid, 10) || 0) + (parseInt(response?.quantity, 10) || 0),
//         subscriptionPlan: plan,
//         subscriptionExpiryDate: newDate,
//       });
//       return response.status === 200;
//     } catch (error) {
//       console.error('Error updating company:', error);
//       return false;
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Balance Modal">
//       <h2>Add Balance</h2>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         placeholder="Enter amount"
//       />
//       <button onClick={handlePayment}>Pay with Razorpay</button>
//       <button onClick={onRequestClose}>Close</button>
//     </Modal>
//   );
// };

// export default AddBalanceModal;
