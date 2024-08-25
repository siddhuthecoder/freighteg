import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import Header from '../repeats/Header';
import ResultTable from './ResultTable';
import Tabs from '../repeats/Tabs';
import Navbar from '../repeats/Navbar';

const ResultPage = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataHandling, setDataHandling] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const user = useSelector((state) => state.login.user);

  // Function to fetch bid details
  const fetchBidDetails = async () => {
    const url = `https://freighteg.in/freightapi/getBidResults?company_id=${user?.id}`;
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching bid details:', error);
      setError('Failed to fetch bid details');
      setLoading(false);
      return [];
    }
  };

  // Function to fetch individual bid data using bid_id
  const fetchBidData = async (bidId) => {
    const url = `https://freighteg.in/freightapi/bids/${bidId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for bid_id ${bidId}:`, error);
      setError(`Failed to fetch data for bid_id ${bidId}`);
      setLoading(false);
    }
  };

  // Function to fetch freight user data using created_by or assigned_to id
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
    const bids = await fetchBidDetails();
    if (bids && bids.length > 0) {
      const allBidDetails = [];
      for (const bid of bids) {
        const bidDetail = await fetchBidData(bid.bid_id);
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

  useEffect(() => {
    getAllBidDetails();
  }, []);

  useEffect(() => {
    const { searchTerm, selectedOption, startDate, endDate } = dataHandling;

    const filtered = bidDetails.filter(item => {
      const matchesSearchTerm = searchTerm ? item._id.includes(searchTerm) : true;
      const matchesOption = selectedOption ? item.vehicle_type === selectedOption : true;
      const matchesStartDate = startDate ? new Date(item.loading_date) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(item.loading_date) <= new Date(endDate) : true;

      return matchesSearchTerm && matchesOption && matchesStartDate && matchesEndDate;
    });

    setFilteredData(filtered);
  }, [dataHandling, bidDetails]);

  const handleFormSubmit = (formData) => {
    console.log(formData);
    setDataHandling(formData);
  };

  const handleDownloadClick = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bids");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "BidsData.xlsx");
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (bidDetails.length === 0) {
    return <div className="text-center">No bid details found.</div>;
  }

  return (
    <>
      <Navbar />
      <Header onSubmit={handleFormSubmit} />
      <div className="w-full overflow-x-auto">
        <Tabs onDownloadClick={handleDownloadClick} onFilterClick={() => { /* Handle filter click if needed */ }} />
      </div>
      <div className="w-full flex flex-col overflow-x-auto">
        <div className=" bg-[#9D9D9D21] w-[97%] h-[50px] shadow items-center ps-2 mt-2  rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
          <div className="font-semibold md:text-sm ps-[30px]">ID</div>
          <div className="font-semibold md:text-sm ps-[30px]">Date</div>
          <div className="font-semibold md:text-sm ps-[30px]">Loading</div>
          <div className="font-semibold md:text-sm ps-[30px]">Unloading</div>
          <div className="font-semibold md:text-sm ps-[30px]">Details</div>
          <div className="font-semibold md:text-sm ps-[30px]">Bid Result</div>
        </div>
        <ResultTable datas={filteredData} />
      </div>
    </>
  );
};

export default ResultPage;
