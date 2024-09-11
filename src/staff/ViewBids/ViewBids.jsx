import React, { useEffect, useState } from "react";
import axios from "axios";
import OpenTable from "./OpenTable";
import Header from '../../components/bid/repeats/Header';
import { useSelector } from "react-redux";
import StaffNavbar from '../StaffNavBarr';

const ViewBids = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.login.user);

  // Function to fetch freight user data
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

  // Function to fetch company name by company ID
  const getCompanyName = async (companyId) => {
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
  };

  // Fetch active bids and additional data
  const fetchActiveBids = async () => {
    const url = `https://freighteg.in/freightapi/activeBids/${user.id}`;
    try {
      const response = await axios.get(url);
      const bids = response.data.data || [];

      // Fetch additional details for each bid
      const detailedBids = await Promise.all(bids.map(async (bid) => {
        const bidDetails = bid; // Assuming bid contains the details directly

        // Fetch created by and assigned to users, as well as company name
        const createdByUser = await fetchFreightUserData(bidDetails.created_by);
        const assignedToUser = await fetchFreightUserData(bidDetails.assigned_to);
        const companyName = await getCompanyName(bidDetails.company_id);

        return {
          ...bidDetails,
          createdByUser,
          assignedToUser,
          companyName,
        };
      }));

      setBidDetails(detailedBids);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveBids();
  }, []);

  return (
    <>
      <StaffNavbar />
      <div className="w-full flex flex-col overflow-x-auto bg-white">
        <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
          <div className="font-semibold md:text-lg ps-[30px]">ID</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading Date</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading Point</div>
          <div className="font-semibold md:text-lg ps-[30px]">Unloading Point</div>
          <div className="font-semibold md:text-lg ps-[30px]">Details</div>
          <div className="font-semibold md:text-lg ps-[30px]">Assigned Vendor</div>
        </div>
        {loading ? (
          <div className="text-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center my-4 text-red-600">
            <p>{error}</p>
          </div>
        ) : (
          <OpenTable datas={bidDetails} />
        )}
      </div>
    </>
  );
}

export default ViewBids;
