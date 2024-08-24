import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BidLayout from './Layout';

const BidDetails = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);

  // Function to fetch bid result history
  const fetchBidResultHistory = async () => {
    const url = `https://freighteg.in/freightapi/getBidResultHistory?company_id=${user?.id}`;
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching bid result history:', error);
      setError('Failed to fetch bid result history');
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
  const fetchFreightUserData = async (createdById) => {
    const url = `https://freighteg.in/freightapi/freightusers/${createdById}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user data for created_by ${createdById}:`, error);
      setError(`Failed to fetch user data for created_by ${createdById}`);
      setLoading(false);
    }
  };

  // Function to get all bid details and merge with user data
  const getAllBidDetails = async () => {
    const bids = await fetchBidResultHistory();
    if (bids && bids.length > 0) {
      const allBidDetails = [];
      for (const bid of bids) {
        const bidDetail = await fetchBidDetails(bid.bid_id);
        if (bidDetail) {
          const userData = await fetchFreightUserData(bidDetail.created_by);
          const mergedData = {
            ...bidDetail,
            user: userData // Embed the user data within the bid details
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
    return <div className="text-center">No bid details found.</div>;
  }

  // console.log(bidDetails);

  return (
    <>
      <BidLayout bidData={bidDetails} />
    </>
  );
};

export default BidDetails;
