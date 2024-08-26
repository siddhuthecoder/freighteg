import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import Header from '../repeats/Header';
import Tabs from '../repeats/Tabs';
import CancelledTable from './CancelledTable';
import Navbar from '../../../components/Navbar';

const Cancelled = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const companyId = localStorage.getItem('company_Id');
  console.log(companyId)

  const [error, setError] = useState(null);
  const [dataHandling, setDataHandling] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const user = useSelector((state) => state.login.user);

  const fetchBidIdsAndDetails = async () => {
    const url = `https://freighteg.in/freightapi/counters?company_id=${user.id}`;
    try {
      const response = await axios.get(url);
      const bidsData = response.data.data;

      const bidEntries = Object.entries(bidsData);
      return bidEntries.map(([bidId, detailsArray]) => ({
        bidId,
        details: detailsArray[0],
      }));
    } catch (error) {
      console.error('Error fetching bid IDs and details:', error);
      setError('Failed to fetch bid IDs and details');
      setLoading(false);
      return [];
    }
  };

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
      return response.data || [];
    } catch (error) {
      console.error("Error fetching page users:", error);
      return []; // Return an empty array if there's an error
    }
  };

  const getAllBidDetails = async () => {
    const bids = await fetchBidIdsAndDetails();
    if (bids && bids.length > 0) {
      const allBidDetails = [];
      for (const bid of bids) {
        const bidDetail = await fetchBidDetails(bid.bidId);
        if (bidDetail) {
          const createdByUser = await fetchFreightUserData(bidDetail.created_by);
          const assignedToUser = await fetchFreightUserData(bidDetail.assigned_to);
          const pageUsersData = await fetchPageUsers([bid.bidId]);
          const mergedData = {
            ...bidDetail,
            createdByUser,
            assignedToUser,
            counters: bid.details,
            viewedBy: pageUsersData || [],
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
    setDataHandling(formData);
  };

  const handleDownloadClick = () => {
    // Convert filtered data to a plain text string (JSON format for readability)
    const textData = JSON.stringify(filteredData, null, 2);
  
    // Create a Blob object with the text data
    const blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
  
    // Create a link element
    const link = document.createElement("a");
  
    // Set the download attribute with the desired file name
    link.download = "BidsData.txt";
  
    // Create a URL for the Blob and set it as the href of the link
    link.href = window.URL.createObjectURL(blob);
  
    // Append the link to the document body
    document.body.appendChild(link);
  
    // Programmatically trigger a click on the link to trigger the download
    link.click();
  
    // Remove the link from the document
    document.body.removeChild(link);
  };
  
  return (
    <>
      <Navbar />
      <Header onSubmit={handleFormSubmit} />
      <div className="w-full overflow-x-auto">
        <Tabs onDownloadClick={handleDownloadClick} tabname="cancelled" length={filteredData.length} onFilterClick={() => { }} />
      </div>
      <div className="w-full flex flex-col overflow-x-auto">
        <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
        <div className="font-semibold md:text-lg ps-[30px]">ID</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading Date</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading Point </div>
          <div className="font-semibold md:text-lg ps-[30px]">Unloading Point</div>
          <div className="font-semibold md:text-lg ps-[30px]">Details</div>
          <div className="font-semibold md:text-lg ps-[30px]">Best Quote</div>
        </div>
        {loading ? (
        <div className="text-center my-4">
          {/* Loading spinner */}
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          {/* Loading text */}
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      ) : (
        <CancelledTable datas={filteredData} />
      )}
      </div>
    </>
  );
};

export default Cancelled;
