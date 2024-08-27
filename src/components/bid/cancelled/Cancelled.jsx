// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import Header from '../repeats/Header';
// import Tabs from '../repeats/Tabs';
// import CancelledTable from './CancelledTable';
// import Navbar from '../../../components/Navbar';

// const Cancelled = () => {
//   const [bidDetails, setBidDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [dataHandling, setDataHandling] = useState({});
//   const [filteredData, setFilteredData] = useState([]);
  
//   const user = useSelector((state) => state.login.user);
//   const companyId = localStorage.getItem('branch_id');

//   // Use companyId instead of user?.id in the API request
//   // const fetchBidIdsAndDetails = async () => {
//   //   const url = `https://freighteg.in/freightapi/cancelledBids?company_id=${user?.id}`;
//   //   try {
//   //     const response = await axios.get(url);
//   //     const bidsData = response.data.data;
//   //     console.log(response.data.data)
//   //     // Ensure bidsData exists and has entries before proceeding
//   //     if (bidsData && Object.keys(bidsData).length > 0) {
//   //       const bidEntries = Object.entries(bidsData);
//   //       return bidEntries.map(([bidId, detailsArray]) => ({
//   //         bidId,
//   //         details: detailsArray[0],
//   //       }));
//   //     } else {
//   //       setError('No bids found.');
//   //       setLoading(false);
//   //       return [];
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching bid IDs and details:', error);
//   //     setError('Failed to fetch bid IDs and details');
//   //     setLoading(false);
//   //     return [];
//   //   }
//   // };

//     // Function to fetch bid IDs and their corresponding details
//     const fetchBidIdsAndDetails = async () => {
//       // const url = `https://freighteg.in/freightapi/counters?company_id=${user?.id}`;
//       const branchId = localStorage.getItem('branch_id');
//       // const url = `https://freighteg.in/freightapi/getBidResultHistory?company_id=${user?.id}`;
//       const url = branchId && branchId !== user?.id
//       ? `https://freighteg.in/freightapi/counters?branch_id=${branchId}`
//       : `https://freighteg.in/freightapi/counters?company_id=${user?.id}`;
//       try {
//         const response = await axios.get(url);
//         const bidsData = response.data.data;
//         console.log(bidsData)
  
//         // Extracting bid IDs and their details from the nested structure
//         const bidEntries = Object.entries(bidsData);
//         return bidEntries.map(([bidId, detailsArray]) => ({
//           bidId,
//           details: detailsArray[0], // Assuming you want the first item from the array of details
//         }));
//       } catch (error) {
//         console.error('Error fetching bid IDs and details:', error);
//         setError('Failed to fetch bid IDs and details');
//         setLoading(false);
//         return [];
//       }
//     };
  

//   const fetchBidDetails = async (bidId) => {
//     const url = `https://freighteg.in/freightapi/bids/${bidId}`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching details for bid_id ${bidId}:`, error);
//       setError(`Failed to fetch details for bid_id ${bidId}`);
//       setLoading(false);
//       return null; // Return null if there's an error
//     }
//   };

//   const fetchFreightUserData = async (userId) => {
//     const url = `https://freighteg.in/freightapi/freightusers/${userId}`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching user data for id ${userId}:`, error);
//       setError(`Failed to fetch user data for id ${userId}`);
//       setLoading(false);
//       return null; // Return null if there's an error
//     }
//   };

//   const fetchPageUsers = async (bidIds) => {
//     const url = `https://freighteg.in/freightapi/pageusers`;
//     try {
//       const response = await axios.post(url, { bidIds });
//       return response.data || [];
//     } catch (error) {
//       console.error("Error fetching page users:", error);
//       return []; // Return an empty array if there's an error
//     }
//   };

