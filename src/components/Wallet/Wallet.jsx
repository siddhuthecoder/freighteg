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
      <div className=" mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Wallet Balance</h1>

        <div className="grid grid-cols-2 w-full  gap-4 mb-6">
          <div className="  bg-blue-100 rounded-lg flex justify-between flex-col shadow-md">
            <div className="flex flex-col">
            <h2 className="text-[15px] pt-3 sm:text-xl ps-2  font-semibold">Valid till {new Date(companyDetails['subscriptionExpiryDate']).toLocaleDateString()}</h2>
            <p className="text-[12px] sm:text-lg ps-2 ">Plan: {companyDetails['subscriptionPlan']}</p>
            <p className="sm:text-lg ps-2 ">Bids Remaining: {companyDetails['maxBid'] - companyDetails['bidsUsed']}</p>
            </div>
            <button onClick={openBidModal} className="mt-4 m-2 px-4 py-2 max-w-[200px] bg-blue-600 text-white rounded-lg">Add Bid</button>
          </div>

          <div className=" p-4 flex flex-col justify-between bg-blue-200 rounded-lg shadow-md">
            <div className="flex flex-col">
              <h2 className="sm:text-xl font-semibold">Wallet</h2>
              <p className="sm:text-3xl font-bold mt-2">₹ {walletBalance.Tracking_Balance}</p>
            </div>
            <button onClick={openAddBalanceModal} className="mt-4 px-4 py-2 max-w-[200px] bg-blue-600 text-white rounded-lg">Add Balance</button>
          </div>
        </div>

        <div className="mb-6 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn ID</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-6 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="py-3 px-6 whitespace-nowrap text-sm text-gray-900">{payment.order_id}</td>
                  <td className="py-3 px-6 whitespace-nowrap text-sm text-green-500 font-bold">₹{payment.Total_amount}</td>
                  <td className="py-3 px-6 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap text-sm">
                    <a
                      href="#"
                      onClick={() => openTransactionDetailsModal(payment)}
                      className="text-blue-600 hover:underline"
                    >
                      View More
                    </a>
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
