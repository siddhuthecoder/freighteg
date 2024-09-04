import React from "react";
import { CiSearch } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";
import filter from "../../assets/filter.png";
import plus from "../../assets/blue.png";
import { Link } from "react-router-dom";
const DownloadedPod = () => {
    return (
        <>
        <h1>Downloaded pod</h1>
            {/* <nav className="bg-white-800 h-16 flex items-center justify-between px-4 static top-0 left-40 right-0 z-10 mt-3 shadow-lg rounded-l"> */}
                {/* Left side */}
                {/* <div className="flex space-x-6">
                    <div className="text-blue-400 px-3">
                        <Link to="/allpodrequest"><p className="mb-5">All POD Request</p></Link>
                    </div>
                    <Link to="/downloadedpod"><div className="text-black-100 px-3 mt-3">Downloaded POD</div></Link>
                </div> */}
                {/* <div className="flex items-center "> */}
                    {/* Search box */}
                    {/* <div className="relative mr-2">
                        <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-3 py-1 w-50 bg-white text-gray-600 rounded-3xl focus:outline-none border border-gray-600"
                        />
                    </div>
                </div> */}
             
{/*                 
            </nav> */}
        </>
    )
}

export default DownloadedPod;
