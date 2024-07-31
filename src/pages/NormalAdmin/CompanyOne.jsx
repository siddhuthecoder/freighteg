import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import Alarmone from "../../assets/Alarmone.png";
import location from "../../assets/location.png";
import LineTwo from "../../assets/LineTwo.png";
import greencircle from "../../assets/greencircle.png";
import BusOne from "../../assets/BusOne.png";
import cng from "../../assets/cng.png";
import material from "../../assets/material.png";
import Mans from "../../assets/Mans.png";
import caller from "../../assets/caller.png";
import { GiPathDistance } from "react-icons/gi";
import bag from "../../assets/bag.png";
import { useSelector } from "react-redux";
import ShareDetails from './ShareDetails';



const CompanyOne = () => {
    const [bidId, setBidId] = useState(null);
    const [companyData, setCompanyData] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const vendorId = useSelector((state) => state.login.user?.id);



    //bidnow implementation
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Default values
        const defaultBidId = bidId || '';
        const defaultVendorId = vendorId || '';

        const data = {
            bid_id: formData.get('bid_id') || defaultBidId,
            vendor_id: formData.get('vendor_id') || defaultVendorId,
            bidding_price: parseFloat(formData.get('price')),
        };
        console.log("bidNow", data);

        fetch('https://qiktrack.com/api/addBidding', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                setIsPopupVisible(false);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };


    //Time management
    function getRemainingTime(expireDate, expireTime) {
        const datePart =
            expireDate instanceof Date ? expireDate : new Date(expireDate);
        const timePart = convertTo24HourFormat(expireTime);
        const expireDateTime = new Date(
            `${datePart.getUTCFullYear()}-${(datePart.getUTCMonth() + 1)
                .toString()
                .padStart(2, "0")}-${datePart
                    .getUTCDate()
                    .toString()
                    .padStart(2, "0")}T${timePart}:00.000Z`
        );
        const now = new Date();
        const diffMs = expireDateTime - now;
        if (diffMs <= 0) {
            return "0h 0min";
        }
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${diffHrs}h ${diffMins} min`;
    }
    function convertTo24HourFormat(time) {
        const [timePart, modifier] = time.split(" ");
        let [hours, minutes] = timePart.split(":");

        if (hours === "12") {
            hours = "00";
        }
        if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12;
        }
        return `${hours.toString().padStart(2, "0")}:${minutes}`;
    }

    console.log("companydata", companyData)
    //get transporterdetails
    useEffect(() => {
        const fetchData = async ({ transporterId }) => {
            try {
                const response = await axios.get(
                    `https://qiktrack.com/api/transporters/${transporterId}/bids`
                );
                // Save data to localStorage
                localStorage.setItem("companyData", JSON.stringify(response.data.bids));
                setCompanyData(response.data.bids);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Check if data exists in localStorage
        const localData = localStorage.getItem("companyData");
        if (localData) {
            setCompanyData(JSON.parse(localData));
        } else {
            fetchData();
        }
    }, []);

    // Function to get _id from localStorage
    const getBidIdFromLocalStorage = () => {
        const localData = JSON.parse(localStorage.getItem("companyData"));
        if (localData && localData.length > 0) {
            const lastItem = localData[localData.length - 1];
            return lastItem._id;
        }
        return null;
    };

    useEffect(() => {
        const bidId = getBidIdFromLocalStorage();
        setBidId(bidId);
    }, []);


    return (
        <div className="bg-gray-100 min-h-screen relative">
            <div className="relative top-5 left-5" style={{ width: "25vw" }}>
                <div className="relative bg-white rounded-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 pr-4 py-1 w-full border border-gray-300 rounded-full focus:outline-none focus:border-gray-100"
                    />
                    <CiSearch
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                        style={{ width: "16px", height: "16px", color: "#000" }}
                    />
                </div>
            </div>
            <div className="flex flex-col mt-5 w-full">
                {companyData.map((company) => (
                    <div key={company._id} className="mt-5 mx-5">
                        <div
                            className="h-[220px] bg-white rounded-tl-12 rounded-tr-0 rounded-bl-0 rounded-br-0"
                            style={{
                                borderRadius: "12px",
                                marginBottom: "20px",
                                border: ".5px solid #29A7E4",
                            }}
                        >
                            <div className="flex justify-between">
                                <div className="flex flex-row">
                                    <div>
                                        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-300 mt-2 ml-5">
                                            <img
                                                src={company.imageUrl}
                                                alt="Description"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-5 mt-5">
                                        <h1
                                            style={{ color: "#113870" }}
                                            className="font-nunito text-xl font-semibold"
                                        >
                                            {company.company_id.name}
                                        </h1>
                                        <h3
                                            style={{ color: "#29A7E4" }}
                                            className="text-xs"
                                        >
                                            Request ID: {company._id}
                                        </h3>
                                    </div>
                                    <div className="ml-5 mt-5 flex flex-row">
                                        <ShareDetails company={company} />
                                    </div>
                                </div>
                                <div className="mt-2 w-[15%] flex flex-row">
                                    <img className="h-5 w-5" src={Alarmone} alt="alarm" />
                                    <h5
                                        style={{ color: "#113870" }}
                                        className="font-nunito text-xs font-semibold ml-2"
                                    >
                                        {getRemainingTime(company.expiry_date, company.expiry_time)}
                                        <span className="ml-2" style={{ color: "#29A7E4" }}>
                                            Remaining
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <div className="flex flex-row justify-start  mx-2 h-40 ml-10">
                                <div className="w-4 h-[130px] mt-4 ml-2">
                                    <img src={greencircle} alt="greencircle" />
                                    <img
                                        className="h-[50px] ml-1.5 mt-1"
                                        src={LineTwo}
                                        alt="LineTwo"
                                    />
                                    <img className="mr-1 mt-1" src={location} alt="location" />
                                </div>
                                <div className="flex flex-col ml-5">
                                    <div>
                                        <h2
                                            style={{ color: "#113870" }}
                                            className="ml-5 mt-3 font-nunito font-semibold"
                                        >
                                            {company.loading_city}{" "}
                                            <span className="text-gray-400">
                                                ,{company.loading_state}
                                            </span>
                                        </h2>
                                        <h3 className="ml-5 text-xs text-green-400 font-semibold">
                                            Loading Point:
                                            <span className="ml-1" style={{ color: "#113870" }}>
                                                {company.loading_address}
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="mt-1">
                                        <h2
                                            style={{ color: "#113870" }}
                                            className="ml-5 mt-3 font-nunito font-semibold"
                                        >
                                            {company.unloading_city}{" "}
                                            <span className="text-gray-400">
                                                ,{company.unloading_state}
                                            </span>
                                        </h2>
                                        <h3 className="ml-5 text-xs text-red-400 font-nunito font-semibold">
                                            Unloading Point:
                                            <span className="ml-1" style={{ color: "#113870" }}>
                                                {company.unloading_address}
                                            </span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="ml-60 mt-[-30px] ">
                                    <span className="flex flex-row">
                                        <img className="h-4 w-4 mt-1" src={BusOne} alt="Busone" />
                                        <h4 style={{ color: "#113870" }} className="ml-2 font-nunito font-semibold">
                                            Vehicle Quantity:
                                            <span className="ml-1" style={{ color: "#29A7E4" }}>
                                                {company.quantity}
                                            </span>
                                        </h4>
                                    </span>
                                    <span className="flex flex-row">
                                        <img className="h-4 w-4 mt-3" src={BusOne} alt="Busone" />
                                        <h4 style={{ color: "#113870" }} className="ml-2 font-nunito font-semibold mt-2">
                                            Vehicle Type:
                                            <span className="ml-1" style={{ color: "#29A7E4" }}>
                                                {company.vehicle_type}({company.body_type})

                                            </span>
                                        </h4>
                                        {company.is_cng && <img className="ml-1 mt-3" src={cng} alt="CNG" />}
                                    </span>
                                    <span className="flex flex-row">
                                        <img className="w-4 h-4 mt-5" src={material} alt="material" />
                                        <h4 className="mt-3">
                                            <span className="font-nunito font-semibold ml-2" style={{ color: "#113870" }}>
                                                Material:
                                            </span>
                                            <span style={{ color: "#29A7E4" }}>
                                                {company.material_type}
                                            </span>
                                        </h4>
                                        <h4 className="font-nunito font-semibold ml-2 mt-3" style={{ color: "#113870" }}>
                                            Weight:
                                            <span style={{ color: "#29A7E4" }}>
                                                {company.material_weight}kg
                                            </span>
                                        </h4>
                                    </span>
                                    <span className="flex flex-row mt-4">
                                        <img className="w-4 h-4 mt-1" src={bag} alt="vector" />
                                        <h4 style={{ color: "#113870" }} className="ml-1 font-semibold">
                                            Request Date:
                                            <span style={{ color: "#29A7E4" }}>
                                                {new Date(company.createdAt).toLocaleDateString()}
                                            </span>
                                        </h4>
                                        <img className="w-4 h-4 mt-1 ml-2" src={bag} alt="vector" />
                                        <h4 style={{ color: "#113870" }} className="ml-1 font-semibold">
                                            Expiry Date:
                                            <span style={{ color: "#29A7E4" }}>
                                                {new Date(company.expiry_date).toLocaleDateString()}
                                            </span>
                                        </h4>
                                    </span>
                                    <h4 className="font-nunito font-semibold mt-4 ml-2" style={{ color: "#113870" }}>
                                        Remarks:
                                        <span style={{ color: "#29A7E4" }}>{company.bid_remarks}</span>
                                    </h4>
                                </div>

                                <div className="ml-40 mt-[-30px] h-[26vh]">
                                    <span className="flex flex-row">
                                        <GiPathDistance className="mt-1" />

                                        <h4 style={{ color: "#113870" }} className="font-nunito font-semibold ml-2">
                                            Route distance:
                                            <span className="ml-1" style={{ color: "#29A7E4" }}>
                                                {company.route_distance}
                                            </span>
                                        </h4>
                                    </span>
                                    <span className="flex flex-row">
                                        <img className="w-4 h-4 mt-4" src={bag} alt="vector" />
                                        <h4 style={{ color: "#113870" }} className="font-nunito font-semibold ml-2 mt-3">
                                            Vehicle Loading Date:
                                            <span className="ml-1" style={{ color: "#29A7E4" }}>
                                                {new Date(company.loading_date).toLocaleDateString()}
                                            </span>
                                        </h4>
                                    </span>
                                    <span className="flex flex-row mt-4">
                                        <img className="w-4 h-4 mt-1" src={Mans} alt="man" />
                                        <h4 style={{ color: "#113870" }} className="ml-1 font-nunito font-semibold">
                                            Assigned Staff:
                                            <span className="ml-1" style={{ color: "#29A7E4" }}>
                                                {company.assigned_to.name}
                                            </span>
                                        </h4>
                                    </span>
                                    <span className="flex flex-row mt-4">
                                        <img className="w-4 h-4 mt-1" src={caller} alt="caller" />
                                        <h4 style={{ color: "#113870" }} className="ml-1 font-nunito font-semibold">
                                            Phone Number:
                                            <span className="ml-1" style={{ color: "#29A7E4" }}>
                                                {company.assigned_to.phone}
                                            </span>
                                        </h4>
                                    </span>
                                    <button
                                        onClick={togglePopup}
                                        style={{ backgroundColor: "#113870" }}
                                        className="font-nunito font-semibold text-white ml-28 px-4 py-1 rounded-md mt-2"
                                    >
                                        Bid now
                                    </button>

                                    {isPopupVisible && (
                                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                                <form onSubmit={handleFormSubmit}>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700">Price:</label>
                                                        <input type="text" name="price" className="w-full px-3 py-2 border rounded" required />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button type="button" onClick={togglePopup} className="mr-4 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                                                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyOne;
