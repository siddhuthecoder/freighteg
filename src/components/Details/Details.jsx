import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import './Details.css';
import { useSelector } from 'react-redux';

const Details = () => {
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.login.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://freighteg.in/freightapi/dashboard/?company_id=${user?.id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="details-container">
        <h1 className="section-title">All Bids Status</h1>
        <div className="status-container">
          {[
            { title: 'Total Bids', value: data.totalBids, color: '#5585b5' },
            { title: 'Live Bids', value: data.liveBids, color: '#53a8b6' },
            { title: 'Result Bids', value: data.resultBids, color: '#79c2d0' },
            { title: 'Cancelled Bids', value: data.cancelledBids, color: '#d9534f' },
            { title: 'Counter Bids', value: data.counterBids, color: '#6a0d91' },
          ].map((item, index) => (
            <div key={index} className="status-box" style={{ borderColor: item.color }}>
              <h2>{item.title}</h2>
              <p style={{ color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title">Bid Response</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vendors</th>
                <th>Count</th>
                <th>Avg Target Price</th>
                <th>Avg Vehicle Placement Price</th>
                <th>Overall Avg Bidding Price</th>
                <th>Matched Bids Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data.biddingData).map(key => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{data.biddingData[key].count}</td>
                  <td>{data.biddingData[key].avgTargetPrice}</td>
                  <td>{data.biddingData[key].avgVehiclePlacementPrice}</td>
                  <td>{data.biddingData[key].overallAvgBiddingPrice}</td>
                  <td>{data.biddingData[key].matchedBidsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Details;
