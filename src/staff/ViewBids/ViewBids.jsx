import React, { useEffect, useState } from "react";
import axios from "axios";
// import OpenTable from "../../components/bid/open/OpenTable";
import OpenTable from "./OpenTable";
import Header from '../../components/bid/repeats/Header';
import { useSelector } from "react-redux";
import StaffNavbar from '../StaffNavBarr';

const ViewBids = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const user = useSelector((state) => state.login.user);

  const fetchActiveBids = async () => {
    const url = 'https://freighteg.in/freightapi/activeBids/668d158260d1af2a06fa2a89';
  
    try {
      const response = await axios.get(url);
      // console.log('Data fetched successfully:', response.data.data);
      setBidDetails(response.data.data); // Set the bid details from the response
      console.log(bidDetails)
      setVendorData(bidDetails.assigned_transporter)
      // console.log(vendorData)
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching data:', error);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const promises = bidDetails?.assigned_transporter?.map(id => 
          fetch(`https://freighteg.in/freightapi/vendor/${id}`)
            .then(response => response.json())
        );
        
        const results = await Promise.all(promises);
        // setVendorData(results);
      } catch (error) {
        // console.error('Error fetching vendor data:', error);
      }
    };

    fetchVendorData();
  }, []);

  useEffect(() => {
    fetchActiveBids();
  }, []);

  const handleFormSubmit = async (e) => {
    try {
      // Handle form submission logic here
    } catch (error) {
      // console.error('Error handling form submission:', error);
    }
  };
  // console.log(bidDetails)

  return (

    <>
       <StaffNavbar />
       <Header onSubmit={handleFormSubmit} />
       <div className="w-full flex flex-col overflow-x-auto bg-white">
        <div className="bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2 rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
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
