import React, { useEffect, useState } from 'react';
import TransportNavBar from '../TransportNavBar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NewLoadTable from './NewLoadTable';

const BASE_URL = 'https://freighteg.in/freightapi'; // Replace with your actual BASE_URL

const NewLoad = () => {
  const [vendorBids, setVendorBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.login.user);
  const fetchVendorBid = async () => {
    setVendorBids([]);
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/bids`, {
        params: {
          vendorId: user?.id,
        },
      });

      if (response?.status === 200) {
        const validBids = response?.data?.validBids || [];
        
        const detailedBids = await Promise.all(validBids.map(async (bid) => {
          await handlePageVisit(bid.bidId);
          const bidDetails = await fetchBidDetails(bid.bidId);
          const createdByUser = await fetchFreightUserData(bidDetails.created_by);
          const assignedToUser = await fetchFreightUserData(bidDetails.assigned_to);
          const companyName=await getCompanyName(bidDetails.company_id)
          return { ...bid, details: bidDetails ,createdByUser,assignedToUser,companyName};
        }));

        setVendorBids(detailedBids);
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error fetching vendor bids:", error);
      const errorMessage = error?.response?.data?.error || "Something went wrong or no data found!!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const fetchFreightUserData = async (userId) => {
    const url = `https://freighteg.in/freightapi/freightusers/${userId}`;
    try {
      const response = await axios.get(url);
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching user data for id ${userId}:`, error);
      return null; // Return null if there's an error
    }
  };
  
  const handlePageVisit = async (bidNo) => {
    const url = `${BASE_URL}/page-visit`;
    const body = {
      bidNo: bidNo,
      vendorId: user?.id,
    };

    try {
      const response = await axios.post(url, body);

      if (response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Page visit logged successfully:", response.data);
    } catch (error) {
      console.error("Error logging page visit:", error);
    }
  };
  async function getCompanyName(companyId) {
    const apiUrl = `https://freighteg.in/freightapi/get-companies/${companyId}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const companyData = await response.json();
      return companyData.name; // Return the company name
    } catch (error) {
      console.error('Error fetching company data:', error);
      return null;
    }
  }
  
  
  
  
  
  
  
  
  

  const fetchBidDetails = async (bidId) => {
    const url = `${BASE_URL}/bids/${bidId}`;
    try {
      const response = await axios.get(url);
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching details for bid_id ${bidId}:`, error);
      setError(`Failed to fetch details for bid_id ${bidId}`);
      return null;
    }
  };

  useEffect(() => {
    fetchVendorBid();
  }, []);

  return (
    <>
      <TransportNavBar />
      <div className="w-full flex flex-col overflow-x-auto  bg-white">
        <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
          <div className="font-semibold md:text-lg ps-[30px]">ID</div>
          <div className="font-semibold md:text-lg ps-[30px]">Date</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading</div>
          <div className="font-semibold md:text-lg ps-[30px]">Unloading</div>
          <div className="font-semibold md:text-lg ps-[30px]">Details</div>
          <div className="font-semibold md:text-lg ps-[30px]">Bid Now</div>
        </div>
        {loading ? (
        <div className="text-center my-4">
          {/* Loading spinner */}
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          {/* Loading text */}
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      ) : (
        // <CounterTable datas={filteredData} />
        <NewLoadTable datas={vendorBids}  />
      )}
      </div>
      
    </>
  );
};

export default NewLoad;
