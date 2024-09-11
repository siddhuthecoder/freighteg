import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import Header from '../repeats/Header';
import ResultTable from './ResultTable';
import Tabs from '../repeats/Tabs';
import Navbar from '../../../components/Navbar';
import { CountsContext } from '../repeats/CountsContext';
import { useContext } from 'react';

const ResultPage = () => {
  const { counts } = useContext(CountsContext);
  const resultCount = counts.result
  // console.log("history count :",resultCount)
  const [bidDetails, setBidDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, settotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataHandling, setDataHandling] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [responseData, setResponse] = useState([]);
  const user = useSelector((state) => state.login.user);

  // Function to fetch bid details
  const fetchBidDetails = async () => {
    const branchId = localStorage.getItem('branch_id');
    const branchName = localStorage.getItem('branchName');
    const url = branchId && branchName !== 'ALL'
      ? `https://freighteg.in/freightapi/getBidResults?branch_id=${branchId}&page=${currentPage}&limit=5`
      : `https://freighteg.in/freightapi/getBidResults?company_id=${user?.id}&page=${currentPage}&limit=5`;
    try {
      const response = await axios.get(url);
      // alert(JSON.stringify(response.data))
      setResponse(response.data.data);
      settotalPages(Math.ceil(resultCount / itemsPerPage));
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
      return null; // Return null if there's an error
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
      return null; // Return null if there's an error
    }
  };

  const getAllBidDetails = async () => {
    const bids = await fetchBidDetails();
    if (bids && bids.length > 0) {
      const allBidDetails = [];
      for (const bid of bids) {
        const bidDetail = await fetchBidData(bid.bid_id);
        if (bidDetail) {
          const createdByUser = await fetchFreightUserData(bidDetail.created_by);
          const assignedToUser = await fetchFreightUserData(bidDetail.assigned_to);

          const mergedData = {
            ...bidDetail,
            createdByUser,
            assignedToUser,
            vendorPrice: bid.vendorPrice,
            vendor_id: bid.vendor_id,
            vendorRank: bid.vendorRank,
            vehicleDetails: bid.vehicleDetails,
            target_price: bid.target_price,
            allVendorBids: bid.allVendorBids,
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
  }, [currentPage]);

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

  const handleFormSubmit = (formData) => {
    setDataHandling(formData);
  };

  const handleDownloadClick = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
  
    // Convert the filtered data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "BidsData");
  
    // Generate a binary string of the workbook
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    // Create a Blob from the binary string
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
  
    // Create a link element
    const link = document.createElement("a");
  
    // Set the download attribute with the desired file name
    link.download = "BidsData.xlsx";
  
    // Create a URL for the Blob and set it as the href of the link
    link.href = window.URL.createObjectURL(blob);
  
    // Append the link to the document body
    document.body.appendChild(link);
  
    // Programmatically trigger a click on the link to trigger the download
    link.click();
  
    // Remove the link from the document
    document.body.removeChild(link);
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Navbar />
      <Header onSubmit={handleFormSubmit} />
      <div className="w-full overflow-x-auto">
        <Tabs onDownloadClick={handleDownloadClick} onFilterClick={() => { /* Handle filter click if needed */ }} />
      </div>
      <div className="w-full h-[75vh]  flex flex-col overflow-x-auto  bg-white">
        <div className="bg-[#9D9D9D21] w-[97%] h-[50px] shadow items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
          <div className="font-semibold md:text-lg ps-[30px]">ID</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading Date</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading Point</div>
          <div className="font-semibold md:text-lg ps-[30px]">Unloading Point</div>
          <div className="font-semibold md:text-lg ps-[30px]">Details</div>
          <div className="font-semibold md:text-lg ps-[30px]">Best Quote</div>
        </div>
        {loading ? (
          <div className="text-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        ) : (
          <ResultTable datas={filteredData} />
        )}
        {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
      </div>
    </>
  );
};

export default ResultPage;
