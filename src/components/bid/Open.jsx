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
    const url = `https://freighteg.in/freightapi/liveBids?company_id=6655811253ccced940826a99`;
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

  const fetchPageUsers = async (bidIds) => {
    const url = `https://freighteg.in/freightapi/pageusers`;
    try {
      const response = await axios.post(url, { bidIds });
      return response.data;
    } catch (error) {
      console.error('Error fetching page users:', error);
      setError('Failed to fetch page users');
      setLoading(false);
    }
  };

  const getAllBidDetails = async () => {
    const bids = await fetchLiveBids();
    if (bids && bids.length > 0) {
      const allBidDetails = [];
      for (const bid of bids) {
        const bidDetail = await fetchBidDetails(bid.bid_id);
        if (bidDetail) {
          const createdByUser = await fetchFreightUserData(bidDetail.created_by);
          const assignedToUser = await fetchFreightUserData(bidDetail.assigned_to); // Fetch assigned_to data

          // Fetch page users for the bid
          const pageUsersData = await fetchPageUsers([bid.bid_id]);
          console.log(pageUsersData)
          const mergedData = {
            ...bidDetail,
            createdByUser,  // Embed created_by user data
            assignedToUser, // Embed assigned_to user data
            viewedBy: pageUsersData?.viewedBy || [], // Add viewed by data
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
