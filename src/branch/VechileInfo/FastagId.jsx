import React, { useState, useEffect, useRef } from 'react';
// import { IoSearchOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Map from './openstreetMap/Map';
import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../../store/authSlice';
import { useSelector } from 'react-redux';
import BranchNavbar from '../BranchNavbar';
const Fastag = () => {
  const [trackingData, setTrackingData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const location = useLocation();
  const pathName = location.pathname;
  const user = useSelector((state) => state.login.user);
  // Get ID from URL parameters
  const { vehicleNumber } = useParams();
  const id =vehicleNumber;
  // alert(vehicleNumber)

  // Flag to track if API request has been made
  const requestMade = useRef(false);


  // Fetch data on component mount or when ID changes
  useEffect(() => {
    console.log("useEffect triggered");
    if (id && !requestMade.current) {
    handleSearch(id);
      
      requestMade.current = true; // Set the flag to true after the request
    }
    // handleSearch(id);
  }, [id]);

  const handleSearch = async (vehicleNumber) => {
    console.log("handleSearch called with", vehicleNumber);
    setLoading(true); // Set loading to true when fetch starts
    try {
      const payload = {
        "company_id": user?.id,
        "tracking_For": "FASTAG",
        "parameters": { "vehiclenumber": vehicleNumber }
      };

      const response = await fetch('https://freighteg.in/freightapi/ULLIPtrackingDirect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(`HTTP error! status: ${response.status}, ${errorText}`);
      }

      const data = await response.json();
      setTrackingData(data.response || []);
      setError(null);
      
     
      
      
      
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      
      setError(` Your Vehicle Number ${vehicleNumber} does not cross any toll plaza in past 3 days or There is A server Error From Government Side . `);
    } finally {
      setLoading(false); // Set loading to false when fetch completes
    }
  };
  return (
    <>  
    <BranchNavbar/>
      <div className="w-full grid grid-cols-1 mt-[10px] lg:grid-cols-12 gap-5 md:gap-2  md:pt-0 pt-3  md:pb-0 ">
        <div className="md:w-[90%] w-[95%] mx-auto md:max-h-[620px] md:col-span-6 xl:col-span-4 flex flex-col overflow-hidden">
         
          <div className="w-full flex flex-col h-full overflow-hidden">
                <div className="w-full md:hidden mt-2 ">
                  <Map tollData={trackingData} />
                </div>
              <div className="w-full flex flex-col bg-red mt-5 p-3 rounded-md shadow-lg border max-h-[550px] min-h-[400px]   border-[#E0E0E0] flex-grow overflow-y-auto">
                <div className="flex items-center p-3 border-b text-gray-500">
                  <div className="text-xs font-medium">Vehicle Number</div>
                  <div className="text-xs font-medium ml-auto">{id}</div>
                </div>
                
              {loading && <div className="text-center text-gray-500 py-5">Loading...</div>} {/* Loading text */}
              {error && !loading && <div className="text-center text-red-500 py-5">{error}</div>} {/* Error text */}
              {!loading && trackingData.length > 0 ? (
                 trackingData.map((location, idx) => (
                  <div key={idx} className={`w-full flex items-center justify-between py-3 px-2 ml-4 relative 
                    border-l-2 border-dashed ${idx !== trackingData.length - 1 ? 'border-b' : ''}`}>
                    
                    <div className="absolute left-[-15px] flex items-center">
                      <div className={`w-[30px] h-[30px] z-[3] rounded-full flex justify-center items-center ${idx === 0 ? 'bg-[#E8F9EE]' : 'bg-[#E5E5FE]'}`}>
                        <FaLocationDot className='text-blue-500' />
                      </div>
                    </div>
                
                    <div className="text-gray-700 ps-[20px]">{location.tollPlazaName}</div>
                    <div className="flex flex-col text-right text-sm">
                      <div className="text-black font-semibold mt-5 ">{location.readerReadTime.split(' ')[0]}</div>
                      <div className="text-gray-400">{location.readerReadTime.split(' ')[1]}</div>
                    </div>
                
                  </div>
                ))
              ) : (
                !loading && !error && <div className="text-center text-gray-500 py-5">No tracking information available.</div> // No data message
              )}
              </div>
          </div>
        </div>
        <div className="md:w-[90%] hidden md:flex w-[100%]  ms-1 mx-auto min-h-[620px] z-[-0] md:col-span-6 xl:col-span-8 justify-center items-center">
          <Map tollData={trackingData || []}/>
        </div>
      </div>
    </>
  );
}

export default Fastag;