//   const getAllBidDetails = async () => {
//     const bids = await fetchBidIdsAndDetails();
//     if (bids && bids.length > 0) {
//       const allBidDetails = [];
//       for (const bid of bids) {
//         const bidDetail = await fetchBidDetails(bid.bidId);
//         if (bidDetail) {
//           const createdByUser = await fetchFreightUserData(bidDetail.created_by);
//           const assignedToUser = await fetchFreightUserData(bidDetail.assigned_to);
//           const pageUsersData = await fetchPageUsers([bid.bidId]);
//           const mergedData = {
//             ...bidDetail,
//             createdByUser,
//             assignedToUser,
//             counters: bid.details,
//             viewedBy: pageUsersData || [],
//           };
//           allBidDetails.push(mergedData);
//         }
//       }
//       setBidDetails(allBidDetails);
//     } else {
//       console.log('No bids found.');
//       setError('No bids found.');
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (user && companyId) {
//       getAllBidDetails();
//     } else {
//       setError('User or company ID not available.');
//       setLoading(false);
//     }
//   }, [user, companyId]);

//   useEffect(() => {
//     const { searchTerm, selectedOption, startDate, endDate } = dataHandling;

//     const filtered = bidDetails.filter(item => {
//       const matchesSearchTerm = searchTerm ? item._id.includes(searchTerm) : true;
//       const matchesOption = selectedOption ? item.vehicle_type === selectedOption : true;
//       const matchesStartDate = startDate ? new Date(item.loading_date) >= new Date(startDate) : true;
//       const matchesEndDate = endDate ? new Date(item.loading_date) <= new Date(endDate) : true;

//       return matchesSearchTerm && matchesOption && matchesStartDate && matchesEndDate;
//     });

//     setFilteredData(filtered);
//   }, [dataHandling, bidDetails]);

//   const handleFormSubmit = (formData) => {
//     setDataHandling(formData);
//   };

//   const handleDownloadClick = () => {
//     const textData = JSON.stringify(filteredData, null, 2);
//     const blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
//     const link = document.createElement("a");
//     link.download = "BidsData.txt";
//     link.href = window.URL.createObjectURL(blob);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <>
//       <Navbar />
//       <Header onSubmit={handleFormSubmit} />
//       <div className="w-full overflow-x-auto">
//         <Tabs onDownloadClick={handleDownloadClick} tabname="cancelled" length={filteredData.length} onFilterClick={() => { }} />
//       </div>
//       <div className="w-full flex flex-col overflow-x-auto">
//         <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
//           <div className="font-semibold md:text-lg ps-[30px]">ID</div>
//           <div className="font-semibold md:text-lg ps-[30px]">Loading Date</div>
//           <div className="font-semibold md:text-lg ps-[30px]">Loading Point </div>
//           <div className="font-semibold md:text-lg ps-[30px]">Unloading Point</div>
//           <div className="font-semibold md:text-lg ps-[30px]">Details</div>
//           <div className="font-semibold md:text-lg ps-[30px]">Best Quote</div>
//         </div>
//         {loading ? (
//           <div className="text-center my-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
//             <p className="text-gray-600 mt-2">Loading...</p>
//           </div>
//         ) : (
//           <CancelledTable datas={filteredData} />
//         )}
//       </div>
//     </>
//   );
// };

// export default Cancelled;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import Header from '../repeats/Header';
// import CounterTable from './CounterTable';
import CancelledTable from './CancelledTable'
import Tabs from '../repeats/Tabs';
import Navbar from '../../../components/Navbar';


const Cancelled = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataHandling, setDataHandling] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const user = useSelector((state) => state.login.user);

  // Function to fetch bid IDs and their corresponding details
  const fetchBidIdsAndDetails = async () => {
    // const url = `https://freighteg.in/freightapi/counters?company_id=${user?.id}`;
    const branchId = localStorage.getItem('branch_id');
    // const url = `https://freighteg.in/freightapi/getBidResultHistory?company_id=${user?.id}`;
    const url = branchId && branchId !== user?.id
    ? `https://freighteg.in/freightapi/cancelledBids?branch_id=${branchId}`:
    `https://freighteg.in/freightapi/cancelledBids?company_id=${user?.id}`
    try {
      // debugger;
      console.log({url})
      // alert(url)
      const response = await axios.get(url);
      const bidsData = response.data.data;
      // console.log({bidsData})
      return bidsData;
    // alert(bidsData)
      // Extracting bid IDs and their details from the nested structure
      // const bidEntries = Object.entries(bidsData);
      // console.log({bidEntries})
      // return bidEntries.map(([bid_id, detailsArray]) => ({
      //   bid_id,
      //   // details: detailsArray[0], // Assuming you want the first item from the array of details
      // }));
      
    } catch (error) {
      console.error('Error fetching bid IDs and details:', error);
      setError('Failed to fetch bid IDs and details');
      setLoading(false);
      return [];
    }
  };

  // Function to fetch bid details using bid_id
  const fetchBidDetails = async (bidId) => {
    // alert(bidId)
    console.log(bidId)
    const url = `https://freighteg.in/freightapi/bids/${bidId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // alert("Here is the error")
      console.error(`Error fetching details for bid_id ${bidId}:`, error);
      setError(`Failed to fetch details for bid_id ${bidId}`);
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
    const bids = await fetchBidIdsAndDetails();
    if (bids && bids.length > 0) {
      
      // alert({bids})
      console.log({bids})
      const allBidDetails = [];
      for (const bid of bids) {
        // console.log(bid)
        const bidDetail = await fetchBidDetails(bid.bid_id);
        
        if (bidDetail) {
          const createdByUser = await fetchFreightUserData(bidDetail.created_by);
          const assignedToUser = await fetchFreightUserData(bidDetail.assigned_to);

          const mergedData = {
            ...bidDetail,
            createdByUser,  // Embed created_by user data
            assignedToUser, // Embed assigned_to user data
            counters: bid.details, // Include the counter details from the nested structure
          };
          allBidDetails.push(mergedData);
        }
      }
      setBidDetails(allBidDetails);
    } else {
      // console.log('No bids found.');
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
      const matchesSearchTerm = searchTerm ? item.bidNo.includes(searchTerm) : true;
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
          <div className="font-semibold md:text-lg ps-[30px]">Bid Assigned</div>
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

