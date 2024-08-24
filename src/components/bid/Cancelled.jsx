import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BidLayout from './Layout';

const CanceledBidDetails = () => {
  const [canceledBidDetails, setCanceledBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);

  // Function to fetch canceled bid details
  const fetchCanceledBidDetails = async () => {
    const url = `https://freighteg.in/freightapi/cancelledBids?company_id=${user?.id}`;
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching canceled bid details:', error);
      setError('Failed to fetch canceled bid details');
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

  // Function to fetch freight user data using created_by id
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

  // Function to get all canceled bid details and merge with user and assigned_to data
  const getAllCanceledBidDetails = async () => {
    const canceledBids = await fetchCanceledBidDetails();
    if (canceledBids && canceledBids.length > 0) {
      const allCanceledBidDetails = [];
      for (const bid of canceledBids) {
        const bidDetail = await fetchBidDetails(bid.bid_id);
        if (bidDetail) {
          const createdByUser = await fetchFreightUserData(bidDetail.created_by);
          const assignedToUser = await fetchFreightUserData(bidDetail.assigned_to); // Fetch assigned_to data

          const mergedData = {
            ...bidDetail,
            createdByUser,  // Embed created_by user data
            assignedToUser, // Embed assigned_to user data
          };
          allCanceledBidDetails.push(mergedData);
        }
      }
      setCanceledBidDetails(allCanceledBidDetails);
    } else {
      console.log('No canceled bids found.');
      setError('No canceled bids found.');
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCanceledBidDetails();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (canceledBidDetails.length === 0) {
    return <div className="text-center">No canceled bid details found.</div>;
  }

  return (
    <>
      <BidLayout bidData={canceledBidDetails} />
    </>
  );
};

export default CanceledBidDetails;
