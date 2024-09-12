import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import Header from '../repeats/Header';
import HistoryTable from './HistoryTable';
import Tabs from '../repeats/Tabs';
import BranchNavbar from '../../BranchNavbar';
import { useContext } from 'react';
import { CountsContext } from '../../../components/bid/repeats/CountsContext';


const BranchHistory = () => {
  const { counts } = useContext(CountsContext);


  
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // const totalPages = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataHandling, setDataHandling] = useState({});
  const user = useSelector((state) => state.login.user);
  // const [datas, setdatas] = useState(null);
  // Function to get all bid details and merge with user and assigned_to data
  const getAllBidDetails = async () => {
    setLoading(true)
    const bids = await fetchBidResultHistory();
    
    if (bids && bids.length > 0) {
      const allBidDetails = [];
      for (const bid of bids) {
        const bidDetail = await fetchBidDetails(bid.bid_id);
        if (bidDetail) {
          const createdByUser = await fetchFreightUserData(
            bidDetail.created_by
          );
          const assignedToUser = await fetchFreightUserData(
            bidDetail.assigned_to
          ); // Fetch assigned_to data

          const mergedData = {
            ...bidDetail,
            createdByUser, // Embed created_by user data
            assignedToUser, // Embed assigned_to user data
            vendorPrice: bid.vendorPrice,
            vendor_idd: bid.vendor_id, // Merge additional data
            vendorRank: bid.vendorRank, // Merge additional data
            vehicleDetails: bid.vehicleDetails, // Merge additional data
            target_price: bid.target_price, // Merge target price
            allVendorBids: bid.allVendorBids,
            // Merge vendor bids
          };
          allBidDetails.push(mergedData);
        }
      }
      setBidDetails(allBidDetails);
      setFilteredData(allBidDetails);
  
    } else {
      console.log("No bids found.");
      setError("No bids found.");
    }
    setLoading(false);
  };
  // Function to fetch bid details using bid_id


  // Function to fetch bid result history
  const fetchBidResultHistory = async () => {
    const branchId = localStorage.getItem("branch_id");
    // const url = `https://freighteg.in/freightapi/getBidResultHistory?company_id=${user?.id}`;
    const url =  `https://freighteg.in/freightapi/getBidResultHistory?branch_id=${branchId}&page=${currentPage}&limit=5`
    try {
      const response = await axios.get(url);
      console.log({ currentPage });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching bid result history:", error);
      setError("Failed to fetch bid result history");
      setLoading(false);
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

  // Function to fetch freight user data using created_by id
  const fetchFreightUserData = async (userId) => {
    const url = `https://freighteg.in/freightapi/freightusers/${userId}`;
    try {
      const response = await axios.get(url);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user data for id ${userId}:`, error);
      setError(`Failed to fetch user data for id ${userId}`);
      setLoading(false);
    }
  };

  // Function to handle form submission for filtering data
  const handleFormSubmit = (formData) => {
    console.log(formData);
    setDataHandling(formData);
  };

  // Effect to filter data based on user inputs
  useEffect(() => {
    const { searchTerm, selectedOption, startDate, endDate } = dataHandling;

    const filtered = bidDetails.filter((item) => {
      const matchesSearchTerm = searchTerm
        ? item.bidNo.includes(searchTerm)
        : true;
      const matchesOption = selectedOption
        ? item.vehicle_type === selectedOption
        : true;
      const matchesStartDate = startDate
        ? new Date(item.loading_date) >= new Date(startDate)
        : true;
      const matchesEndDate = endDate
        ? new Date(item.loading_date) <= new Date(endDate)
        : true;

      return (
        matchesSearchTerm && matchesOption && matchesStartDate && matchesEndDate
      );
    });

    setFilteredData(filtered);
  }, [dataHandling, bidDetails]);

  // Function to handle downloading filtered data as Excel file
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
  useEffect(() => {
    const branchId = localStorage.getItem("branch_id");
    const url =  `https://freighteg.in/freightapi/getBidResultHistory?branch_id=${branchId}&page=${currentPage}&limit=5`
    async function getCount() {
      const [historyRes] = await Promise.all([fetch(`${url}`)]);

      const historyData = await historyRes.json();
      // alert(historyData.totalBids)
      settotalPages(Math.ceil(historyData.totalBids / itemsPerPage));

    }
    getCount();
    getAllBidDetails();
  }, [currentPage]);
  // useEffect(() => {
  //   async function getData() {
  //     await getAllBidDetails();
  //   }
  //   getData();
  // }, []);

  console.log("filtered data : ",filteredData)
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <BranchNavbar />
      <Header onSubmit={handleFormSubmit} />
      <div className="w-full overflow-x-auto">
        <Tabs
          onDownloadClick={handleDownloadClick}
          onFilterClick={() => {
            /* Handle filter click if needed */
          }}
        />
      </div>
      <div className="w-full flex flex-col overflow-x-auto  bg-white">
        <div className=" bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2  rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
          <div className="font-semibold md:text-lg ps-[30px]">ID</div>
          <div className="font-semibold md:text-lg ps-[30px]">Loading Date</div>
          <div className="font-semibold md:text-lg ps-[30px]">
            Loading Point{" "}
          </div>
          <div className="font-semibold md:text-lg ps-[30px]">
            Unloading Point
          </div>
          <div className="font-semibold md:text-lg ps-[30px]">Details</div>
          <div className="font-semibold md:text-sm ps-[30px]">Bid Result</div>
        </div>
        {loading ? (
          <div className="text-center my-4">
            {/* Loading spinner */}
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            {/* Loading text */}
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        ) : (
          <HistoryTable datas={filteredData} />
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


export default BranchHistory;
