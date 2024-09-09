import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';
import MyRankTable from './MyRankTable';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://freighteg.in/freightapi';

const MyRank = () => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false); // For info button
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

  const handleInfoModalOpen = () => {
    setInfoModalVisible(true);
  };

  const handleInfoModalClose = () => {
    setInfoModalVisible(false);
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
      
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex gap-8 my-2">
          <Link
            to="#"
            className={`cursor-pointer  px-3 py-2 text-blue-600 border-b-2 border-blue-600 hover:text-blue-600 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
          >
            My Rank
          </Link>
          <Link
            to="/transporter/Counter"
            className={`cursor-pointer  text-gray-500  px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
          >
            Counter
          </Link>
        </div>
      <div className="w-full flex flex-col overflow-x-auto bg-white">
        <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
          <div className="font-semibold md:text-lg ps-[30px]">ID</div>
          <div className="font-semibold md:text-lg ps-[30px]">Date</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading</div>
          <div className="font-semibold md:text-lg ps-[30px]">Unloading</div>
          <div className="font-semibold md:text-lg ps-[30px]">Details</div>
          <div className="font-semibold md:text-lg ps-[30px]">Rank 
            {/* Info Button */}
            <button
              onClick={handleInfoModalOpen}
              className="ml-2 text-blue-500 text-sm hover:text-blue-700"
              aria-label="Rank Info"
            >
              (Rank info!)
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        ) : (
          <MyRankTable datas={ranks} />
        )}
      </div>
</div>
      {/* Info Modal */}
      {infoModalVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-md w-[400px]"> {/* Increased modal width */}
      <h2 className="text-xl font-semibold mb-4">Rank Information</h2>
      <div className="flex items-center mb-4">
        <span className="inline-block w-6 h-6 bg-green-500 rounded-full mr-4"></span> {/* Increased dot size */}
        <p>This color represents Rank 1</p>
      </div>
      <div className="flex items-center mb-4">
        <span className="inline-block w-6 h-6 bg-orange-300 rounded-full mr-4"></span> {/* Increased dot size */}
        <p>This color represents Rank 2 - Rank 5</p>
      </div>
      <div className="flex items-center mb-4">
        <span className="inline-block w-6 h-6 bg-red-700 rounded-full mr-4"></span> {/* Increased dot size */}
        <p>This color represents Rank 6 or more</p>
      </div>
      <button
        onClick={handleInfoModalClose}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default MyRank;
