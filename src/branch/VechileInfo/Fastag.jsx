import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Map from './openstreetMap/Map';
import { useDispatch } from 'react-redux';
import BranchNavbar from '../BranchNavbar';
// import { signInSuccess } from '../../store/authSlice';
import { useSelector } from 'react-redux';

const Fastag = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [trackingData, setTrackingData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  
  
  const handleSearch = async () => {
    // alert(user?.id)
    setLoading(true);
    const capitalizedVehicleNumber = vehicleNumber.toUpperCase();
    try {
      const payload = {
        "company_id": user?.id,
        "tracking_For": "FASTAG",
        "parameters": { "vehiclenumber": capitalizedVehicleNumber }
      };

      const response = await fetch('https://freighteg.in/freightapi/ULLIPtracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }

      const data = await response.json();
      setTrackingData(data.response || []);
      setError(null);

      
      // dispatch(signInSuccess(companyData));
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      setError(`Your Vehicle Number ${capitalizedVehicleNumber} does not cross any toll plaza in past 3 days or There is A server Error From Government Side.`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <>  
    <BranchNavbar/>
      <div className="w-full  grid grid-cols-1 mt-[20px] lg:grid-cols-12 gap-5 md:gap-2  mx-auto  ">
        <div className="md:w-[90%]  ms-2 w-[100%] mx-auto md:max-h-[82vh] md:col-span-6 xl:col-span-4 flex flex-col h-full overflow-hidden">
          
          <div className="w-full flex flex-col overflow-auto">
            <div className="flex w-full mx-auto items-center mt-3 relative">
              <input 
                type="text" 
                className="w-full px-3 h-[52px] rounded-md border"  
                placeholder="Enter Vehicle Number"
                value={vehicleNumber.toUpperCase()}
                onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
              />
              <div 
                className="absolute right-0 w-[50px] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-br-md flex justify-center items-center cursor-pointer"
                onClick={handleSearch}
              >
                <IoSearchOutline className="text-white text-2xl" />
              </div>
            </div>
            <div className="w-full md:hidden mt-2 ">
              <Map tollData={trackingData} />
            </div>
            <div className="w-full flex flex-col bg-white mt-5 md:p-3 p-1 rounded-md shadow-lg border border-[#E0E0E0] flex-grow overflow-y-auto">
            <div className="flex items-center md:p-3 p-2 border-b text-gray-500">
                <div className="text-xs font-medium">Vehicle Number</div>
                <div className="text-xs font-medium ml-auto">{vehicleNumber.toUpperCase()}</div>
              </div>
              {loading &&<div className="flex justify-center items-center h-full">
                   <svg
                     className="animate-spin h-5 w-5 mr-3 text-blue-500"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                   >
                     <circle
                       className="opacity-25"
                       cx="12"
                       cy="12"
                       r="10"
                       stroke="currentColor"
                       strokeWidth="4"
                     ></circle>
                     <path
                       className="opacity-75"
                       fill="currentColor"
                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                     ></path>
                   </svg>
                   Please Wait, Data is Fetching...
                 </div>}
              {error && !loading && <div className="text-center text-red-500 py-5">{error}</div>}
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
                !loading && !error &&  <div className="text-center text-gray-500 py-5">Enter A Vehicle Number</div>
              )}
            </div>
             
          </div>
        </div>
        <div className="md:w-[90%] hidden md:flex w-[100%] md:ms-1 mx-auto min-h-[88vh] md:col-span-6 xl:col-span-8  z-[-0]  justify-center items-center">
          <Map tollData={trackingData}/>
        </div>
      </div>
    </>
  );
}

export default Fastag;
