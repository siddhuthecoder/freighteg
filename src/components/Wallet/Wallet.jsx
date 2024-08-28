import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';
import AddBalanceModal from './AddBalanceModal';
import BidModal from './BidModal';
import TransactionDetailsModal from './TransactionDetailsModal '; // Import the TransactionDetailsModal component
import './price.css';

Modal.setAppElement('#root');

const Wallet = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const [walletBalance, setWalletBalance] = useState({});
  const [bidsRemaining, setBidsRemaining] = useState(0);
  const [planValidTill, setPlanValidTill] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isTransactionDetailsModalOpen, setIsTransactionDetailsModalOpen] = useState(false); // Manage the state for the TransactionDetailsModal
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          // 'Authorization': 'Bearer your_dummy_access_token'
        };

        const paymentHistoryResponse = await fetch(
          `https://freighteg.in/freightapi/paymentHistory/${user?.id}`,
          { headers }
        );
        const paymentHistoryData = await paymentHistoryResponse.json();
        setPaymentHistory(paymentHistoryData.paymentHistory);

        const companyResponse = await fetch(
          `https://freighteg.in/freightapi/get-companies/${user?.id}`,
          { headers }
        );
        const companyData = await companyResponse.json();
        setCompanyDetails(companyData);

        const walletResponse = await fetch(
          `https://freighteg.in/freightapi/freightWalletBalance/${user?.id}`,
          { headers }
        );
        const walletData = await walletResponse.json();
        setWalletBalance(walletData.data);
        setBidsRemaining(walletData.data.bids_remaining);
        setPlanValidTill(walletData.data.valid_till);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  const openAddBalanceModal = () => {
    setIsAddBalanceModalOpen(true);
  };

  const closeAddBalanceModal = () => {
    setIsAddBalanceModalOpen(false);
  };

  const openBidModal = () => {
    setIsBidModalOpen(true);
  };

  const closeBidModal = () => {
    setIsBidModalOpen(false);
  };

  const openTransactionDetailsModal = (payment) => {
    setSelectedPayment(payment);
    setIsTransactionDetailsModalOpen(true);
  };

  const closeTransactionDetailsModal = () => {
    setIsTransactionDetailsModalOpen(false);
  };
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Wallet Balance</h1>

        <div className="flex gap-4 mb-6">
          <div className="w-1/2 p-4 bg-blue-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Valid till {new Date(companyDetails['subscriptionExpiryDate']).toLocaleDateString()}</h2>
            <p className="text-lg">Plan: {companyDetails['subscriptionPlan']}</p>
            <p className="text-lg">Bids Remaining: {companyDetails['maxBid'] - companyDetails['bidsUsed']}</p>
            <button onClick={openBidModal} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Add Bid</button>
          </div>

          <div className="w-1/2 p-4 bg-blue-200 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Wallet</h2>
            <p className="text-3xl font-bold mt-2">₹ {walletBalance.Tracking_Balance}</p>
            <button onClick={openAddBalanceModal} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Add Balance</button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">S.No</th>
                <th className="py-2 px-4 border">Txn ID</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Details</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={payment._id}>
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{payment.order_id}</td>
                  <td className="py-2 px-4 border">₹{payment.Total_amount}</td>
                  <td className="py-2 px-4 border">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    <a href="#" onClick={() => openTransactionDetailsModal(payment)} className="text-blue-500">View More</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddBalanceModal isOpen={isAddBalanceModalOpen} onRequestClose={closeAddBalanceModal} />
        <BidModal isOpen={isBidModalOpen} onRequestClose={closeBidModal} />
        <TransactionDetailsModal 
          isOpen={isTransactionDetailsModalOpen} 
          onRequestClose={closeTransactionDetailsModal} 
          transaction={selectedPayment} 
        />
      </div>
    </>
  );
};

export default Wallet;
