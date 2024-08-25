import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import Header from "../repeats/Header";
import OpenTable from './OpenTable';

import Tabs from '../repeats/Tabs';
import Navbar from '../repeats/Navbar';
import { useSelector } from "react-redux";

const Open = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataHandling, setDataHandling] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const user = useSelector((state) => state.login.user);

  const fetchLiveBids = async () => {
    const url = `https://freighteg.in/freightapi/liveBids?company_id=6655811253ccced940826a99`;
    try {
      const response = await axios.get(url);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching live bids:", error);
      setError("Failed to fetch live bids");
      setLoading(false);
      return []; // Return an empty array if there's an error
    }
  };

  const fetchBidDetails = async (bidId) => {
    const url = `https://freighteg.in/freightapi/bids/${bidId}`;
    try {
      const response = await axios.get(url);
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching details for bid_id ${bidId}:`, error);
      setError(`Failed to fetch details for bid_id ${bidId}`);
      return null; // Return null if there's an error
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

  const fetchPageUsers = async (bidIds) => {
    const url = `https://freighteg.in/freightapi/pageusers`;
    try {
      const response = await axios.post(url, { bidIds });
      return response.data || [];
    } catch (error) {
      console.error("Error fetching page users:", error);
      return []; // Return an empty array if there's an error
    }
  };

  const getAllBidDetails = async () => {
    setLoading(true);
    const bids = await fetchLiveBids();
    if (bids.length > 0) {
      const allBidDetails = [];
      for (const bid of bids) {
        const bidDetail = await fetchBidDetails(bid.bid_id);
        if (bidDetail) {
          const createdByUser = await fetchFreightUserData(bidDetail.created_by);
          const assignedToUser = await fetchFreightUserData(bidDetail.assigned_to);

          const pageUsersData = await fetchPageUsers([bid.bid_id]);

          const mergedData = {
            ...bidDetail,
            createdByUser,
            assignedToUser,
            viewedBy: pageUsersData || [],
          };
          allBidDetails.push(mergedData);
        }
      }
      setBidDetails(allBidDetails);
    } else {
      console.log("No bids found.");
      setError("No bids found.");
    }
    setLoading(false);
  };

  const handleFormSubmit = (formData) => {
    setDataHandling(formData);
  };

  useEffect(() => {
    getAllBidDetails();
  }, []);

  useEffect(() => {
    const { searchTerm, selectedOption, startDate, endDate } = dataHandling;

    const filtered = bidDetails.filter(item => {
      const matchesSearchTerm = searchTerm ? item.bidNo.includes(searchTerm) : true;
      const matchesOption = selectedOption ? item.vehicle_type === selectedOption : true;
      const matchesStartDate = startDate ? new Date(item.loading_date) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(item.loading_date) <= new Date(endDate) : true;

      return matchesSearchTerm && matchesOption && matchesStartDate && matchesEndDate;
    });

    setFilteredData(filtered);
  }, [dataHandling, bidDetails]);

  const handleDownloadClick = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bids");
    XLSX.writeFile(workbook, "BidsData.xlsx");
  };

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
      <Navbar />
      <Header onSubmit={handleFormSubmit} />
      <div className="w-full overflow-x-auto">
        <Tabs onDownloadClick={handleDownloadClick} onFilterClick={() => { /* Handle filter click if needed */ }} />
      </div>
      <div className="w-full flex flex-col overflow-x-auto">
        <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
          <div className="font-semibold md:text-lg ps-[30px]">ID</div>
          <div className="font-semibold md:text-lg ps-[30px]">Date</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading</div>
          <div className="font-semibold md:text-lg ps-[30px]">Unloading</div>
          <div className="font-semibold md:text-lg ps-[30px]">Details</div>
          <div className="font-semibold md:text-lg ps-[30px]">Best Quote</div>
        </div>
        <OpenTable datas={filteredData} />
      </div>
    </>
  );
};

export default Open;
