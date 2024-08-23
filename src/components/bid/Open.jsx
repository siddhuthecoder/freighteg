import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BidLayout from './Layout';

const Open = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);

  // Function to fetch live bids
  const fetchLiveBids = async () => {
    const url = `https://freighteg.in/freightapi/liveBids?company_id=${user.id}`;
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching live bids:', error);
      setError('Failed to fetch live bids');
      setLoading(false);
    }
  };

  // Function to fetch bid details using bid_id
  const fetchBidDetails = async (bidId) => {
    const url = `https://freighteg.in/freightapi/bids/${bidId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for bid_id ${bidId}:`, error);
      setError(`Failed to fetch details for bid_id ${bidId}`);
      setLoading(false);
    }
  };

  // Function to get all bid details
  const getAllBidDetails = async () => {
    const liveBids = await fetchLiveBids();
    if (liveBids && liveBids.length > 0) {
      const allBidDetails = [];
      for (const bid of liveBids) {
        const bidDetail = await fetchBidDetails(bid.bid_id);
        if (bidDetail) {
          allBidDetails.push(bidDetail);
        }
      }
      setBidDetails(allBidDetails);
    } else {
      console.log('No live bids found.');
      setError('No live bids found.');
    }
    setLoading(false);
  };

  // Use useEffect to call the function when the component mounts
  useEffect(() => {
    getAllBidDetails();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (bidDetails.length === 0) {
    return <div className="text-center">No data found.</div>;
  }

  return (
    <>
      <BidLayout bidData={bidDetails} />
    </>
  );
};

export default Open;
