// src/components/Details.js

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';

const Details = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://freighteg.in/freightapi/dashboard')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Bidding Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Bids</h2>
            <p>{data.totalBids}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Live Bids</h2>
            <p>{data.liveBids}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Result Bids</h2>
            <p>{data.resultBids}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Cancelled Bids</h2>
            <p>{data.cancelledBids}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Counter Bids</h2>
            <p>{data.counterBids}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Bidding Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Vendors</th>
                <th className="py-2 px-4 border-b">Count</th>
                <th className="py-2 px-4 border-b">Avg Target Price</th>
                <th className="py-2 px-4 border-b">Avg Vehicle Placement Price</th>
                <th className="py-2 px-4 border-b">Overall Avg Bidding Price</th>
                <th className="py-2 px-4 border-b">Matched Bids Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data.biddingData).map(key => (
                <tr key={key}>
                  <td className="py-2 px-4 border-b">{key}</td>
                  <td className="py-2 px-4 border-b">{data.biddingData[key].count}</td>
                  <td className="py-2 px-4 border-b">{data.biddingData[key].avgTargetPrice}</td>
                  <td className="py-2 px-4 border-b">{data.biddingData[key].avgVehiclePlacementPrice}</td>
                  <td className="py-2 px-4 border-b">{data.biddingData[key].overallAvgBiddingPrice}</td>
                  <td className="py-2 px-4 border-b">{data.biddingData[key].matchedBidsCount}</td>
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
