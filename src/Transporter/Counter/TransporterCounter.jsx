import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';

const BASE_URL = 'https://freighteg.in/freightapi';

const TransporterCounter = () => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidDetails, setBidDetails] = useState({});

  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/counter/${user?.id}`);
        setRanks(response.data.activeBids);

        // Fetch details for each bid
        const detailsPromises = response.data.activeBids.map((rank) => fetchBidDetails(rank.bid_id));
        const details = await Promise.all(detailsPromises);

        // Map the bid_id to the respective details
        const detailsMap = details.reduce((acc, detail) => {
          acc[detail._id] = detail;
          return acc;
        }, {});

        setBidDetails(detailsMap);
      } catch (err) {
        setError('No Counter Bids');
      } finally {
        setLoading(false);
      }
    };

    fetchRanks();
  }, [user?.id]);

  const fetchBidDetails = async (bidId) => {
    const url = `${BASE_URL}/bids/${bidId}`;
    try {
      const response = await axios.get(url);
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching details for bid_id ${bidId}:`, error);
      return null; // Return null if there's an error
    }
  };

  return (
    <>
      <TransportNavBar />
      <div className="container">
        <h2 className="title">My Ranks</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <div className="rank-list">
            {ranks.map((rank) => (
              <div key={rank.bid_id} className="rank-item">
                <h3>Bid ID: {rank.bid_id}</h3>
                <p>Vendor Price: ₹{rank.Vendor_price}</p>
                <p>Vendor Rank: {rank.Vendor_rank}</p>
                <p>Bidding Count: {rank.vendor_bidding_count}</p>
                <p>Status: {rank.status}</p>
                <p>Loading Date: {new Date(rank.loading_date).toLocaleDateString()}</p>

                {/* Display additional bid details if available */}
                {bidDetails[rank.bid_id] && (
                  <div className="bid-details">
                    <p>Loading City: {bidDetails[rank.bid_id].loading_city}</p>
                    <p>Loading State: {bidDetails[rank.bid_id].loading_state}</p>
                    <p>Unloading City: {bidDetails[rank.bid_id].unloading_city}</p>
                    <p>Unloading State: {bidDetails[rank.bid_id].unloading_state}</p>
                    <p>Vehicle Type: {bidDetails[rank.bid_id].vehicle_type}</p>
                    <p>Vehicle Size: {bidDetails[rank.bid_id].vehicle_size}</p>
                    <p>Material Type: {bidDetails[rank.bid_id].material_type}</p>
                    <p>Material Weight: {bidDetails[rank.bid_id].material_weight} MT</p>
                    <p>Route Distance: {bidDetails[rank.bid_id].route_distance} km</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Basic CSS styling */}
      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .title {
          text-align: center;
          margin-bottom: 20px;
          color: #5E81F4;
        }
        .rank-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .rank-item {
          padding: 15px;
          border-radius: 8px;
          background-color: #f0f4ff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .rank-item:hover {
          transform: translateY(-5px);
        }
        .rank-item h3 {
          margin-bottom: 10px;
          color: #333;
        }
        .rank-item p {
          margin: 5px 0;
          color: #555;
        }
        .bid-details {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #ccc;
        }
        .bid-details p {
          color: #444;
        }
        .error {
          color: red;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default TransporterCounter;
