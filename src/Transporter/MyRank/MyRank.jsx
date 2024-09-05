import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';
import MyRankTable from './MyRankTable';

const BASE_URL = 'https://freighteg.in/freightapi';

const MyRank = () => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [newBidPrice, setNewBidPrice] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);

  const user = useSelector((state) => state.login.user);

  const fetchRanks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rank-by-vendor/${user?.id}`);
      const activeBids = response.data.activeBids;

      // Fetch details for each bid and combine with rank data
      const combinedDataPromises = activeBids.map(async (rank) => {
        const bidDetails = await fetchBidDetails(rank.bid_id);
        return { ...rank, ...bidDetails };
      });

      const combinedData = await Promise.all(combinedDataPromises);
      setRanks(combinedData);
    } catch (err) {
      setError('Failed to fetch ranks or bid details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanks();
  }, [user?.id]);

  const fetchBidDetails = async (bidId) => {
    const url = `${BASE_URL}/bids/${bidId}`;
    try {
      const response = await axios.get(url);
      return response.data || {};
    } catch (error) {
      console.error(`Error fetching details for bid_id ${bidId}:`, error);
      return {}; // Return an empty object if there's an error
    }
  };

  const handleModalOpen = (bid) => {
    setSelectedBid(bid);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedBid(null);
    setNewBidPrice('');
  };

  const handleSubmit = async () => {
    if (newBidPrice.trim() === '') return;

    if (newBidPrice <= selectedBid?.target_price * 0.6) {
      alert("Sorry, please enter a valid bid price.");
      return;
    }

    setLoadingModal(true);

    try {
      const body = {
        bid_id: selectedBid?.bid_id,
        vendor_id: user?.id,
        bidding_price: newBidPrice,
      };

      const response = await axios.post(`${BASE_URL}/addBidding`, body);

      if (response?.status === 200) {
        handleModalClose();
        alert("Bid added successfully");
        setNewBidPrice('');
        fetchRanks(); // Refresh the ranks
      } else {
        throw new Error("Something went wrong! Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + (error?.response?.data?.message || "Something went wrong! Try again."));
    } finally {
      setLoadingModal(false);
    }
  };

  return (
    <>
      <TransportNavBar />
      <div className="w-full flex flex-col overflow-x-auto  bg-white">
        <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
          <div className="font-semibold md:text-lg ps-[30px]">ID</div>
          <div className="font-semibold md:text-lg ps-[30px]">Date</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading</div>
          <div className="font-semibold md:text-lg ps-[30px]">Unloading</div>
          <div className="font-semibold md:text-lg ps-[30px]">Details</div>
          <div className="font-semibold md:text-lg ps-[30px]">Bid Again</div>
        </div>
        {loading ? (
        <div className="text-center my-4">
          {/* Loading spinner */}
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          {/* Loading text */}
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      ) : (
        <MyRankTable datas={ranks}/>

      )}
      </div>
    
    </>
  );
};

export default MyRank;
