import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BidLayout from './Layout';

const Counter = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);

  // Function to fetch bid IDs
  const fetchBidIds = async () => {
    const url = `https://freighteg.in/freightapi/counters?company_id=${user?.id}`;
    try {
      const response = await axios.get(url);
      return response.data.data; // Adjust this if the data structure is different
    } catch (error) {
      console.error('Error fetching bid IDs:', error);
      setError('Failed to fetch bid IDs');
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
    const bidIds = await fetchBidIds();
    if (bidIds && bidIds.length > 0) {
      const allBidDetails = [];
      for (const bid of bidIds) {
        const bidDetail = await fetchBidDetails(bid.id); // Adjust 'bid.id' based on the response structure
        if (bidDetail) {
          allBidDetails.push(bidDetail);
        }
      }
      setBidDetails(allBidDetails);
    } else {
      console.log('No bid IDs found.');
      setError('No bid IDs found.');
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

  

  return (
    <>
      <BidLayout bidData={bidDetails} />
    </>
  );
};

export default Counter;
