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

  const fetchFreightUserData = async (userId) => {
    const url = `https://freighteg.in/freightapi/freightusers/${userId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user data for id ${userId}:`, error);
      setError(`Failed to fetch user data for id ${userId}`);
      setLoading(false);
    }
  };
  // Function to get all bid details and merge with user and assigned_to data
  const getAllBidDetails = async () => {
    const bids = await fetchBidIds();
    if (bids && bids.length > 0) {
      const allBidDetails = [];
      for (const bid of bids) {
        const bidDetail = await fetchBidDetails(bid.bid_id);
        if (bidDetail) {
          const createdByUser = await fetchFreightUserData(bidDetail.created_by);
          const assignedToUser = await fetchFreightUserData(bidDetail.assigned_to); // Fetch assigned_to data

          const mergedData = {
            ...bidDetail,
            createdByUser,  // Embed created_by user data
            assignedToUser, // Embed assigned_to user data
          };
          allBidDetails.push(mergedData);
        }
      }
      setBidDetails(allBidDetails);
    } else {
      console.log('No bids found.');
      setError('No bids found.');
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
